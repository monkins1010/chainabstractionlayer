import * as VRSC from '@chainify/verus';
import { Client } from '@chainify/client';
import { VerusNodeConfig, VerusHdWalletConfig } from './config';

function getVerusClientWithNodeWallet(network: VRSC.VerusTypes.VerusNetwork) {
    const config = VerusNodeConfig(network);
    const chainProvider = new VRSC.VerusJsonRpcProvider(config.chainOptions as any);
    const walletProvider = new VRSC.VerusNodeWalletProvider(null, chainProvider);
    return new Client(chainProvider, walletProvider);
}

function getBtcClientWithHDWallet(network: VRSC.VerusTypes.VerusNetwork) {
    const config = VerusHdWalletConfig(network);
    const chainProvider = new VRSC.VerusJsonRpcProvider(config.chainOptions as any);
    const walletProvider = new VRSC.VerusHDWalletProvider(config.walletOptions as any, chainProvider);
    return new Client(chainProvider, walletProvider);
}

export const VerusNodeWalletClient = getVerusClientWithNodeWallet(VRSC.VerusNetworks.verus_testnet);
export const VerusHDWalletClient = getBtcClientWithHDWallet(VRSC.VerusNetworks.verus_testnet);