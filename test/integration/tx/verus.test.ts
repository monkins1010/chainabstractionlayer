/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import * as bitcoinJs from 'bitcoinjs-lib'
import { BigNumber, Transaction, verus } from '../../../packages/types/lib'
import * as VerusUtils from '../../../packages/verus-utils/lib'
import { TEST_TIMEOUT, Chain, chains, getNewAddress, getRandomVerusAddress, mineBlock, fundWallet } from '../common'
import { testTransaction } from './common'
import config from '../config'
import { VerusNetwork } from '../../../packages/verus-networks/lib'

const utxolib = require('@bitgo/utxo-lib') // eslint-disable-line

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

chai.use(chaiAsPromised)

function testBatchTransaction(chain: Chain) {
  it('Sent value to 2 addresses', async () => {
    const addr1 = await getRandomVerusAddress(chain)
    const addr2 = await getRandomVerusAddress(chain)

    const value = config[chain.name as keyof typeof config].value

    const bal1Before = await chain.client.chain.getBalance([addr1])
    const bal2Before = await chain.client.chain.getBalance([addr2])
    await chain.client.chain.sendBatchTransaction([
      { to: addr1, value },
      { to: addr2, value }
    ])
    await mineBlock(chain)
    const bal1After = await chain.client.chain.getBalance([addr1])
    const bal2After = await chain.client.chain.getBalance([addr2])

    expect(bal1Before.plus(value).toString()).to.equal(bal1After.toString())
    expect(bal2Before.plus(value).toString()).to.equal(bal2After.toString())
  })
}

function testOpReturn(chain: Chain) {
  it('Send OP_RETURN script', async () => {
    const tx: Transaction<verus.Transaction> = await chain.client.chain.sendTransaction({
      to: null,
      value: new BigNumber(0),
      data: Buffer.from('freedom', 'utf-8').toString('hex')
    })

    expect(tx._raw.vout.find((vout) => vout.scriptPubKey.hex === '6a0766726565646f6d')).to.exist
    expect(tx._raw.vout.find((vout) => vout.scriptPubKey.asm.includes('OP_RETURN'))).to.exist
  })

  it('Send Value & OP_RETURN', async () => {
    const to = await getRandomVerusAddress(chain)
    const value = config[chain.name as keyof typeof config].value
    const tx: Transaction<verus.Transaction> = await chain.client.chain.sendTransaction({
      to,
      value,
      data: Buffer.from('freedom', 'utf-8').toString('hex')
    })

    // OP_RETURN exists
    expect(tx._raw.vout.find((vout) => vout.scriptPubKey.hex === '6a0766726565646f6d')).to.exist
    expect(tx._raw.vout.find((vout) => vout.scriptPubKey.asm.includes('OP_RETURN'))).to.exist

    // P2PKH exists
    expect(tx._raw.vout.find((vout) => vout.value === value.div(1e8).toNumber())).to.exist
  })
}

function testSweepTransaction(chain: Chain) {
  describe('Sweep Transaction', () => {
    after(async function () {
      // After sweep, funds should be replenished
      await fundWallet(chain)
    })

    it('should sweep wallet balance', async () => {
      await fundWallet(chains.verusWithJs)

      const nonChangeAddresses = await chain.client.wallet.getAddresses(0, 20, false)
      const changeAddresses = await chain.client.wallet.getAddresses(0, 20, true)
      const addrList = nonChangeAddresses.concat(changeAddresses)

      const bal = (await chain.client.chain.getBalance(addrList)).toNumber()
      let sendTxChain
      if (bal === 0) {
        sendTxChain = chains.verusWithNode
      } else {
        sendTxChain = chain
      }

      await sendTxChain.client.chain.sendTransaction({ to: changeAddresses[1], value: new BigNumber(200000000) })
      await sendTxChain.client.chain.sendTransaction({ to: changeAddresses[2], value: new BigNumber(200000000) })
      await sendTxChain.client.chain.sendTransaction({ to: changeAddresses[3], value: new BigNumber(200000000) })
      await sendTxChain.client.chain.sendTransaction({ to: changeAddresses[4], value: new BigNumber(200000000) })
      await sendTxChain.client.chain.sendTransaction({ to: changeAddresses[5], value: new BigNumber(200000000) })
      await sendTxChain.client.chain.sendTransaction({ to: changeAddresses[6], value: new BigNumber(200000000) })

      const addr1 = await getRandomVerusAddress(chain)

      await chain.client.chain.sendSweepTransaction(addr1)

      const balanceAfter = await chain.client.chain.getBalance(changeAddresses)
      expect(balanceAfter.toString()).to.equal('0')
    })
  })
}

// function testSignPSBTSimple(chain: Chain) {
//   it('should sign psbt a simple send', async () => {
//     const network = chain.network as VerusNetwork

//     const unusedAddressOne = await getNewAddress(chain)
//     const tx1: Transaction<verus.Transaction> = await fundAddress(
//       chain,
//       unusedAddressOne.address,
//       new BigNumber(2000000)
//     )
//     const utxo1 = tx1._raw.vout.find((vout) => unusedAddressOne.address === vout.scriptPubKey.addresses[0])

