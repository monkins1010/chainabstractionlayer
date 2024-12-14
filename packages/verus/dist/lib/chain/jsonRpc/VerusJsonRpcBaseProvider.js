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
exports.VerusJsonRpcBaseProvider = void 0;
const client_1 = require("@chainify/client");
const types_1 = require("@chainify/types");
const utils_1 = require("../../utils");
const VerusBaseChainProvider_1 = require("../VerusBaseChainProvider");
class VerusJsonRpcBaseProvider extends VerusBaseChainProvider_1.VerusBaseChainProvider {
    constructor(options) {
        super();
        this.jsonRpc = new client_1.JsonRpcProvider(options.uri, options.username, options.password);
        this._options = Object.assign({ feeBlockConfirmations: 1, defaultFeePerByte: 3 }, options);
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
            return yield this.jsonRpc.send('getrawtransaction', [transactionHash, 0]);
        });
    }
    getTransactionHex(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jsonRpc.send('getrawtransaction', [transactionHash]);
        });
    }
    getFeePerByte(numberOfBlocks) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { feerate } = yield this.jsonRpc.send('estimatesmartfee', [numberOfBlocks]);
                if (feerate && feerate > 0) {
                    return Math.ceil((feerate * 1e8) / 1000);
                }
                throw new Error('Invalid estimated fee');
            }
            catch (e) {
                return this._options.defaultFeePerByte;
            }
        });
    }
    getUnspentTransactions(_addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = _addresses.map((a) => a.toString());
            const utxos = yield this.jsonRpc.send('listunspent', [0, 9999999, addresses]);
            return utxos.map((utxo) => (Object.assign(Object.assign({}, utxo), { value: new types_1.BigNumber(utxo.amount).times(1e8).toNumber() })));
        });
    }
    getAddressTransactionCounts(_addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = _addresses.map((a) => a.toString());
            const addressDeltasRec = yield this.jsonRpc.send('getaddressdeltas', [{ addresses: addresses }]);
            const addressTxCounts = {};
            for (const delta of addressDeltasRec) {
                if (addressTxCounts[delta.address])
                    addressTxCounts[delta.address]++;
                else
                    addressTxCounts[delta.address] = 1;
            }
            return addressTxCounts;
        });
    }
    getAddressDeltas(_addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = _addresses.map((a) => a.toString());
            const addressDeltasRec = yield this.jsonRpc.send('getaddressdeltas', [{ addresses: addresses }]);
            const deltasFormatted = {};
            for (const address of addresses) {
                deltasFormatted[address] = [];
            }
            for (const delta of addressDeltasRec) {
                if (deltasFormatted[delta.address])
                    deltasFormatted[delta.address].push(delta);
                else
                    deltasFormatted[delta.address] = [delta];
            }
            return deltasFormatted;
        });
    }
    getMinRelayFee() {
        return __awaiter(this, void 0, void 0, function* () {
            const { relayfee } = yield this.jsonRpc.send('getnetworkinfo', []);
            return (relayfee * 1e8) / 1000;
        });
    }
}
exports.VerusJsonRpcBaseProvider = VerusJsonRpcBaseProvider;
//# sourceMappingURL=VerusJsonRpcBaseProvider.js.map