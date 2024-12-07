import { assign } from 'lodash';
import { shouldBehaveLikeChainProvider } from '../../chain/chain.test';
import { Chains } from '../../common';
import { shouldBehaveLikeSwapProvider } from '../../swap/swap.test';
import { shouldBehaveLikeWalletProvider } from '../../wallet/wallet.test';
import { shouldBehaveLikeVerusTransaction } from './behaviors/transactions.behavior';

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
        });
        shouldBehaveLikeChainProvider(Chains.verus.node);
        shouldBehaveLikeWalletProvider(Chains.verus.node);
        shouldBehaveLikeSwapProvider(Chains.verus.node);
        shouldBehaveLikeVerusTransaction(Chains.verus.node);
    });

}
