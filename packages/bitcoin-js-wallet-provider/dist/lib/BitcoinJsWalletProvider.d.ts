/// <reference types="node" />
import { WalletProvider } from '@liquality/wallet-provider';
import { BitcoinNetwork } from '@liquality/bitcoin-networks';
import { bitcoin } from '@liquality/types';
import { ECPairInterface } from 'bitcoinjs-lib';
import { BIP32Interface } from 'bip32';
declare type WalletProviderConstructor<T = WalletProvider> = new (...args: any[]) => T;
interface BitcoinJsWalletProviderOptions {
    network: BitcoinNetwork;
    mnemonic: string;
    baseDerivationPath: string;
    addressType?: bitcoin.AddressType;
}
declare const BitcoinJsWalletProvider_base;
export default class BitcoinJsWalletProvider extends BitcoinJsWalletProvider_base {
    _mnemonic: string;
    _seedNode: BIP32Interface;
    _baseDerivationNode: BIP32Interface;
    constructor(options: BitcoinJsWalletProviderOptions);
    seedNode(): Promise<BIP32Interface>;
    baseDerivationNode(): Promise<BIP32Interface>;
    keyPair(derivationPath: string): Promise<ECPairInterface>;
    private _toWIF;
    exportPrivateKey(): Promise<string>;
    signMessage(message: string, from: string): Promise<string>;
    _buildTransaction(targets: bitcoin.OutputTarget[], feePerByte?: number, fixedInputs?: bitcoin.Input[]): Promise<{
        hex: string;
        fee: number;
    }>;
    _buildSweepTransaction(externalChangeAddress: string, feePerByte: number): Promise<{
        hex: string;
        fee: number;
    }>;
    signPSBT(data: string, inputs: bitcoin.PsbtInputTarget[]): Promise<string>;
    signBatchP2SHTransaction(inputs: [{
        inputTxHex: string;
        index: number;
        vout: any;
        outputScript: Buffer;
        txInputIndex?: number;
    }], addresses: string, tx: any, lockTime?: number, segwit?: boolean): Promise<Buffer[]>;
    getScriptType(): "p2pkh" | "p2sh-p2wpkh" | "p2wpkh";
    getConnectedNetwork(): Promise<BitcoinNetwork & import("@liquality/types").Network>;
    isWalletAvailable(): Promise<boolean>;
}
export {};
