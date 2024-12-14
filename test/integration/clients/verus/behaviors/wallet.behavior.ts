/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import { VerusBaseWalletProvider } from '@chainify/verus';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { fundAddress } from '../../../common';
import { Chain } from '../../../types';

chai.use(chaiAsPromised);

export function shouldBehaveLikeVerusWallet(chain: Chain) {
    describe('Verus Wallet', () => {
        describe('getAddresses', () => {
            it('should return the correct number of addresses starting at the correct index and return the right derivation path', async () => {
                const startingIndex = 0;
                const numAddresses = 20;
                const expectedAddress0DerivationPath = `m/84'/0'/0'/0/0`;
                const expectedAddress19DerivationPath = `m/84'/0'/0'/0/19`;

                const addresses = await chain.client.wallet.getAddresses(startingIndex, numAddresses);

                expect(addresses.length).to.equal(numAddresses);
                expect(addresses[0].derivationPath).to.equal(expectedAddress0DerivationPath);
                expect(addresses[19].derivationPath).to.equal(expectedAddress19DerivationPath);
            });

            it('should fail if numAddresses is 0', async () => {
                const startingIndex = 0;
                const numAddresses = 0;
                await expect(chain.client.wallet.getAddresses(startingIndex, numAddresses)).to.be.rejected;
            });

            it('should return the correct number of addresses starting at the correct index and return the right derivation path for change addresses', async () => {
                const startingIndex = 0;
                const numAddresses = 20;
                const change = true;
                const expectedAddress0DerivationPath = `m/84'/0'/0'/1/0`;
                const expectedAddress19DerivationPath = `m/84'/0'/0'/1/19`;

                const addresses = await chain.client.wallet.getAddresses(startingIndex, numAddresses, change);

                expect(addresses.length).to.equal(numAddresses);
                expect(addresses[0].derivationPath).to.equal(expectedAddress0DerivationPath);
                expect(addresses[19].derivationPath).to.equal(expectedAddress19DerivationPath);
            });
        });

        describe('getWalletAddress', () => {
            it('should return address if derivation is within 1000 address index places', async () => {
                const startingIndex = 0;
                const numAddresses = 1000;

                const addresses = await chain.client.wallet.getAddresses(startingIndex, numAddresses);

                const { address, derivationPath, publicKey } = addresses[numAddresses - 1];

                const { derivationPath: expectedDerivationPath, publicKey: expectedPublicKey } = await (
                    chain.client.wallet as VerusBaseWalletProvider
                ).getWalletAddress(address);

                expect(derivationPath).to.equal(expectedDerivationPath);
                expect(publicKey).to.equal(expectedPublicKey.toString());
            });

            it('should return change address if dervaition is within 1000 address index places', async () => {
                const startingIndex = 0;
                const numAddresses = 1000;
                const change = true;

                const addresses = await chain.client.wallet.getAddresses(startingIndex, numAddresses, change);

                const { address, derivationPath, publicKey } = addresses[numAddresses - 1];

                const { derivationPath: expectedDerivationPath, publicKey: expectedPublicKey } = await (
                    chain.client.wallet as VerusBaseWalletProvider
                ).getWalletAddress(address);

                expect(derivationPath).to.equal(expectedDerivationPath);
                expect(publicKey).to.equal(expectedPublicKey.toString());
            });
        });

        describe('getUnusedAddress', () => {
            it('should return next derivation path address', async () => {
                const firstAddress = await chain.client.wallet.getUnusedAddress();
                const firstIndex = parseInt(firstAddress.derivationPath.split('/').pop());

                await fundAddress(chain, firstAddress.address);

                const { address: actualAddress, derivationPath: actualDerivationPath } = await chain.client.wallet.getUnusedAddress();

                const expectedSecondIndex = firstIndex + 1;
                const addresses = await chain.client.wallet.getAddresses(0, 1 + expectedSecondIndex);

                const { address: expectedAddress, derivationPath: expectedDerivationPath } = addresses[expectedSecondIndex];

                expect(actualAddress).to.equal(expectedAddress);
                expect(actualDerivationPath).to.equal(expectedDerivationPath);
            });

        });

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
