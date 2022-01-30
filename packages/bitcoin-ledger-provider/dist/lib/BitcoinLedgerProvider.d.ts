/// <reference types="node" />
import { LedgerProvider } from '@liquality/ledger-provider';
import { BitcoinNetwork } from '@liquality/bitcoin-networks';
import { bitcoin } from '@liquality/types';
import HwAppBitcoin from '@ledgerhq/hw-app-btc';
import { BIP32Interface } from 'bip32';
declare type WalletProviderConstructor<T = LedgerProvider<HwAppBitcoin>> = new (...args: any[]) => T;
interface BitcoinLedgerProviderOptions {
    network: BitcoinNetwork;
    Transport: any;
    baseDerivationPath: string;
    addressType?: bitcoin.AddressType;
}
declare const BitcoinLedgerProvider_base: (abstract new (...args: any[]) => {
    _baseDerivationPath: string;
    _network: BitcoinNetwork;
    _addressType: bitcoin.AddressType;
    _derivationCache: {
        [index: string]: import("@liquality/types").Address;
    };
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
    getDerivationCache(): {
        [index: string]: import("@liquality/types").Address;
    };
    sendOptionsToOutputs(transactions: import("@liquality/types").SendOptions[]): bitcoin.OutputTarget[];
    setDerivationCache(derivationCache: {
        [index: string]: import("@liquality/types").Address;
    }): Promise<void>;
    buildTransaction(output: bitcoin.OutputTarget, feePerByte: number): Promise<{
        hex: string;
        fee: number;
    }>;
    buildBatchTransaction(outputs: bitcoin.OutputTarget[]): Promise<{
        hex: string;
        fee: number;
    }>;
    _sendTransaction(transactions: bitcoin.OutputTarget[], feePerByte?: number): Promise<import("@liquality/types").Transaction<bitcoin.Transaction>>;
    sendTransaction(options: import("@liquality/types").SendOptions): Promise<import("@liquality/types").Transaction<bitcoin.Transaction>>;
    sendBatchTransaction(transactions: import("@liquality/types").SendOptions[]): Promise<import("@liquality/types").Transaction<bitcoin.Transaction>>;
    buildSweepTransaction(externalChangeAddress: string, feePerByte: number): Promise<{
        hex: string;
        fee: number;
    }>;
    sendSweepTransaction(externalChangeAddress: string | import("@liquality/types").Address, feePerByte: number): Promise<import("@liquality/types").Transaction<bitcoin.Transaction>>;
    updateTransactionFee(tx: string | import("@liquality/types").Transaction<bitcoin.Transaction>, newFeePerByte: number): Promise<import("@liquality/types").Transaction<bitcoin.Transaction>>;
    findAddress(addresses: string[], change?: boolean): Promise<import("@liquality/types").Address>;
    getWalletAddress(address: string): Promise<import("@liquality/types").Address>;
    getAddressFromPublicKey(publicKey: Buffer): string;
    getPaymentVariantFromPublicKey(publicKey: Buffer): import("bitcoinjs-lib").Payment;
    importAddresses(): Promise<void>;
    getDerivationPathAddress(path: string): Promise<import("@liquality/types").Address>;
    getAddresses(startingIndex?: number, numAddresses?: number, change?: boolean): Promise<import("@liquality/types").Address[]>;
    _getUsedUnusedAddresses(numAddressPerCall: number, addressType: import("@liquality/bitcoin-wallet-provider/dist/lib/BitcoinWalletProvider").AddressSearchType): Promise<{
        usedAddresses: import("@liquality/types").Address[];
        unusedAddress: {
            change: import("@liquality/types").Address;
            external: import("@liquality/types").Address;
        };
    }>;
    getUsedAddresses(numAddressPerCall?: number): Promise<import("@liquality/types").Address[]>;
    getUnusedAddress(change?: boolean, numAddressPerCall?: number): Promise<import("@liquality/types").Address>;
    withCachedUtxos(func: () => any): Promise<any>;
    getTotalFee(opts: import("@liquality/types").SendOptions, max: boolean): Promise<number>;
    getTotalFees(transactions: import("@liquality/types").SendOptions[], max: boolean): Promise<any>;
    getInputsForAmount(_targets: bitcoin.OutputTarget[], feePerByte?: number, fixedInputs?: bitcoin.Input[], numAddressPerCall?: number, sweep?: boolean): Promise<{
        inputs: bitcoin.UTXO[];
        change: import("@liquality/bitcoin-utils").CoinSelectTarget;
        outputs: import("@liquality/bitcoin-utils").CoinSelectTarget[];
        fee: number;
    }>;
    client: import("@liquality/types").IClient;
    setClient(client: import("@liquality/types").IClient): void;
    getMethod(method: string, requestor?: any): any;
}) & WalletProviderConstructor<LedgerProvider<HwAppBitcoin>>;
export default class BitcoinLedgerProvider extends BitcoinLedgerProvider_base {
    _walletPublicKeyCache: {
        [index: string]: any;
    };
    _baseDerivationNode: BIP32Interface;
    constructor(options: BitcoinLedgerProviderOptions);
    signMessage(message: string, from: string): Promise<string>;
    _buildTransaction(targets: bitcoin.OutputTarget[], feePerByte?: number, fixedInputs?: bitcoin.Input[]): Promise<{
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
    getAmountBuffer(amount: number): Buffer;
    getLedgerInputs(unspentOutputs: {
        txid: string;
        vout: number;
    }[]): Promise<(number | HwAppBitcoin.Transaction)[][]>;
    _getWalletPublicKey(path: string): Promise<{
        publicKey: string;
        bitcoinAddress: string;
        chainCode: string;
    }>;
    getWalletPublicKey(path: string): Promise<any>;
    baseDerivationNode(): Promise<BIP32Interface>;
    getConnectedNetwork(): Promise<BitcoinNetwork>;
}
export {};
