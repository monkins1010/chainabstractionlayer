"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerusNetworks = void 0;
const bitgo = require('@bitgo/utxo-lib'); // eslint-disable-line
const verus = Object.assign(Object.assign({ name: 'verus' }, bitgo.networks.verus), { coinType: '0', isTestnet: false });
const verus_testnet = Object.assign(Object.assign({ name: 'verustest' }, bitgo.networks.verustest), { coinType: '0', isTestnet: true });
const VerusNetworks = {
    verus,
    verus_testnet
};
exports.VerusNetworks = VerusNetworks;
//# sourceMappingURL=networks.js.map