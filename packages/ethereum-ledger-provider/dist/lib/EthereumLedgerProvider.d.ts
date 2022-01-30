import { LedgerProvider } from '@liquality/ledger-provider';
import { Address, ethereum, SendOptions, Transaction } from '@liquality/types';
import { EthereumNetwork } from '@liquality/ethereum-networks';
import HwAppEthereum from '@ledgerhq/hw-app-eth';
interface EthereumLedgerProviderOptions {
    network: EthereumNetwork;
    derivationPath: string;
    Transport: any;
}
export default class EthereumLedgerProvider extends LedgerProvider<HwAppEthereum> {
    _derivationPath: string;
    constructor(options: EthereumLedgerProviderOptions);
    signMessage(message: string, from: string): Promise<string>;
    getAddresses(): Promise<Address[]>;
    getUnusedAddress(): Promise<Address>;
    isWalletAvailable(): Promise<boolean>;
    getUsedAddresses(): Promise<Address[]>;
    signTransaction(txData: ethereum.TransactionRequest, path: string): Promise<any>;
    sendTransaction(options: SendOptions): Promise<Transaction<ethereum.PartialTransaction>>;
    updateTransactionFee(tx: Transaction<ethereum.PartialTransaction> | string, newGasPrice: number): Promise<Transaction<ethereum.PartialTransaction>>;
}
export {};
