import { AddressType, Transaction } from '@chainify/types';
import { AddressTxCounts, UTXO } from '../types';
export declare abstract class VerusBaseChainProvider {
    abstract formatTransaction(tx: any, currentHeight: number): Promise<Transaction>;
    abstract getRawTransactionByHash(transactionHash: string): Promise<string>;
    abstract getTransactionHex(transactionHash: string): Promise<string>;
    abstract getFeePerByte(numberOfBlocks?: number): Promise<number>;
    abstract getUnspentTransactions(addresses: AddressType[]): Promise<UTXO[]>;
    abstract getAddressTransactionCounts(_addresses: AddressType[]): Promise<AddressTxCounts>;
    abstract getMinRelayFee(): Promise<number>;
}
