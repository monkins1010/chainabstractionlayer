/// <reference types="node" />
import { WalletProvider } from '@liquality/wallet-provider';
import { VerusNetwork } from '@liquality/verus-networks';
import { verus } from '@liquality/types';
import { ECPairInterface } from 'bitcoinjs-lib';
import { BIP32Interface } from 'bip32';
declare type WalletProviderConstructor<T = WalletProvider> = new (...args: any[]) => T;
interface VerusJsWalletProviderOptions {
    network: VerusNetwork;
    mnemonic: string;
    baseDerivationPath: string;
    addressType?: verus.AddressType;
}
declare const VerusJsWalletProvider_base;
export default class VerusJsWalletProvider extends VerusJsWalletProvider_base {
    _mnemonic: string;
    _seedNode: BIP32Interface;
    _baseDerivationNode: BIP32Interface;
    constructor(options: VerusJsWalletProviderOptions);
    seedNode(): Promise<BIP32Interface>;
    baseDerivationNode(): Promise<BIP32Interface>;
    keyPair(derivationPath: string): Promise<ECPairInterface>;
    private _toWIF;
    exportPrivateKey(): Promise<string>;
    signMessage(message: string, from: string): Promise<string>;
    canUpdateFee(): boolean;
    _buildTransaction(targets: verus.OutputTarget[], feePerByte?: number, fixedInputs?: verus.Input[]): Promise<{
        hex: any;
        fee: number;
    }>;
    _buildSweepTransaction(externalChangeAddress: string, feePerByte: number): Promise<{
        hex: any;
        fee: number;
    }>;
    signBatchP2SHTransaction(inputs: [{
        inputTxHex: string;
        index: number;
        vout: any;
        outputScript: Buffer;
        txInputIndex?: number;
    }], addresses: string, tx: any, lockTime?: number, segwit?: boolean): Promise<Buffer[]>;
    getScriptType(): "p2pkh" | "p2sh-p2wpkh" | "p2wpkh";
    getConnectedNetwork(): Promise<VerusNetwork & import("@liquality/types").Network>;
    isWalletAvailable(): Promise<boolean>;
}
export {};
