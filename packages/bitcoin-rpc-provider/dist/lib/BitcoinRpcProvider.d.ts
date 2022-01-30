import { JsonRpcProvider } from '@liquality/jsonrpc-provider';
import { BitcoinNetwork } from '@liquality/bitcoin-networks';
import { bitcoin, Transaction, Block, ChainProvider, SendOptions, Address, BigNumber } from '@liquality/types';
interface ProviderOptions {
    uri: string;
    username?: string;
    password?: string;
    network: BitcoinNetwork;
    feeBlockConfirmations?: number;
    defaultFeePerByte?: number;
}
export default class BitcoinRpcProvider extends JsonRpcProvider implements Partial<ChainProvider> {
    _feeBlockConfirmations: number;
    _defaultFeePerByte: number;
    _network: BitcoinNetwork;
    _usedAddressCache: {
        [key: string]: boolean;
    };
    constructor(options: ProviderOptions);
    decodeRawTransaction(rawTransaction: string): Promise<bitcoin.Transaction>;
    getFeePerByte(numberOfBlocks?: number): Promise<number>;
    getMinRelayFee(): Promise<number>;
    getBalance(_addresses: (string | Address)[]): Promise<BigNumber>;
    getUnspentTransactions(_addresses: (Address | string)[]): Promise<bitcoin.UTXO[]>;
    getAddressTransactionCounts(_addresses: (Address | string)[]): Promise<bitcoin.AddressTxCounts>;
    getReceivedByAddress(address: string): Promise<number>;
    importAddresses(addresses: string[]): Promise<any>;
    getTransactionHex(transactionHash: string): Promise<string>;
    generateBlock(numberOfBlocks: number): Promise<any>;
    getBlockByHash(blockHash: string, includeTx?: boolean): Promise<Block>;
    getBlockByNumber(blockNumber: number, includeTx?: boolean): Promise<Block<any>>;
    getBlockHeight(): Promise<any>;
    getTransactionByHash(transactionHash: string): Promise<Transaction<bitcoin.Transaction>>;
    getTransactionFee(tx: bitcoin.Transaction): Promise<number>;
    getParsedTransactionByHash(transactionHash: string, addFees?: boolean): Promise<Transaction<bitcoin.Transaction>>;
    getRawTransactionByHash(transactionHash: string): Promise<string>;
    sendRawTransaction(rawTransaction: string): Promise<string>;
    sendBatchTransaction(transactions: SendOptions[]): Promise<Transaction<bitcoin.Transaction>>;
    signRawTransaction(hexstring: string): Promise<any>;
    createRawTransaction(transactions: [], outputs: {
        [index: string]: number;
    }): Promise<string>;
    fundRawTransaction(hexstring: string): Promise<bitcoin.rpc.FundRawResponse>;
}
export {};
