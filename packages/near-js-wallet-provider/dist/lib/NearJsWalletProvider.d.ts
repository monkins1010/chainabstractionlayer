import { WalletProvider } from '@liquality/wallet-provider';
import { NearNetwork } from '@liquality/near-networks';
import { Address, Network, ChainProvider, near } from '@liquality/types';
import { keyStores, InMemorySigner } from '@liquality/near-utils';
interface NearJsWalletProviderOptions {
    network: NearNetwork;
    mnemonic: string;
    derivationPath: string;
}
export default class NearJsWalletProvider extends WalletProvider implements Partial<ChainProvider> {
    _network: NearNetwork;
    _mnemonic: string;
    _derivationPath: string;
    _keyStore: keyStores.InMemoryKeyStore;
    _addressCache: {
        [key: string]: Address;
    };
    constructor(options: NearJsWalletProviderOptions);
    exportPrivateKey(): Promise<any>;
    getAddresses(): Promise<Address[]>;
    getUnusedAddress(): Promise<Address>;
    getUsedAddresses(): Promise<Address[]>;
    getSigner(): InMemorySigner;
    signMessage(message: string): Promise<string>;
    sendTransaction(options: near.NearSendOptions): Promise<import("@liquality/types").Transaction<near.InputTransaction>>;
    sendSweepTransaction(address: string): Promise<import("@liquality/types").Transaction<near.InputTransaction>>;
    isWalletAvailable(): Promise<boolean>;
    getWalletNetworkId(): Promise<string>;
    getConnectedNetwork(): Promise<Network>;
    canUpdateFee(): boolean;
}
export {};
