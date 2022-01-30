import { SendOptions, Block, Transaction, FeeDetails, ChainProvider, FeeProvider, BigNumber, Address } from '@liquality/types';
export default class Chain implements ChainProvider, FeeProvider {
    client: any;
    constructor(client: any);
    /** @inheritdoc */
    generateBlock(numberOfBlocks: number): Promise<void>;
    /** @inheritdoc */
    getBlockByHash(blockHash: string, includeTx?: boolean): Promise<Block>;
    /** @inheritdoc */
    getBlockByNumber(blockNumber: number, includeTx?: boolean): Promise<Block>;
    /** @inheritdoc */
    getBlockHeight(): Promise<number>;
    /** @inheritdoc */
    getTransactionByHash(txHash: string): Promise<Transaction>;
    /** @inheritdoc */
    getBalance(addresses: (string | Address)[]): Promise<BigNumber>;
    /** @inheritdoc */
    sendTransaction(options: SendOptions): Promise<Transaction>;
    /** @inheritdoc */
    sendSweepTransaction(address: Address | string, fee?: number): Promise<Transaction>;
    /** @inheritdoc */
    updateTransactionFee(tx: string | Transaction, newFee: number): Promise<Transaction>;
    /** @inheritdoc */
    sendBatchTransaction(transactions: SendOptions[]): Promise<Transaction>;
    /** @inheritdoc */
    sendRawTransaction(rawTransaction: string): Promise<string>;
    /** @inheritdoc */
    getFees(): Promise<FeeDetails>;
}
