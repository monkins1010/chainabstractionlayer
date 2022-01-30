import { NodeProvider } from '@liquality/node-provider';
import { SwapProvider, SwapParams, Transaction } from '@liquality/types';
import * as scraper from './types';
export default class EthereumScraperSwapFindProvider extends NodeProvider implements Partial<SwapProvider> {
    constructor(url: string);
    normalizeTransactionResponse(tx: any): Transaction<scraper.Transaction>;
    ensureFeeInfo(tx: Transaction<scraper.Transaction>): Promise<Transaction<scraper.Transaction>>;
    findAddressTransaction(address: string, predicate: (tx: Transaction<scraper.Transaction>) => boolean, fromBlock?: number, toBlock?: number, limit?: number, sort?: string): Promise<Transaction<scraper.Transaction>>;
    findAddressEvent(type: string, contractAddress: string): Promise<Transaction<scraper.Transaction>>;
    findInitiateSwapTransaction(swapParams: SwapParams): Promise<Transaction<scraper.Transaction>>;
    validateSwapParams(swapParams: SwapParams): void;
    findClaimSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<Transaction<scraper.Transaction>>;
    findRefundSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<Transaction<scraper.Transaction>>;
    doesBlockScan(): boolean;
}
