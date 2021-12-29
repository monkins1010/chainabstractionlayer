/// <reference types="node" />
import { BitcoinNetwork } from '@liquality/bitcoin-networks';
import { Address, Transaction, bitcoin as bT } from '@liquality/types';
declare const AddressTypes: string[];
declare function calculateFee(numInputs: number, numOutputs: number, feePerByte: number): number;
/**
 * Get compressed pubKey from pubKey.
 * @param {!string} pubKey - 65 byte string with prefix, x, y.
 * @return {string} Returns the compressed pubKey of uncompressed pubKey.
 */
declare function compressPubKey(pubKey: string): string;
/**
 * Get a network object from an address
 * @param {string} address The bitcoin address
 * @return {Network}
 */
declare function getAddressNetwork(address: string): BitcoinNetwork;
declare type CoinSelectTarget = {
    value: number;
    script?: Buffer;
    id?: string;
};
declare function selectCoins(utxos: bT.UTXO[], targets: CoinSelectTarget[], feePerByte: number, fixedInputs?: bT.UTXO[]): {
    inputs: bT.UTXO[];
    outputs: CoinSelectTarget[];
    fee: number;
    change: CoinSelectTarget;
};
declare function decodeRawTransaction(hex: string, network: BitcoinNetwork): bT.Transaction;
declare function normalizeTransactionObject(tx: bT.Transaction, fee: number, block?: {
    number: number;
    hash: string;
}): Transaction<bT.Transaction>;
declare function witnessStackToScriptWitness(witness: Buffer[]): Buffer;
declare function getPubKeyHash(address: string, network: BitcoinNetwork): Buffer;
declare function validateAddress(_address: Address | string, network: BitcoinNetwork): void;
export { calculateFee, compressPubKey, getAddressNetwork, CoinSelectTarget, selectCoins, decodeRawTransaction, normalizeTransactionObject, witnessStackToScriptWitness, AddressTypes, getPubKeyHash, validateAddress };
