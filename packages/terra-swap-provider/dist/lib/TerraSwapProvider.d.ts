import { SwapParams, SwapProvider, terra, Transaction } from '@liquality/types';
import { Provider } from '@liquality/provider';
import { TerraNetwork } from '@liquality/terra-networks';
import { MsgExecuteContract, MsgInstantiateContract } from '@terra-money/terra.js';
export default class TerraSwapProvider extends Provider implements Partial<SwapProvider> {
    private _network;
    private _asset;
    constructor(network: TerraNetwork, asset: string);
    getSwapSecret(claimTxHash: string): Promise<string>;
    initiateSwap(swapParams: SwapParams, fee: number): Promise<Transaction<terra.InputTransaction>>;
    claimSwap(swapParams: SwapParams, initiationTxHash: string, secret: string): Promise<Transaction<terra.InputTransaction>>;
    refundSwap(swapParams: SwapParams, initiationTxHash: string): Promise<Transaction<terra.InputTransaction>>;
    fundSwap(): Promise<null>;
    verifyInitiateSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<boolean>;
    _instantiateContractMessage(swapParams: SwapParams): MsgInstantiateContract;
    _executeContractMessage(contractAddress: string, method: any): MsgExecuteContract;
}
