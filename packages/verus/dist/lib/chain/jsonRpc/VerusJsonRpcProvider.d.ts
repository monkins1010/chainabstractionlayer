import { Chain, Fee, JsonRpcProvider } from '@chainify/client';
import { AddressType, Asset, BigNumber, Block, FeeDetails, Transaction } from '@chainify/types';
import { VerusJsonRpcBaseProvider } from './VerusJsonRpcBaseProvider';
import { FeeOptions, ProviderOptions } from './types';
export declare class VerusJsonRpcProvider extends Chain<VerusJsonRpcBaseProvider> {
    jsonRpc: JsonRpcProvider;
    private _feeOptions;
    constructor(options: ProviderOptions, feeProvider?: Fee, feeOptions?: FeeOptions);
    getBlockByHash(blockHash: string, includeTx?: boolean): Promise<Block>;
    getBlockByNumber(blockNumber?: number, includeTx?: boolean): Promise<Block<any, any>>;
    getBlockHeight(): Promise<number>;
    getTransactionByHash(txHash: string): Promise<Transaction<any>>;
    getBalance(_addresses: AddressType[], _assets: Asset[]): Promise<BigNumber[]>;
    getFees(): Promise<FeeDetails>;
    sendRawTransaction(rawTransaction: string): Promise<string>;
    sendRpcRequest(method: string, params: any[]): Promise<any>;
    private getParsedTransactionByHash;
    private getTransactionFee;
    private _getFee;
}
