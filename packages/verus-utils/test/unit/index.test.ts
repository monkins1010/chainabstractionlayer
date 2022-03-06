/* eslint-env mocha */

import { expect } from 'chai'

import { VerusNetworks } from '../../../verus-networks/lib'
import * as VerusUtil from '../../lib'

describe('Verus Util', () => {
  describe('calculateFee', () => {
    it('should return correct fees', () => {
      expect(VerusUtil.calculateFee(1, 1, 3)).to.equal(576)
      expect(VerusUtil.calculateFee(2, 1, 3)).to.equal(1020)
    })
  })

  describe('compressPubKey', () => {
    it('should return compressed public key', () => {
      expect(
        VerusUtil.compressPubKey(
          '0493fc49dfd662510bc4d91b4f689d1732ebe4e2d7a67eebc37f76c8d6ec283ef098574ba8b41581532c09f38e47d1790dad1a09417ddbde95af5a1314f3f08c37'
        )
      ).to.equal('0393fc49dfd662510bc4d91b4f689d1732ebe4e2d7a67eebc37f76c8d6ec283ef0')

      expect(
        VerusUtil.compressPubKey(
          '04b1c13be24ddc9f6e816d5469f0874ed965c8bef4084b465f679bf05071b676b888e708bc3648c4fab3468d2f527eb0e3da99025b0962985b2563ec191c1fd158'
        )
      ).to.equal('02b1c13be24ddc9f6e816d5469f0874ed965c8bef4084b465f679bf05071b676b8')
    })
  })

  describe('txHashToObject', () => {
    it('p2pkh', () => {
      const hash =
        '0400008085202f89014f33a8e7cc1837c5865422bdfcaf39e0c30f814b1125eea2215f6ee50d9991c400000000694c670101010121026315c9932afb798bb067be897a06b6a1ccd5069962fab92000c6a3a5ff847808400673912632624f7198f41a2a288ea909ece6c2e818fd5729fddced3e9358f55028b243a62188680dee6bc298cd69746be3bf08d67e4508efe60a01062f23c69cfeffffff02ec7b2b7100000000541a0403000101145bc4531c0cf6935e2c27e5ca880faa4c1d7405ebcc360403090101145bc4531c0cf6935e2c27e5ca880faa4c1d7405eb1b01387eac757d699e03c57c62256d823830d9a5ab919a90a58ed4727500e1f505000000001976a914214451bce558998e6e8b21b28c38996d2b5d468788acd73f0100f63f01000000000000000000000000'
      const object = VerusUtil.decodeRawTransaction(hash, VerusNetworks.verus_testnet)

      expect(object).to.deep.equal({
        txid: '0b560e8fb2f15f31059760bd0fd7c150aa4cfd9456f03b47f4e34a3640b3a63d',
        hash: '0b560e8fb2f15f31059760bd0fd7c150aa4cfd9456f03b47f4e34a3640b3a63d',
        version: 4,
        locktime: 81879,
        vin: [
          {
            txid: 'c491990de56e5f21a2ee25114b810fc3e039affcbd225486c53718cce7a8334f',
            vout: 0,
            scriptSig: {
              asm: '0101010121026315c9932afb798bb067be897a06b6a1ccd5069962fab92000c6a3a5ff847808400673912632624f7198f41a2a288ea909ece6c2e818fd5729fddced3e9358f55028b243a62188680dee6bc298cd69746be3bf08d67e4508efe60a01062f23c69c',
              hex: '4c670101010121026315c9932afb798bb067be897a06b6a1ccd5069962fab92000c6a3a5ff847808400673912632624f7198f41a2a288ea909ece6c2e818fd5729fddced3e9358f55028b243a62188680dee6bc298cd69746be3bf08d67e4508efe60a01062f23c69c'
            },
            txinwitness: [],
            sequence: 4294967294
          }
        ],
        vout: [
          {
            value: 18.9867518,
            n: 0,
            scriptPubKey: {
              asm: '0403000101145bc4531c0cf6935e2c27e5ca880faa4c1d7405eb OP_CHECKCRYPTOCONDITION 0403090101145bc4531c0cf6935e2c27e5ca880faa4c1d7405eb1b01387eac757d699e03c57c62256d823830d9a5ab919a90a58ed472 OP_DROP',
              hex: '1a0403000101145bc4531c0cf6935e2c27e5ca880faa4c1d7405ebcc360403090101145bc4531c0cf6935e2c27e5ca880faa4c1d7405eb1b01387eac757d699e03c57c62256d823830d9a5ab919a90a58ed47275',
              reqSigs: 1,
              type: 'nonstandard',
              addresses: []
            }
          },
          {
            value: 1,
            n: 1,
            scriptPubKey: {
              asm: 'OP_DUP OP_HASH160 214451bce558998e6e8b21b28c38996d2b5d4687 OP_EQUALVERIFY OP_CHECKSIG',
              hex: '76a914214451bce558998e6e8b21b28c38996d2b5d468788ac',
              reqSigs: 1,
              type: 'pubkeyhash',
              addresses: ['RCK6DkgDpPSjzDGYCXBTWs5BGTGpCPvuDk']
            }
          }
        ],
        hex: '0400008085202f89014f33a8e7cc1837c5865422bdfcaf39e0c30f814b1125eea2215f6ee50d9991c400000000694c670101010121026315c9932afb798bb067be897a06b6a1ccd5069962fab92000c6a3a5ff847808400673912632624f7198f41a2a288ea909ece6c2e818fd5729fddced3e9358f55028b243a62188680dee6bc298cd69746be3bf08d67e4508efe60a01062f23c69cfeffffff02ec7b2b7100000000541a0403000101145bc4531c0cf6935e2c27e5ca880faa4c1d7405ebcc360403090101145bc4531c0cf6935e2c27e5ca880faa4c1d7405eb1b01387eac757d699e03c57c62256d823830d9a5ab919a90a58ed4727500e1f505000000001976a914214451bce558998e6e8b21b28c38996d2b5d468788acd73f0100f63f01000000000000000000000000'
      })
    })

    // it('p2wsh (swap)', () => {
    //   const hash =
    //     '0200000000010178633fee2c731ce69f8371e8d729146b53ce2fa2c9efcbe19bab6cf904c24feb00000000000000000002e49915030000000022002060a5dc9e85a041ef4ff3126f0baca6a9f78940ed6d33f4962629a7ee34d0b9c59cd6df0200000000160014cd05fe5ca22d62136d263dfa3c8adc764965f1e502483045022100e354e70ffeb5c4a6ee50b4e8bf84c5628f1d4a29e37573a99b8ab06d677361f202200cd9eff551ccafc081d6f154c3e2707383317ba75c70b62416fd9285378e254a0121034a7c401ba34336db48cd87cc3b363430bd1f85e4c7d723442a6ee1325d467ea300000000'
    //   const object = VerusUtil.decodeRawTransaction(hash, VerusNetworks.verus)
    //   expect(object).to.deep.equal({
    //     txid: 'bea65e9461a333703c5f4f2c65a3204469a6016857df41b5aff0ecc7269f1cd9',
    //     hash: 'bea65e9461a333703c5f4f2c65a3204469a6016857df41b5aff0ecc7269f1cd9',
    //     version: 2,
    //     size: 235,
    //     locktime: 0,
    //     vin: [
    //       {
    //         txid: 'eb4fc204f96cab9be1cbefc9a22fce536b1429d7e871839fe61c732cee3f6378',
    //         vout: 0,
    //         scriptSig: {
    //           asm: '',
    //           hex: ''
    //         },
    //         txinwitness: [
    //           '3045022100e354e70ffeb5c4a6ee50b4e8bf84c5628f1d4a29e37573a99b8ab06d677361f202200cd9eff551ccafc081d6f154c3e2707383317ba75c70b62416fd9285378e254a01',
    //           '034a7c401ba34336db48cd87cc3b363430bd1f85e4c7d723442a6ee1325d467ea3'
    //         ],
    //         sequence: 0
    //       }
    //     ],
    //     vout: [
    //       {
    //         value: 0.517473,
    //         n: 0,
    //         scriptPubKey: {
    //           asm: 'OP_0 60a5dc9e85a041ef4ff3126f0baca6a9f78940ed6d33f4962629a7ee34d0b9c5',
    //           hex: '002060a5dc9e85a041ef4ff3126f0baca6a9f78940ed6d33f4962629a7ee34d0b9c5',
    //           reqSigs: 1,
    //           type: 'witness_v0_scripthash',
    //           addresses: ['bc1qvzjae8595pq77nlnzfhsht9x48mcjs8dd5elf93x9xn7udxsh8zsjva57z']
    //         }
    //       },
    //       {
    //         value: 0.482239,
    //         n: 1,
    //         scriptPubKey: {
    //           asm: 'OP_0 cd05fe5ca22d62136d263dfa3c8adc764965f1e5',
    //           hex: '0014cd05fe5ca22d62136d263dfa3c8adc764965f1e5',
    //           reqSigs: 1,
    //           type: 'witness_v0_keyhash',
    //           addresses: ['bc1qe5zluh9z943pxmfx8harezkuweyktu09cxxkac']
    //         }
    //       }
    //     ],
    //     hex: '0200000000010178633fee2c731ce69f8371e8d729146b53ce2fa2c9efcbe19bab6cf904c24feb00000000000000000002e49915030000000022002060a5dc9e85a041ef4ff3126f0baca6a9f78940ed6d33f4962629a7ee34d0b9c59cd6df0200000000160014cd05fe5ca22d62136d263dfa3c8adc764965f1e502483045022100e354e70ffeb5c4a6ee50b4e8bf84c5628f1d4a29e37573a99b8ab06d677361f202200cd9eff551ccafc081d6f154c3e2707383317ba75c70b62416fd9285378e254a0121034a7c401ba34336db48cd87cc3b363430bd1f85e4c7d723442a6ee1325d467ea300000000'
    //   })
    // })

    // it('p2wsh (swap redeem)', () => {
    //   const hash =
    //     '02000000000101d91c9f26c7ecf0afb541df576801a6694420a3652c4f5f3c7033a361945ea6be00000000000000000001a45e150300000000160014c42dba1576d9ba619d92b47e26f97f8790a65b8405483045022100afbf55d5991ca4e8a9e423e39d55011f12e99fd8def7cc4a0347d777d1910ed802201aba22c141f34df7dc954dfbf0d1224c6ad05f6df70345c0903c948283532e9201210304bb3f24bd44298d578257e42c61f716f884b4743780eef03c4b1e0a30a35fe420767050193726eb46aa4efb0dc6979a53c515b061d9c4d043871b30fcb99d80220101616382012088a82014f786ddd0b839deec2c27357eb4e5a82ac2030e2b9782f5f05e0945ce5e32918876a914c42dba1576d9ba619d92b47e26f97f8790a65b846704332c3a5fb17576a914128371468880b80dd995b31e5cdef8a5acbd7f936888ac00000000'
    //   const object = VerusUtil.decodeRawTransaction(hash, VerusNetworks.verus)
    //   expect(object).to.deep.equal({
    //     txid: '5769cc8b37a9c7b3463ed616b5df5210ea705779090e6267f8bfcd8f23560041',
    //     hash: '5769cc8b37a9c7b3463ed616b5df5210ea705779090e6267f8bfcd8f23560041',
    //     version: 2,
    //     size: 325,
    //     locktime: 0,
    //     vin: [
    //       {
    //         txid: 'bea65e9461a333703c5f4f2c65a3204469a6016857df41b5aff0ecc7269f1cd9',
    //         vout: 0,
    //         scriptSig: {
    //           asm: '',
    //           hex: ''
    //         },
    //         txinwitness: [
    //           '3045022100afbf55d5991ca4e8a9e423e39d55011f12e99fd8def7cc4a0347d777d1910ed802201aba22c141f34df7dc954dfbf0d1224c6ad05f6df70345c0903c948283532e9201',
    //           '0304bb3f24bd44298d578257e42c61f716f884b4743780eef03c4b1e0a30a35fe4',
    //           '767050193726eb46aa4efb0dc6979a53c515b061d9c4d043871b30fcb99d8022',
    //           '01',
    //           '6382012088a82014f786ddd0b839deec2c27357eb4e5a82ac2030e2b9782f5f05e0945ce5e32918876a914c42dba1576d9ba619d92b47e26f97f8790a65b846704332c3a5fb17576a914128371468880b80dd995b31e5cdef8a5acbd7f936888ac'
    //         ],
    //         sequence: 0
    //       }
    //     ],
    //     vout: [
    //       {
    //         value: 0.51732132,
    //         n: 0,
    //         scriptPubKey: {
    //           asm: 'OP_0 c42dba1576d9ba619d92b47e26f97f8790a65b84',
    //           hex: '0014c42dba1576d9ba619d92b47e26f97f8790a65b84',
    //           reqSigs: 1,
    //           type: 'witness_v0_keyhash',
    //           addresses: ['bc1qcskm59tkmxaxr8vjk3lzd7tls7g2vkuyujtvl3']
    //         }
    //       }
    //     ],
    //     hex: '02000000000101d91c9f26c7ecf0afb541df576801a6694420a3652c4f5f3c7033a361945ea6be00000000000000000001a45e150300000000160014c42dba1576d9ba619d92b47e26f97f8790a65b8405483045022100afbf55d5991ca4e8a9e423e39d55011f12e99fd8def7cc4a0347d777d1910ed802201aba22c141f34df7dc954dfbf0d1224c6ad05f6df70345c0903c948283532e9201210304bb3f24bd44298d578257e42c61f716f884b4743780eef03c4b1e0a30a35fe420767050193726eb46aa4efb0dc6979a53c515b061d9c4d043871b30fcb99d80220101616382012088a82014f786ddd0b839deec2c27357eb4e5a82ac2030e2b9782f5f05e0945ce5e32918876a914c42dba1576d9ba619d92b47e26f97f8790a65b846704332c3a5fb17576a914128371468880b80dd995b31e5cdef8a5acbd7f936888ac00000000'
    //   })
    // })
  })
})
