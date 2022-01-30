import { Address, SwapParams, SwapProvider, terra, Transaction } from '@liquality/types';
import { TerraNetwork } from '@liquality/terra-networks';
import { NodeProvider } from '@liquality/node-provider';
export default class TerraSwapFindProvider extends NodeProvider implements Partial<SwapProvider> {
    private _network;
    private _asset;
    constructor(network: TerraNetwork, asset: string);
    findInitiateSwapTransaction(swapParams: SwapParams): Promise<Transaction<terra.InputTransaction>>;
    findClaimSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<Transaction<terra.InputTransaction>>;
    findRefundSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<Transaction<terra.InputTransaction>>;
    findFundSwapTransaction(): Promise<null>;
    _getTransactionsForAddress(address: Address | string): Promise<any[]>;
}
