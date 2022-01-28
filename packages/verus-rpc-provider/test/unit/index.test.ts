/* eslint-env mocha */
import chai, { expect } from 'chai'

import { Client } from '../../../client/lib'
import { VerusNetworks } from '../../../verus-networks/lib'
import { VerusRpcProvider } from '../../lib'

import mockJsonRpc from '../../../../test/mock/mockJsonRpc'
import verusRpc from '../../../../test/mock/verus/rpc'

chai.config.truncateThreshold = 0

describe('Verus RPC provider', () => {
  let client: Client
  let provider: VerusRpcProvider

  beforeEach(() => {
    client = new Client()
    provider = new VerusRpcProvider({
      uri: 'http://localhost:20656',
      username: 'verus',
      password: 'local321',
      network: VerusNetworks.verus_testnet
    })
    client.addProvider(provider)

    mockJsonRpc('http://localhost:20656', verusRpc, 100)
  })

  describe('getFeePerByte', () => {
    it('should return default value 3 sat per byte', async () => {
      const fee = await provider.getFeePerByte(null)
      expect(fee).to.equal(3)
    })
  })

  describe('getBlockHeight', () => {
    it('should return correct blockheight', async () => {
      const height = await provider.getBlockHeight()
      expect(height).to.equal(79112)
    })
  })

  describe('decodeRawTransaction', () => {
    it('should return decoded transaction', async () => {
      const tx = await provider.decodeRawTransaction(
        '0400008085202f89043b2624fb3510a3d3eebdc798cc266c781cce55055b7ee0043aa0550ca040ba1b00000000694c67010101012103e1894e9d487125be5a8c6657a8ce01bc81ba7816d698dbfcfb0483754eb5a2d94063059418b71f3b2bfeb2c8177246f0449a61e4d143e0584c7276bb02250c61d50761a00b2e9b1452a176cbb1c8591823d92abe3b03370b98037d857ec3384a01ffffffffdce97435c25638dd46aa2a303b742116bb7826e3822cbbb87ca2831f1ac99c1e00000000694c67010101012103e1894e9d487125be5a8c6657a8ce01bc81ba7816d698dbfcfb0483754eb5a2d9406cb0c4f636661e7a33cb52510b427178ea5e384eb006ab6b8ca23333f77302af3d8e3f60e01be27b03f580aee26b633b4e9c406c83afc28ac7da489652469f33ffffffff033196bc1da3875a4314eed4adf12637100fca93d620bb1c93a85e0fecc8c60702000000694c67010101012102e3154f8122ff442fbca3ff8ff4d4fb2d9285fd9f4d841d58fb8d6b7acefed60f40b8569f7d4c6ba5f31c4f13982a78c111bcca83ac429a99039eebbaf204acf42837cde4a8af2e002bbbdbcc86b5ce9d2d7dd63ca21561aa44cb5d3aeea10f5afcffffffff113376c34a8d11b3a45b4e91aee0c743d8818d624e759eaf5990997d6f95ddb200000000694c67010101012102e3154f8122ff442fbca3ff8ff4d4fb2d9285fd9f4d841d58fb8d6b7acefed60f405465b8760c99363158e336f9e28224ebb10b6c925b0e9bd9062728f05a847f831d95a234eb3d65a068a011da23d5f8c20446515e779d27c03308a7bbb8716b27ffffffff020000000000000000ef2704030001012103e1894e9d487125be5a8c6657a8ce01bc81ba7816d698dbfcfb0483754eb5a2d9cc4cc304030301012103e1894e9d487125be5a8c6657a8ce01bc81ba7816d698dbfcfb0483754eb5a2d94c9a0101a6ef9ea235635e328124ff3429db9f9e91b64e2d033196bc1da3875a4314eed4adf12637100fca93d620bb1c93a85e0fecc8c607010000000101c6d8a087e1429b3676913435fb21e42569005ebc02030e270000014120f9b5bdc2d0210f09037f6f8306d8b6230459873da79d4f683bb755da524dabc05a0e2e93881e7ebe9fb000a47dc47ce3854a5a41bce50ed3e6798accc9fa8820007500000000000000009c2704030001012102e3154f8122ff442fbca3ff8ff4d4fb2d9285fd9f4d841d58fb8d6b7acefed60fcc4c7004030601012102e3154f8122ff442fbca3ff8ff4d4fb2d9285fd9f4d841d58fb8d6b7acefed60f48018167460c2f56774ed27eeb8685f29f6cec0b090b00033196bc1da3875a4314eed4adf12637100fca93d620bb1c93a85e0fecc8c6070100000002000000000100000001000000007500000000232700000000000000000000000000'
      )

      expect(tx).to.deep.equal({
        txid: 'db0eda350af018e9e6162b7e456573459d7dbf092e6fc1dd37a0e18ee80c1a12',
        overwintered: true,
        version: 4,
        versiongroupid: '892f2085',
        locktime: 0,
        expiryheight: 10019,
        vin: [
          {
            txid: '1bba40a00c55a03a04e07e5b0555ce1c786c26cc98c7bdeed3a31035fb24263b',
            vout: 0,
            scriptSig: {
              asm: '010101012103e1894e9d487125be5a8c6657a8ce01bc81ba7816d698dbfcfb0483754eb5a2d94063059418b71f3b2bfeb2c8177246f0449a61e4d143e0584c7276bb02250c61d50761a00b2e9b1452a176cbb1c8591823d92abe3b03370b98037d857ec3384a01',
              hex: '4c67010101012103e1894e9d487125be5a8c6657a8ce01bc81ba7816d698dbfcfb0483754eb5a2d94063059418b71f3b2bfeb2c8177246f0449a61e4d143e0584c7276bb02250c61d50761a00b2e9b1452a176cbb1c8591823d92abe3b03370b98037d857ec3384a01'
            },
            value: 0.0,
            valueSat: 0,
            address: 'xWTu6V6Uj9jdzSHzocXj2T7kN5ngddRvHu',
            sequence: 4294967295
          },
          {
            txid: '1e9cc91a1f83a27cb8bb2c82e32678bb1621743b302aaa46dd3856c23574e9dc',
            vout: 0,
            scriptSig: {
              asm: '010101012103e1894e9d487125be5a8c6657a8ce01bc81ba7816d698dbfcfb0483754eb5a2d9406cb0c4f636661e7a33cb52510b427178ea5e384eb006ab6b8ca23333f77302af3d8e3f60e01be27b03f580aee26b633b4e9c406c83afc28ac7da489652469f33',
              hex: '4c67010101012103e1894e9d487125be5a8c6657a8ce01bc81ba7816d698dbfcfb0483754eb5a2d9406cb0c4f636661e7a33cb52510b427178ea5e384eb006ab6b8ca23333f77302af3d8e3f60e01be27b03f580aee26b633b4e9c406c83afc28ac7da489652469f33'
            },
            value: 0.0,
            valueSat: 0,
            address: 'xWTu6V6Uj9jdzSHzocXj2T7kN5ngddRvHu',
            sequence: 4294967295
          },
          {
            txid: '07c6c8ec0f5ea8931cbb20d693ca0f103726f1add4ee14435a87a31dbc963103',
            vout: 2,
            scriptSig: {
              asm: '010101012102e3154f8122ff442fbca3ff8ff4d4fb2d9285fd9f4d841d58fb8d6b7acefed60f40b8569f7d4c6ba5f31c4f13982a78c111bcca83ac429a99039eebbaf204acf42837cde4a8af2e002bbbdbcc86b5ce9d2d7dd63ca21561aa44cb5d3aeea10f5afc',
              hex: '4c67010101012102e3154f8122ff442fbca3ff8ff4d4fb2d9285fd9f4d841d58fb8d6b7acefed60f40b8569f7d4c6ba5f31c4f13982a78c111bcca83ac429a99039eebbaf204acf42837cde4a8af2e002bbbdbcc86b5ce9d2d7dd63ca21561aa44cb5d3aeea10f5afc'
            },
            value: 0.0,
            valueSat: 0,
            address: 'xQ72r4jxmD6nrgC42aDH9wGkAdXeubPmD8',
            sequence: 4294967295
          },
          {
            txid: 'b2dd956f7d999059af9e754e628d81d843c7e0ae914e5ba4b3118d4ac3763311',
            vout: 0,
            scriptSig: {
              asm: '010101012102e3154f8122ff442fbca3ff8ff4d4fb2d9285fd9f4d841d58fb8d6b7acefed60f405465b8760c99363158e336f9e28224ebb10b6c925b0e9bd9062728f05a847f831d95a234eb3d65a068a011da23d5f8c20446515e779d27c03308a7bbb8716b27',
              hex: '4c67010101012102e3154f8122ff442fbca3ff8ff4d4fb2d9285fd9f4d841d58fb8d6b7acefed60f405465b8760c99363158e336f9e28224ebb10b6c925b0e9bd9062728f05a847f831d95a234eb3d65a068a011da23d5f8c20446515e779d27c03308a7bbb8716b27'
            },
            value: 0.0,
            valueSat: 0,
            address: 'xLAxG7wtKFvyi4L1j6Qv3S9GEG8BysW9CG',
            sequence: 4294967295
          }
        ],
        vout: [
          {
            value: 0.0,
            valueZat: 0,
            valueSat: 0,
            n: 0,
            scriptPubKey: {
              type: 'cryptocondition',
              notaryevidence: {
                version: 1,
                type: 1,
                systemid: 'iJhCezBExJHvtyH3fGhNnt2NhU4Ztkf2yq',
                output: {
                  txid: '07c6c8ec0f5ea8931cbb20d693ca0f103726f1add4ee14435a87a31dbc963103',
                  voutnum: 1
                },
                confirmed: true,
                signatures: {
                  iMbvja8kNA7u8Q6DsgwBkJDBL3ZsiycXkd: {
                    version: 2,
                    blockheight: 9998,
                    signatures: [
                      '20f9b5bdc2d0210f09037f6f8306d8b6230459873da79d4f683bb755da524dabc05a0e2e93881e7ebe9fb000a47dc47ce3854a5a41bce50ed3e6798accc9fa8820'
                    ]
                  }
                },
                evidence: []
              },
              spendableoutput: true,
              reqSigs: 1,
              addresses: ['RQWMeecjGFF3ZAVeSimRbyG9iMDUHPY5Ny'],
              asm: '04030001012103e1894e9d487125be5a8c6657a8ce01bc81ba7816d698dbfcfb0483754eb5a2d9 OP_CHECKCRYPTOCONDITION 04030301012103e1894e9d487125be5a8c6657a8ce01bc81ba7816d698dbfcfb0483754eb5a2d94c9a0101a6ef9ea235635e328124ff3429db9f9e91b64e2d033196bc1da3875a4314eed4adf12637100fca93d620bb1c93a85e0fecc8c607010000000101c6d8a087e1429b3676913435fb21e42569005ebc02030e270000014120f9b5bdc2d0210f09037f6f8306d8b6230459873da79d4f683bb755da524dabc05a0e2e93881e7ebe9fb000a47dc47ce3854a5a41bce50ed3e6798accc9fa882000 OP_DROP',
              hex: '2704030001012103e1894e9d487125be5a8c6657a8ce01bc81ba7816d698dbfcfb0483754eb5a2d9cc4cc304030301012103e1894e9d487125be5a8c6657a8ce01bc81ba7816d698dbfcfb0483754eb5a2d94c9a0101a6ef9ea235635e328124ff3429db9f9e91b64e2d033196bc1da3875a4314eed4adf12637100fca93d620bb1c93a85e0fecc8c607010000000101c6d8a087e1429b3676913435fb21e42569005ebc02030e270000014120f9b5bdc2d0210f09037f6f8306d8b6230459873da79d4f683bb755da524dabc05a0e2e93881e7ebe9fb000a47dc47ce3854a5a41bce50ed3e6798accc9fa88200075'
            }
          },
          {
            value: 0.0,
            valueZat: 0,
            valueSat: 0,
            n: 1,
            scriptPubKey: {
              type: 'cryptocondition',
              finalizenotarization: {
                finalizationtype: 'finalizenotarization',
                status: 'confirmed',
                evidenceinputs: [0, 1],
                evidenceoutputs: [0],
                currencyid: 'iCtawpxUiCc2sEupt7Z4u8SDAncGZpgSKm',
                output: {
                  txid: '07c6c8ec0f5ea8931cbb20d693ca0f103726f1add4ee14435a87a31dbc963103',
                  voutnum: 1
                }
              },
              spendableoutput: true,
              reqSigs: 1,
              addresses: ['RRbKYitLH9EhQCvCo4bPZqJx3TWxASadxE'],
              asm: '04030001012102e3154f8122ff442fbca3ff8ff4d4fb2d9285fd9f4d841d58fb8d6b7acefed60f OP_CHECKCRYPTOCONDITION 04030601012102e3154f8122ff442fbca3ff8ff4d4fb2d9285fd9f4d841d58fb8d6b7acefed60f48018167460c2f56774ed27eeb8685f29f6cec0b090b00033196bc1da3875a4314eed4adf12637100fca93d620bb1c93a85e0fecc8c607010000000200000000010000000100000000 OP_DROP',
              hex: '2704030001012102e3154f8122ff442fbca3ff8ff4d4fb2d9285fd9f4d841d58fb8d6b7acefed60fcc4c7004030601012102e3154f8122ff442fbca3ff8ff4d4fb2d9285fd9f4d841d58fb8d6b7acefed60f48018167460c2f56774ed27eeb8685f29f6cec0b090b00033196bc1da3875a4314eed4adf12637100fca93d620bb1c93a85e0fecc8c60701000000020000000001000000010000000075'
            },
            spentTxId: '7f1a0a977c2d4ea223102dd0d011ee1b2e38146a59a03d967486fb58f1c20c49',
            spentIndex: 3,
            spentHeight: 10007
          }
        ],
        vjoinsplit: [],
        valueBalance: 0.0,
        valueBalanceZat: 0,
        vShieldedSpend: [],
        vShieldedOutput: []
      })
    })
  })

  describe('getBlockByHash', () => {
    it('should return a block', async () => {
      const block = await provider.getBlockByHash('00000001439a3bdcfa858e112db41fda5b7419668e3c2575bf5fb23529d8625d')

      expect(block).to.deep.equal({
        hash: '00000001439a3bdcfa858e112db41fda5b7419668e3c2575bf5fb23529d8625d',
        number: 630,
        timestamp: 1636967067,
        difficulty: 60179880.07283803,
        size: 1700,
        parentHash: '3ed630f8cf29bfd69548694bb1d552e8954d281f42effd828af6e0307956d984',
        nonce: '0000970dceda1554b2cee3cb4e5ae262843bac8554c81d0f39395aaf888d98d9',
        transactions: ['43a1fff9b19c0e45f053841b28f3196bc2fb86e8324eebb02b1f83921f3c10fd']
      })
    })
  })

  describe('getBalance', () => {
    it('should return correct balance in sats', async () => {
      const balance = await provider.getBalance(['RKrdSQgg4jcDfuKKwJpwJPLHMbqksg3kDe'])

      expect(balance.eq(366999680000)).to.be.true
    })
  })

  describe('getRawTransactionByHash', () => {
    it('should return a raw transaction', async () => {
      const tx = await provider.getRawTransactionByHash(
        '43a1fff9b19c0e45f053841b28f3196bc2fb86e8324eebb02b1f83921f3c10fd'
      )

      expect(tx).to.equal(
        '0400008085202f89010000000000000000000000000000000000000000000000000000000000000000ffffffff0402760200ffffffff02de8baa5e00000000232102c9ca37dac14c819a99ce4a71533ab8d3d5e37643ede9c4da0981081a074f75dfac0000000000000000551a040300010114a23f82866c21819f55a1668ba7b9932e6d326b1ecc37040314010114a23f82866c21819f55a1668ba7b9932e6d326b1e1c01a6ef9ea235635e328124ff3429db9f9e91b64e2d808e96aee46c01759b229261000000000000000000000000000000'
      )
    })
  })

  describe('getTransactionByHash', () => {
    it('should return a transaction', async () => {
      const tx = await provider.getTransactionByHash('43a1fff9b19c0e45f053841b28f3196bc2fb86e8324eebb02b1f83921f3c10fd')

      expect(tx).to.deep.equal({
        hash: '43a1fff9b19c0e45f053841b28f3196bc2fb86e8324eebb02b1f83921f3c10fd',
        value: 1588235230,
        _raw: {
          txid: '43a1fff9b19c0e45f053841b28f3196bc2fb86e8324eebb02b1f83921f3c10fd',
          hash: '43a1fff9b19c0e45f053841b28f3196bc2fb86e8324eebb02b1f83921f3c10fd',
          version: 4,
          size: 212,
          locktime: 1636967067,
          vin: [
            {
              coinbase: '02760200',
              sequence: 4294967295
            }
          ],
          vout: [
            {
              value: 15.8823523,
              valueSat: 1588235230,
              n: 0,
              scriptPubKey: {
                type: 'pubkey',
                spendableoutput: true,
                reqSigs: 1,
                addresses: ['RFoinkqD2QinMi25mUu5h7k3f4ETaBQWpo'],
                asm: '02c9ca37dac14c819a99ce4a71533ab8d3d5e37643ede9c4da0981081a074f75df OP_CHECKSIG',
                hex: '2102c9ca37dac14c819a99ce4a71533ab8d3d5e37643ede9c4da0981081a074f75dfac'
              },
              spentTxId: 'a078fd352957811cc3def6ba8c8ca29c949dec4222d23dda61dff6a62f71cd97',
              spentIndex: 48,
              spentHeight: 10446
            },
            {
              value: 0.0,
              valueSat: 0,
              n: 1,
              scriptPubKey: {
                type: 'cryptocondition',
                feepool: {
                  version: 1,
                  currencyvalues: {
                    iJhCezBExJHvtyH3fGhNnt2NhU4Ztkf2yq: 384.35287788
                  }
                },
                spendableoutput: true,
                reqSigs: 1,
                addresses: ['RQ55dLQ7uGnLx8scXfkaFV6QS6qVBGyxAG'],
                asm: '040300010114a23f82866c21819f55a1668ba7b9932e6d326b1e OP_CHECKCRYPTOCONDITION 040314010114a23f82866c21819f55a1668ba7b9932e6d326b1e1c01a6ef9ea235635e328124ff3429db9f9e91b64e2d808e96aee46c01 OP_DROP',
                hex: '1a040300010114a23f82866c21819f55a1668ba7b9932e6d326b1ecc37040314010114a23f82866c21819f55a1668ba7b9932e6d326b1e1c01a6ef9ea235635e328124ff3429db9f9e91b64e2d808e96aee46c0175'
              }
            }
          ],
          hex: '0400008085202f89010000000000000000000000000000000000000000000000000000000000000000ffffffff0402760200ffffffff02de8baa5e00000000232102c9ca37dac14c819a99ce4a71533ab8d3d5e37643ede9c4da0981081a074f75dfac0000000000000000551a040300010114a23f82866c21819f55a1668ba7b9932e6d326b1ecc37040314010114a23f82866c21819f55a1668ba7b9932e6d326b1e1c01a6ef9ea235635e328124ff3429db9f9e91b64e2d808e96aee46c01759b229261000000000000000000000000000000',
          blockhash: '00000001439a3bdcfa858e112db41fda5b7419668e3c2575bf5fb23529d8625d',
          confirmations: 78437,
          time: 1636967067,
          blocktime: 1636967067,
          vjoinsplit: [],
          valueBalance: 0.0,
          vShieldedSpend: [],
          vShieldedOutput: [],
          versiongroupid: '892f2085',
          overwintered: true,
          height: 630,
          expiryheight: 0
        },
        confirmations: 78437,
        status: 'SUCCESS',
        blockHash: '00000001439a3bdcfa858e112db41fda5b7419668e3c2575bf5fb23529d8625d',
        blockNumber: 630
        // Fees do not apply in this case because it is a coinbase tx, TODO: test a case where fees apply
        // fee: 3740,
        // feePrice: 20
      })
    })
  })
})
