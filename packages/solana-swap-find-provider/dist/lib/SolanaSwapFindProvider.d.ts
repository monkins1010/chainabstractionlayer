import { SwapParams, SwapProvider, Transaction } from '@liquality/types';
import { Provider } from '@liquality/provider';
import { SolanaNetwork } from '@liquality/solana-networks';
export default class SolanaSwapFindProvider extends Provider implements Partial<SwapProvider> {
    private _network;
    private instructions;
    constructor(network: SolanaNetwork);
    findInitiateSwapTransaction(swapParams: SwapParams): Promise<Transaction>;
    findClaimSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<Transaction>;
    findRefundSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<Transaction>;
    findFundSwapTransaction(): Promise<null>;
    _batchSignatures(addressHistory: [{
        signature: string;
    }]): string[][];
    _findTransactionByAddress({ address, swapParams, instruction, validation }: {
        address: string;
        swapParams: SwapParams;
        instruction: number;
        validation?: (swapParams: SwapParams, transactionData: any | {
            secret: string;
        }) => boolean;
    }): Promise<Transaction>;
}
