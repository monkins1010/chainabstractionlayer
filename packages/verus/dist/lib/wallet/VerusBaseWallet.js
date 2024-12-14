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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerusBaseWalletProvider = exports.AddressSearchType = void 0;
const client_1 = require("@chainify/client");
const utils_1 = require("../utils");
const types_1 = require("../types");
const types_2 = require("@chainify/types");
const utils_2 = require("@chainify/utils");
const errors_1 = require("@chainify/errors");
const memoizee_1 = __importDefault(require("memoizee"));
const bitcoin_ops_1 = __importDefault(require("bitcoin-ops"));
const bitgo = require('@bitgo/utxo-lib'); // eslint-disable-line
const { script } = bitgo;
const ADDRESS_GAP = 20;
var AddressSearchType;
(function (AddressSearchType) {
    AddressSearchType[AddressSearchType["EXTERNAL"] = 0] = "EXTERNAL";
    AddressSearchType[AddressSearchType["CHANGE"] = 1] = "CHANGE";
    AddressSearchType[AddressSearchType["EXTERNAL_OR_CHANGE"] = 2] = "EXTERNAL_OR_CHANGE";
})(AddressSearchType = exports.AddressSearchType || (exports.AddressSearchType = {}));
class VerusBaseWalletProvider extends client_1.Wallet {
    constructor(options, chainProvider) {
        const { baseDerivationPath, addressType = types_1.AddressType.RADDRESS } = options;
        const addressTypes = Object.values(types_1.AddressType);
        if (!addressTypes.includes(addressType)) {
            throw new Error(`addressType must be one of ${addressTypes.join(',')}`);
        }
        super(chainProvider);
        this._baseDerivationPath = baseDerivationPath;
        this._network = chainProvider ? chainProvider.getNetwork() : options.network;
        this._addressType = addressType;
        this._derivationCache = {};
    }
    onChainProviderUpdate(chainProvider) {
        this._network = chainProvider.getNetwork();
    }
    getDerivationCache() {
        return this._derivationCache;
    }
    sendOptionsToOutputs(transactions) {
        const targets = [];
        transactions.forEach((tx) => {
            if (tx.to && tx.value && tx.value.gt(0)) {
                targets.push({
                    address: tx.to.toString(),
                    value: tx.value.toNumber()
                });
            }
            if (tx.data) {
                const scriptBuffer = script.compile([bitcoin_ops_1.default.OP_RETURN, Buffer.from(tx.data, 'hex')]);
                targets.push({
                    value: 0,
                    script: scriptBuffer
                });
            }
        });
        return targets;
    }
    setDerivationCache(derivationCache) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield this.getDerivationPathAddress(Object.keys(derivationCache)[0]);
            if (derivationCache[address.derivationPath].address !== address.address) {
                throw new Error(`derivationCache at ${address.derivationPath} does not match`);
            }
            this._derivationCache = derivationCache;
        });
    }
    _sendTransaction(transactions, feePerByte) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hex, fee } = yield this.buildTransaction(transactions, feePerByte);
            yield this.chainProvider.sendRawTransaction(hex);
            return (0, utils_1.normalizeTransactionObject)((0, utils_1.decodeRawTransaction)(hex, this._network), fee);
        });
    }
    sendTransaction(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._sendTransaction(this.sendOptionsToOutputs([options]), options.fee);
        });
    }
    sendBatchTransaction(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            return [yield this._sendTransaction(this.sendOptionsToOutputs(transactions))];
        });
    }
    sendSweepTransaction(externalChangeAddress, _asset, feePerByte) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hex, fee } = yield this.buildSweepTransaction(externalChangeAddress.toString(), feePerByte);
            yield this.chainProvider.sendRawTransaction(hex);
            return (0, utils_1.normalizeTransactionObject)((0, utils_1.decodeRawTransaction)(hex, this._network), fee);
        });
    }
    updateTransactionFee(tx, newFeePerByte) {
        return __awaiter(this, void 0, void 0, function* () {
            const txHash = typeof tx === 'string' ? tx : tx.hash;
            const transaction = (yield this.chainProvider.getTransactionByHash(txHash))._raw;
            const fixedInputs = [transaction.vin[0]]; // TODO: should this pick more than 1 input? RBF doesn't mandate it
            const lookupAddresses = transaction.vout.map((vout) => vout.scriptPubKey.addresses[0]);
            const changeAddress = yield this.findAddress(lookupAddresses, true);
            const changeOutput = transaction.vout.find((vout) => vout.scriptPubKey.addresses[0] === changeAddress.address);
            let outputs = transaction.vout;
            if (changeOutput) {
                outputs = outputs.filter((vout) => vout.scriptPubKey.addresses[0] !== changeOutput.scriptPubKey.addresses[0]);
            }
            // TODO more checks?
            const transactions = outputs.map((output) => ({
                address: output.scriptPubKey.addresses[0],
                value: new types_2.BigNumber(output.value).times(1e8).toNumber()
            }));
            const { hex, fee } = yield this.buildTransaction(transactions, newFeePerByte, fixedInputs);
            yield this.chainProvider.sendRawTransaction(hex);
            return (0, utils_1.normalizeTransactionObject)((0, utils_1.decodeRawTransaction)(hex, this._network), fee);
        });
    }
    findAddress(addresses, change = false) {
        return __awaiter(this, void 0, void 0, function* () {
            // A maximum number of addresses to lookup after which it is deemed that the wallet does not contain this address
            const maxAddresses = 5000;
            const addressesPerCall = 50;
            let index = 0;
            while (index < maxAddresses) {
                const walletAddresses = yield this.getAddresses(index, addressesPerCall, change);
                const walletAddress = walletAddresses.find((walletAddr) => addresses.find((addr) => walletAddr.address === addr));
                if (walletAddress)
                    return walletAddress;
                index += addressesPerCall;
            }
        });
    }
    getWalletAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const externalAddress = yield this.findAddress([address], false);
            if (externalAddress) {
                return externalAddress;
            }
            const changeAddress = yield this.findAddress([address], true);
            if (changeAddress) {
                return changeAddress;
            }
            throw new Error('Wallet does not contain address');
        });
    }
    getAddressFromPublicKey(publicKey) {
        return bitgo.ECPair.fromPublicKeyBuffer(publicKey, bitgo.networks[this._network.name]).getAddress();
    }
    getDerivationPathAddress(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (path in this._derivationCache) {
                return this._derivationCache[path];
            }
            const baseDerivationNode = yield this.baseDerivationNode();
            const subPath = path.replace(this._baseDerivationPath + '/', '');
            const publicKey = baseDerivationNode.derivePath(subPath).publicKey;
            const address = this.getAddressFromPublicKey(publicKey);
            const addressObject = new types_2.Address({
                address,
                publicKey: publicKey.toString('hex'),
                derivationPath: path
            });
            this._derivationCache[path] = addressObject;
            return addressObject;
        });
    }
    getAddresses(startingIndex = 0, numAddresses = 1, change = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (numAddresses < 1) {
                throw new Error('You must return at least one address');
            }
            const addresses = [];
            const lastIndex = startingIndex + numAddresses;
            const changeVal = change ? '1' : '0';
            for (let currentIndex = startingIndex; currentIndex < lastIndex; currentIndex++) {
                const subPath = changeVal + '/' + currentIndex;
                const path = this._baseDerivationPath + '/' + subPath;
                const addressObject = yield this.getDerivationPathAddress(path);
                addresses.push(addressObject);
                yield (0, utils_2.asyncSetImmediate)();
            }
            return addresses;
        });
    }
    _getUsedUnusedAddresses(numAddressPerCall = 100, addressType) {
        return __awaiter(this, void 0, void 0, function* () {
            const usedAddresses = [];
            const addressCountMap = { change: 0, external: 0 };
            const unusedAddressMap = { change: null, external: null };
            let addrList;
            let addressIndex = 0;
            let changeAddresses = [];
            let externalAddresses = [];
            /* eslint-disable no-unmodified-loop-condition */
            while ((addressType === AddressSearchType.EXTERNAL_OR_CHANGE &&
                (addressCountMap.change < ADDRESS_GAP || addressCountMap.external < ADDRESS_GAP)) ||
                (addressType === AddressSearchType.EXTERNAL && addressCountMap.external < ADDRESS_GAP) ||
                (addressType === AddressSearchType.CHANGE && addressCountMap.change < ADDRESS_GAP)) {
                /* eslint-enable no-unmodified-loop-condition */
                addrList = [];
                if ((addressType === AddressSearchType.EXTERNAL_OR_CHANGE || addressType === AddressSearchType.CHANGE) &&
                    addressCountMap.change < ADDRESS_GAP) {
                    // Scanning for change addr
                    changeAddresses = yield this.getAddresses(addressIndex, numAddressPerCall, true);
                    addrList = addrList.concat(changeAddresses);
                }
                else {
                    changeAddresses = [];
                }
                if ((addressType === AddressSearchType.EXTERNAL_OR_CHANGE || addressType === AddressSearchType.EXTERNAL) &&
                    addressCountMap.external < ADDRESS_GAP) {
                    // Scanning for non change addr
                    externalAddresses = yield this.getAddresses(addressIndex, numAddressPerCall, false);
                    addrList = addrList.concat(externalAddresses);
                }
                const transactionCounts = yield this.chainProvider.getProvider().getAddressTransactionCounts(addrList);
                for (const address of addrList) {
                    const isUsed = transactionCounts[address.toString()] > 0;
                    const isChangeAddress = changeAddresses.find((a) => address.toString() === a.toString());
                    const key = isChangeAddress ? 'change' : 'external';
                    if (isUsed) {
                        usedAddresses.push(address);
                        addressCountMap[key] = 0;
                        unusedAddressMap[key] = null;
                    }
                    else {
                        addressCountMap[key]++;
                        if (!unusedAddressMap[key]) {
                            unusedAddressMap[key] = address;
                        }
                    }
                }
                addressIndex += numAddressPerCall;
            }
            return {
                usedAddresses,
                unusedAddress: unusedAddressMap
            };
        });
    }
    getUsedAddresses(numAddressPerCall = 100) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._getUsedUnusedAddresses(numAddressPerCall, AddressSearchType.EXTERNAL_OR_CHANGE).then(({ usedAddresses }) => usedAddresses);
        });
    }
    getUnusedAddress(change = false, numAddressPerCall = 100) {
        return __awaiter(this, void 0, void 0, function* () {
            const addressType = change ? AddressSearchType.CHANGE : AddressSearchType.EXTERNAL;
            const key = change ? 'change' : 'external';
            return this._getUsedUnusedAddresses(numAddressPerCall, addressType).then(({ unusedAddress }) => unusedAddress[key]);
        });
    }
    withCachedUtxos(func) {
        return __awaiter(this, void 0, void 0, function* () {
            const originalProvider = this.chainProvider.getProvider();
            const memoizedGetFeePerByte = (0, memoizee_1.default)(originalProvider.getFeePerByte, { primitive: true });
            const memoizedGetUnspentTransactions = (0, memoizee_1.default)(originalProvider.getUnspentTransactions, { primitive: true });
            const memoizedGetAddressTransactionCounts = (0, memoizee_1.default)(originalProvider.getAddressTransactionCounts, { primitive: true });
            const newProvider = originalProvider;
            newProvider.getFeePerByte = memoizedGetFeePerByte;
            newProvider.getUnspentTransactions = memoizedGetUnspentTransactions;
            newProvider.getAddressTransactionCounts = memoizedGetAddressTransactionCounts;
            this.chainProvider.setProvider(newProvider);
            const result = yield func.bind(this)();
            this.chainProvider.setProvider(originalProvider);
            return result;
        });
    }
    getTotalFee(opts, max) {
        return __awaiter(this, void 0, void 0, function* () {
            const targets = this.sendOptionsToOutputs([opts]);
            if (!max) {
                const { fee } = yield this.getInputsForAmount(targets, opts.fee);
                return fee;
            }
            else {
                const { fee } = yield this.getInputsForAmount(targets.filter((t) => !t.value), opts.fee, [], 100, true);
                return fee;
            }
        });
    }
    getTotalFees(transactions, max) {
        return __awaiter(this, void 0, void 0, function* () {
            const fees = yield this.withCachedUtxos(() => __awaiter(this, void 0, void 0, function* () {
                const fees = {};
                for (const tx of transactions) {
                    const fee = yield this.getTotalFee(tx, max);
                    fees[tx.fee] = new types_2.BigNumber(fee);
                }
                return fees;
            }));
            return fees;
        });
    }
    getInputsForAmount(_targets, feePerByte, fixedInputs = [], numAddressPerCall = 100, sweep = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let addressIndex = 0;
            let changeAddresses = [];
            let externalAddresses = [];
            const addressCountMap = {
                change: 0,
                nonChange: 0
            };
            const feePerBytePromise = this.chainProvider.getProvider().getFeePerByte();
            let utxos = [];
            while (addressCountMap.change < ADDRESS_GAP || addressCountMap.nonChange < ADDRESS_GAP) {
                let addrList = [];
                if (addressCountMap.change < ADDRESS_GAP) {
                    // Scanning for change addr
                    changeAddresses = yield this.getAddresses(addressIndex, numAddressPerCall, true);
                    addrList = addrList.concat(changeAddresses);
                }
                else {
                    changeAddresses = [];
                }
                if (addressCountMap.nonChange < ADDRESS_GAP) {
                    // Scanning for non change addr
                    externalAddresses = yield this.getAddresses(addressIndex, numAddressPerCall, false);
                    addrList = addrList.concat(externalAddresses);
                }
                const fixedUtxos = [];
                if (fixedInputs.length > 0) {
                    for (const input of fixedInputs) {
                        const txHex = yield this.chainProvider.getProvider().getRawTransactionByHash(input.txid);
                        const tx = (0, utils_1.decodeRawTransaction)(txHex, this._network);
                        const value = new types_2.BigNumber(tx.vout[input.vout].value).times(1e8).toNumber();
                        const address = tx.vout[input.vout].scriptPubKey.addresses[0];
                        const walletAddress = yield this.getWalletAddress(address);
                        const utxo = Object.assign(Object.assign({}, input), { value, address, derivationPath: walletAddress.derivationPath });
                        fixedUtxos.push(utxo);
                    }
                }
                if (!sweep || fixedUtxos.length === 0) {
                    const _utxos = yield this.chainProvider.getProvider().getUnspentTransactions(addrList);
                    utxos.push(..._utxos.map((utxo) => {
                        const addr = addrList.find((a) => a.address === utxo.address);
                        return Object.assign(Object.assign({}, utxo), { derivationPath: addr.derivationPath });
                    }));
                }
                else {
                    utxos = fixedUtxos;
                }
                const utxoBalance = utxos.reduce((a, b) => a + (b.value || 0), 0);
                const transactionCounts = yield this.chainProvider.getProvider().getAddressTransactionCounts(addrList);
                if (!feePerByte)
                    feePerByte = yield feePerBytePromise;
                const minRelayFee = yield this.chainProvider.getProvider().getMinRelayFee();
                if (feePerByte < minRelayFee) {
                    throw new Error(`Fee supplied (${feePerByte} sat/b) too low. Minimum relay fee is ${minRelayFee} sat/b`);
                }
                let targets;
                if (sweep) {
                    const outputBalance = _targets.reduce((a, b) => a + (b['value'] || 0), 0);
                    const sweepOutputSize = 39;
                    const paymentOutputSize = _targets.filter((t) => t.value && t.address).length * 39;
                    const scriptOutputSize = _targets
                        .filter((t) => !t.value && t.script)
                        .reduce((size, t) => size + 39 + t.script.byteLength, 0);
                    const outputSize = sweepOutputSize + paymentOutputSize + scriptOutputSize;
                    const inputSize = utxos.length * 153;
                    const sweepFee = feePerByte * (inputSize + outputSize);
                    const amountToSend = new types_2.BigNumber(utxoBalance).minus(sweepFee);
                    targets = _targets.map((target) => ({ id: 'main', value: target.value, script: target.script }));
                    targets.push({ id: 'main', value: amountToSend.minus(outputBalance).toNumber() });
                }
                else {
                    targets = _targets.map((target) => ({ id: 'main', value: target.value, script: target.script }));
                }
                const { inputs, outputs, change, fee } = (0, utils_1.selectCoins)(utxos, targets, Math.ceil(feePerByte), fixedUtxos);
                if (inputs && outputs) {
                    return {
                        inputs,
                        change,
                        outputs,
                        fee
                    };
                }
                for (const address of addrList) {
                    const isUsed = transactionCounts[address.address];
                    const isChangeAddress = changeAddresses.find((a) => address.address === a.address);
                    const key = isChangeAddress ? 'change' : 'nonChange';
                    if (isUsed) {
                        addressCountMap[key] = 0;
                    }
                    else {
                        addressCountMap[key]++;
                    }
                }
                addressIndex += numAddressPerCall;
            }
            throw new errors_1.InsufficientBalanceError('Not enough balance');
        });
    }
}
exports.VerusBaseWalletProvider = VerusBaseWalletProvider;
//# sourceMappingURL=VerusBaseWallet.js.map