import { WalletProvider } from '@liquality/wallet-provider';
import { Address, BigNumber, Transaction, terra, SendOptions } from '@liquality/types';
import { TerraNetwork } from '@liquality/terra-networks';
import { MsgSend, MsgExecuteContract } from '@terra-money/terra.js';
interface TerraWalletProviderOptions {
    network: TerraNetwork;
    mnemonic: string;
    baseDerivationPath: string;
    asset: string;
    feeAsset: string;
    tokenAddress?: string;
}
export default class TerraWalletProvider extends WalletProvider {
    _network: TerraNetwork;
    _baseDerivationPath: string;
    _addressCache: {
        [key: string]: Address;
    };
    private _mnemonic;
    private _signer;
    private _lcdClient;
    private _wallet;
    private _asset;
    private _feeAsset;
    private _tokenAddress;
    _accAddressKey: string;
    constructor(options: TerraWalletProviderOptions);
    exportPrivateKey(): string;
    isWalletAvailable(): Promise<boolean>;
    getAddresses(): Promise<Address[]>;
    getUsedAddresses(): Promise<Address[]>;
    getUnusedAddress(): Promise<Address>;
    signMessage(message: string): Promise<string>;
    getConnectedNetwork(): Promise<TerraNetwork>;
    sendTransaction(sendOptions: SendOptions): Promise<Transaction<terra.InputTransaction>>;
    sendSweepTransaction(address: string | Address): Promise<Transaction<terra.InputTransaction>>;
    getTaxFees(amount: number, denom: string, max: boolean): Promise<any>;
    canUpdateFee(): boolean;
    _sendMessage(to: Address | string, value: BigNumber): MsgSend | MsgExecuteContract;
    _getAccAddressKey(): string;
    private _setSigner;
    private _createWallet;
    private _broadcastTx;
    private composeTransaction;
}
export {};
