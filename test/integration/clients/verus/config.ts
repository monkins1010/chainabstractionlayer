import { AssetTypes, BigNumber, ChainId, Network } from '@chainify/types';

import { IConfig } from '../../types';

import utxolib from '@bitgo/utxo-lib';

export const VerusNodeConfig = (network: Network): IConfig => {
    return {
        ...(CommonVerusConfig(network) as IConfig),

        walletExpectedResult: {
            numberOfUsedAddresses: 2,
        },
    };
};

const CommonVerusConfig = (network: Network): Partial<IConfig> => {
    return {
        network: utxolib.networks[network.name],
        chainOptions: {
            uri: 'http://localhost:25789/',
            username: 'verus',
            password: 'pass',
            network: utxolib.networks[network.name],
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
