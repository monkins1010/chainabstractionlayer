/// <reference types="ledgerhq__hw-transport" />
import { WalletProvider } from '@liquality/wallet-provider';
import { Network, Address } from '@liquality/types';
import HwTransport from '@ledgerhq/hw-transport';
interface IApp {
    transport: any;
}
export declare type Newable<T> = {
    new (...args: any[]): T;
};
export default abstract class LedgerProvider<TApp extends IApp> extends WalletProvider {
    _App: any;
    _network: Network;
    _ledgerScrambleKey: string;
    _transport: HwTransport;
    _Transport: any;
    _appInstance: TApp;
    constructor(options: {
        App: Newable<TApp>;
        Transport: any;
        network: Network;
        ledgerScrambleKey: string;
    });
    createTransport(): Promise<void>;
    errorProxy(target: any, func: string): any;
    getApp(): Promise<TApp>;
    isWalletAvailable(): Promise<boolean>;
    getConnectedNetwork(): Promise<Network>;
    getWalletAddress(address: string): Promise<Address>;
}
export {};
