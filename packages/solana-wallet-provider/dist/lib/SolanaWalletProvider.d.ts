import { WalletProvider } from '@liquality/wallet-provider';
import { Address, Network, Transaction, solana } from '@liquality/types';
import { SolanaNetwork } from '@liquality/solana-networks';
import { Keypair, PublicKey, TransactionInstruction } from '@solana/web3.js';
interface SolanaWalletProviderOptions {
    network: SolanaNetwork;
    mnemonic: string;
    derivationPath?: string;
}
export default class SolanaWalletProvider extends WalletProvider {
    _network: SolanaNetwork;
    _mnemonic: string;
    _derivationPath: string;
    _addressCache: {
        [key: string]: Address;
    };
    _signer: Keypair;
    constructor(options: SolanaWalletProviderOptions);
    isWalletAvailable(): Promise<boolean>;
    getAddresses(): Promise<Address[]>;
    getUnusedAddress(): Promise<Address>;
    getUsedAddresses(): Promise<Address[]>;
    sendTransaction(options: solana.SolanaSendOptions): Promise<Transaction>;
    signMessage(message: string): Promise<string>;
    getConnectedNetwork(): Promise<Network>;
    canUpdateFee(): boolean;
    sendSweepTransaction(address: string | Address): Promise<Transaction>;
    _mnemonicToSeed(mnemonic: string): Promise<string>;
    _getSigner(): Promise<Keypair>;
    _sendBetweenAccounts(recipient: PublicKey, lamports: number): Promise<TransactionInstruction>;
    _setSigner(): Promise<void>;
}
export {};
