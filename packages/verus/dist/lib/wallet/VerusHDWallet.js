"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerusHDWalletProvider = void 0;
const bip32_1 = require("bip32");
const bip39_1 = require("bip39");
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const types_1 = require("../types");
const VerusBaseWallet_1 = require("./VerusBaseWallet");
const varuint = require('varuint-bitcoin'); // eslint-disable-line
const utxolib = require('@bitgo/utxo-lib'); // eslint-disable-line
const { ECPair, script } = utxolib;
const createHash = require('create-hash'); // eslint-disable-line
const VERUS_DATA_SIGNATURE_PREFIX = 'Verus signed data:\n';
class VerusHDWalletProvider extends VerusBaseWallet_1.VerusBaseWalletProvider {
    constructor(options, chainProvider) {
        const { mnemonic, baseDerivationPath, addressType = types_1.AddressType.BECH32, network } = options;
        super({ baseDerivationPath, addressType, network }, chainProvider);
        if (!mnemonic) {
            throw new Error('Mnemonic should not be empty');
        }
        this._mnemonic = mnemonic;
    }
    canUpdateFee() {
        return true;
    }
    getSigner() {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = yield this.getAddresses();
            return addresses[0];
        });
    }
    getBalance(_assets) {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = yield this.getAddresses();
            return yield this.chainProvider.getBalance(addresses, _assets);
        });
    }
    signMessage(message, from) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield this.getWalletAddress(typeof (from) === 'string' ? from : from.toString());
            const keyPair = yield this.keyPair(address.derivationPath);
            const messageWithLength = Buffer.concat([varuint.encode(Buffer.from(message, 'utf8').length), Buffer.from(message, 'utf8')]);
            const msgHash = createHash('sha256').update(messageWithLength).digest();
            const PREFIX = Buffer.concat([varuint.encode(Buffer.from(VERUS_DATA_SIGNATURE_PREFIX, 'utf8').length), Buffer.from(VERUS_DATA_SIGNATURE_PREFIX, 'utf8')]);
            const hash = createHash('sha256')
                .update(PREFIX)
                .update(msgHash)
                .digest();
            const sig = new utxolib.IdentitySignature(utxolib.networks[this._network.name]);
            return sig.signHashOffline(hash, keyPair).toString('hex');
        });
    }
    exportPrivateKey() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._toWIF(this._baseDerivationPath);
        });
    }
    getConnectedNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._network;
        });
    }
    isWalletAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    baseDerivationNode() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._baseDerivationNode) {
                return this._baseDerivationNode;
            }
            const baseNode = yield this.seedNode();
            this._baseDerivationNode = baseNode.derivePath(this._baseDerivationPath);
            return this._baseDerivationNode;
        });
    }
    buildTransaction(targets, feePerByte, fixedInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const network = this._network;
            const unusedAddress = yield this.getUnusedAddress(true);
            const { inputs, change, fee } = yield this.getInputsForAmount(targets, feePerByte, fixedInputs);
            if (change) {
                targets.push({
                    address: unusedAddress.address,
                    value: change.value
                });
            }
            const tx = new utxolib.TransactionBuilder(utxolib.networks[network.name], feePerByte * 100);
            const currentHeight = yield this.chainProvider.getBlockHeight();
            tx.setVersion(4);
            tx.setVersionGroupId(0x892f2085);
            tx.setExpiryHeight(currentHeight + 20);
            tx.setLockTime(currentHeight);
            for (let i = 0; i < inputs.length; i++) {
                tx.addInput(inputs[i].txid, inputs[i].vout);
            }
            for (const output of targets) {
                if (output.script) {
                    tx.addOutput(output.script, output.value);
                }
                else {
                    tx.addOutput(output.address, output.value);
                }
            }
            for (let i = 0; i < inputs.length; i++) {
                const wallet = yield this.getWalletAddress(inputs[i].address);
                const keyPair = yield this.keyPair(wallet.derivationPath);
                tx.sign(i, keyPair, null, null, inputs[i].value);
            }
            return { hex: tx.build().toHex(), fee };
        });
    }
    buildSweepTransaction(externalChangeAddress, feePerByte) {
        return __awaiter(this, void 0, void 0, function* () {
            let _feePerByte = feePerByte || null; // TODO: fix me
            if (!_feePerByte) {
                _feePerByte = yield this.chainProvider.getProvider().getFeePerByte();
            }
            const { inputs, outputs, change } = yield this.getInputsForAmount([], _feePerByte, [], 100, true);
            if (change) {
                throw new Error('There should not be any change for sweeping transaction');
            }
            const _outputs = [{ address: externalChangeAddress, value: outputs[0].value }];
            // TODO: fix the inherited legacy code
            return this.buildTransaction(_outputs, feePerByte, inputs);
        });
    }
    signPSBT(data, inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
            const psbt = bitcoinjs_lib_1.Psbt.fromBase64(data, { network: this._network });
            for (const input of inputs) {
                const keyPair = yield this.keyPair(input.derivationPath);
                psbt.signInput(input.index, keyPair);
            }
            return psbt.toBase64();
        });
    }
    signBatchP2SHTransaction(inputs, addresses, tx, lockTime, segwit) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyPairs = [];
            for (const address of addresses) {
                const wallet = yield this.getWalletAddress(address);
                const keyPair = yield this.keyPair(wallet.derivationPath);
                keyPairs.push(keyPair);
            }
            const sigs = [];
            for (let i = 0; i < inputs.length; i++) {
                const index = inputs[i].txInputIndex ? inputs[i].txInputIndex : inputs[i].index;
                let sigHash;
                if (segwit) {
                    sigHash = tx.hashForWitnessV0(index, inputs[i].outputScript, inputs[i].vout.vSat, bitcoinjs_lib_1.Transaction.SIGHASH_ALL);
                }
                else {
                    sigHash = tx.hashForSignature(index, inputs[i].outputScript, bitcoinjs_lib_1.Transaction.SIGHASH_ALL);
                }
                const sig = script.signature.encode(keyPairs[i].sign(sigHash), bitcoinjs_lib_1.Transaction.SIGHASH_ALL);
                sigs.push(sig);
            }
            return sigs;
        });
    }
    keyPair(derivationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const wif = yield this._toWIF(derivationPath);
            return ECPair.fromWIF(wif, utxolib.networks[this._network.name]);
        });
    }
    _toWIF(derivationPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const node = yield this.seedNode();
            const derivedPath = node.derivePath(derivationPath);
            const privateKey = derivedPath.privateKey;
            const pair = ECPair.fromPrivateKeyBuffer(privateKey, utxolib.networks[this._network.name]);
            const wif = pair.toWIF();
            return wif;
        });
    }
    seedNode() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._seedNode) {
                return this._seedNode;
            }
            const seed = yield (0, bip39_1.mnemonicToSeed)(this._mnemonic);
            this._seedNode = (0, bip32_1.fromSeed)(seed);
            return this._seedNode;
        });
    }
}
exports.VerusHDWalletProvider = VerusHDWalletProvider;
//# sourceMappingURL=VerusHDWallet.js.map