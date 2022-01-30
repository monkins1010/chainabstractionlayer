export interface Transaction<T = any> {
    hash: string;
    value: number;
    status?: TxStatus;
    blockHash?: string;
    blockNumber?: number;
    confirmations?: number;
    feePrice?: number;
    fee?: number;
    secret?: string;
    _raw: T;
}
export declare enum TxStatus {
    Pending = "PENDING",
    Failed = "FAILED",
    Success = "SUCCESS"
}
