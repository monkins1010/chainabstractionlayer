/// <reference types="node" />
import { Chain, Wallet } from '@chainify/client';
import { Address, AddressType, Asset, BigNumber, FeeType, Network, Transaction, TransactionRequest } from '@chainify/types';
import { VerusBaseChainProvider } from '../chain/VerusBaseChainProvider';
import { VerusNodeWalletOptions, PsbtInputTarget, Transaction as VerusTransaction } from '../types';
import { IVerusWallet } from './IVerusWallet';
export declare class VerusNodeWalletProvider extends Wallet<any, any> implements IVerusWallet<VerusBaseChainProvider> {
    private _addressType;
    private _network;
    private _addressInfoCache;
    constructor(options?: VerusNodeWalletOptions, chainProvider?: Chain<VerusBaseChainProvider>);
    getUnusedAddress(): Promise<Address>;
    getUsedAddresses(): Promise<Address[]>;
    getAddresses(): Promise<Address[]>;
    sendTransaction(txRequest: TransactionRequest): Promise<Transaction<VerusTransaction>>;
    sendBatchTransaction(transactions: TransactionRequest[]): Promise<Transaction<VerusTransaction>[]>;
    sendSweepTransaction(_address: AddressType, _asset: Asset, _fee?: FeeType): Promise<Transaction<any>>;
    updateTransactionFee(tx: string | Transaction<any>, newFee: number): Promise<Transaction<any>>;
    getConnectedNetwork(): Promise<Network>;
    getSigner(): Promise<null>;
    getAddress(): Promise<AddressType>;
    signMessage(message: string, from: string): Promise<string>;
    getBalance(assets: Asset[]): Promise<BigNumber[]>;
    exportPrivateKey(): Promise<string>;
    isWalletAvailable(): Promise<boolean>;
    canUpdateFee(): boolean;
    signPSBT(data: string, inputs: PsbtInputTarget[]): Promise<string>;
    signBatchP2SHTransaction(inputs: [{
        inputTxHex: string;
        index: number;
        vout: any;
        outputScript: Buffer;
    }], addresses: string, tx: any, locktime: number, segwit?: boolean): Promise<any[]>;
    getWalletAddress(address: string): Promise<Address>;
    protected onChainProviderUpdate(chainProvider: Chain<VerusBaseChainProvider>): void;
    private dumpPrivKey;
    private getNewAddress;
    private getAddressInfo;
    private withTxFee;
    private _sendTransaction;
}
