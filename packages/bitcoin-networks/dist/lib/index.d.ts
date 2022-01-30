import { Network as BitcoinJsLibNetwork } from 'bitcoinjs-lib';
import { Network } from '@liquality/types';
export interface BitcoinNetwork extends Network, BitcoinJsLibNetwork {
}
declare const BitcoinNetworks: {
    bitcoin: BitcoinNetwork;
    bitcoin_testnet: BitcoinNetwork;
    bitcoin_regtest: BitcoinNetwork;
};
export { BitcoinNetworks };
