import { near, SwapParams, SwapProvider, Transaction } from '@liquality/types';
import { NodeProvider } from '@liquality/node-provider';
export default class NearSwapFindProvider extends NodeProvider implements Partial<SwapProvider> {
    constructor(url: string);
    normalizeTransactionResponse(tx: near.NearScraperSwap): near.NearSwapTransaction;
    findAddressTransaction(address: string, predicate: (tx: near.NearSwapTransaction) => boolean, limit?: number): Promise<Transaction<near.NearSwapTransaction>>;
    findInitiateSwapTransaction(swapParams: SwapParams): Promise<Transaction<near.NearSwapTransaction>>;
    findClaimSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<Transaction<near.NearSwapTransaction>>;
    findRefundSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<Transaction<near.NearSwapTransaction>>;
    getCurrentTimeInNs(): number;
    doesBlockScan(): boolean;
}
