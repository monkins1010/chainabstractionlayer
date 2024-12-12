/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { Chain } from '../../../types';

chai.use(chaiAsPromised);

export function shouldBehaveLikeVerusWallet(chain: Chain) {
    describe('Verus Wallet', () => {
        describe('signMessage', () => {
            it('should return hex of signed message', async () => {
                const addresses = await chain.client.wallet.getAddresses(0, 1);
                const { address } = addresses[0];

                const signedMessage = await chain.client.wallet.signMessage('secret', address);

                const signedMessageBuffer = Buffer.from(signedMessage, 'hex');

                expect(signedMessage).to.equal(signedMessageBuffer.toString('hex'));
            });

            it('should return the same hex if signed twice', async () => {
                const addresses = await chain.client.wallet.getAddresses(0, 1);
                const { address } = addresses[0];

                const signedMessage1 = await chain.client.wallet.signMessage('secret', address);
                const signedMessage2 = await chain.client.wallet.signMessage('secret', address);

                expect(signedMessage1).to.equal(signedMessage2);
            });
        });

        describe('exportPrivateKey', () => {
            it('should return WIF string', async () => {
                const key = await chain.client.wallet.exportPrivateKey();
                expect(key).to.equal(chain.config.walletExpectedResult.privateKey);
            });
        });
    });
}
