/// <reference types="node" />
import { WalletProvider } from '@liquality/wallet-provider';
import { JsonRpcProvider } from '@liquality/jsonrpc-provider';
import { bitcoin, SendOptions, Transaction, Address } from '@liquality/types';
import { BitcoinNetwork } from '@liquality/bitcoin-networks';
interface ProviderOptions {
    uri: string;
    username?: string;
    password?: string;
    network: BitcoinNetwork;
    addressType?: bitcoin.AddressType;
}
export default class BitcoinNodeWalletProvider extends WalletProvider {
    _addressType: bitcoin.AddressType;
    _network: BitcoinNetwork;
    _rpc: JsonRpcProvider;
    _addressInfoCache: {
        [key: string]: Address;
    };
    constructor(opts: ProviderOptions);
    signMessage(message: string, from: string): Promise<string>;
    withTxFee(func: () => Promise<Transaction<bitcoin.Transaction>>, feePerByte: number): Promise<Transaction<bitcoin.Transaction>>;
    _sendTransaction(options: SendOptions): Promise<Transaction<bitcoin.Transaction>>;
    sendTransaction(options: SendOptions): Promise<Transaction<bitcoin.Transaction>>;
    updateTransactionFee(tx: Transaction<bitcoin.Transaction>, newFeePerByte: number): Promise<Transaction<bitcoin.Transaction>>;
    signPSBT(data: string, inputs: bitcoin.PsbtInputTarget[]): Promise<string>;
    signBatchP2SHTransaction(inputs: [{
        inputTxHex: string;
        index: number;
        vout: any;
        outputScript: Buffer;
    }], addresses: string, tx: any, locktime: number, segwit?: boolean): Promise<Buffer[]>;
    dumpPrivKey(address: string): Promise<string>;
    getNewAddress(addressType: bitcoin.AddressType, label?: string): Promise<Address>;
    getAddressInfo(address: string): Promise<Address>;
    getAddresses(): Promise<Address[]>;
    getUnusedAddress(): Promise<Address>;
    getUsedAddresses(): Promise<Address[]>;
    getWalletAddress(address: string): Promise<Address>;
    isWalletAvailable(): Promise<boolean>;
    getConnectedNetwork(): Promise<BitcoinNetwork>;
    generateSecret(message: string): Promise<any>;
}
export {};
