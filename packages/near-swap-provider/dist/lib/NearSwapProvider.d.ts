import { SwapProvider, SwapParams, near, Transaction } from '@liquality/types';
import { Provider } from '@liquality/provider';
export default class NearSwapProvider extends Provider implements Partial<SwapProvider> {
    createSwapScript(): number[];
    initiateSwap(swapParams: SwapParams): Promise<Transaction<near.InputTransaction>>;
    claimSwap(swapParams: SwapParams, initiationTxHash: string, secret: string): Promise<Transaction<near.InputTransaction>>;
    refundSwap(swapParams: SwapParams, initiationTxHash: string): Promise<Transaction<near.InputTransaction>>;
    fundSwap(): Promise<null>;
    findFundSwapTransaction(): Promise<null>;
    doesTransactionMatchInitiation(swapParams: SwapParams, transaction: near.NearSwapTransaction): boolean;
    verifyInitiateSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<boolean>;
    getSwapSecret(claimTxHash: string): Promise<string>;
    generateUniqueString(name: string): string;
}
