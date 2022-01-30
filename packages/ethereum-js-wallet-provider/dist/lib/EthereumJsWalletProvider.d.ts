import { WalletProvider } from '@liquality/wallet-provider';
import { EthereumNetwork } from '@liquality/ethereum-networks';
import { Network, Address, SendOptions, ethereum, Transaction } from '@liquality/types';
import hdkey from 'hdkey';
interface EthereumJsWalletProviderOptions {
    network: EthereumNetwork;
    mnemonic: string;
    derivationPath: string;
    hardfork?: string;
}
export default class EthereumJsWalletProvider extends WalletProvider {
    _derivationPath: string;
    _mnemonic: string;
    _network: EthereumNetwork;
    _hardfork: string;
    constructor(options: EthereumJsWalletProviderOptions);
    node(): Promise<hdkey>;
    hdKey(): Promise<hdkey>;
    exportPrivateKey(): Promise<string>;
    signMessage(message: string): Promise<string>;
    getAddresses(): Promise<Address[]>;
    getUnusedAddress(): Promise<Address>;
    getUsedAddresses(): Promise<Address[]>;
    signTransaction(txData: ethereum.TransactionRequest): Promise<string>;
    sendTransaction(options: SendOptions): Promise<Transaction<ethereum.PartialTransaction>>;
    sendSweepTransaction(address: Address | ethereum.Address, _gasPrice: number): Promise<Transaction<ethereum.PartialTransaction>>;
    updateTransactionFee(tx: Transaction<ethereum.PartialTransaction> | string, newGasPrice: number): Promise<Transaction<ethereum.PartialTransaction>>;
    isWalletAvailable(): Promise<boolean>;
    getConnectedNetwork(): Promise<Network>;
}
export {};
