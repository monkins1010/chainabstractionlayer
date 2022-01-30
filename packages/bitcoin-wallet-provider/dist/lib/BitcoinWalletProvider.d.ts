/// <reference types="node" />
import { CoinSelectTarget } from '@liquality/bitcoin-utils';
import { BitcoinNetwork } from '@liquality/bitcoin-networks';
import { bitcoin, Transaction, Address, SendOptions } from '@liquality/types';
import { Provider } from '@liquality/provider';
import { BIP32Interface, payments } from 'bitcoinjs-lib';
export declare enum AddressSearchType {
    EXTERNAL = 0,
    CHANGE = 1,
    EXTERNAL_OR_CHANGE = 2
}
declare type DerivationCache = {
    [index: string]: Address;
};
declare type Constructor<T = unknown> = new (...args: any[]) => T;
declare const _default: <T extends Constructor<Provider>>(superclass: T) => (abstract new (...args: any[]) => {
    _baseDerivationPath: string;
    _network: BitcoinNetwork;
    _addressType: bitcoin.AddressType;
    _derivationCache: DerivationCache;
    baseDerivationNode(): Promise<BIP32Interface>;
    _buildTransaction(targets: bitcoin.OutputTarget[], feePerByte?: number, fixedInputs?: bitcoin.Input[]): Promise<{
        hex: string;
        fee: number;
    }>;
    _buildSweepTransaction(externalChangeAddress: string, feePerByte?: number): Promise<{
        hex: string;
        fee: number;
    }>;
    signPSBT(data: string, inputs: bitcoin.PsbtInputTarget[]): Promise<string>;
    signBatchP2SHTransaction(inputs: [{
        inputTxHex: string;
        index: number;
        vout: any;
        outputScript: Buffer;
    }], addresses: string, tx: any, lockTime?: number, segwit?: boolean): Promise<Buffer[]>;
    getDerivationCache(): DerivationCache;
    sendOptionsToOutputs(transactions: SendOptions[]): bitcoin.OutputTarget[];
    setDerivationCache(derivationCache: DerivationCache): Promise<void>;
    buildTransaction(output: bitcoin.OutputTarget, feePerByte: number): Promise<{
        hex: string;
        fee: number;
    }>;
    buildBatchTransaction(outputs: bitcoin.OutputTarget[]): Promise<{
        hex: string;
        fee: number;
    }>;
    _sendTransaction(transactions: bitcoin.OutputTarget[], feePerByte?: number): Promise<Transaction<bitcoin.Transaction>>;
    sendTransaction(options: SendOptions): Promise<Transaction<bitcoin.Transaction>>;
    sendBatchTransaction(transactions: SendOptions[]): Promise<Transaction<bitcoin.Transaction>>;
    buildSweepTransaction(externalChangeAddress: string, feePerByte: number): Promise<{
        hex: string;
        fee: number;
    }>;
    sendSweepTransaction(externalChangeAddress: Address | string, feePerByte: number): Promise<Transaction<bitcoin.Transaction>>;
    updateTransactionFee(tx: Transaction<bitcoin.Transaction> | string, newFeePerByte: number): Promise<Transaction<bitcoin.Transaction>>;
    findAddress(addresses: string[], change?: boolean): Promise<Address>;
    getWalletAddress(address: string): Promise<Address>;
    getAddressFromPublicKey(publicKey: Buffer): string;
    getPaymentVariantFromPublicKey(publicKey: Buffer): payments.Payment;
    importAddresses(): Promise<void>;
    getDerivationPathAddress(path: string): Promise<Address>;
    getAddresses(startingIndex?: number, numAddresses?: number, change?: boolean): Promise<Address[]>;
    _getUsedUnusedAddresses(numAddressPerCall: number, addressType: AddressSearchType): Promise<{
        usedAddresses: Address[];
        unusedAddress: {
            change: Address;
            external: Address;
        };
    }>;
    getUsedAddresses(numAddressPerCall?: number): Promise<Address[]>;
    getUnusedAddress(change?: boolean, numAddressPerCall?: number): Promise<Address>;
    withCachedUtxos(func: () => any): Promise<any>;
    getTotalFee(opts: SendOptions, max: boolean): Promise<number>;
    getTotalFees(transactions: SendOptions[], max: boolean): Promise<any>;
    getInputsForAmount(_targets: bitcoin.OutputTarget[], feePerByte?: number, fixedInputs?: bitcoin.Input[], numAddressPerCall?: number, sweep?: boolean): Promise<{
        inputs: bitcoin.UTXO[];
        change: CoinSelectTarget;
        outputs: CoinSelectTarget[];
        fee: number;
    }>;
    client: import("@liquality/types").IClient;
    setClient(client: import("@liquality/types").IClient): void;
    getMethod(method: string, requestor?: any): any;
}) & T;
export default _default;
