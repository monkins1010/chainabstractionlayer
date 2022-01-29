import { VerusWalletProvider } from '@liquality/verus-wallet-provider'
import { WalletProvider } from '@liquality/wallet-provider'
import { VerusNetwork } from '@liquality/verus-networks'
import { verus } from '@liquality/types'

import { ECPair, ECPairInterface, Transaction as BitcoinJsTransaction, script } from 'bitcoinjs-lib'
import { signAsync as signBitcoinMessage } from 'bitcoinjs-message'
import { mnemonicToSeed } from 'bip39'
import { BIP32Interface, fromSeed } from 'bip32'

const utxolib = require('@bitgo/utxo-lib') // eslint-disable-line

type WalletProviderConstructor<T = WalletProvider> = new (...args: any[]) => T

interface VerusJsWalletProviderOptions {
  network: VerusNetwork
  mnemonic: string
  baseDerivationPath: string
  addressType?: verus.AddressType
}

export default class VerusJsWalletProvider extends VerusWalletProvider(WalletProvider as WalletProviderConstructor) {
  _mnemonic: string
  _seedNode: BIP32Interface
  _baseDerivationNode: BIP32Interface

  constructor(options: VerusJsWalletProviderOptions) {
    const { network, mnemonic, baseDerivationPath, addressType = verus.AddressType.BECH32 } = options
    super({ network, baseDerivationPath, addressType })

    if (!mnemonic) throw new Error('Mnemonic should not be empty')

    this._mnemonic = mnemonic
  }

  async seedNode() {
    if (this._seedNode) return this._seedNode

    const seed = await mnemonicToSeed(this._mnemonic)
    this._seedNode = fromSeed(seed, this._network)

    return this._seedNode
  }

  async baseDerivationNode() {
    if (this._baseDerivationNode) return this._baseDerivationNode

    const baseNode = await this.seedNode()
    this._baseDerivationNode = baseNode.derivePath(this._baseDerivationPath)

    return this._baseDerivationNode
  }

  async keyPair(derivationPath: string): Promise<ECPairInterface> {
    const wif = await this._toWIF(derivationPath)
    return ECPair.fromWIF(wif, this._network)
  }

  private async _toWIF(derivationPath: string): Promise<string> {
    const node = await this.seedNode()
    return node.derivePath(derivationPath).toWIF()
  }

  async exportPrivateKey() {
    return this._toWIF(this._baseDerivationPath)
  }

  async signMessage(message: string, from: string) {
    const address = await this.getWalletAddress(from)
    const keyPair = await this.keyPair(address.derivationPath)
    const signature = await signBitcoinMessage(message, keyPair.privateKey, keyPair.compressed)
    return signature.toString('hex')
  }

  canUpdateFee() {
    return false
  }

  async _buildTransaction(targets: verus.OutputTarget[], feePerByte?: number, fixedInputs?: verus.Input[]) {
    const network = this._network

    const unusedAddress = await this.getUnusedAddress(true)
    const { inputs, change, fee } = await this.getInputsForAmount(targets, feePerByte, fixedInputs)

    if (change) {
      targets.push({
        address: unusedAddress.address,
        value: change.value
      })
    }

    const tx = new utxolib.TransactionBuilder(network, feePerByte)

    for (let i = 0; i < inputs.length; i++) {
      tx.addInput(inputs[i].txid, inputs[i].vout)
    }

    for (const output of targets) {
      if (output.script) {
        tx.addOutput(output.script, output.value)
      } else {
        tx.addOutput(output.address, output.value)
      }
    }

    tx.setVersion(4)

    for (let i = 0; i < inputs.length; i++) {
      const wallet = await this.getWalletAddress(inputs[i].address)
      const keyPair = await this.keyPair(wallet.derivationPath)
      tx.sign(i, keyPair)
    }

    return { hex: tx.build().toHex(), fee }
  }

  async _buildSweepTransaction(externalChangeAddress: string, feePerByte: number) {
    let _feePerByte = feePerByte || null
    if (!_feePerByte) _feePerByte = await this.getMethod('getFeePerByte')()

    const { inputs, outputs, change } = await this.getInputsForAmount([], _feePerByte, [], 100, true)

    if (change) {
      throw new Error('There should not be any change for sweeping transaction')
    }

    const _outputs = [
      {
        address: externalChangeAddress,
        value: outputs[0].value
      }
    ]

    // @ts-ignore
    return this._buildTransaction(_outputs, feePerByte, inputs)
  }

  // async signPSBT(data: string, inputs: verus.PsbtInputTarget[]) {
  //   const psbt = Psbt.fromBase64(data, { network: this._network })
  //   for (const input of inputs) {
  //     const keyPair = await this.keyPair(input.derivationPath)
  //     psbt.signInput(input.index, keyPair)
  //   }
  //   return psbt.toBase64()
  // }

  async signBatchP2SHTransaction(
    inputs: [{ inputTxHex: string; index: number; vout: any; outputScript: Buffer; txInputIndex?: number }],
    addresses: string,
    tx: any,
    lockTime?: number,
    segwit?: boolean
  ) {
    const keyPairs = []
    for (const address of addresses) {
      const wallet = await this.getWalletAddress(address)
      const keyPair = await this.keyPair(wallet.derivationPath)
      keyPairs.push(keyPair)
    }

    const sigs = []
    for (let i = 0; i < inputs.length; i++) {
      const index = inputs[i].txInputIndex ? inputs[i].txInputIndex : inputs[i].index
      let sigHash
      if (segwit) {
        sigHash = tx.hashForWitnessV0(
          index,
          inputs[i].outputScript,
          inputs[i].vout.vSat,
          BitcoinJsTransaction.SIGHASH_ALL
        )
      } else {
        sigHash = tx.hashForSignature(index, inputs[i].outputScript, BitcoinJsTransaction.SIGHASH_ALL)
      }

      const sig = script.signature.encode(keyPairs[i].sign(sigHash), BitcoinJsTransaction.SIGHASH_ALL)
      sigs.push(sig)
    }

    return sigs
  }

  getScriptType() {
    if (this._addressType === verus.AddressType.LEGACY) return 'p2pkh'
    else if (this._addressType === verus.AddressType.P2SH_SEGWIT) return 'p2sh-p2wpkh'
    else if (this._addressType === verus.AddressType.BECH32) return 'p2wpkh'
  }

  async getConnectedNetwork() {
    return this._network
  }

  async isWalletAvailable() {
    return true
  }
}
