import { BigNumber, SwapParams, SwapProvider, Transaction } from '@liquality/types';
import { Provider } from '@liquality/provider';
import { Keypair, PublicKey, TransactionInstruction } from '@solana/web3.js';
import { SolanaNetwork } from '@liquality/solana-networks';
export default class SolanaSwapProvider extends Provider implements Partial<SwapProvider> {
    private _network;
    constructor(network: SolanaNetwork);
    getSwapSecret(claimTxHash: string): Promise<string>;
    initiateSwap(swapParams: SwapParams): Promise<Transaction>;
    claimSwap(swapParams: SwapParams, initiationTxHash: string, secret: string): Promise<Transaction>;
    refundSwap(swapParams: SwapParams, initiationTxHash: string): Promise<Transaction>;
    fundSwap(): Promise<null>;
    verifyInitiateSwapTransaction(swapParams: SwapParams, initiationTxHash: string): Promise<boolean>;
    _collectLamports(appAccountPubkey: PublicKey, recipient: PublicKey, data: Uint8Array, _programId: string): Promise<TransactionInstruction>;
    _createStorageAccountInstruction(signer: Keypair, appAccount: Keypair, lamports: BigNumber, space: number, _programId: string): TransactionInstruction;
    _createTransactionInstruction: (signer: Keypair, appAccount: Keypair, _programId: string, data: Uint8Array) => TransactionInstruction;
    _checkIfProgramAccountExists(programAccount: string): Promise<boolean>;
}
