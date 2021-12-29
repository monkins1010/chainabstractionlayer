import { Provider } from '@liquality/provider';
import { FeeProvider, FeeDetail } from '@liquality/types';
declare type FeeOptions = {
    slowTargetBlocks?: number;
    averageTargetBlocks?: number;
    fastTargetBlocks?: number;
};
export default class VerusRpcFeeProvider extends Provider implements FeeProvider {
    _slowTargetBlocks: number;
    _averageTargetBlocks: number;
    _fastTargetBlocks: number;
    constructor(opts?: FeeOptions);
    getWaitTime(numBlocks: number): number;
    getFee(targetBlocks: number): Promise<FeeDetail>;
    getFees(): Promise<{
        slow: FeeDetail;
        average: FeeDetail;
        fast: FeeDetail;
    }>;
}
export {};
