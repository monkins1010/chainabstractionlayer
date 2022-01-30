import { Address, Block, solana, SwapParams, Transaction } from '@liquality/types';
import { ParsedConfirmedTransaction } from '@solana/web3.js';
import { InitData, Template as _Template } from './layouts';
export declare const Template: typeof _Template;
export declare function validateAddress(_address: Address | string): void;
export declare function doesTransactionMatchInitiation(swapParams: SwapParams, transactionParams: InitData): boolean;
export declare function deserialize(data: string): any;
export declare const createRefundBuffer: () => Uint8Array;
export declare const createClaimBuffer: (secret: string) => Uint8Array;
export declare const createInitBuffer: ({ buyer, seller, expiration, secret_hash, value }: InitData) => Uint8Array;
export declare function validateSecret(swapParams: SwapParams, data: {
    secret: string;
}): boolean;
export declare function normalizeTransaction(tx: ParsedConfirmedTransaction, signatureStatus?: any): Transaction<solana.InputTransaction>;
export declare function normalizeBlock(block: solana.SolanaBlock): Block;
export declare function validateSwapParams(swapParams: SwapParams): void;
