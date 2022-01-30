import { ethereum, Transaction, BigNumber, Address } from '@liquality/types';
/**
 * Converts a hex string to the ethereum format
 * @param {*} hash
 */
declare function ensure0x(hash: string): string;
/**
 * Converts an ethereum hex string to the standard format
 * @param {*} hash
 */
declare function remove0x(hash: ethereum.Hex): string;
/**
 * Converts an ethereum hex string to number
 * @param hex
 */
declare function hexToNumber(hex: ethereum.Hex): number;
declare function numberToHex(number: BigNumber | number): string;
declare function checksumEncode(hash: string): any;
declare function ensureBlockFormat(block?: number): string;
declare function normalizeTransactionObject<TxType extends ethereum.PartialTransaction = ethereum.Transaction>(tx: TxType, currentHeight?: number): Transaction<TxType>;
declare function buildTransaction(txOptions: ethereum.UnsignedTransaction): ethereum.TransactionRequest;
declare function validateAddress(_address: Address | string): void;
declare function validateExpiration(expiration: number): void;
export { ensure0x, remove0x, hexToNumber, numberToHex, checksumEncode, normalizeTransactionObject, ensureBlockFormat, buildTransaction, validateAddress, validateExpiration };
