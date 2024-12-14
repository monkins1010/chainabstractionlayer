import { AddressType } from '@chainify/types';
import { UTXO } from '../../types';
import { VerusEsploraBaseProvider } from './VerusEsploraBaseProvider';
import * as EsploraTypes from './types';
export declare class VerusEsploraBatchBaseProvider extends VerusEsploraBaseProvider {
    private _batchHttpClient;
    constructor(options: EsploraTypes.EsploraBatchApiProviderOptions);
    getUnspentTransactions(_addresses: AddressType[]): Promise<UTXO[]>;
    getAddressTransactionCounts(_addresses: AddressType[]): Promise<{
        [index: string]: number;
    }>;
}
