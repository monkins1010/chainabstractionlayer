import { Signer } from '@ethersproject/abstract-signer';
import { AddressZero } from '@ethersproject/constants';
import { BaseProvider, Log } from '@ethersproject/providers';
import { Swap } from '@liquality/client';
import { TxNotFoundError } from '@liquality/errors';
import { FeeType, SwapParams, Transaction } from '@liquality/types';
import { compare, ensure0x, Math, remove0x, validateSecret, validateSecretAndHash } from '@liquality/utils';
import { LiqualityHTLC, LiqualityHTLC__factory } from '../typechain';
import { ClaimEvent, InitiateEvent, RefundEvent } from '../typechain/LiqualityHTLC';
import { EthersTransactionResponse } from '../types';
import { parseSwapParams, toEthereumTxRequest } from '../utils';
import { EvmBaseWalletProvider } from '../wallet/EvmBaseWalletProvider';

export abstract class EvmBaseSwapProvider extends Swap<BaseProvider, Signer> {
    protected walletProvider: EvmBaseWalletProvider<BaseProvider>;
    protected contract: LiqualityHTLC;

    constructor(swapOptions: any, walletProvider?: EvmBaseWalletProvider<BaseProvider>) {
        super(walletProvider);

        if (walletProvider) {
            this.contract = LiqualityHTLC__factory.connect(swapOptions.contractAddress, this.walletProvider.getSigner());
        }
    }

    public async initiateSwap(swapParams: SwapParams, fee: FeeType): Promise<Transaction<EthersTransactionResponse>> {
        this.validateSwapParams(swapParams);
        const parsedSwapParams = parseSwapParams(swapParams);
        const tx = await this.contract.populateTransaction.initiate(parsedSwapParams, {
            value: swapParams.asset.isNative ? parsedSwapParams.amount : 0,
        });
        const txResponse = await this.walletProvider.sendTransaction(toEthereumTxRequest(tx, fee));
        return txResponse;
    }

    public async claimSwap(
        swapParams: SwapParams,
        initTxHash: string,
        secret: string,
        fee: FeeType
    ): Promise<Transaction<EthersTransactionResponse>> {
        validateSecret(secret);
        validateSecretAndHash(secret, swapParams.secretHash);

        const transaction: Transaction<InitiateEvent> = await this.walletProvider.getChainProvider().getTransactionByHash(initTxHash);
        await this.verifyInitiateSwapTransaction(swapParams, transaction);

        if (transaction?.logs) {
            for (const log of transaction.logs as Log[]) {
                const initiate = this.contract.interface.parseLog(log);

                if (initiate?.args?.id) {
                    const tx = await this.contract.populateTransaction.claim(initiate.args.id, ensure0x(secret));
                    const txResponse = await this.walletProvider.sendTransaction(toEthereumTxRequest(tx, fee));
                    return txResponse;
                }
            }
        }
    }

    public async refundSwap(swapParams: SwapParams, initTxHash: string, fee: FeeType): Promise<Transaction<EthersTransactionResponse>> {
        const transaction = await this.walletProvider.getChainProvider().getTransactionByHash(initTxHash);

        await this.verifyInitiateSwapTransaction(swapParams, transaction);

        if (transaction?.logs) {
            for (const log of transaction.logs as Log[]) {
                const initiate = this.contract.interface.parseLog(log);

                if (initiate?.args?.id) {
                    const tx = await this.contract.populateTransaction.refund(initiate.args.id);
                    const txResponse = await this.walletProvider.sendTransaction(toEthereumTxRequest(tx, fee));
                    return txResponse;
                }
            }
        }
    }

    protected doesTransactionMatchInitiation(swapParams: SwapParams, transaction: Transaction<InitiateEvent>): boolean {
        let htlcArgs = transaction?._raw?.args;

        if (!htlcArgs) {
            if (transaction?.logs) {
                for (const log of transaction.logs as Log[]) {
                    const initiate = this.contract.interface.parseLog(log);

                    if (initiate) {
                        htlcArgs = initiate.args as any;
                    }
                }
            }
        }

        if (htlcArgs) {
            return (
                Math.eq(htlcArgs.htlc.amount, swapParams.value) &&
                Math.eq(htlcArgs.htlc.expiration, swapParams.expiration) &&
                compare(htlcArgs.htlc.recipientAddress, swapParams.recipientAddress.toString()) &&
                compare(htlcArgs.htlc.refundAddress, swapParams.refundAddress.toString()) &&
                compare(htlcArgs.htlc.tokenAddress, swapParams.asset.isNative ? AddressZero : swapParams.asset.contractAddress) &&
                compare(remove0x(htlcArgs.htlc.secretHash), remove0x(swapParams.secretHash))
            );
        }
    }

    async getSwapSecret(claimTx: string): Promise<string> {
        const transaction: Transaction<ClaimEvent> = await this.walletProvider.getChainProvider().getTransactionByHash(claimTx);

        if (!transaction) {
            throw new TxNotFoundError(`Transaction not found: ${claimTx}`);
        }

        if (transaction?.logs) {
            for (const log of transaction.logs as Log[]) {
                const claim = this.contract.interface.parseLog(log);

                if (claim?.args?.id && claim.args.secret) {
                    return remove0x(claim.args.secret);
                }
            }
        }
    }

    abstract findInitiateSwapTransaction(swapParams: SwapParams, _blockNumber?: number): Promise<Transaction<InitiateEvent>>;

    abstract findRefundSwapTransaction(swapParams: SwapParams, initTxHash: string, blockNumber?: number): Promise<Transaction<RefundEvent>>;

    abstract findClaimSwapTransaction(swapParams: SwapParams, initTxHash: string, _blockNumber?: number): Promise<Transaction<ClaimEvent>>;
}
