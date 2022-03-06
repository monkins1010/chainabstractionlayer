/* eslint-env mocha */

import chai, { expect } from 'chai'
import BigNumber from 'bignumber.js'

import { Client } from '../../../client/lib'
import { VerusNetworks } from '../../../verus-networks/lib'
import { VerusNodeWalletProvider } from '../../lib'

import mockJsonRpc from '../../../../test/mock/mockJsonRpc'
import verusRpc from '../../../../test/mock/verus/rpc'

chai.config.truncateThreshold = 0

describe('Verus Node Wallet provider', () => {
  let client: Client
  let provider: VerusNodeWalletProvider

  beforeEach(() => {
    client = new Client()
    provider = new VerusNodeWalletProvider({
      network: VerusNetworks.verus_testnet,
      uri: 'http://localhost:21412',
      username: 'verus',
      password: 'local321'
    })
    client.addProvider(provider)

    mockJsonRpc('http://localhost:21412', verusRpc, 100)
  })

  describe('signMessage', () => {
    it('should return signature', async () => {
      const sig = await provider.signMessage('liquality', 'RBHnM7XTPAhrN9GrwrnQmaKmdb4avcmSgD')
      expect(sig).to.equal(
        '1f43ad0850d356c2569e092a3659d9387519eb0e291a0e1ff2c8b4b12e46b1540919c375420f681cd95fe862dac0df4ffbf63951b228774a7d18bfd58fbfa40ad0'
      )
    })
  })

  describe('sendTransaction', () => {
    it('should return transaction', async () => {
      const tx = await provider.sendTransaction({
        to: 'RN5gEqLUjEE8FmNrpkUTPY2nvUZCfBjNL3',
        value: new BigNumber(1000)
      })
      expect(tx.hash).to.equal('cc34cced64892a234b961addb2aee650718f39db1eee4f9513fba970ff962e87')
    })
  })
})
