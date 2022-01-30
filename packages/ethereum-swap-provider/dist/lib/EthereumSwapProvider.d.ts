import { Provider } from '@liquality/provider';
import { SwapProvider, SwapParams, Transaction, Block, ethereum } from '@liquality/types';
export default class EthereumSwapProvider extends Provider implements Partial<SwapProvider> {
    createSwapScript(swapParams: SwapParams): string;
    validateSwapParams(swapParams: SwapParams): void;
    initiateSwap(swapParams: SwapParams, gasPrice: number): Promise<Transaction<any>>;
    fundSwap(): Promise<null>;
    claimSwap(swapParams: SwapParams, initiationTxHash: string, secret: string, gasPrice: number): Promise<Transaction<any>>;
    refundSwap(swapParams: SwapParams, initiationTxHash: string, gasPrice: number): Promise<Transaction<any>>;
    doesTransactionMatchInitiation(swapParams: SwapParams, transaction: Transaction<ethereum.Transaction>): boolean;
    doesTransactionMatchClaim(transaction: Transaction<ethereum.Transaction>, initiationTransactionReceipt: ethereum.TransactionReceipt): boolean;
    verifyInitiateSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<boolean>;
    findSwapTransaction(blockNumber: number, predicate: (tx: Transaction<any>, block: Block) => boolean): Promise<Transaction<ethereum.Transaction>>;
    findInitiateSwapTransaction(swapParams: SwapParams, blockNumber: number): Promise<Transaction<ethereum.Transaction>>;
    findClaimSwapTransaction(swapParams: SwapParams, initiationTxHash: string, blockNumber: number): Promise<Transaction<ethereum.Transaction>>;
    findFundSwapTransaction(): Promise<null>;
    getSwapSecret(claimTxHash: string): Promise<string>;
    findRefundSwapTransaction(swapParams: SwapParams, initiationTxHash: string, blockNumber: number): Promise<Transaction<ethereum.Transaction>>;
}
