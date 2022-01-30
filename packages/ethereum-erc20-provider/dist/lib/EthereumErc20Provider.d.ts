import { Provider } from '@liquality/provider';
import { ChainProvider, SendOptions, BigNumber, Address } from '@liquality/types';
export default class EthereumErc20Provider extends Provider implements Partial<ChainProvider> {
    _contractAddress: string;
    constructor(contractAddress: string);
    generateErc20Transfer(to: string, value: BigNumber): string;
    sendTransaction(options: SendOptions): Promise<any>;
    sendSweepTransaction(address: Address | string, gasPrice: number): Promise<any>;
    getContractAddress(): string;
    getBalance(_addresses: (Address | string)[]): Promise<BigNumber>;
}
