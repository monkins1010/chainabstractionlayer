/// <reference types="node" />
import { Chain } from '@chainify/client';
import { AddressType, Asset, BigNumber } from '@chainify/types';
import { BIP32Interface } from 'bip32';
import { VerusBaseChainProvider } from '../chain/VerusBaseChainProvider';
import { VerusHDWalletProviderOptions, Input, OutputTarget, PsbtInputTarget } from '../types';
import { VerusBaseWalletProvider } from './VerusBaseWallet';
import { IVerusWallet } from './IVerusWallet';
export declare class VerusHDWalletProvider extends VerusBaseWalletProvider implements IVerusWallet<VerusBaseChainProvider> {
    private _mnemonic;
    private _seedNode;
    private _baseDerivationNode;
    constructor(options: VerusHDWalletProviderOptions, chainProvider?: Chain<VerusBaseChainProvider>);
    canUpdateFee(): boolean;
    getSigner(): Promise<null>;
    getAddress(): Promise<AddressType>;
    getBalance(_assets: Asset[]): Promise<BigNumber[]>;
    signMessage(message: string, from: AddressType): Promise<any>;
    exportPrivateKey(): Promise<string>;
    getConnectedNetwork(): Promise<import("../types").VerusNetwork>;
    isWalletAvailable(): Promise<boolean>;
    protected baseDerivationNode(): Promise<BIP32Interface>;
    protected buildTransaction(targets: OutputTarget[], feePerByte?: number, fixedInputs?: Input[]): Promise<{
        hex: any;
        fee: number;
    }>;
    protected buildSweepTransaction(externalChangeAddress: string, feePerByte: number): Promise<{
        hex: any;
        fee: number;
    }>;
    signPSBT(data: string, inputs: PsbtInputTarget[]): Promise<string>;
    signBatchP2SHTransaction(inputs: [{
        inputTxHex: string;
        index: number;
        vout: any;
        outputScript: Buffer;
        txInputIndex?: number;
    }], addresses: string, tx: any, lockTime?: number, segwit?: boolean): Promise<any[]>;
    private keyPair;
    private _toWIF;
    private seedNode;
}
