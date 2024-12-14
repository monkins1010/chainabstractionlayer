import { Chain, Fee } from '@chainify/client';
import { AddressType, BigNumber, Block, FeeDetails, Transaction } from '@chainify/types';
import { VerusEsploraBaseProvider } from './VerusEsploraBaseProvider';
import * as EsploraTypes from './types';
export declare class VerusEsploraApiProvider extends Chain<VerusEsploraBaseProvider> {
    private _httpClient;
    private _feeOptions;
    constructor(options: EsploraTypes.EsploraBatchApiProviderOptions, provider?: VerusEsploraBaseProvider, feeProvider?: Fee, feeOptions?: EsploraTypes.FeeOptions);
    getBlockByHash(blockHash: string): Promise<Block<any, any>>;
    getBlockByNumber(blockNumber?: number): Promise<Block<any, any>>;
    getBlockHeight(): Promise<number>;
    getTransactionByHash(txHash: string): Promise<Transaction<any>>;
    getBalance(_addresses: AddressType[]): Promise<BigNumber[]>;
    getFees(): Promise<FeeDetails>;
    sendRawTransaction(rawTransaction: string): Promise<string>;
    sendRpcRequest(_method: string, _params: any[]): Promise<any>;
    private _getBlockHash;
    private getTransaction;
    private _getFee;
}
