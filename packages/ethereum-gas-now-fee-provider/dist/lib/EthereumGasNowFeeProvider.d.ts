import { NodeProvider } from '@liquality/node-provider';
import { FeeProvider, FeeDetails } from '@liquality/types';
export default class EthereumGasNowFeeProvider extends NodeProvider implements FeeProvider {
    constructor(endpoint?: string);
    getFees(): Promise<FeeDetails>;
}
