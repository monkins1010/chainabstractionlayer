import { JsonRpcProvider } from '@liquality/jsonrpc-provider';
import { Address, Block, ethereum, SendOptions, Transaction, ChainProvider, BigNumber } from '@liquality/types';
export default class EthereumRpcProvider extends JsonRpcProvider implements Partial<ChainProvider> {
    _usedAddressCache: {
        [key: string]: boolean;
    };
    constructor(options: {
        uri: string;
        username?: string;
        password?: string;
    });
    rpc<TResponse>(method: string, ...params: any[]): Promise<TResponse>;
    getAddresses(): Promise<Address[]>;
    getUnusedAddress(): Promise<Address>;
    getUsedAddresses(): Promise<Address[]>;
    isWalletAvailable(): Promise<boolean>;
    sendTransaction(options: SendOptions): Promise<Transaction<ethereum.PartialTransaction>>;
    updateTransactionFee(tx: Transaction<ethereum.PartialTransaction> | string, newGasPrice: number): Promise<Transaction<ethereum.PartialTransaction>>;
    sendRawTransaction(hash: string): Promise<string>;
    signMessage(message: string, from?: string): Promise<string>;
    normalizeBlock(block: ethereum.Block): Block<any>;
    parseBlock(block: ethereum.Block, includeTx: boolean): Promise<Block>;
    getBlockByHash(blockHash: string, includeTx?: boolean): Promise<Block>;
    getBlockByNumber(blockNumber: number, includeTx?: boolean): Promise<Block>;
    getBlockHeight(): Promise<number>;
    getTransactionByHash(txHash: string): Promise<Transaction<ethereum.Transaction>>;
    getTransactionReceipt(txHash: string): Promise<ethereum.TransactionReceipt>;
    getTransactionCount(address: string, block?: string): Promise<number>;
    getGasPrice(): Promise<BigNumber>;
    getBalance(_addresses: (Address | string)[]): Promise<BigNumber>;
    estimateGas(transaction: ethereum.TransactionRequest): Promise<number>;
    getCode(address: string, block: string | number): Promise<string>;
    assertContractExists(address: string): Promise<void>;
    stopMiner(): Promise<void>;
    startMiner(): Promise<void>;
    evmMine(): Promise<void>;
    generateBlock(numberOfBlocks: number): Promise<void>;
}
