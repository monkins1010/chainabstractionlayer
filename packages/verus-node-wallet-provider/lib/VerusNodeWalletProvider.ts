import { Psbt, ECPair, script, Transaction as BitcoinJsTransaction } from 'bitcoinjs-lib'
import { uniq, flatten } from 'lodash'
import { WalletProvider } from '@liquality/wallet-provider'
import { JsonRpcProvider } from '@liquality/jsonrpc-provider'
import { verus, SendOptions, BigNumber, Transaction, Address } from '@liquality/types'
import { VerusNetworks, VerusNetwork } from '@liquality/verus-networks'
import { normalizeTransactionObject, decodeRawTransaction } from '@liquality/verus-utils'
import { sha256 } from '@liquality/crypto'

const CHAIN_TO_NETWORK: { [index: string]: VerusNetwork } = {
  VRSC: VerusNetworks.verus,
  VRSCTEST: VerusNetworks.verus_testnet
}

interface ProviderOptions {
  // RPC URI
  uri: string
  // Authentication username
  username?: string
  // Authentication password
  password?: string
  // Bitcoin network
  network: VerusNetwork
  // Address type. Default: bech32
  addressType?: verus.AddressType
}

export default class VerusNodeWalletProvider extends WalletProvider {
  _addressType: verus.AddressType
  _network: VerusNetwork
  _rpc: JsonRpcProvider
  _addressInfoCache: { [key: string]: Address }

  constructor(opts: ProviderOptions) {
    const { uri, username, password, network, addressType = verus.AddressType.BECH32 } = opts
    super({ network })
    const addressTypes = Object.values(verus.AddressType)
    if (!addressTypes.includes(addressType)) {
      throw new Error(`addressType must be one of ${addressTypes.join(',')}`)
    }
    this._addressType = addressType
    this._network = network
    this._rpc = new JsonRpcProvider(uri, username, password)
    this._addressInfoCache = {}
  }

  async signMessage(message: string, from: string) {
    return this._rpc
      .jsonrpc('signmessage', from, message)
      .then((result: { hash: string; signature: string }) => Buffer.from(result.signature, 'base64').toString('hex'))
  }

  canUpdateFee() {
    return false
  }

  async withTxFee(func: () => Promise<Transaction<verus.Transaction>>, feePerByte: number) {
    const feePerKB = new BigNumber(feePerByte).div(1e8).times(1000).toNumber()
    const originalTxFee: number = (await this._rpc.jsonrpc('getwalletinfo')).paytxfee
    await this._rpc.jsonrpc('settxfee', feePerKB)

    const result = await func()

    await this._rpc.jsonrpc('settxfee', originalTxFee)

    return result
  }

  async _sendTransaction(options: SendOptions) {
    const value = new BigNumber(options.value).dividedBy(1e8).toNumber()
    const hash = await this._rpc.jsonrpc('sendtoaddress', options.to, value)
    const transaction = await this._rpc.jsonrpc('gettransaction', hash, true)
    const fee = new BigNumber(transaction.fee).abs().times(1e8).toNumber()
    return normalizeTransactionObject(decodeRawTransaction(transaction.hex, this._network), fee)
  }

  async sendTransaction(options: SendOptions) {
    return options.fee
      ? this.withTxFee(async () => this._sendTransaction(options), options.fee)
      : this._sendTransaction(options)
  }

  // TODO: Update when Verus adds bumpfee
  // async updateTransactionFee(tx: Transaction<verus.Transaction>, newFeePerByte: number) {
  //   const txHash = isString(tx) ? tx : tx.hash
  //   return this.withTxFee(async () => {
  //     const result = await this._rpc.jsonrpc('bumpfee', txHash)
  //     const transaction = await this._rpc.jsonrpc('gettransaction', result.txid, true)
  //     const fee = new BigNumber(transaction.fee).abs().times(1e8).toNumber()
  //     return normalizeTransactionObject(decodeRawTransaction(transaction.hex, this._network), fee)
  //   }, newFeePerByte)
  // }

