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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerusJsonRpcProvider = void 0;
const client_1 = require("@chainify/client");
const errors_1 = require("@chainify/errors");
const types_1 = require("@chainify/types");
const lodash_1 = require("lodash");
const utils_1 = require("../../utils");
const VerusJsonRpcBaseProvider_1 = require("./VerusJsonRpcBaseProvider");
class VerusJsonRpcProvider extends client_1.Chain {
    constructor(options, feeProvider, feeOptions) {
        super(options.network, new VerusJsonRpcBaseProvider_1.VerusJsonRpcBaseProvider(options), feeProvider);
        this.jsonRpc = this.provider.jsonRpc;
        this._feeOptions = Object.assign({ slowTargetBlocks: 6, averageTargetBlocks: 3, fastTargetBlocks: 1 }, feeOptions);
    }
    getBlockByHash(blockHash, includeTx = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                data = yield this.jsonRpc.send('getblock', [blockHash]); // TODO: This doesn't fit the interface?: https://chainquery.com/bitcoin-cli/getblock
            }
            catch (e) {
                if (e.name === 'NodeError' && e.message.includes('Block not found')) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { name, message } = e, attrs = __rest(e, ["name", "message"]);
                    throw new errors_1.BlockNotFoundError(`Block not found: ${blockHash}`, attrs);
                }
                throw e;
            }
            const { hash, height: number, mediantime: timestamp, difficulty, size, previousblockhash: parentHash, nonce, tx: transactionHashes, } = data;
            let transactions = transactionHashes;
            // TODO: Why transactions need to be retrieved individually? getblock has verbose 2 https://chainquery.com/bitcoin-cli/getblock
            if (includeTx) {
                const txs = transactionHashes.map((hash) => this.getTransactionByHash(hash));
                transactions = yield Promise.all(txs);
            }
            return {
                hash,
                number,
                timestamp,
                difficulty: parseFloat(new types_1.BigNumber(difficulty).toFixed()),
                size,
                parentHash,
                nonce,
                transactions,
                _raw: data,
            };
        });
    }
    getBlockByNumber(blockNumber, includeTx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!blockNumber) {
                blockNumber = yield this.getBlockHeight();
            }
            let blockHash;
            try {
                blockHash = yield this.jsonRpc.send('getblockhash', [blockNumber]);
            }
            catch (e) {
                if (e.name === 'NodeError' && e.message.includes('Block height out of range')) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { name, message } = e, attrs = __rest(e, ["name", "message"]);
                    throw new errors_1.BlockNotFoundError(`Block not found: ${blockNumber}`, attrs);
                }
                throw e;
            }
            return this.getBlockByHash(blockHash, includeTx);
        });
    }
    getBlockHeight() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jsonRpc.send('getblockcount', []);
        });
    }
    getTransactionByHash(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tx = yield this.getParsedTransactionByHash(txHash, true);
                return tx;
            }
            catch (e) {
                if (e.name === 'NodeError' && e.message.includes('No such mempool transaction')) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { name, message } = e, attrs = __rest(e, ["name", "message"]);
                    throw new errors_1.TxNotFoundError(`Transaction not found: ${txHash}`, attrs);
                }
                throw e;
            }
        });
    }
    getBalance(_addresses, _assets) {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = _addresses.map((a) => a.toString());
            const _utxos = yield this.provider.getUnspentTransactions(addresses);
            const utxos = (0, lodash_1.flatten)(_utxos);
            return [utxos.reduce((acc, utxo) => acc.plus(utxo.value), new types_1.BigNumber(0))];
        });
    }
    getFees() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.feeProvider) {
                return this.feeProvider.getFees();
            }
            else {
                const [slow, average, fast] = yield Promise.all([
                    this._getFee(this._feeOptions.slowTargetBlocks),
                    this._getFee(this._feeOptions.averageTargetBlocks),
                    this._getFee(this._feeOptions.fastTargetBlocks),
                ]);
                return {
                    slow,
                    average,
                    fast,
                };
            }
        });
    }
    sendRawTransaction(rawTransaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jsonRpc.send('sendrawtransaction', [rawTransaction]);
        });
    }
    sendRpcRequest(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jsonRpc.send(method, params);
        });
    }
    getParsedTransactionByHash(transactionHash, addFees = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield this.jsonRpc.send('getrawtransaction', [transactionHash, 1]);
            return (0, utils_1.normalizeTransactionObject)(tx, addFees ? yield this.getTransactionFee(tx) : undefined, tx.confirmations > 0 ? yield this.getBlockByHash(tx.blockhash) : undefined);
        });
    }
    getTransactionFee(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const isCoinbaseTx = tx.vin.find((vin) => vin.coinbase);
            if (isCoinbaseTx)
                return; // Coinbase transactions do not have a fee
            const inputs = tx.vin.map((vin) => ({ txid: vin.txid, vout: vin.vout }));
            const inputTransactions = yield Promise.all(inputs.map((input) => this.jsonRpc.send('getrawtransaction', [input.txid, 1])));
            const inputValues = inputTransactions.map((inputTx, index) => {
                const vout = inputs[index].vout;
                const output = inputTx.vout[vout];
                return output.value * 1e8;
            });
            const inputValue = inputValues.reduce((a, b) => a.plus(new types_1.BigNumber(b)), new types_1.BigNumber(0));
            const outputValue = tx.vout.reduce((a, b) => a.plus(new types_1.BigNumber(b.value).times(new types_1.BigNumber(1e8))), new types_1.BigNumber(0));
            const feeValue = inputValue.minus(outputValue);
            return feeValue.toNumber();
        });
    }
    _getFee(targetBlocks) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.provider.getFeePerByte(targetBlocks);
            const wait = targetBlocks * 10 * 60; // 10 minute blocks in seconds
            return { fee: value, wait };
        });
    }
}
exports.VerusJsonRpcProvider = VerusJsonRpcProvider;
//# sourceMappingURL=VerusJsonRpcProvider.js.map