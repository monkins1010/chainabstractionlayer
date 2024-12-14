"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpc = exports.SwapMode = exports.AddressType = exports.VerusJsonRpcTypes = void 0;
const rpc = __importStar(require("./rpc"));
exports.rpc = rpc;
exports.VerusJsonRpcTypes = __importStar(require("./chain/jsonRpc/types"));
var AddressType;
(function (AddressType) {
    AddressType["RADDRESS"] = "raddress";
    AddressType["IADDRESS"] = "iaddress";
    AddressType["ZADDRESS"] = "zaddress";
    AddressType["BECH32"] = "bech32";
})(AddressType = exports.AddressType || (exports.AddressType = {}));
var SwapMode;
(function (SwapMode) {
    SwapMode["P2SH"] = "p2sh";
    SwapMode["P2SH_SEGWIT"] = "p2shSegwit";
    SwapMode["P2WSH"] = "p2wsh";
})(SwapMode = exports.SwapMode || (exports.SwapMode = {}));
//# sourceMappingURL=types.js.map