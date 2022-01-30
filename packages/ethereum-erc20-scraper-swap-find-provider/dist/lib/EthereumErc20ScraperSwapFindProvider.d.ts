import { EthereumScraperSwapFindProvider, scraper } from '@liquality/ethereum-scraper-swap-find-provider';
import { SwapParams, Transaction } from '@liquality/types';
export default class EthereumErc20ScraperSwapFindProvider extends EthereumScraperSwapFindProvider {
    findErc20Events(erc20ContractAddress: string, address: string, predicate: (tx: Transaction<scraper.Transaction>) => boolean, fromBlock?: number, toBlock?: number, limit?: number, sort?: string): Promise<Transaction<scraper.Transaction>>;
    validateSwapParams(swapParams: SwapParams): void;
    findFundSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<Transaction<scraper.Transaction>>;
}
