import { HttpClient } from '@chainify/client';
import { AddressType } from '@chainify/types';
import { UTXO } from '../../types';
import { VerusBaseChainProvider } from '../VerusBaseChainProvider';
import * as EsploraTypes from './types';
export declare class VerusEsploraBaseProvider extends VerusBaseChainProvider {
    httpClient: HttpClient;
    protected _options: EsploraTypes.EsploraApiProviderOptions;
    constructor(options: EsploraTypes.EsploraApiProviderOptions);
    formatTransaction(tx: EsploraTypes.Transaction, currentHeight: number): Promise<import("@chainify/types").Transaction<import("../../types").Transaction>>;
    getRawTransactionByHash(transactionHash: string): Promise<string>;
    getTransactionHex(transactionHash: string): Promise<string>;
    getFeePerByte(numberOfBlocks?: number): Promise<number>;
    getUnspentTransactions(_addresses: AddressType[]): Promise<UTXO[]>;
    getAddressTransactionCounts(_addresses: AddressType[]): Promise<any>;
    getMinRelayFee(): Promise<number>;
    private _getUnspentTransactions;
    private _getAddressTransactionCount;
}
