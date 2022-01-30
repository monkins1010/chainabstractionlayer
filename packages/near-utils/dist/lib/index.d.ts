/// <reference types="node" />
import { near, SwapParams, Transaction, Address } from '@liquality/types';
import BN from 'bn.js';
export { validateSecret, validateSecretAndHash } from '@liquality/utils';
export { transactions, Account, InMemorySigner, providers, KeyPair, keyStores } from 'near-api-js';
export { BN };
export declare function validateSwapParams(swapParams: SwapParams): void;
export declare function validateAddress(_address: Address | string): void;
declare function toBase64(str: string, encoding?: BufferEncoding): string;
declare function fromBase64(str: string, encoding?: BufferEncoding): any;
declare function toNearTimestampFormat(ts: number): number;
declare function fromNearTimestamp(ts: number): number;
declare function normalizeTransactionObject(tx: near.InputTransaction, currentHeight?: number): Transaction<near.InputTransaction>;
declare function parseReceipt(_tx: near.InputTransaction): near.NearSwapTransaction;
export { toBase64, fromBase64, normalizeTransactionObject, parseReceipt, toNearTimestampFormat, fromNearTimestamp };
