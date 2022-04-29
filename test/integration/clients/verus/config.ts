import { BigNumber, ChainId, Network } from '@liquality/types';

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
            uri: 'http://localhost:8000/',
            username: 'verus',
            password: 'local321',
            network,
        },
        assets: [
            {
                name: 'Bitcoin',
                code: 'BTC',
                chain: ChainId.Bitcoin,
                isNative: true,
                type: 'native',
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
