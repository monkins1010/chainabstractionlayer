import { Client } from '@liquality/client';
import * as Verus from '@liquality/verus';
import { VerusNodeConfig } from './config'

function getVerusClientWithNodeWallet(network: Verus.VerusTypes.VerusNetwork) {
    const config = VerusNodeConfig(network);
    const chainProvider = new Verus.VerusJsonRpcProvider(config.chainOptions as any);
    const walletProvider = new Verus.VerusNodeWalletProvider(null, chainProvider);

    return new Client(chainProvider, walletProvider);
}

export const VerusClient = getVerusClientWithNodeWallet(Verus.VerusNetworks.verus_testnet);
