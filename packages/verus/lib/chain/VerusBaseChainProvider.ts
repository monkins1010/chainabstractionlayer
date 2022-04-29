import { AddressType } from '@liquality/types';
import { UTXO, AddressDeltas } from '../types';

export abstract class VerusBaseChainProvider {


    public abstract getRawTransactionByHash(transactionHash: string): Promise<string>;

    public abstract getTransactionHex(transactionHash: string): Promise<string>;

    public abstract getFeePerByte(numberOfBlocks?: number): Promise<number>;

    public abstract getUnspentTransactions(addresses: AddressType[]): Promise<UTXO[]>;

    public abstract getAddressTransactionCounts(_addresses: AddressType[]): Promise<AddressDeltas>;

    public abstract getMinRelayFee(): Promise<number>;
}
