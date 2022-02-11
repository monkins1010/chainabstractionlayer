/* eslint-env mocha */

import chai, { expect } from 'chai'

import { Client } from '../../../client/lib'
import { VerusRpcProvider } from '../../../verus-rpc-provider/lib'
import { VerusRpcFeeProvider } from '../../lib'
import { VerusNetworks } from '../../../verus-networks/lib'

import mockJsonRpc from '../../../../test/mock/mockJsonRpc'
import verusRpc from '../../../../test/mock/verus/rpc'

chai.config.truncateThreshold = 0

const MINUTE = 60

describe('Verus RPC Fee provider', () => {
  let client: Client

  beforeEach(() => {
    client = new Client()
    client.addProvider(
      new VerusRpcProvider({
        uri: 'http://localhost:20656',
        network: VerusNetworks.verus_testnet
      })
    )
    client.addProvider(new VerusRpcFeeProvider())

    mockJsonRpc('http://localhost:20656', verusRpc, 100)
  })

  describe('getFees', () => {
    it('Should return correct fees', async () => {
      const fees = await client.chain.getFees()

      expect(fees.slow.fee).to.equal(25)
      expect(fees.slow.wait).to.equal(6 * MINUTE)

      expect(fees.average.fee).to.equal(25)
      expect(fees.average.wait).to.equal(3 * MINUTE)

      expect(fees.fast.fee).to.equal(25)
      expect(fees.fast.wait).to.equal(1 * MINUTE)
    })
  })
})
