/// <reference types="node" />
import { BitcoinNetwork } from '@liquality/bitcoin-networks';
import { Address, Transaction, verus as vT } from '@liquality/types';
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
declare function selectCoins(utxos: vT.UTXO[], targets: CoinSelectTarget[], feePerByte: number, fixedInputs?: vT.UTXO[]): {
    inputs: vT.UTXO[];
    outputs: CoinSelectTarget[];
    fee: number;
    change: CoinSelectTarget;
};
declare function decodeRawTransaction(hex: string, network?: BitcoinNetwork): vT.Transaction;
declare function normalizeTransactionObject(tx: vT.Transaction, fee: number, block?: {
    number: number;
    hash: string;
}): Transaction<vT.Transaction>;
declare function witnessStackToScriptWitness(witness: Buffer[]): Buffer;
declare function getPubKeyHash(address: string, network: BitcoinNetwork): Buffer;
declare function validateAddress(_address: Address | string, network: BitcoinNetwork): void;
export { calculateFee, compressPubKey, getAddressNetwork, CoinSelectTarget, selectCoins, decodeRawTransaction, normalizeTransactionObject, witnessStackToScriptWitness, AddressTypes, getPubKeyHash, validateAddress };
