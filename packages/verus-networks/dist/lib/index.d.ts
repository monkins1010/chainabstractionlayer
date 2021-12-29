import { Network as VerusJsLibNetwork } from 'bitcoinjs-lib';
import { Network } from '@liquality/types';
export interface VerusNetwork extends Network, VerusJsLibNetwork {
}
declare const VerusNetworks: {
    verus: VerusNetwork;
    verus_testnet: VerusNetwork;
};
export { VerusNetworks };
