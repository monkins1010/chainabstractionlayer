import { BigNumber, FeeType } from '.';
import { AddressType } from './Address';
import { Asset } from './Asset';
export interface Transaction<TransactionType = any> {
    hash: string;
    value: number;
    valueAsset?: string;
    to?: AddressType;
    from?: AddressType;
    status?: TxStatus;
    blockHash?: string;
    blockNumber?: number;
    confirmations?: number;
    data?: string;
    secret?: string;
    feePrice?: number;
    fee?: number;
    feeAssetCode?: string;
    _raw: TransactionType;
    logs?: any;
}
export declare enum TxStatus {
    Pending = "PENDING",
    Failed = "FAILED",
    Success = "SUCCESS",
    Unknown = "UNKNOWN"
}
export type TransactionRequest = {
    asset?: Asset;
    feeAsset?: Asset;
    to?: AddressType;
    data?: string;
    value?: BigNumber;
    fee?: FeeType;
    gasLimit?: number;
};
