import { Network as VerusJsLibNetwork } from 'bitcoinjs-lib'
import { Network } from '@liquality/types'
const bitgo = require('@bitgo/utxo-lib') // eslint-disable-line

export interface VerusNetwork extends Network, VerusJsLibNetwork {}

const verus: VerusNetwork = {
  name: 'verus',
  ...bitgo.networks.verus,
  coinType: '0',
  isTestnet: false
}

const verus_testnet: VerusNetwork = {
  name: 'verus_testnet',
  ...bitgo.networks.verus,
  coinType: '1',
  isTestnet: true
}

const VerusNetworks = {
  verus,
  verus_testnet
}

export { VerusNetworks }
