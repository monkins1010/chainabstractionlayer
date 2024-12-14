import { JsonRpcProvider } from '@chainify/client';
import { AddressType, Transaction, Address } from '@chainify/types';
import { AddressTxCounts, UTXO as VerusUTXO, AddressDeltas } from '../../types';
import { VerusBaseChainProvider } from '../VerusBaseChainProvider';
import { ProviderOptions } from './types';
export declare class VerusJsonRpcBaseProvider extends VerusBaseChainProvider {
    jsonRpc: JsonRpcProvider;
    protected _options: ProviderOptions;
    constructor(options: ProviderOptions);
    formatTransaction(tx: any, currentHeight: number): Promise<Transaction<any>>;
    getRawTransactionByHash(transactionHash: string): Promise<string>;
    getTransactionHex(transactionHash: string): Promise<string>;
    getFeePerByte(numberOfBlocks?: number): Promise<number>;
    getUnspentTransactions(_addresses: AddressType[]): Promise<VerusUTXO[]>;
    getAddressTransactionCounts(_addresses: AddressType[]): Promise<AddressTxCounts>;
    getAddressDeltas(_addresses: (Address | string)[]): Promise<AddressDeltas>;
    getMinRelayFee(): Promise<number>;
}
