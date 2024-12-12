import { assign } from 'lodash';
import { shouldBehaveLikeChainProvider } from '../../chain/chain.test';
import { Chains } from '../../common';
import { shouldBehaveLikeWalletProvider } from '../../wallet/wallet.test';
import { shouldBehaveLikeVerusTransaction } from './behaviors/transactions.behavior';
import { shouldBehaveLikeVerusWallet } from './behaviors/wallet.behavior';
import { sleep } from '@chainify/utils';


async function checkBlockHeight(client: any, maxAttempts = 15): Promise<number> {
    for (let i = 0; i < maxAttempts; i++) {
        const height = await client.chain.getBlockHeight();
        if (height > 0) return height;
        await sleep(5000);
    }
    throw new Error('Block height remained at 0 after multiple attempts');
}

export function shouldBehaveLikeVerusClient() {
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
        shouldBehaveLikeVerusWallet(Chains.verus.node);
    });

}
