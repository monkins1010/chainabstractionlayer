/// <reference types="node" />
import { AddressType, Transaction } from '@chainify/types';
import { VerusNetwork, Transaction as BitcoinTransaction, UTXO } from './types';
declare const AddressTypes: string[];
declare function calculateFee(numInputs: number, numOutputs: number, feePerByte: number): number;
/**
 * Get compressed pubKey from pubKey.
 * @param pubKey - 65 byte string with prefix, x, y.
 * @returns the compressed pubKey of uncompressed pubKey.
 */
declare function compressPubKey(pubKey: string): string;
type CoinSelectTarget = {
    value: number;
    script?: Buffer;
    id?: string;
};
declare function selectCoins(utxos: UTXO[], targets: CoinSelectTarget[], feePerByte: number, fixedInputs?: UTXO[]): {
    inputs: UTXO[];
    outputs: CoinSelectTarget[];
    fee: number;
    change: CoinSelectTarget;
};
declare function decodeRawTransaction(hex: string, network: VerusNetwork): BitcoinTransaction;
declare function normalizeTransactionObject(tx: BitcoinTransaction, fee: number, block?: {
    number: number;
    hash: string;
}): Transaction<BitcoinTransaction>;
declare function witnessStackToScriptWitness(witness: Buffer[]): Buffer;
declare function getPubKeyHash(address: string, network: VerusNetwork): any;
declare function validateAddress(_address: AddressType, network: VerusNetwork): void;
export { calculateFee, compressPubKey, CoinSelectTarget, selectCoins, decodeRawTransaction, normalizeTransactionObject, witnessStackToScriptWitness, AddressTypes, getPubKeyHash, validateAddress, };
