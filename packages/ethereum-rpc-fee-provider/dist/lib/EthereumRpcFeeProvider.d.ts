import { Provider } from '@liquality/provider';
import { FeeProvider } from '@liquality/types';
declare type FeeOptions = {
    slowMultiplier?: number;
    averageMultiplier?: number;
    fastMultiplier?: number;
};
export default class EthereumRpcFeeProvider extends Provider implements FeeProvider {
    _slowMultiplier: number;
    _averageMultiplier: number;
    _fastMultiplier: number;
    constructor(opts?: FeeOptions);
    calculateFee(base: number, multiplier: number): number;
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
export {};
