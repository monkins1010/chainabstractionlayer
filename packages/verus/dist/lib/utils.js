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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddress = exports.getPubKeyHash = exports.AddressTypes = exports.witnessStackToScriptWitness = exports.normalizeTransactionObject = exports.decodeRawTransaction = exports.selectCoins = exports.compressPubKey = exports.calculateFee = void 0;
const errors_1 = require("@chainify/errors");
const types_1 = require("@chainify/types");
const varuint = __importStar(require("bip174/src/lib/converter/varint"));
const classify = __importStar(require("bitcoinjs-lib/src/classify"));
const coinselect_1 = __importDefault(require("coinselect"));
const accumulative_1 = __importDefault(require("coinselect/accumulative"));
const AddressTypes = ['raddress'];
exports.AddressTypes = AddressTypes;
const bitgo = require('@bitgo/utxo-lib'); // eslint-disable-line
function calculateFee(numInputs, numOutputs, feePerByte) {
    return (numInputs * 148 + numOutputs * 34 + 10) * feePerByte;
}
exports.calculateFee = calculateFee;
/**
 * Get compressed pubKey from pubKey.
 * @param pubKey - 65 byte string with prefix, x, y.
 * @returns the compressed pubKey of uncompressed pubKey.
 */
function compressPubKey(pubKey) {
    const x = pubKey.substring(2, 66);
    const y = pubKey.substring(66, 130);
    const even = parseInt(y.substring(62, 64), 16) % 2 === 0;
    const prefix = even ? '02' : '03';
    return prefix + x;
}
exports.compressPubKey = compressPubKey;
function selectCoins(utxos, targets, feePerByte, fixedInputs = []) {
    let selectUtxos = utxos;
    // Default coinselect won't accumulate some inputs
    // TODO: does coinselect need to be modified to ABSOLUTELY not skip an input?
    const coinselectStrat = fixedInputs.length ? accumulative_1.default : coinselect_1.default;
    if (fixedInputs.length) {
        selectUtxos = [
            // Order fixed inputs to the start of the list so they are used
            ...fixedInputs,
            ...utxos.filter((utxo) => !fixedInputs.find((input) => input.vout === utxo.vout && input.txid === utxo.txid)),
        ];
    }
    const { inputs, outputs, fee } = coinselectStrat(selectUtxos, targets, Math.ceil(feePerByte));
    let change;
    if (inputs && outputs) {
        change = outputs.find((output) => output.id !== 'main');
    }
    return { inputs, outputs, fee, change };
}
exports.selectCoins = selectCoins;
const OUTPUT_TYPES_MAP = {
    [classify.types.P2WPKH]: 'witness_v0_keyhash',
    [classify.types.P2WSH]: 'witness_v0_scripthash',
};
function decodeRawTransaction(hex, network) {
    const bjsTx = bitgo.Transaction.fromHex(hex, network);
    const vin = bjsTx.ins.map((input) => {
        return {
            txid: Buffer.from(input.hash).reverse().toString('hex'),
            vout: input.index,
            scriptSig: {
                asm: bitgo.script.toASM(input.script),
                hex: input.script.toString('hex'),
            },
            txinwitness: input.witness.map((w) => w.toString('hex')),
            sequence: input.sequence,
        };
    });
    const vout = bjsTx.outs.map((output, n) => {
        const type = classify.output(output.script);
        const vout = {
            value: output.value / 1e8,
            n,
            scriptPubKey: {
                asm: bitgo.script.toASM(output.script),
                hex: output.script.toString('hex'),
                reqSigs: 1,
                type: OUTPUT_TYPES_MAP[type] || type,
                addresses: [],
            },
        };
        try {
            const address = bitgo.address.fromOutputScript(output.script, network);
            vout.scriptPubKey.addresses.push(address);
        }
        catch (e) {
            /** If output script is not parasable, we just skip it */
        }
        return vout;
    });
    return {
        txid: bjsTx.getHash(false).reverse().toString('hex'),
        hash: bjsTx.getHash(true).reverse().toString('hex'),
        version: bjsTx.version,
        locktime: bjsTx.locktime,
        size: bjsTx.byteLength(),
        vsize: bjsTx.virtualSize(),
        weight: bjsTx.weight(),
        vin,
        vout,
        hex,
    };
}
exports.decodeRawTransaction = decodeRawTransaction;
function normalizeTransactionObject(tx, fee, block) {
    const value = tx.vout.reduce((p, n) => p.plus(new types_1.BigNumber(n.value).times(1e8)), new types_1.BigNumber(0));
    const result = {
        hash: tx.txid,
        value: value.toNumber(),
        _raw: tx,
        confirmations: 0,
        status: tx.confirmations > 0 ? types_1.TxStatus.Success : types_1.TxStatus.Pending,
    };
    if (fee) {
        const feePrice = Math.round(fee / tx.vsize);
        Object.assign(result, {
            fee,
            feePrice,
        });
    }
    if (block) {
        Object.assign(result, {
            blockHash: block.hash,
            blockNumber: block.number,
            confirmations: tx.confirmations,
        });
    }
    return result;
}
exports.normalizeTransactionObject = normalizeTransactionObject;
// TODO: This is copy pasta because it's not exported from bitcoinjs-lib
// https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/csv.spec.ts#L477
function witnessStackToScriptWitness(witness) {
    let buffer = Buffer.allocUnsafe(0);
    function writeSlice(slice) {
        buffer = Buffer.concat([buffer, Buffer.from(slice)]);
    }
    function writeVarInt(i) {
        const currentLen = buffer.length;
        const varintLen = varuint.encodingLength(i);
        buffer = Buffer.concat([buffer, Buffer.allocUnsafe(varintLen)]);
        varuint.encode(i, buffer, currentLen);
    }
    function writeVarSlice(slice) {
        writeVarInt(slice.length);
        writeSlice(slice);
    }
    function writeVector(vector) {
        writeVarInt(vector.length);
        vector.forEach(writeVarSlice);
    }
    writeVector(witness);
    return buffer;
}
exports.witnessStackToScriptWitness = witnessStackToScriptWitness;
function getPubKeyHash(address, network) {
    const outputScript = bitgo.address.toOutputScript(address, network);
    const type = classify.output(outputScript);
    if (![classify.types.P2PKH, classify.types.P2WPKH].includes(type)) {
        throw new Error(`Bitcoin swap doesn't support the address ${address} type of ${type}. Not possible to derive public key hash.`);
    }
    try {
        const bech32 = bitgo.address.fromBech32(address);
        return bech32.data;
    }
    catch (e) {
        const base58 = bitgo.address.fromBase58Check(address);
        return base58.hash;
    }
}
exports.getPubKeyHash = getPubKeyHash;
function validateAddress(_address, network) {
    const address = _address.toString();
    if (typeof address !== 'string') {
        throw new errors_1.InvalidAddressError(`Invalid address: ${address}`);
    }
    let pubKeyHash;
    try {
        pubKeyHash = getPubKeyHash(address, network);
    }
    catch (e) {
        throw new errors_1.InvalidAddressError(`Invalid Address. Failed to parse: ${address}`);
    }
    if (!pubKeyHash) {
        throw new errors_1.InvalidAddressError(`Invalid Address: ${address}`);
    }
}
exports.validateAddress = validateAddress;
//# sourceMappingURL=utils.js.map