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
exports.VerusEsploraApiProvider = void 0;
const client_1 = require("@chainify/client");
const errors_1 = require("@chainify/errors");
const types_1 = require("@chainify/types");
const lodash_1 = require("lodash");
const VerusEsploraBatchBaseProvider_1 = require("./VerusEsploraBatchBaseProvider");
class VerusEsploraApiProvider extends client_1.Chain {
    constructor(options, provider, feeProvider, feeOptions) {
        const _provider = provider || new VerusEsploraBatchBaseProvider_1.VerusEsploraBatchBaseProvider(options);
        super(options.network, _provider, feeProvider);
        this._httpClient = this.provider.httpClient;
        this._feeOptions = Object.assign({ slowTargetBlocks: 6, averageTargetBlocks: 3, fastTargetBlocks: 1 }, feeOptions);
    }
    getBlockByHash(blockHash) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                data = yield this._httpClient.nodeGet(`/block/${blockHash}`);
            }
            catch (e) {
                if (e.name === 'NodeError' && e.message.includes('Block not found')) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { name, message } = e, attrs = __rest(e, ["name", "message"]);
                    throw new errors_1.BlockNotFoundError(`Block not found: ${blockHash}`, attrs);
                }
                throw e;
            }
            const { id: hash, height: number, timestamp, mediantime, size, previousblockhash: parentHash, difficulty, nonce } = data;
            return {
                hash,
                number,
                timestamp: mediantime || timestamp,
                size,
                parentHash,
                difficulty,
                nonce,
                _raw: data,
            };
        });
    }
    getBlockByNumber(blockNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!blockNumber) {
                blockNumber = yield this.getBlockHeight();
            }
            return this.getBlockByHash(yield this._getBlockHash(blockNumber));
        });
    }
    getBlockHeight() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._httpClient.nodeGet('/blocks/tip/height');
            return parseInt(data);
        });
    }
    getTransactionByHash(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getTransaction(txHash);
        });
    }
    getBalance(_addresses) {
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
            return this._httpClient.nodePost('/tx', rawTransaction);
        });
    }
    sendRpcRequest(_method, _params) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    _getBlockHash(blockNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._httpClient.nodeGet(`/block-height/${blockNumber}`);
        });
    }
    getTransaction(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                data = yield this._httpClient.nodeGet(`/tx/${transactionHash}`);
            }
            catch (e) {
                if (e.name === 'NodeError' && e.message.includes('Transaction not found')) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { name, message } = e, attrs = __rest(e, ["name", "message"]);
                    throw new errors_1.TxNotFoundError(`Transaction not found: ${transactionHash}`, attrs);
                }
                throw e;
            }
            const currentHeight = yield this.getBlockHeight();
            return this.provider.formatTransaction(data, currentHeight);
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
exports.VerusEsploraApiProvider = VerusEsploraApiProvider;
//# sourceMappingURL=VerusEsploraApiProvider.js.map