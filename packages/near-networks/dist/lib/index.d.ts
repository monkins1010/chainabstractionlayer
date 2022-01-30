import { Network } from '@liquality/types';
export interface NearNetwork extends Network {
    networkId: string;
    nodeUrl: string;
    helperUrl: string;
}
declare const NearNetworks: {
    near_mainnet: NearNetwork;
    near_testnet: NearNetwork;
};
export { NearNetworks };