//     const unusedAddressTwo = await getNewAddress(chain)
//     const tx2: Transaction<verus.Transaction> = await fundAddress(
//       chain,
//       unusedAddressTwo.address,
//       new BigNumber(1000000)
//     )
//     const utxo2 = tx2._raw.vout.find((vout) => unusedAddressTwo.address === vout.scriptPubKey.addresses[0])

//     const psbt = new bitcoinJs.Psbt({ network })
//     const txfee = VerusUtils.calculateFee(1, 1, 5)

//     psbt.addInput({
//       hash: tx1.hash,
//       index: utxo1.n,
//       sequence: 0,
//       witnessUtxo: {
//         script: Buffer.from(utxo1.scriptPubKey.hex, 'hex'),
//         value: 2000000
//       }
//     })

//     psbt.addInput({
//       hash: tx2.hash,
//       index: utxo2.n,
//       sequence: 0,
//       witnessUtxo: {
//         script: Buffer.from(utxo2.scriptPubKey.hex, 'hex'),
//         value: 1000000
//       }
//     })

//     psbt.addOutput({
//       address: (await getNewAddress(chain)).address,
//       value: 3000000 - txfee
//     })

//     const signedPSBTHex = await chain.client.getMethod('signPSBT')(psbt.toBase64(), [
//       { index: 0, derivationPath: unusedAddressOne.derivationPath },
//       { index: 1, derivationPath: unusedAddressTwo.derivationPath }
//     ])
//     const signedPSBT = bitcoinJs.Psbt.fromBase64(signedPSBTHex, { network })
//     signedPSBT.finalizeAllInputs()

//     const hex = signedPSBT.extractTransaction().toHex()

//     const payment3TxHash = await chain.client.getMethod('sendRawTransaction')(hex)

//     await mineBlock(chain)

//     const payment3: Transaction<verus.Transaction> = await chain.client.chain.getTransactionByHash(payment3TxHash)

//     expect(payment3._raw.vin.length).to.equal(2)
//     expect(payment3._raw.vout.length).to.equal(1)
//   })
// }

// function testSignPSBTScript(chain: Chain) {
//   it('should send p2sh and sign PSBT to redeem', async () => {
//     const network = chain.network
//     const value = config[chain.name as keyof typeof config].value
//     const OPS = bitcoinJs.script.OPS

//     const { address: unusedAddressOne, derivationPath: unusedAddressOneDerivationPath } = await getNewAddress(chain)
//     await chain.client.chain.sendTransaction({ to: unusedAddressOne, value })
//     await mineBlock(chain)

//     const { address: unusedAddressTwo } = await getNewAddress(chain)

//     const newAddresses = [unusedAddressOne]

//     const addresses = []
//     for (const newAddress of newAddresses) {
//       const address = await chain.client.getMethod('getWalletAddress')(newAddress)
//       addresses.push(address)
//     }

//     const multisigOutput = bitcoinJs.script.compile([
//       OPS.OP_DUP,
//       OPS.OP_HASH160,
//       Buffer.from(hash160(addresses[0].publicKey), 'hex'),
//       OPS.OP_EQUALVERIFY,
//       OPS.OP_CHECKSIG
//     ])

//     const paymentVariant = bitcoinJs.payments.p2wsh({
//       redeem: { output: multisigOutput, network: network as VerusNetwork },
//       network: network as VerusNetwork
//     })

//     const address = paymentVariant.address

//     const initiationTx: Transaction<verus.Transaction> = await chain.client.chain.sendTransaction({
//       to: address,
//       value
//     })

//     await mineBlock(chain)

//     let multiVout: verus.Output

//     for (const voutIndex in initiationTx._raw.vout) {
//       const vout = initiationTx._raw.vout[voutIndex]
//       const paymentVariantEntryOne = paymentVariant.output.toString('hex') === vout.scriptPubKey.hex
//       if (paymentVariantEntryOne) multiVout = vout
//     }

//     const psbt = new bitcoinJs.Psbt({ network: network as VerusNetwork })
//     const txfee = VerusUtils.calculateFee(3, 3, 9)

//     const input = {
//       hash: initiationTx.hash,
//       index: multiVout.n,
//       sequence: 0,
//       witnessUtxo: {
//         script: paymentVariant.output,
//         value: value.toNumber()
//       },
//       witnessScript: paymentVariant.redeem.output
//     }

//     const output = {
//       address: unusedAddressTwo,
//       value: value.toNumber() - txfee
//     }

//     psbt.addInput(input)
//     psbt.addOutput(output)

//     const signedPSBTHex = await chain.client.getMethod('signPSBT')(psbt.toBase64(), [
//       { index: 0, derivationPath: unusedAddressOneDerivationPath }
//     ])
//     const signedPSBT = bitcoinJs.Psbt.fromBase64(signedPSBTHex, { network: network as VerusNetwork })
//     signedPSBT.finalizeInput(0)

//     const hex = signedPSBT.extractTransaction().toHex()

//     const claimTxHash = await chain.client.getMethod('sendRawTransaction')(hex)

