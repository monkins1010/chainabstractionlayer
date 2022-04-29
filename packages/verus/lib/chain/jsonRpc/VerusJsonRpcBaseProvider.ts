import { JsonRpcProvider } from '@liquality/client';
import { AddressType, BigNumber } from '@liquality/types';
import { UTXO as BitcoinUTXO } from '../../types';

import { VerusBaseChainProvider } from '../VerusBaseChainProvider';
import { ProviderOptions, AddressDeltas, VerusRpc } from './types';

export class VerusJsonRpcBaseProvider extends VerusBaseChainProvider {
  public jsonRpc: JsonRpcProvider;
  protected _options: ProviderOptions;

  constructor(options: ProviderOptions) {
    super();
    this.jsonRpc = new JsonRpcProvider(options.uri, options.username, options.password);
    this._options = {
      feeBlockConfirmations: 1,
      defaultFeePerByte: 3,
      ...options,
    };
  }

  public async getRawTransactionByHash(transactionHash: string): Promise<string> {
    return await this.jsonRpc.send('getrawtransaction', [transactionHash, 0]);
  }

  public async getTransactionHex(transactionHash: string): Promise<string> {
    return this.jsonRpc.send('getrawtransaction', [transactionHash]);
  }

  public async getFeePerByte(numberOfBlocks?: number): Promise<number> {
    try {
      const fee = await this.jsonRpc.send('estimatefee', [numberOfBlocks]);

      if (fee && fee > 0) {
        if (fee < 0.0005) {
          return 25
        } else {
          // Get satoshis per byte (* 100000000 / 1000)
          return new BigNumber(fee).times(1e5).toNumber()
        }
      }

      throw new Error('Invalid estimated fee');
    } catch (e) {
      return this._options.defaultFeePerByte;
    }
  }

  public async getUnspentTransactions(_addresses: AddressType[]): Promise<BitcoinUTXO[]> {
    const addresses = _addresses.map((a) => a.toString());
    const addressUtxoResponse = await this.jsonRpc.send('getaddressutxos', [addresses, { chainInfo: true }])

    return addressUtxoResponse.utxos.map((utxo: { [key: string]: any }) => {
      return {
        txid: utxo.txid,
        vout: utxo.outputIndex,
        address: utxo.address,
        scriptPubKey: utxo.script,
        amount: new BigNumber(utxo.satoshis).dividedBy(1e8).toNumber(),
        value: utxo.satoshis,
        confirmations: addressUtxoResponse.height - utxo.height
      }
    })
  }

  public async getAddressTransactionCounts(_addresses: AddressType[]): Promise<AddressDeltas> {
    const addresses = _addresses.map((a) => a.toString());
    const addressDeltas: VerusRpc.AddressDelta[] = await this.jsonRpc.send('getaddressdeltas', [addresses])
    const deltasFormatted: AddressDeltas = {}

    for (const address of addresses) {
      deltasFormatted[address] = []
    }

    for (const delta of addressDeltas) {
      if (deltasFormatted[delta.address]) deltasFormatted[delta.address].push(delta)
      else deltasFormatted[delta.address] = [delta]
    }

    return deltasFormatted
  }

  public async getMinRelayFee(): Promise<number> {
    const { relayfee } = await this.jsonRpc.send('getnetworkinfo', []);
    return (relayfee * 1e8) / 1000;
  }
}
