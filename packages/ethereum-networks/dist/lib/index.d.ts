import { Network } from '@liquality/types';
export interface EthereumNetwork extends Network {
    networkId: number;
    chainId: number;
}
declare const EthereumNetworks: {
    ethereum_mainnet: EthereumNetwork;
    classic_mainnet: EthereumNetwork;
    ropsten: EthereumNetwork;
    rinkeby: EthereumNetwork;
    kovan: EthereumNetwork;
    goerli: EthereumNetwork;
    rsk_mainnet: EthereumNetwork;
    rsk_testnet: EthereumNetwork;
    rsk_regtest: EthereumNetwork;
    bsc_mainnet: EthereumNetwork;
    bsc_testnet: EthereumNetwork;
    polygon_mainnet: EthereumNetwork;
    polygon_testnet: EthereumNetwork;
    arbitrum_testnet: EthereumNetwork;
    arbitrum_mainnet: EthereumNetwork;
    fuse_testnet: EthereumNetwork;
    fuse_mainnet: EthereumNetwork;
    local: EthereumNetwork;
};
export { EthereumNetworks };