//     await mineBlock(chain)

//     const claimTxRaw = await chain.client.getMethod('getRawTransactionByHash')(claimTxHash)
//     const claimTx = await chain.client.getMethod('decodeRawTransaction')(claimTxRaw)

//     const claimVouts = claimTx.vout
//     const claimVins = claimTx.vin

//     expect(claimVins.length).to.equal(1)
//     expect(claimVouts.length).to.equal(1)
//   })
// }

function testSignBatchP2SHTransaction(chain: Chain) {
  it("Should redeem two P2SH's", async () => {
    const network = chain.network
    const value = config[chain.name as keyof typeof config].value
    const OPS = utxolib.opcodes

    const { address: unusedAddressOne } = await getNewAddress(chain)
    await chain.client.chain.sendTransaction({ to: unusedAddressOne, value })
    await mineBlock(chain)

    const { address: unusedAddressTwo } = await getNewAddress(chain)

    const newAddresses = [unusedAddressOne, unusedAddressTwo]

    const addresses = []
    for (const newAddress of newAddresses) {
      const address = await chain.client.getMethod('getWalletAddress')(newAddress)
      addresses.push(address)
    }

    const multisigOutputOne = utxolib.script.compile([
      OPS.OP_2,
      Buffer.from(addresses[0].publicKey, 'hex'),
      Buffer.from(addresses[1].publicKey, 'hex'),
      OPS.OP_2,
      OPS.OP_CHECKMULTISIG
    ])

    const multisigOutputTwo = utxolib.script.compile([
      OPS.OP_2,
      Buffer.from(addresses[1].publicKey, 'hex'),
      Buffer.from(addresses[0].publicKey, 'hex'),
      OPS.OP_2,
      OPS.OP_CHECKMULTISIG
    ])

    const paymentVariantOne = utxolib.ECPair.fromPublicKeyBuffer(multisigOutputOne, network as VerusNetwork)
    const paymentVariantTwo = utxolib.ECPair.fromPublicKeyBuffer(multisigOutputTwo, network as VerusNetwork)

    const addressOne = paymentVariantOne.getAddress()
    const addressTwo = paymentVariantTwo.getAddress()

    const initiationTx = await chain.client.chain.sendBatchTransaction([
      { to: addressOne, value },
      { to: addressTwo, value }
    ])
    await mineBlock(chain)

    const multiOne: any = {}
    const multiTwo: any = {}

    for (const voutIndex in initiationTx._raw.vout) {
      const vout = initiationTx._raw.vout[voutIndex]
      const paymentVariantEntryOne = paymentVariantOne.getPublicKeyBuffer().toString('hex') === vout.scriptPubKey.hex
      const paymentVariantEntryTwo = paymentVariantTwo.getPublicKeyBuffer().toString('hex') === vout.scriptPubKey.hex
      if (paymentVariantEntryOne) multiOne.multiVout = vout
      if (paymentVariantEntryTwo) multiTwo.multiVout = vout
    }

    const txb = new bitcoinJs.TransactionBuilder(network as VerusNetwork)
    const txfee = VerusUtils.calculateFee(3, 3, 9)

    multiOne.multiVout.vSat = value.toNumber()
    multiTwo.multiVout.vSat = value.toNumber()

    txb.addInput(initiationTx.hash, multiOne.multiVout.n, 0, paymentVariantOne.getPublicKeyBuffer())
    txb.addInput(initiationTx.hash, multiTwo.multiVout.n, 0, paymentVariantTwo.getPublicKeyBuffer())
    txb.addOutput(unusedAddressTwo, value.toNumber() * 2 - txfee)

    const tx = txb.buildIncomplete()

    const claimTxHash = await chain.client.getMethod('sendRawTransaction')(tx.toHex())

    await mineBlock(chain)

    const claimTxRaw = await chain.client.getMethod('getRawTransactionByHash')(claimTxHash)
    const claimTx = await chain.client.getMethod('decodeRawTransaction')(claimTxRaw)

    const claimVouts = claimTx.vout
    const claimVins = claimTx.vin

    expect(claimVins.length).to.equal(2)
    expect(claimVouts.length).to.equal(1)
  })
}

describe('Transactions', function () {
  this.timeout(TEST_TIMEOUT)

  // TODO: PSBT
  describe('Verus - Node', () => {
    testTransaction(chains.verusWithNode)
    testBatchTransaction(chains.verusWithNode)
    //testSignPSBTSimple(chains.verusWithNode)
    //testSignPSBTScript(chains.verusWithNode)
    testSignBatchP2SHTransaction(chains.verusWithNode)
  })

  describe('Verus - Js', () => {
    before(async function () {
      await fundWallet(chains.verusWithJs)
    })
    testTransaction(chains.verusWithJs)
    testBatchTransaction(chains.verusWithJs)
    //testSignPSBTSimple(chains.verusWithJs)
    //testSignPSBTScript(chains.verusWithJs)
    testSignBatchP2SHTransaction(chains.verusWithJs)
    testSweepTransaction(chains.verusWithJs)
    testOpReturn(chains.verusWithJs)
  })
})
