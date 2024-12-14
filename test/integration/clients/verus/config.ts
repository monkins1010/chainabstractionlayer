import { AssetTypes, BigNumber, ChainId, Network } from '@chainify/types';
import { VerusTypes } from '@chainify/verus';
import { IConfig } from '../../types';

//import utxolib from '@bitgo/utxo-lib';

export const VerusNodeConfig = (network: Network): IConfig => {
    return {
        ...(CommonVerusConfig(network) as IConfig),

        walletExpectedResult: {
            numberOfUsedAddresses: 2,
        },
    };
};

export const VerusHdWalletConfig = (network: Network): IConfig => {
    return {
        ...(CommonVerusConfig(network) as IConfig),
        walletOptions: {
            mnemonic: 'witch collapse practice feed shame open despair creek road again ice least',
            baseDerivationPath: `m/84'/${network.coinType}'/0'`,
            addressType: VerusTypes.AddressType.BECH32,
        },
        walletExpectedResult: {
            numberOfUsedAddresses: 1,
            unusedAddress: 'RY8UCUvpq1vL17q9MYAvmRLqThNHvhD6nR',
            address: 'RUhmNGEBBjiGypVc5cw5bxp2q2S1Y3PnL2',
            privateKey: 'UpKTEZCXHYgbQKojswcPhkA8uhmX6vRmvU6Z5DpSqpZ9cGNVZCLf',
            privateKeyRegex: /^[U]\w{51}$/,
            signedMessage:
                '1fa9c95e1358a13642a869803ba69fa9a2bab37bc05aac0c073655f79e3ddb069f0ae85075536eb37bce1a1b557a2cf23135a1bd21e70cfb2b7efd2c00de7744bd',
        },

        recipientAddress: 'RY8UCUvpq1vL17q9MYAvmRLqThNHvhD6nR',
    };
};

const CommonVerusConfig = (network: Network): Partial<IConfig> => {
    return {
        network,
        chainOptions: {
            uri: 'http://localhost:25789/',
            username: 'verus',
            password: 'pass',
            network,
        },
        assets: [
            {
                name: 'Verus',
                code: 'VRSC',
                chain: ChainId.Verus,
                type: AssetTypes.native,
                decimals: 8,
            },
        ],

        swapParams: {
            value: new BigNumber(1000000),
        },

        sendParams: {
            value: null,
        },
    };
};
