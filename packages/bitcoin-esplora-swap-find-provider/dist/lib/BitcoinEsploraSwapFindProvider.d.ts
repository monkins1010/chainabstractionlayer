import { NodeProvider } from '@liquality/node-provider';
import { SwapParams, Transaction, bitcoin } from '@liquality/types';
declare type TransactionMatchesFunction = (tx: Transaction<bitcoin.Transaction>) => boolean;
export default class BitcoinEsploraSwapFindProvider extends NodeProvider {
    constructor(url: string);
    findAddressTransaction(address: string, currentHeight: number, predicate: TransactionMatchesFunction): Promise<Transaction<bitcoin.Transaction>>;
    findSwapTransaction(swapParams: SwapParams, blockNumber: number, predicate: TransactionMatchesFunction): Promise<Transaction<bitcoin.Transaction>>;
    doesBlockScan(): boolean;
}
export {};
