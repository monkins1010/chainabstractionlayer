import { WalletProvider } from '@liquality/wallet-provider';
import { EthereumNetwork } from '@liquality/ethereum-networks';
import { Address, SendOptions, ethereum } from '@liquality/types';
interface RequestArguments {
    method: string;
    params?: any[] | any;
}
interface EthereumProvider {
    request(req: RequestArguments): Promise<any>;
    enable(): Promise<ethereum.Address[]>;
}
export default class EthereumWalletApiProvider extends WalletProvider {
    _ethereumProvider: EthereumProvider;
    _network: EthereumNetwork;
    constructor(ethereumProvider: EthereumProvider, network: EthereumNetwork);
    request(method: string, ...params: any): Promise<any>;
    isWalletAvailable(): Promise<boolean>;
    getAddresses(): Promise<Address[]>;
    getUsedAddresses(): Promise<Address[]>;
    getUnusedAddress(): Promise<Address>;
    signMessage(message: string): Promise<any>;
    sendTransaction(options: SendOptions): Promise<import("@liquality/types").Transaction<ethereum.PartialTransaction>>;
    canUpdateFee(): boolean;
    getWalletNetworkId(): Promise<number>;
    getConnectedNetwork(): Promise<EthereumNetwork | {
        name: string;
        networkId: number;
    }>;
}
export {};
