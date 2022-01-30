import { NodeProvider } from '@liquality/node-provider';
import { FeeProvider, FeeDetails } from '@liquality/types';
export default class BitcoinFeeApiProvider extends NodeProvider implements FeeProvider {
    constructor(endpoint?: string);
    getFees(): Promise<FeeDetails>;
}
