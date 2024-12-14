/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import { VerusTypes,/* VerusUtils, VerusBaseWalletProvider,/=*/ } from '@chainify/verus';
//import { decodeRawTransaction } from '@chainify/verus/dist/lib/utils';
import { UnimplementedMethodError } from '@chainify/errors';
import { BigNumber, Transaction } from '@chainify/types';
//import { hash160 } from '@chainify/utils';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { fundAddress, fundWallet, mineBlock, getNewAddress } from '../../../common';
import { Chain } from '../../../types';
import { getRandomVerusAddress } from '../utils';

import utxolib from '@bitgo/utxo-lib';

chai.use(chaiAsPromised);

function testBatchTransaction(chain: Chain) {
    const { config, client } = chain;

    it('Sent value to 2 addresses', async () => {
        const addr1 = await getRandomVerusAddress(chain);
        const addr2 = await getRandomVerusAddress(chain);

        const value = config.sendParams.value || new BigNumber(1000000);

        const bal1Before = await client.chain.getBalance([addr1], []);
        const bal2Before = await client.chain.getBalance([addr2], []);
        await chain.client.wallet.sendBatchTransaction([
            { to: addr1, value },
            { to: addr2, value },
        ]);
        await mineBlock(chain);
        const bal1After = await client.chain.getBalance([addr1], []);
        const bal2After = await client.chain.getBalance([addr2], []);

        expect(bal1Before[0].plus(value).toString()).to.equal(bal1After.toString());
        expect(bal2Before[0].plus(value).toString()).to.equal(bal2After.toString());
    });
}

function testSweepTransaction(chain: Chain) {
    describe('Sweep Transaction', () => {
        after(async function () {
            // After sweep, funds should be replenished
            await fundWallet(chain);
        });

        it('should sweep wallet balance', async () => {
            try {
                const changeAddresses = await chain.client.wallet.getAddresses(0, 20, true);

                for (let i = 1; i <= 5; i++) {
                    await fundAddress(chain, changeAddresses[i]);
                }

                const addr1 = await getRandomVerusAddress(chain);

                await chain.client.wallet.sendSweepTransaction(addr1, null);

                const balanceAfter = await chain.client.chain.getBalance(changeAddresses, []);
                expect(balanceAfter.toString()).to.equal('0');
            } catch (err) {
                if (!(err instanceof UnimplementedMethodError)) {
                    throw err;
                }
            }
        });
    });
}

function testOpReturn(chain: Chain) {
    const { config, client } = chain;

    it('Send OP_RETURN script', async () => {
        const tx: Transaction<VerusTypes.Transaction> = await client.wallet.sendTransaction({
            to: null,
            value: new BigNumber(0),
            data: Buffer.from('freedom', 'utf-8').toString('hex')
        })

        expect(tx._raw.vout.find((vout) => vout.scriptPubKey.hex === '6a0766726565646f6d')).to.exist
        expect(tx._raw.vout.find((vout) => vout.scriptPubKey.asm.includes('OP_RETURN'))).to.exist
    })

    it('Send Value & OP_RETURN', async () => {
        const to = await getRandomVerusAddress(chain)
        const value = config.sendParams.value || new BigNumber(1000000);
        const tx: Transaction<VerusTypes.Transaction> = await client.wallet.sendTransaction({
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

function testSignPSBTSimple(chain: Chain) {
    it('should create a simple send', async () => {

        const network = utxolib.networks[chain.config.network.name];
        const unusedAddressOne = await getNewAddress(chain);
        const tx1: Transaction<VerusTypes.Transaction> = await fundAddress(chain, unusedAddressOne.address, new BigNumber(2000000));
        const txbit = utxolib.Transaction.fromHex(tx1._raw.hex, network);
        const utxo1 = tx1._raw.vout.find((vout) => unusedAddressOne.address === vout.scriptPubKey.addresses[0]);

        await mineBlock(chain);
        const tx = new utxolib.TransactionBuilder(network, 5000)
        const currentHeight: number = await chain.client.chain.sendRpcRequest('getblockcount', []);
        const wif = await chain.client.chain.sendRpcRequest('dumpprivkey', [unusedAddressOne.address]);
        tx.setVersion(4)
        tx.setVersionGroupId(0x892f2085)
        tx.setExpiryHeight(currentHeight + 20)
        tx.setLockTime(currentHeight)

        tx.addInput(txbit, utxo1.n);
        tx.addOutput("RH7h8p9LN2Yb48SkxzNQ29c1Ltfju8Cd5i", 2000000 - 5000);

        const keyPair = utxolib.ECPair.fromWIF(wif, network);
        tx.sign(0, keyPair, "", null, txbit.outs[utxo1.n].value);

        const hex = tx.build().toHex();

        const paymentTxHash = await chain.client.chain.sendRawTransaction(hex);

        const payment: Transaction<VerusTypes.Transaction> = await chain.client.chain.getTransactionByHash(paymentTxHash);

        expect(Buffer.from(paymentTxHash, 'hex').length).to.equal(32);
        expect(payment._raw.vin.length).to.equal(1);
        expect(payment._raw.vout.length).to.equal(1);

    });
}


export function shouldBehaveLikeVerusTransaction(chain: Chain) {
    describe('Verus Transactions', () => {
        testBatchTransaction(chain);
        testSignPSBTSimple(chain);
        testSweepTransaction(chain);

        if (chain.name !== 'verus-node-wallet') {
            testOpReturn(chain);
        }
    });
}
