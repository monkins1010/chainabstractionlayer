import { VerusNetwork } from './types'
const bitgo = require('@bitgo/utxo-lib') // eslint-disable-line

const verus: VerusNetwork = {
    name: 'verus',
    ...bitgo.networks.verus,
    bitgokey: 'verus',
    coinType: '0',
    isTestnet: false
}

const verus_testnet: VerusNetwork = {
    name: 'verus_testnet',
    ...bitgo.networks.verustest,
    bitgokey: 'verustest',
    coinType: '1',
    isTestnet: true
}

const VerusNetworks = {
    verus,
    verus_testnet
}

export { VerusNetworks }
