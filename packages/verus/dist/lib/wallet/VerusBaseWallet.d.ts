/// <reference types="node" />
import { Chain, Wallet } from '@chainify/client';
import { CoinSelectTarget } from '../utils';
import { AddressType as VerusAddressType, VerusNetwork, VerusWalletProviderOptions, Input, OutputTarget, PsbtInputTarget, Transaction as VerusTransaction, UTXO } from '../types';
import { Transaction, Address, TransactionRequest, AddressType, Asset } from '@chainify/types';
import { VerusBaseChainProvider } from '../chain/VerusBaseChainProvider';
import { BIP32Interface } from 'bitcoinjs-lib';
export declare enum AddressSearchType {
    EXTERNAL = 0,
    CHANGE = 1,
    EXTERNAL_OR_CHANGE = 2
}
type DerivationCache = {
    [index: string]: Address;
};
export declare abstract class VerusBaseWalletProvider<T extends VerusBaseChainProvider = any, S = any> extends Wallet<T, S> {
    protected _baseDerivationPath: string;
    protected _network: VerusNetwork;
    protected _addressType: VerusAddressType;
    protected _derivationCache: DerivationCache;
    constructor(options: VerusWalletProviderOptions, chainProvider?: Chain<T>);
    protected onChainProviderUpdate(chainProvider: Chain<T>): void;
    protected abstract baseDerivationNode(): Promise<BIP32Interface>;
    protected abstract buildTransaction(targets: OutputTarget[], feePerByte?: number, fixedInputs?: Input[]): Promise<{
        hex: string;
        fee: number;
    }>;
    protected abstract buildSweepTransaction(externalChangeAddress: string, feePerByte?: number): Promise<{
        hex: string;
        fee: number;
    }>;
    abstract signPSBT(data: string, inputs: PsbtInputTarget[]): Promise<string>;
    abstract signBatchP2SHTransaction(inputs: [{
        inputTxHex: string;
        index: number;
        vout: any;
        outputScript: Buffer;
    }], addresses: string, tx: any, lockTime?: number, segwit?: boolean): Promise<Buffer[]>;
    getDerivationCache(): DerivationCache;
    sendOptionsToOutputs(transactions: TransactionRequest[]): OutputTarget[];
    setDerivationCache(derivationCache: DerivationCache): Promise<void>;
    protected _sendTransaction(transactions: OutputTarget[], feePerByte?: number): Promise<Transaction<VerusTransaction>>;
    sendTransaction(options: TransactionRequest): Promise<Transaction<VerusTransaction>>;
    sendBatchTransaction(transactions: TransactionRequest[]): Promise<Transaction<VerusTransaction>[]>;
    sendSweepTransaction(externalChangeAddress: AddressType, _asset: Asset, feePerByte: number): Promise<Transaction<VerusTransaction>>;
    updateTransactionFee(tx: Transaction<VerusTransaction> | string, newFeePerByte: number): Promise<Transaction<VerusTransaction>>;
    findAddress(addresses: string[], change?: boolean): Promise<Address>;
    getWalletAddress(address: string): Promise<Address>;
    getAddressFromPublicKey(publicKey: Buffer): any;
    protected getDerivationPathAddress(path: string): Promise<Address>;
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
    protected withCachedUtxos(func: () => any): Promise<any>;
    getTotalFee(opts: TransactionRequest, max: boolean): Promise<number>;
    getTotalFees(transactions: TransactionRequest[], max: boolean): Promise<any>;
    getInputsForAmount(_targets: OutputTarget[], feePerByte?: number, fixedInputs?: Input[], numAddressPerCall?: number, sweep?: boolean): Promise<{
        inputs: UTXO[];
        change: CoinSelectTarget;
        outputs: CoinSelectTarget[];
        fee: number;
    }>;
}
export {};
