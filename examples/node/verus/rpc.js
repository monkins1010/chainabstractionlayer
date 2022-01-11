const { Client, providers } = require('../../../packages/bundle')
const { VerusRpcProvider } = providers.verus

const verus = new Client()
verus.addProvider(new VerusRpcProvider({
  uri: 'http://localhost:20656',
  username: 'verus',
  password: 'local321'
}))

;(async () => {
  console.log(await verus.chain.getInfo())
})()
