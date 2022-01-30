/// <reference types="node" />
/// <reference types="@liquality/solana-utils/node_modules/@solana/web3.js" />
import { NodeProvider as NodeProvider } from '@liquality/node-provider';
import { BigNumber, ChainProvider, Address, Block, Transaction, solana, FeeDetails, FeeProvider } from '@liquality/types';
import { SolanaNetwork } from '@liquality/solana-networks';
import { Connection, AccountInfo, Transaction as SolTransaction, Keypair, ConfirmedSignatureInfo, Signer } from '@solana/web3.js';
export default class SolanaRpcProvider extends NodeProvider implements FeeProvider, Partial<ChainProvider> {
    _network: SolanaNetwork;
    connection: Connection;
    constructor(network: SolanaNetwork);
    generateBlock(numberOfBlocks: number): Promise<void>;
    getBlockByHash(): Promise<Block>;
    getBlockByNumber(blockNumber: number, includeTx?: boolean): Promise<Block>;
    getBlockHeight(): Promise<number>;
    getTransactionByHash(txHash: string): Promise<Transaction>;
    getTransactionReceipt(txHashes: string[]): Promise<Transaction<solana.InputTransaction>[]>;
    getBalance(addresses: (string | Address)[]): Promise<BigNumber>;
    sendRawTransaction(rawTransaction: string): Promise<string>;
    getRecentBlockhash(): Promise<{
        blockhash: string;
        feeCalculator: import("@solana/web3.js").FeeCalculator;
    }>;
    _getMinimumBalanceForRentExemption(dataLength: number): Promise<number>;
    _sendTransaction(transaction: SolTransaction, accounts: Array<Signer>): Promise<string>;
    _getAddressHistory(address: string): Promise<ConfirmedSignatureInfo[]>;
    _includeTransactions(blockNumber: number): Promise<Transaction[]>;
    _deploy(signer: Keypair, bytecode: number[]): Promise<string>;
    _getAccountInfo(address: string): Promise<AccountInfo<Buffer>>;
    _waitForContractToBeExecutable(programId: string): Promise<boolean>;
    getFees(): Promise<FeeDetails>;
}
