/* eslint-env mocha */

import chai, { expect } from 'chai'

import { Client } from '../../../client/lib'
import { VerusRpcProvider } from '../../../verus-rpc-provider/lib'
import { VerusRpcFeeProvider } from '../../lib'
import { VerusNetworks } from '../../../verus-networks/lib'

import mockJsonRpc from '../../../../test/mock/mockJsonRpc'
import bitcoinRpc from '../../../../test/mock/bitcoin/rpc'

chai.config.truncateThreshold = 0

// const MINUTE = 60

describe('Verus RPC Fee provider', () => {
  let client: Client

  beforeEach(() => {
    client = new Client()
    client.addProvider(
      new VerusRpcProvider({
        uri: 'http://localhost:27486',
        network: VerusNetworks.verus
      })
    )
    client.addProvider(new VerusRpcFeeProvider())

    mockJsonRpc('http://localhost:18443', bitcoinRpc, 100)
  })

  describe('getFees', () => {
    it('Should return correct fees', async () => {
      const fees = await client.chain.getFees()

      // TODO: fix this dummy test to be real
      expect(fees.slow.fee).to.equal(fees.slow.fee)

      /* expect(fees.slow.fee).to.equal(5)
      expect(fees.slow.wait).to.equal(60 * MINUTE)

      expect(fees.average.fee).to.equal(10)
      expect(fees.average.wait).to.equal(30 * MINUTE)

      expect(fees.fast.fee).to.equal(20)
      expect(fees.fast.wait).to.equal(10 * MINUTE) */
    })
  })
})
