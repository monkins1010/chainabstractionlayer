import { JsonRpcProvider } from '@liquality/jsonrpc-provider';
import { VerusNetwork } from '@liquality/verus-networks';
import { verus, Transaction, Block, ChainProvider, SendOptions, Address, BigNumber } from '@liquality/types';
interface ProviderOptions {
    uri: string;
    username?: string;
    password?: string;
    network: VerusNetwork;
    feeBlockConfirmations?: number;
    defaultFeePerByte?: number;
}
export default class VerusRpcProvider extends JsonRpcProvider implements Partial<ChainProvider> {
    _feeBlockConfirmations: number;
    _defaultFeePerByte: number;
    _network: VerusNetwork;
    _usedAddressCache: {
        [key: string]: boolean;
    };
    constructor(options: ProviderOptions);
    decodeRawTransaction(rawTransaction: string): Promise<verus.Transaction>;
    getFeePerByte(numberOfBlocks?: number): Promise<number>;
    getMinRelayFee(): Promise<number>;
    getBalance(_addresses: (string | Address)[]): Promise<BigNumber>;
    getUnspentTransactions(_addresses: (Address | string)[]): Promise<verus.UTXO[]>;
    getAddressDeltas(_addresses: (Address | string)[]): Promise<verus.AddressDeltas>;
    getReceivedByAddress(address: string): Promise<number>;
    importAddresses(addresses: string[]): Promise<any>;
    getTransactionHex(transactionHash: string): Promise<string>;
    generateBlock(numberOfBlocks: number): Promise<void>;
    getBlockByHash(blockHash: string, includeTx?: boolean): Promise<Block>;
    getBlockByNumber(blockNumber: number, includeTx?: boolean): Promise<Block<any>>;
    getBlockHeight(): Promise<any>;
    getTransactionByHash(transactionHash: string): Promise<Transaction<verus.Transaction>>;
    getTransactionFee(tx: verus.Transaction): Promise<number>;
    getParsedTransactionByHash(transactionHash: string, addFees?: boolean): Promise<Transaction<verus.Transaction>>;
    getRawTransactionByHash(transactionHash: string): Promise<string>;
    sendRawTransaction(rawTransaction: string): Promise<string>;
    sendBatchTransaction(transactions: SendOptions[]): Promise<Transaction<verus.Transaction>>;
    signRawTransaction(hexstring: string): Promise<any>;
    createRawTransaction(transactions: [], outputs: {
        [index: string]: number;
    }): Promise<string>;
    fundRawTransaction(hexstring: string): Promise<verus.rpc.FundRawResponse>;
}
export {};
