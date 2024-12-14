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
exports.VerusEsploraBaseProvider = void 0;
const client_1 = require("@chainify/client");
const lodash_1 = require("lodash");
const utils_1 = require("../../utils");
const VerusBaseChainProvider_1 = require("../VerusBaseChainProvider");
class VerusEsploraBaseProvider extends VerusBaseChainProvider_1.VerusBaseChainProvider {
    constructor(options) {
        super();
        this.httpClient = new client_1.HttpClient({ baseURL: options.url });
        this._options = Object.assign({ numberOfBlockConfirmation: 1, defaultFeePerByte: 3 }, options);
    }
    formatTransaction(tx, currentHeight) {
        return __awaiter(this, void 0, void 0, function* () {
            const hex = yield this.getTransactionHex(tx.txid);
            const confirmations = tx.status.confirmed ? currentHeight - tx.status.block_height + 1 : 0;
            const decodedTx = (0, utils_1.decodeRawTransaction)(hex, this._options.network);
            decodedTx.confirmations = confirmations;
            return (0, utils_1.normalizeTransactionObject)(decodedTx, tx.fee, { hash: tx.status.block_hash, number: tx.status.block_height });
        });
    }
    getRawTransactionByHash(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getTransactionHex(transactionHash);
        });
    }
    getTransactionHex(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.httpClient.nodeGet(`/tx/${transactionHash}/hex`);
        });
    }
    getFeePerByte(numberOfBlocks = this._options.numberOfBlockConfirmation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feeEstimates = yield this.httpClient.nodeGet('/fee-estimates');
                const blockOptions = Object.keys(feeEstimates).map((block) => parseInt(block));
                const closestBlockOption = blockOptions.reduce((prev, curr) => {
                    return Math.abs(prev - numberOfBlocks) < Math.abs(curr - numberOfBlocks) ? prev : curr;
                });
                const rate = Math.round(feeEstimates[closestBlockOption]);
                return rate;
            }
            catch (e) {
                return this._options.defaultFeePerByte;
            }
        });
    }
    getUnspentTransactions(_addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = _addresses.map((a) => a.toString());
            const utxoSets = yield Promise.all(addresses.map((addr) => this._getUnspentTransactions(addr), this));
            const utxos = (0, lodash_1.flatten)(utxoSets);
            return utxos;
        });
    }
    getAddressTransactionCounts(_addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = _addresses.map((a) => a.toString());
            const transactionCountsArray = yield Promise.all(addresses.map((addr) => __awaiter(this, void 0, void 0, function* () {
                const txCount = yield this._getAddressTransactionCount(addr);
                return { [addr]: txCount };
            })));
            const transactionCounts = Object.assign({}, ...transactionCountsArray);
            return transactionCounts;
        });
    }
    getMinRelayFee() {
        return __awaiter(this, void 0, void 0, function* () {
            return 1;
        });
    }
    _getUnspentTransactions(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.httpClient.nodeGet(`/address/${address}/utxo`);
            return data.map((utxo) => (Object.assign(Object.assign({}, utxo), { address, value: utxo.value, blockHeight: utxo.status.block_height })));
        });
    }
    _getAddressTransactionCount(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.httpClient.nodeGet(`/address/${address}`);
            return data.chain_stats.tx_count + data.mempool_stats.tx_count;
        });
    }
}
exports.VerusEsploraBaseProvider = VerusEsploraBaseProvider;
//# sourceMappingURL=VerusEsploraBaseProvider.js.map