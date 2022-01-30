import { Network } from '@liquality/types';
export interface TerraNetwork extends Network {
    networkId: string;
    nodeUrl: string;
    helperUrl: string;
    gasPricesUrl: string;
    chainID: string;
    codeId: number;
}
declare const TerraNetworks: {
    terra_mainnet: TerraNetwork;
    terra_testnet: TerraNetwork;
};
export { TerraNetworks };
