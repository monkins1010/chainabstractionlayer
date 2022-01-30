import { NodeProvider } from '@liquality/node-provider';
import { near, BigNumber, ChainProvider, FeeProvider, Address, Block, Transaction, FeeDetails } from '@liquality/types';
import { NearNetwork } from '@liquality/near-networks';
import { providers, Account } from '@liquality/near-utils';
interface RpcProvider extends providers.JsonRpcProvider {
    [key: string]: any;
}
export default class NearRpcProvider extends NodeProvider implements Partial<ChainProvider>, FeeProvider {
    _network: NearNetwork;
    _jsonRpc: RpcProvider;
    constructor(network: NearNetwork);
    sendRawTransaction(hash: string): Promise<string>;
    getBlockByHash(blockHash: string, includeTx: boolean): Promise<Block<Transaction<near.InputTransaction>>>;
    getBlockByNumber(blockNumber: number, includeTx?: boolean): Promise<Block<Transaction<near.InputTransaction>>>;
    getBlockHeight(txHash?: string): Promise<any>;
    getTransactionByHash(txHash: string): Promise<Transaction<near.InputTransaction>>;
    getTransactionReceipt(txHash: string): Promise<near.InputTransaction>;
    getGasPrice(): Promise<number>;
    getBalance(_addresses: (Address | string)[]): Promise<BigNumber>;
    generateBlock(numberOfBlocks: number): Promise<void>;
    getImplicitAccount(publicKey: string, index: number): Promise<string>;
    getAccount(accountId: string, signer?: any): Account;
    getFees(): Promise<FeeDetails>;
    _sendRawTransaction(hash: string): Promise<any>;
    normalizeBlock(block: near.NearInputBlockHeader): Block<Transaction<near.InputTransaction>>;
    _getBlockById(blockId: number | string, includeTx: boolean): Promise<Block<Transaction<near.InputTransaction>>>;
    _rpc(method: any, args: any): Promise<any>;
    _rpcQuery(method: string, args: any[]): Promise<any>;
}
export {};
