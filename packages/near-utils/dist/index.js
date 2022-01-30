(()=>{"use strict";var e={175:function(e,r,t){var a=this&&this.__assign||function(){return a=Object.assign||function(e){for(var r,t=1,a=arguments.length;t<a;t++)for(var n in r=arguments[t])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e},a.apply(this,arguments)},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0}),r.fromNearTimestamp=r.toNearTimestampFormat=r.parseReceipt=r.normalizeTransactionObject=r.fromBase64=r.toBase64=r.validateAddress=r.validateSwapParams=r.BN=r.keyStores=r.KeyPair=r.providers=r.InMemorySigner=r.Account=r.transactions=r.validateSecretAndHash=r.validateSecret=void 0;var i=t(522),o=t(157),s=t(960),c=n(t(961));r.BN=c.default;var u=t(157);Object.defineProperty(r,"validateSecret",{enumerable:!0,get:function(){return u.validateSecret}}),Object.defineProperty(r,"validateSecretAndHash",{enumerable:!0,get:function(){return u.validateSecretAndHash}});var d=t(606);function l(e){var r=o.addressToString(e);if("string"!=typeof r)throw new s.InvalidAddressError("Invalid address: "+r);if(r.length<2)throw new s.InvalidAddressError("Invalid address. Minimum length is 2");if(r.length>64)throw new s.InvalidAddressError("Invalid address. Maximum length is 64")}function f(e,r){if(!e)return{};try{var t=Buffer.from(e,"base64").toString(r);try{return JSON.parse(t)}catch(e){return t}}catch(r){return e}}function p(e){return Math.floor(e/1e9)}function m(e,r){var t={confirmations:0,status:i.TxStatus.Pending},a=e.transaction.blockNumber||e.blockNumber;return a&&(r&&(t.confirmations=r-a),t.blockNumber=a,t.status=e.status.Failure?i.TxStatus.Failed:i.TxStatus.Success),t.blockHash=e.blockHash,t.hash=e.transaction.hash+"_"+e.transaction.signer_id,t.value=0,t._raw=e,t}Object.defineProperty(r,"transactions",{enumerable:!0,get:function(){return d.transactions}}),Object.defineProperty(r,"Account",{enumerable:!0,get:function(){return d.Account}}),Object.defineProperty(r,"InMemorySigner",{enumerable:!0,get:function(){return d.InMemorySigner}}),Object.defineProperty(r,"providers",{enumerable:!0,get:function(){return d.providers}}),Object.defineProperty(r,"KeyPair",{enumerable:!0,get:function(){return d.KeyPair}}),Object.defineProperty(r,"keyStores",{enumerable:!0,get:function(){return d.keyStores}}),r.validateSwapParams=function(e){o.validateValue(e.value),l(e.recipientAddress),l(e.refundAddress),o.validateSecretHash(e.secretHash),o.validateExpiration(e.expiration)},r.validateAddress=l,r.toBase64=function(e,r){void 0===r&&(r="hex");try{return Buffer.from(e,r).toString("base64")}catch(r){return e}},r.fromBase64=f,r.toNearTimestampFormat=function(e){return 1e3*e*1e3*1e3},r.fromNearTimestamp=p,r.normalizeTransactionObject=m,r.parseReceipt=function(e){var r=m(e),t=r._raw,n=a({},r);return t&&(n.sender=t.transaction.signer_id,n.receiver=t.transaction.receiver_id,t.transaction.actions&&t.transaction.actions.forEach((function(e){if(e.Transfer&&(n.value=e.Transfer.deposit),e.DeployContract&&(n.code=e.DeployContract.code),e.FunctionCall){var r=e.FunctionCall.method_name;switch(r){case"init":var t=f(e.FunctionCall.args);n.swap={method:r,secretHash:f(t.secretHash,"hex"),expiration:p(t.expiration),recipient:t.buyer};break;case"claim":t=f(e.FunctionCall.args),n.swap={method:r,secret:f(t.secret,"hex")};break;case"refund":n.swap={method:r};break;default:t=f(e.FunctionCall.args),n._raw=a(a({},t),{method:r})}}}))),n}},960:e=>{e.exports=require("@liquality/errors")},522:e=>{e.exports=require("@liquality/types")},157:e=>{e.exports=require("@liquality/utils")},961:e=>{e.exports=require("bn.js")},606:e=>{e.exports=require("near-api-js")}},r={},t=function t(a){var n=r[a];if(void 0!==n)return n.exports;var i=r[a]={exports:{}};return e[a].call(i.exports,i,i.exports,t),i.exports}(175);module.exports=t})();
//# sourceMappingURL=index.js.map