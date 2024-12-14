export interface EIP1559Fee {
    maxFeePerGas: number;
    maxPriorityFeePerGas: number;
    baseFeeTrend?: number;
    currentBaseFeePerGas?: number;
    suggestedBaseFeePerGas?: number;
}
export interface MultilayerGasPrice {
    l1: number;
    l2: number;
}
export type FeeType = EIP1559Fee | number;
export interface FeeDetail {
    fee: FeeType;
    multilayerFee?: MultilayerGasPrice;
    wait?: number;
}
export interface FeeDetails {
    slow: FeeDetail;
    average: FeeDetail;
    fast: FeeDetail;
}
export interface FeeProvider {
    getFees(): Promise<FeeDetails>;
}
