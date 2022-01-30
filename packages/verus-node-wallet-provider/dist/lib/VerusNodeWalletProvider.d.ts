/// <reference types="node" />
import { WalletProvider } from '@liquality/wallet-provider';
import { JsonRpcProvider } from '@liquality/jsonrpc-provider';
import { verus, SendOptions, Transaction, Address } from '@liquality/types';
import { VerusNetwork } from '@liquality/verus-networks';
interface ProviderOptions {
    uri: string;
    username?: string;
    password?: string;
    network: VerusNetwork;
    addressType?: verus.AddressType;
}
export default class VerusNodeWalletProvider extends WalletProvider {
    _addressType: verus.AddressType;
    _network: VerusNetwork;
    _rpc: JsonRpcProvider;
    _addressInfoCache: {
        [key: string]: Address;
    };
    constructor(opts: ProviderOptions);
    signMessage(message: string, from: string): Promise<string>;
    canUpdateFee(): boolean;
    withTxFee(func: () => Promise<Transaction<verus.Transaction>>, feePerByte: number): Promise<Transaction<verus.Transaction>>;
    _sendTransaction(options: SendOptions): Promise<Transaction<verus.Transaction>>;
    sendTransaction(options: SendOptions): Promise<Transaction<verus.Transaction>>;
    signBatchP2SHTransaction(inputs: [{
        inputTxHex: string;
        index: number;
        vout: any;
        outputScript: Buffer;
    }], addresses: string, tx: any): Promise<Buffer[]>;
    dumpPrivKey(address: string): Promise<string>;
    getNewAddress(_addressType: verus.AddressType, label?: string): Promise<Address>;
    getAddressInfo(address: string): Promise<Address>;
    getAddresses(): Promise<Address[]>;
    getUnusedAddress(): Promise<Address>;
    getUsedAddresses(): Promise<Address[]>;
    getWalletAddress(address: string): Promise<Address>;
    isWalletAvailable(): Promise<boolean>;
    getConnectedNetwork(): Promise<VerusNetwork>;
    generateSecret(message: string): Promise<any>;
}
export {};
