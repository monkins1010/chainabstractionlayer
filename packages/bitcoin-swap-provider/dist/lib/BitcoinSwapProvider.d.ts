/// <reference types="node" />
import { Transaction, bitcoin, BigNumber, SwapParams, SwapProvider } from '@liquality/types';
import { Provider } from '@liquality/provider';
import { BitcoinNetwork } from '@liquality/bitcoin-networks';
import { payments } from 'bitcoinjs-lib';
interface BitcoinSwapProviderOptions {
    network: BitcoinNetwork;
    mode?: bitcoin.SwapMode;
}
export default class BitcoinSwapProvider extends Provider implements Partial<SwapProvider> {
    _network: BitcoinNetwork;
    _mode: bitcoin.SwapMode;
    constructor(options: BitcoinSwapProviderOptions);
    validateSwapParams(swapParams: SwapParams): void;
    getSwapOutput(swapParams: SwapParams): Buffer;
    getSwapInput(sig: Buffer, pubKey: Buffer, isClaim: boolean, secret?: string): Buffer;
    getSwapPaymentVariants(swapOutput: Buffer): {
        p2wsh: payments.Payment;
        p2shSegwit: payments.Payment;
        p2sh: payments.Payment;
    };
    initiateSwap(swapParams: SwapParams, feePerByte: number): Promise<Transaction<any>>;
    fundSwap(): Promise<null>;
    claimSwap(swapParams: SwapParams, initiationTxHash: string, secret: string, feePerByte: number): Promise<Transaction<bitcoin.Transaction>>;
    refundSwap(swapParams: SwapParams, initiationTxHash: string, feePerByte: number): Promise<Transaction<bitcoin.Transaction>>;
    _redeemSwap(swapParams: SwapParams, initiationTxHash: string, isClaim: boolean, secret: string, feePerByte: number): Promise<Transaction<bitcoin.Transaction>>;
    _redeemSwapOutput(initiationTxHash: string, value: BigNumber, address: string, swapOutput: Buffer, expiration: number, isClaim: boolean, secret: string, _feePerByte: number): Promise<Transaction<bitcoin.Transaction>>;
    extractSwapParams(outputScript: string): {
        recipientPublicKey: string;
        refundPublicKey: string;
        secretHash: string;
        expiration: number;
    };
    /**
     * Only to be used for situations where transaction is trusted. e.g to bump fee
     * DO NOT USE THIS TO VERIFY THE REDEEM
     */
    UNSAFE_isSwapRedeemTransaction(transaction: Transaction<bitcoin.Transaction>): Promise<boolean>;
    updateTransactionFee(tx: Transaction<bitcoin.Transaction> | string, newFeePerByte: number): Promise<any>;
    getInputScript(vin: bitcoin.Input): string[];
    doesTransactionMatchRedeem(initiationTxHash: string, tx: Transaction<bitcoin.Transaction>, isRefund: boolean): boolean;
    doesTransactionMatchInitiation(swapParams: SwapParams, transaction: Transaction<bitcoin.Transaction>): boolean;
    verifyInitiateSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<boolean>;
    findSwapTransaction(swapParams: SwapParams, blockNumber: number, predicate: (tx: Transaction<bitcoin.Transaction>) => boolean): Promise<any>;
    findInitiateSwapTransaction(swapParams: SwapParams, blockNumber: number): Promise<any>;
    findClaimSwapTransaction(swapParams: SwapParams, initiationTxHash: string, blockNumber: number): Promise<{
        secret: string;
        hash: string;
        value: number;
        status?: import("@liquality/types").TxStatus;
        blockHash?: string;
        blockNumber?: number;
        confirmations?: number;
        feePrice?: number;
        fee?: number;
        _raw: bitcoin.Transaction;
    }>;
    findRefundSwapTransaction(swapParams: SwapParams, initiationTxHash: string, blockNumber: number): Promise<any>;
    findFundSwapTransaction(): Promise<null>;
}
export {};
