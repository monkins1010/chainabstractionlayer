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
            privateKey: 'UxQVXU9Za2woeWURibkpEX8jxfacEnFxcWSiBv6Jv7uDzteXB4CM',
            privateKeyRegex: /^[U]\w{51}$/,
            signedMessage:
                '203a5f3e6066f58f8cf5b939d3f9a6427824482311ccdb3be136a4dc2738b9e9407c1813b77c753ef510c57c8c41c8675c547396b1c2cd62925d8e3cb92dfe9133',
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
