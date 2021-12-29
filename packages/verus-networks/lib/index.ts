import { networks, Network as VerusJsLibNetwork } from 'bitcoinjs-lib'
import { Network } from '@liquality/types'

export interface VerusNetwork extends Network, VerusJsLibNetwork {}

const verus: VerusNetwork = {
  name: 'verus',
  ...networks.bitcoin,
  coinType: '0',
  isTestnet: false
}

const verus_testnet: VerusNetwork = {
  name: 'verus_testnet',
  ...networks.testnet,
  coinType: '1',
  isTestnet: true
}

const VerusNetworks = {
  verus,
  verus_testnet
}

export { VerusNetworks }
