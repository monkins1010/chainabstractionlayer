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
exports.VerusFeeApiProvider = void 0;
const client_1 = require("@chainify/client");
class VerusFeeApiProvider extends client_1.Fee {
    constructor(endpoint = 'https://mempool.space/api/v1/fees/recommended') {
        super();
        this._httpClient = new client_1.HttpClient({ baseURL: endpoint });
    }
    getFees() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._httpClient.nodeGet('/');
            return {
                slow: {
                    fee: data.hourFee,
                    wait: 60 * 60,
                },
                average: {
                    fee: data.halfHourFee,
                    wait: 30 * 60,
                },
                fast: {
                    fee: data.fastestFee,
                    wait: 10 * 60,
                },
            };
        });
    }
}
exports.VerusFeeApiProvider = VerusFeeApiProvider;
//# sourceMappingURL=VerusFeeApiProvider.js.map