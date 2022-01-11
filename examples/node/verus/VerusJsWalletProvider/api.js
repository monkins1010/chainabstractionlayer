const { Client, providers } = require('@liquality/bundle')
const config = require('./config')

const verusNetworks = providers.verus.networks
const verusNetwork = verusNetworks[config.verus.network]

const mneumonic = config.verus.mneumonic

exports.getProvider = () => {
  let provider = new Client()

  provider.addProvider(
    new providers.verus.VerusJsWalletProvider(
      verusNetwork,
      config.verus.rpc.host,
      config.verus.rpc.username,
      config.verus.rpc.password,
      mneumonic,
      'legacy'
    )
  )
  return provider
}
