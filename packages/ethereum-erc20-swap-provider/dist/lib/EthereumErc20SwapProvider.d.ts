import { Provider } from '@liquality/provider';
import { SwapProvider, SwapParams, Transaction, BigNumber, ethereum } from '@liquality/types';
export default class EthereumErc20SwapProvider extends Provider implements Partial<SwapProvider> {
    static SOL_CLAIM_FUNCTION: string;
    static SOL_REFUND_FUNCTION: string;
    createSwapScript(swapParams: SwapParams): string;
    validateSwapParams(swapParams: SwapParams): void;
    initiateSwap(swapParams: SwapParams, gasPrice: number): Promise<Transaction<any>>;
    fundSwap(swapParams: SwapParams, initiationTxHash: string, gasPrice: number): Promise<Transaction<any>>;
    claimSwap(swapParams: SwapParams, initiationTxHash: string, secret: string, gasPrice: number): Promise<Transaction<any>>;
    refundSwap(swapParams: SwapParams, initiationTxHash: string, gasPrice: number): Promise<Transaction<any>>;
    doesTransactionMatchInitiation(swapParams: SwapParams, transaction: Transaction<ethereum.Transaction>): boolean;
    doesTransactionMatchClaim(swapParams: SwapParams, transaction: Transaction<ethereum.Transaction>, initiationTransactionReceipt: ethereum.TransactionReceipt): boolean;
    doesTransactionMatchFunding(transaction: Transaction<ethereum.Transaction>, erc20TokenContractAddress: string, contractData: string): boolean;
    doesBalanceMatchValue(contractAddress: string, value: BigNumber): Promise<boolean>;
    getSwapSecret(claimTxHash: string): Promise<string>;
    verifyInitiateSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<boolean>;
    findInitiateSwapTransaction(swapParams: SwapParams, blockNumber: number): Promise<Transaction<ethereum.Transaction>>;
    findFundSwapTransaction(swapParams: SwapParams, initiationTxHash: string, blockNumber: number): Promise<Transaction<ethereum.Transaction>>;
    findClaimSwapTransaction(swapParams: SwapParams, initiationTxHash: string, blockNumber: number): Promise<Transaction<ethereum.Transaction>>;
    findRefundSwapTransaction(swapParams: SwapParams, initiationTxHash: string, blockNumber: number): Promise<Transaction<ethereum.Transaction>>;
}
