import { Fee } from '@chainify/client';
import { FeeDetails, FeeProvider } from '@chainify/types';
export declare class VerusFeeApiProvider extends Fee implements FeeProvider {
    private _httpClient;
    constructor(endpoint?: string);
    getFees(): Promise<FeeDetails>;
}
