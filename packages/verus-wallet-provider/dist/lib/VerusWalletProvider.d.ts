/// <reference types="node" />
import { CoinSelectTarget } from '@liquality/verus-utils';
import { VerusNetwork } from '@liquality/verus-networks';
import { verus, Transaction, Address, SendOptions } from '@liquality/types';
import { Provider } from '@liquality/provider';
import { BIP32Interface } from 'bitcoinjs-lib';
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
    _network: VerusNetwork;
    _addressType: verus.AddressType;
    _derivationCache: DerivationCache;
    baseDerivationNode(): Promise<BIP32Interface>;
    _buildTransaction(targets: verus.OutputTarget[], feePerByte?: number, fixedInputs?: verus.Input[]): Promise<{
        hex: string;
        fee: number;
    }>;
    _buildSweepTransaction(externalChangeAddress: string, feePerByte?: number): Promise<{
        hex: string;
        fee: number;
    }>;
    signPSBT(data: string, inputs: verus.PsbtInputTarget[]): Promise<string>;
    signBatchP2SHTransaction(inputs: [{
        inputTxHex: string;
        index: number;
        vout: any;
        outputScript: Buffer;
    }], addresses: string, tx: any, lockTime?: number, segwit?: boolean): Promise<Buffer[]>;
    getDerivationCache(): DerivationCache;
    sendOptionsToOutputs(transactions: SendOptions[]): verus.OutputTarget[];
    setDerivationCache(derivationCache: DerivationCache): Promise<void>;
    buildTransaction(output: verus.OutputTarget, feePerByte: number): Promise<{
        hex: string;
        fee: number;
    }>;
    buildBatchTransaction(outputs: verus.OutputTarget[]): Promise<{
        hex: string;
        fee: number;
    }>;
    _sendTransaction(transactions: verus.OutputTarget[], feePerByte?: number): Promise<Transaction<verus.Transaction>>;
    sendTransaction(options: SendOptions): Promise<Transaction<verus.Transaction>>;
    sendBatchTransaction(transactions: SendOptions[]): Promise<Transaction<verus.Transaction>>;
    buildSweepTransaction(externalChangeAddress: string, feePerByte: number): Promise<{
        hex: string;
        fee: number;
    }>;
    sendSweepTransaction(externalChangeAddress: Address | string, feePerByte: number): Promise<Transaction<verus.Transaction>>;
    updateTransactionFee(tx: Transaction<verus.Transaction> | string, newFeePerByte: number): Promise<Transaction<verus.Transaction>>;
    findAddress(addresses: string[], change?: boolean): Promise<Address>;
    getWalletAddress(address: string): Promise<Address>;
    getAddressFromPublicKey(publicKey: Buffer): any;
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
    getInputsForAmount(_targets: verus.OutputTarget[], feePerByte?: number, fixedInputs?: verus.Input[], numAddressPerCall?: number, sweep?: boolean): Promise<{
        inputs: verus.UTXO[];
        change: CoinSelectTarget;
        outputs: CoinSelectTarget[];
        fee: number;
    }>;
    client: import("@liquality/types").IClient;
    setClient(client: import("@liquality/types").IClient): void;
    getMethod(method: string, requestor?: any): any;
}) & T;
export default _default;
