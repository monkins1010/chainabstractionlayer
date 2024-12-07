import { AssetTypes, BigNumber, ChainId, Network } from '@chainify/types';

import { IConfig } from '../../types';

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
        network,
        chainOptions: {
            uri: 'http://localhost:18443/',
            username: 'verus',
            password: 'local321',
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
