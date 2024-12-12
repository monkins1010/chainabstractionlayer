/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
//import { VerusBaseWalletProvider, VerusTypes, VerusUtils } from '@chainify/verus';
//import { decodeRawTransaction } from '@chainify/verus/dist/lib/utils';
import { UnimplementedMethodError } from '@chainify/errors';
import { BigNumber } from '@chainify/types';
//import { hash160 } from '@chainify/utils';

import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { fundAddress, fundWallet, mineBlock } from '../../../common';
import { Chain } from '../../../types';
import { getRandomVerusAddress } from '../utils';

//import bitgo from '@bitgo/utxo-lib';

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



export function shouldBehaveLikeVerusTransaction(chain: Chain) {
    describe('Verus Transactions', () => {
        testBatchTransaction(chain);

        //testSignBatchP2SHTransaction(chain);
        testSweepTransaction(chain);

    });
}