  async signPSBT(data: string, inputs: verus.PsbtInputTarget[]) {
    const psbt = Psbt.fromBase64(data, { network: this._network })

    for (const input of inputs) {
      const usedAddresses = await this.getUsedAddresses()
      const address = usedAddresses.find((address) => address.derivationPath === input.derivationPath)
      const wif = await this.dumpPrivKey(address.address)
      const keyPair = ECPair.fromWIF(wif, this._network)
      psbt.signInput(input.index, keyPair)
    }

    return psbt.toBase64()
  }

  async signBatchP2SHTransaction(
    inputs: [{ inputTxHex: string; index: number; vout: any; outputScript: Buffer }],
    addresses: string,
    tx: any
  ) {
    const wallets = []
    for (const address of addresses) {
      const wif = await this.dumpPrivKey(address)
      const wallet = ECPair.fromWIF(wif, this._network)
      wallets.push(wallet)
    }

    const sigs = []
    for (let i = 0; i < inputs.length; i++) {
      const sigHash = tx.hashForSignature(inputs[i].index, inputs[i].outputScript, BitcoinJsTransaction.SIGHASH_ALL)

      const sig = script.signature.encode(wallets[i].sign(sigHash), BitcoinJsTransaction.SIGHASH_ALL)
      sigs.push(sig)
    }

    return sigs
  }

  async dumpPrivKey(address: string): Promise<string> {
    return this._rpc.jsonrpc('dumpprivkey', address)
  }

  async getNewAddress(_addressType: verus.AddressType, label = '') {
    const params = [label]
    const newAddress = await this._rpc.jsonrpc('getnewaddress', ...params)

    if (!newAddress) return null

    return this.getAddressInfo(newAddress)
  }

  async getAddressInfo(address: string): Promise<Address> {
    if (address in this._addressInfoCache) {
      return this._addressInfoCache[address]
    }

    const addressInfo = await this._rpc.jsonrpc('validateaddress', address)

    let publicKey

    if (!addressInfo.iswatchonly) {
      publicKey = addressInfo.pubkey
    }
    const addressObject = new Address({ address, publicKey })
    this._addressInfoCache[address] = addressObject
    return addressObject
  }

  async getAddresses() {
    return this.getUsedAddresses()
  }

  async getUnusedAddress() {
    return this.getNewAddress(this._addressType)
  }

  async getUsedAddresses() {
    const usedAddresses: verus.rpc.AddressGrouping[] = await this._rpc.jsonrpc('listaddressgroupings')
    const emptyAddresses: verus.rpc.ReceivedByAddress[] = await this._rpc.jsonrpc(
      'listreceivedbyaddress',
      0,
      true,
      false
    )

    const addrs = uniq([...flatten(usedAddresses).map((addr) => addr[0]), ...emptyAddresses.map((a) => a.address)])

    const addressObjects = await Promise.all(addrs.map((address) => this.getAddressInfo(address)))

    return addressObjects
  }

  async getWalletAddress(address: string) {
    return this.getAddressInfo(address)
  }

  async isWalletAvailable() {
    try {
      await this._rpc.jsonrpc('getwalletinfo')
      return true
    } catch (e) {
      return false
    }
  }

  async getConnectedNetwork() {
    const blockchainInfo = await this._rpc.jsonrpc('getinfo')
    const chain = blockchainInfo.name
    return CHAIN_TO_NETWORK[chain]
  }

  async generateSecret(message: string) {
    const secretAddressLabel = 'secretAddress'
    let address
    try {
      const labelAddresses = await this._rpc.jsonrpc('getaddressesbyaccount', secretAddressLabel)
      address = Object.keys(labelAddresses)[0]
    } catch (e) {
      // Label does not exist
      address = (await this.getNewAddress(verus.AddressType.LEGACY, secretAddressLabel)).address // Signing only possible with legacy addresses
    }
    const signedMessage = await this.signMessage(message, address)
    const secret = sha256(signedMessage)
    return secret
  }
}
