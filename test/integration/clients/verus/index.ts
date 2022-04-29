import { Client } from '@liquality/client';
import { VerusTypes, VerusNodeWalletProvider } from '@liquality/verus';
import { shouldBehaveLikeChainProvider } from '../../chain/chain.test';
import { Chains } from '../../common';
import { shouldBehaveLikeWalletProvider } from '../../wallet/wallet.test';

export function shouldBehaveLikeVerusClient() {
    before('Send funds to Near sender', async () => {
        const { client, config } = Chains.near.hd;
        const tempClient = new Client(
            client.chain,
            new VerusNodeWalletProvider(
                {
                    ...(config.walletOptions as VerusTypes.VerusNodeWalletOptions)
                },
                client.chain
            )
        );

        const nearBalance = (await tempClient.wallet.getBalance(config.assets))[0];
        if (nearBalance.gt(config.swapParams.value)) {
            await tempClient.wallet.sendTransaction({
                to: await client.wallet.getAddress(),
                value: nearBalance.minus(config.swapParams.value),
            });
        }
    });

    describe('Near Client - HD Wallet', () => {
        const chain = Chains.near.hd;
        shouldBehaveLikeChainProvider(chain);
        shouldBehaveLikeWalletProvider(chain);
    });
}
