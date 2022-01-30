import { NodeProvider as NodeProvider } from '@liquality/node-provider';
import { BigNumber, ChainProvider, Address, Block, Transaction, terra, FeeProvider } from '@liquality/types';
import { TerraNetwork } from '@liquality/terra-networks';
export default class TerraRpcProvider extends NodeProvider implements FeeProvider, Partial<ChainProvider> {
    private _network;
    private _lcdClient;
    private _asset;
    private _tokenAddress;
    private _feeAsset;
    constructor(network: TerraNetwork, asset: string, feeAsset: string, tokenAddress?: string);
    generateBlock(numberOfBlocks: number): Promise<void>;
    getBlockByHash(): Promise<Block>;
    getBlockByNumber(blockNumber: number, includeTx?: boolean): Promise<Block<Transaction<terra.InputTransaction>>>;
    getBlockHeight(): Promise<number>;
    getTransactionByHash(txHash: string): Promise<Transaction<terra.InputTransaction>>;
    getBalance(_addresses: (string | Address)[]): Promise<BigNumber>;
    sendRawTransaction(): Promise<string>;
    getFees(): Promise<{
        slow: {
            fee: number;
        };
        average: {
            fee: number;
        };
        fast: {
            fee: number;
        };
    }>;
}
