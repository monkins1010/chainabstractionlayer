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
exports.VerusNodeWalletProvider = void 0;
const client_1 = require("@chainify/client");
const errors_1 = require("@chainify/errors");
const types_1 = require("@chainify/types");
const lodash_1 = require("lodash");
const networks_1 = require("../networks");
const types_2 = require("../types");
const utils_1 = require("../utils");
const BIP70_CHAIN_TO_NETWORK = {
    main: networks_1.VerusNetworks.verus,
    test: networks_1.VerusNetworks.verus_testnet
};
const bitgo = require('@bitgo/utxo-lib'); // eslint-disable-line
class VerusNodeWalletProvider extends client_1.Wallet {
    constructor(options, chainProvider) {
        super(chainProvider);
        this._addressType = (options === null || options === void 0 ? void 0 : options.addressType) || types_2.AddressType.RADDRESS;
        this._network = chainProvider ? chainProvider.getNetwork() : options === null || options === void 0 ? void 0 : options.network;
        this._addressInfoCache = {};
    }
    getUnusedAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getNewAddress(this._addressType);
        });
    }
    getUsedAddresses() {
        return __awaiter(this, void 0, void 0, function* () {
            const usedAddresses = yield this.chainProvider.sendRpcRequest('listaddressgroupings', []);
            const emptyAddresses = yield this.chainProvider.sendRpcRequest('listreceivedbyaddress', [0, true, false]);
            const addrs = (0, lodash_1.uniq)([...(0, lodash_1.flatten)(usedAddresses).map((addr) => addr[0]), ...emptyAddresses.map((a) => a.address)]);
            const addressObjects = yield Promise.all(addrs.map((address) => this.getAddressInfo(address)));
            return addressObjects;
        });
    }
    getAddresses() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getUsedAddresses();
        });
    }
    sendTransaction(txRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return txRequest.fee
                ? this.withTxFee(() => __awaiter(this, void 0, void 0, function* () { return this._sendTransaction(txRequest); }), txRequest.fee)
                : this._sendTransaction(txRequest);
        });
    }
    sendBatchTransaction(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            const outputs = {};
            for (const tx of transactions) {
                outputs[tx.to.toString()] = new types_1.BigNumber(tx.value).dividedBy(1e8).toNumber();
            }
            const rawTxOutputs = yield this.chainProvider.sendRpcRequest('createrawtransaction', [[], outputs]);
            const rawTxFunded = yield this.chainProvider.sendRpcRequest('fundrawtransaction', [rawTxOutputs]);
            const rawTxSigned = yield this.chainProvider.sendRpcRequest('signrawtransaction', [rawTxFunded.hex]);
            const fee = new types_1.BigNumber(rawTxFunded.fee).times(1e8).toNumber();
            yield this.chainProvider.sendRawTransaction(rawTxSigned.hex);
            return [(0, utils_1.normalizeTransactionObject)((0, utils_1.decodeRawTransaction)(rawTxSigned.hex, this._network), fee)];
        });
    }
    sendSweepTransaction(_address, _asset, _fee) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new errors_1.UnimplementedMethodError('Method not implemented.');
        });
    }
    updateTransactionFee(tx, newFee) {
        return __awaiter(this, void 0, void 0, function* () {
            const txHash = (0, lodash_1.isString)(tx) ? tx : tx.hash;
            return this.withTxFee(() => __awaiter(this, void 0, void 0, function* () {
                const result = yield this.chainProvider.sendRpcRequest('bumpfee', [txHash]);
                const transaction = yield this.chainProvider.sendRpcRequest('gettransaction', [result.txid, true]);
                const fee = new types_1.BigNumber(transaction.fee).abs().times(1e8).toNumber();
                return (0, utils_1.normalizeTransactionObject)((0, utils_1.decodeRawTransaction)(transaction.hex, this._network), fee);
            }), newFee);
        });
    }
    getConnectedNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            const blockchainInfo = yield this.chainProvider.sendRpcRequest('getblockchaininfo', []);
            const chain = blockchainInfo.chain;
            return BIP70_CHAIN_TO_NETWORK[chain];
        });
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
    signMessage(message, from) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chainProvider
                .sendRpcRequest('signmessage', [from.toString(), message])
                .then((result) => Buffer.from(result.signature, 'base64').toString('hex'));
        });
    }
    getBalance(assets) {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = yield this.getAddresses();
            return this.chainProvider.getBalance(addresses, assets);
        });
    }
    exportPrivateKey() {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield this.getAddress();
            return yield this.dumpPrivKey(address.toString());
        });
    }
    isWalletAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.chainProvider.sendRpcRequest('getwalletinfo', []);
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
    canUpdateFee() {
        return true;
    }
    signPSBT(data, inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const psbt = bitgo.Psbt.fromBase64(data, { network: this._network });
            for (const input of inputs) {
                const usedAddresses = yield this.getUsedAddresses();
                const address = usedAddresses.find((address) => address.derivationPath === input.derivationPath);
                const wif = yield this.dumpPrivKey(address.address);
                const keyPair = bitgo.ECPair.fromWIF(wif, this._network);
                psbt.signInput(input.index, keyPair);
            }
            return psbt.toBase64();
        });
    }
    signBatchP2SHTransaction(inputs, addresses, tx, locktime, segwit = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallets = [];
            for (const address of addresses) {
                const wif = yield this.dumpPrivKey(address);
                const wallet = bitgo.ECPair.fromWIF(wif, this._network);
                wallets.push(wallet);
            }
            const sigs = [];
            for (let i = 0; i < inputs.length; i++) {
                let sigHash;
                if (segwit) {
                    sigHash = tx.hashForWitnessV0(inputs[i].index, inputs[i].outputScript, inputs[i].vout.vSat, bitgo.Transaction.SIGHASH_ALL); // AMOUNT NEEDS TO BE PREVOUT AMOUNT
                }
                else {
                    sigHash = tx.hashForSignature(inputs[i].index, inputs[i].outputScript, bitgo.Transaction.SIGHASH_ALL);
                }
                const sig = bitgo.script.signature.encode(wallets[i].sign(sigHash), bitgo.Transaction.SIGHASH_ALL);
                sigs.push(sig);
            }
            return sigs;
        });
    }
    getWalletAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getAddressInfo(address);
        });
    }
    onChainProviderUpdate(chainProvider) {
        this._network = chainProvider.getNetwork();
    }
    dumpPrivKey(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.chainProvider.sendRpcRequest('dumpprivkey', [address]);
        });
    }
    getNewAddress(addressType) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = addressType ? [""] : [""];
            const newAddress = yield this.chainProvider.sendRpcRequest('getnewaddress', params);
            if (!newAddress) {
                return null;
            }
            return this.getAddressInfo(newAddress);
        });
    }
    getAddressInfo(address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (address in this._addressInfoCache) {
                return this._addressInfoCache[address];
            }
            const addressInfo = yield this.chainProvider.sendRpcRequest('validateaddress', [address]);
            let publicKey;
            if (!addressInfo.iswatchonly) {
                publicKey = addressInfo.pubkey;
            }
            const addressObject = new types_1.Address({ address, publicKey });
            this._addressInfoCache[address] = addressObject;
            return addressObject;
        });
    }
    withTxFee(func, feePerByte) {
        return __awaiter(this, void 0, void 0, function* () {
            const feePerKB = new types_1.BigNumber(feePerByte).div(1e8).times(1000).toNumber();
            const originalTxFee = (yield this.chainProvider.sendRpcRequest('getwalletinfo', [])).paytxfee;
            yield this.chainProvider.sendRpcRequest('settxfee', [feePerKB]);
            const result = yield func();
            yield this.chainProvider.sendRpcRequest('settxfee', [originalTxFee]);
            return result;
        });
    }
    _sendTransaction(txRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const value = new types_1.BigNumber(txRequest.value.toString()).dividedBy(1e8).toNumber();
            const hash = yield this.chainProvider.sendRpcRequest('sendtoaddress', [(_a = txRequest.to) === null || _a === void 0 ? void 0 : _a.toString(), value, '', '', false]);
            const transaction = yield this.chainProvider.sendRpcRequest('gettransaction', [hash, true]);
            const fee = new types_1.BigNumber(transaction.fee).abs().times(1e8).toNumber();
            return (0, utils_1.normalizeTransactionObject)((0, utils_1.decodeRawTransaction)(transaction.hex, this._network), fee);
        });
    }
}
exports.VerusNodeWalletProvider = VerusNodeWalletProvider;
//# sourceMappingURL=VerusNodeWallet.js.map