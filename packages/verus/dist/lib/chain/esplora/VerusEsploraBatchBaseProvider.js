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
exports.VerusEsploraBatchBaseProvider = void 0;
const client_1 = require("@chainify/client");
const types_1 = require("@chainify/types");
const lodash_1 = require("lodash");
const VerusEsploraBaseProvider_1 = require("./VerusEsploraBaseProvider");
class VerusEsploraBatchBaseProvider extends VerusEsploraBaseProvider_1.VerusEsploraBaseProvider {
    constructor(options) {
        super(options);
        this._batchHttpClient = new client_1.HttpClient({ baseURL: options.batchUrl });
    }
    getUnspentTransactions(_addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = _addresses.map((a) => a.toString());
            const data = yield this._batchHttpClient.nodePost('/addresses/utxo', {
                addresses: (0, lodash_1.uniq)(addresses),
            });
            const utxos = data.map(({ address, utxo }) => {
                return utxo.map((obj) => (Object.assign(Object.assign({}, obj), { address, satoshis: obj.value, amount: new types_1.BigNumber(obj.value).dividedBy(1e8).toNumber(), blockHeight: obj.status.block_height })));
            });
            return (0, lodash_1.flatten)(utxos);
        });
    }
    getAddressTransactionCounts(_addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = _addresses.map((a) => a.toString());
            const data = yield this._batchHttpClient.nodePost('/addresses', {
                addresses: (0, lodash_1.uniq)(addresses),
            });
            return data.reduce((acc, obj) => {
                acc[obj.address] = obj.chain_stats.tx_count + obj.mempool_stats.tx_count;
                return acc;
            }, {});
        });
    }
}
exports.VerusEsploraBatchBaseProvider = VerusEsploraBatchBaseProvider;
//# sourceMappingURL=VerusEsploraBatchBaseProvider.js.map