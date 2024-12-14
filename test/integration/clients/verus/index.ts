import { assign } from 'lodash';
import { shouldBehaveLikeChainProvider } from '../../chain/chain.test';
import { Chains, fundAddress } from '../../common';
import { shouldBehaveLikeWalletProvider } from '../../wallet/wallet.test';
import { shouldBehaveLikeVerusTransaction } from './behaviors/transactions.behavior';
import { shouldBehaveLikeVerusWallet } from './behaviors/wallet.behavior';
import { sleep } from '@chainify/utils';
import { importVerusAddresses } from './utils';

async function checkBlockHeight(client: any, maxAttempts = 15): Promise<number> {
    for (let i = 0; i < maxAttempts; i++) {
        try {
            const height = await client.chain.getBlockHeight();
            if (height > 0) return height;
            await sleep(5000);
        }
        catch (e) {
            console.log(e);
            await sleep(5000);
        }
    }
    throw new Error('Block height remained at 0 after multiple attempts');
}



export function shouldBehaveLikeVerusClient() {
    if (false) { // eslint-disable-line
        describe('Verus Client - Node Wallet', () => {
            before(async () => {

                const { client, config } = Chains.verus.node;
                const address = await client.wallet.getAddress();
                const recipientAddress = await client.wallet.getUnusedAddress();
                const privateKey = await client.chain.sendRpcRequest('dumpprivkey', [address.toString()]);

                Chains.verus.node.config = assign(Chains.verus.node.config, {
                    recipientAddress: recipientAddress.toString(),
                    walletExpectedResult: { ...config.walletExpectedResult, privateKey },
                });
                await checkBlockHeight(client);
            });
            shouldBehaveLikeChainProvider(Chains.verus.node);
            shouldBehaveLikeWalletProvider(Chains.verus.node);
            shouldBehaveLikeVerusTransaction(Chains.verus.node);

        });
    }
    describe('Verus Client - HD Wallet', () => {
        before(async () => {
            const { config } = Chains.verus.hd;
            await importVerusAddresses(Chains.verus.hd);
            await fundAddress(Chains.verus.node, config.walletExpectedResult.address);

        });
        shouldBehaveLikeChainProvider(Chains.verus.hd);
        shouldBehaveLikeWalletProvider(Chains.verus.hd);
        shouldBehaveLikeVerusWallet(Chains.verus.hd);
        shouldBehaveLikeVerusTransaction(Chains.verus.hd);
    });

}
