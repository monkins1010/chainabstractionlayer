import * as VRSC from '@chainify/verus';
import { Client } from '@chainify/client';
import { VerusNodeConfig } from './config';

function getVerusClientWithNodeWallet(network: VRSC.VerusTypes.VerusNetwork) {
    const config = VerusNodeConfig(network);
    const chainProvider = new VRSC.VerusJsonRpcProvider(config.chainOptions as any);
    const walletProvider = new VRSC.VerusNodeWalletProvider(null, chainProvider);
    const swapProvider = new VRSC.VerusSwapRpcProvider({ network }, walletProvider);
    return new Client(chainProvider, walletProvider, swapProvider);
}

export const VerusNodeWalletClient = getVerusClientWithNodeWallet(VRSC.VerusNetworks.verus_testnet);
