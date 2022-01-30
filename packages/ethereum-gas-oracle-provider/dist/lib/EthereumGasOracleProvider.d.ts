import { NodeProvider } from '@liquality/node-provider';
import { FeeProvider, FeeDetails } from '@liquality/types';
export default class EthereumGasOracleProvider extends NodeProvider implements FeeProvider {
    constructor({ baseURL, apikey }?: {
        baseURL?: string;
        apikey?: string;
    });
    getFees(): Promise<FeeDetails>;
}
