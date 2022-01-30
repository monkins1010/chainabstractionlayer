import { Block, SwapParams, Transaction, terra } from '@liquality/types';
export declare const normalizeBlock: (data: any) => Block;
export declare const normalizeTransaction: (data: any, asset: string, currentBlock?: number) => Transaction<terra.InputTransaction>;
export declare const doesTransactionMatchInitiation: (swapParams: SwapParams, transactionParams: any) => boolean;
export declare const validateSwapParams: (swapParams: SwapParams) => void;
