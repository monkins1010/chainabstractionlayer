import { NodeProvider } from '@liquality/node-provider';
import { ChainProvider, Address, bitcoin, BigNumber } from '@liquality/types';
import * as esplora from './types';
import { BitcoinNetwork } from '@liquality/bitcoin-networks';
export interface EsploraApiProviderOptions {
    url: string;
    network: BitcoinNetwork;
    numberOfBlockConfirmation?: number;
    defaultFeePerByte?: number;
}
export default class BitcoinEsploraApiProvider extends NodeProvider implements Partial<ChainProvider> {
    _network: BitcoinNetwork;
    _numberOfBlockConfirmation: number;
    _defaultFeePerByte: number;
    _usedAddressCache: {
        [index: string]: boolean;
    };
    constructor(options: EsploraApiProviderOptions);
    getFeePerByte(numberOfBlocks?: number): Promise<number>;
    getMinRelayFee(): Promise<number>;
    getBalance(_addresses: (string | Address)[]): Promise<BigNumber>;
    _getUnspentTransactions(address: string): Promise<bitcoin.UTXO[]>;
    getUnspentTransactions(_addresses: (Address | string)[]): Promise<bitcoin.UTXO[]>;
    _getAddressTransactionCount(address: string): Promise<number>;
    getAddressTransactionCounts(_addresses: (Address | string)[]): Promise<any>;
    getTransactionHex(transactionHash: string): Promise<string>;
    getTransaction(transactionHash: string): Promise<import("@liquality/types").Transaction<bitcoin.Transaction>>;
    formatTransaction(tx: esplora.Transaction, currentHeight: number): Promise<import("@liquality/types").Transaction<bitcoin.Transaction>>;
    getBlockByHash(blockHash: string): Promise<{
        hash: any;
        number: any;
        timestamp: any;
        size: any;
        parentHash: any;
        difficulty: any;
        nonce: any;
    }>;
    getBlockHash(blockNumber: number): Promise<string>;
    getBlockByNumber(blockNumber: number): Promise<{
        hash: any;
        number: any;
        timestamp: any;
        size: any;
        parentHash: any;
        difficulty: any;
        nonce: any;
    }>;
    getBlockHeight(): Promise<number>;
    getTransactionByHash(transactionHash: string): Promise<import("@liquality/types").Transaction<bitcoin.Transaction>>;
    getRawTransactionByHash(transactionHash: string): Promise<string>;
    sendRawTransaction(rawTransaction: string): Promise<string>;
}
