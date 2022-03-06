process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const { Client, providers } = require('../../../packages/bundle')
const { VerusRpcProvider, networks } = providers.verus

console.log(networks)

const verus = new Client()
verus.addProvider(new VerusRpcProvider({
  uri: 'http://localhost:21412',
  username: 'verus',
  password: 'local321'
}))

function time (ref = false) {
  if (ref) {
    const s = (Date.now() - ref) / 1000
    console.log(`Time: ${s}s`)
    return
  }

  return Date.now()
}

let x

;(async () => {
  try {
    x = time()
    const address = await verus.getMethod('getnewaddress')("")
    time(x)
    console.log(address)
    x = time()
    console.log(await verus.getMethod('getAddressBalance')({ addresses: [address] }))
    time(x)
  } catch (e) {
    console.log(e)
  }
})()
