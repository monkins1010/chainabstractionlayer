import { Provider } from '@liquality/provider';
import { Network, WalletProvider as IWalletProvider, Address } from '@liquality/types';
export default abstract class WalletProvider extends Provider implements IWalletProvider {
    _network: Network;
    _methods: string[];
    constructor(options: {
        network: Network;
    });
    _networkMatchProxy(target: any, func: string): any;
    assertNetworkMatch(): Promise<void>;
    abstract isWalletAvailable(): Promise<boolean>;
    abstract getAddresses(startingIndex?: number, numAddresses?: number, change?: boolean): Promise<Address[]>;
    abstract getUsedAddresses(numAddressPerCall?: number): Promise<Address[]>;
    abstract getUnusedAddress(change?: boolean, numAddressPerCall?: number): Promise<Address>;
    abstract signMessage(message: string, from: string): Promise<string>;
    abstract getConnectedNetwork(): Promise<any>;
}
