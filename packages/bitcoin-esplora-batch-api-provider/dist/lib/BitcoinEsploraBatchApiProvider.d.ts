import { NodeProvider } from '@liquality/node-provider';
import { Address } from '@liquality/types';
import { BitcoinEsploraApiProvider, EsploraApiProviderOptions, esplora } from '@liquality/bitcoin-esplora-api-provider';
interface EsploraBatchApiProviderOptions extends EsploraApiProviderOptions {
    batchUrl: string;
}
export default class BitcoinEsploraBatchApiProvider extends BitcoinEsploraApiProvider {
    _batchAxios: NodeProvider;
    constructor(options: EsploraBatchApiProviderOptions);
    getUnspentTransactions(_addresses: (Address | string)[]): Promise<{
        address: string;
        satoshis: number;
        amount: number;
        blockHeight: number;
        txid: string;
        vout: number;
        status: esplora.TxStatus;
        value: number;
    }[]>;
    getAddressTransactionCounts(_addresses: (Address | string)[]): Promise<{
        [index: string]: number;
    }>;
}
export {};
