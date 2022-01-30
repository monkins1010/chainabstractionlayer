import { Network } from '@liquality/types';
export interface SolanaNetwork extends Network {
    nodeUrl: string;
    helperUrl: string;
    walletIndex: number;
    programId: string;
}
declare const SolanaNetworks: {
    solana_mainnet: SolanaNetwork;
    solana_testnet: SolanaNetwork;
};
export { SolanaNetworks };
