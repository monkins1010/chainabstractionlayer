/// <reference types="node" />
import { WalletProvider } from '@liquality/wallet-provider';
import { BitcoinNetwork } from '@liquality/bitcoin-networks';
import { Address, bitcoin, SendOptions } from '@liquality/types';
import { PsbtInputTarget } from '@liquality/types/dist/lib/bitcoin';
declare global {
    interface Window {
        bitcoin: {
            enable: () => Promise<Address[]>;
            request: (request: {
                method: string;
                params: any[];
            }) => Promise<any>;
        };
    }
}
interface BitcoinWalletApiProviderOptions {
    network: BitcoinNetwork;
    addressType: bitcoin.AddressType;
}
declare type WalletProviderConstructor<T = WalletProvider> = new (...args: any[]) => T;
declare const BitcoinWalletApiProvider_base;
export default class BitcoinWalletApiProvider extends BitcoinWalletApiProvider_base {
    constructor(options: BitcoinWalletApiProviderOptions);
    request(method: string, ...params: any[]): Promise<any>;
    getAddresses(index?: number, num?: number, change?: boolean): Promise<any>;
    signMessage(message: string, address: string): Promise<any>;
    sendTransaction(sendOptions: SendOptions): Promise<any>;
    signPSBT(data: string, inputs: PsbtInputTarget[]): Promise<any>;
    getConnectedNetwork(): Promise<any>;
    isWalletAvailable(): Promise<boolean>;
}
export {};
