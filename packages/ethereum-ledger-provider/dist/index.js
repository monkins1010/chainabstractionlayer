(()=>{"use strict";var e={929:function(e,t,r){var n,s=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__assign||function(){return i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},i.apply(this,arguments)},o=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(s,i){function o(e){try{u(n.next(e))}catch(e){i(e)}}function a(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}u((n=n.apply(e,t||[])).next())}))},a=this&&this.__generator||function(e,t){var r,n,s,i,o={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,n&&(s=2&i[0]?n.return:i[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,i[1])).done)return s;switch(n=0,s&&(i=[2&i[0],s.value]),i[0]){case 0:case 1:s=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,n=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!((s=(s=o.trys).length>0&&s[s.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){o.label=i[1];break}if(6===i[0]&&o.label<s[1]){o.label=s[1],s=i;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(i);break}s[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],n=0}finally{r=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var c=r(431),l=r(522),h=r(157),d=r(469),f=r(567),p=u(r(336)),v=u(r(70)),g=function(e){function t(t){var r=e.call(this,i(i({},t),{App:p.default,ledgerScrambleKey:"w0w"}))||this;return r._derivationPath=t.derivationPath,r}return s(t,e),t.prototype.signMessage=function(e,t){return o(this,void 0,void 0,(function(){var r,n,s,i,o,u,c;return a(this,(function(a){switch(a.label){case 0:return[4,this.getApp()];case 1:return r=a.sent(),[4,this.getWalletAddress(t)];case 2:return n=a.sent(),s=Buffer.from(e).toString("hex"),[4,r.signPersonalMessage(n.derivationPath,s)];case 3:return i=a.sent(),o=i.v,u=i.r,c=i.s,[2,d.remove0x(f.toRpcSig(o,Buffer.from(u,"hex"),Buffer.from(c,"hex")))]}}))}))},t.prototype.getAddresses=function(){return o(this,void 0,void 0,(function(){var e;return a(this,(function(t){switch(t.label){case 0:return[4,this.getApp()];case 1:return[4,t.sent().getAddress(this._derivationPath)];case 2:return e=t.sent(),[2,[new l.Address({address:e.address,derivationPath:this._derivationPath,publicKey:e.publicKey})]]}}))}))},t.prototype.getUnusedAddress=function(){return o(this,void 0,void 0,(function(){return a(this,(function(e){switch(e.label){case 0:return[4,this.getAddresses()];case 1:return[2,e.sent()[0]]}}))}))},t.prototype.isWalletAvailable=function(){return o(this,void 0,void 0,(function(){return a(this,(function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),[4,this.getAddresses()];case 1:return[2,e.sent().length>0];case 2:return e.sent(),[2,!1];case 3:return[2]}}))}))},t.prototype.getUsedAddresses=function(){return o(this,void 0,void 0,(function(){return a(this,(function(e){return[2,this.getAddresses()]}))}))},t.prototype.signTransaction=function(e,t){return o(this,void 0,void 0,(function(){var r,n,s,o,u,c;return a(this,(function(a){switch(a.label){case 0:return r=d.numberToHex(this._network.chainId),[4,this.getApp()];case 1:return n=a.sent(),s=new v.default(i(i({},e),{chainId:d.hexToNumber(r),v:r})),o=s.serialize().toString("hex"),[4,n.signTransaction(t,o)];case 2:return u=a.sent(),c=i(i({},e),{v:d.ensure0x(u.v),r:d.ensure0x(u.r),s:d.ensure0x(u.s)}),[2,new v.default(c).serialize().toString("hex")]}}))}))},t.prototype.sendTransaction=function(e){return o(this,void 0,void 0,(function(){var t,r,n,s,o,u,c,f,p,v,g,y;return a(this,(function(a){switch(a.label){case 0:return[4,this.getAddresses()];case 1:return t=a.sent(),r=t[0],n=r.address,[4,Promise.all([this.getMethod("getTransactionCount")(d.remove0x(n),"pending"),e.fee?Promise.resolve(new l.BigNumber(e.fee)):this.getMethod("getGasPrice")()])];case 2:return s=a.sent(),o=s[0],u=s[1],c={from:n,to:e.to?h.addressToString(e.to):e.to,value:e.value,data:e.data,gasPrice:u,nonce:o},f=d.buildTransaction(c),[4,this.getMethod("estimateGas")(f)];case 3:return p=a.sent(),f.gas=d.numberToHex(p),[4,this.signTransaction(f,r.derivationPath)];case 4:return v=a.sent(),[4,this.getMethod("sendRawTransaction")(v)];case 5:return g=a.sent(),y=i(i({},f),{input:f.data,hash:g}),[2,d.normalizeTransactionObject(y)]}}))}))},t.prototype.updateTransactionFee=function(e,t){return o(this,void 0,void 0,(function(){var r,n,s,o,u,c,h,f,p;return a(this,(function(a){switch(a.label){case 0:return"string"!=typeof e?[3,2]:[4,this.getMethod("getTransactionByHash")(e)];case 1:return n=a.sent(),[3,3];case 2:n=e,a.label=3;case 3:return s={from:(r=n)._raw.from,to:r._raw.to,value:new l.BigNumber(r._raw.value),gasPrice:new l.BigNumber(t),data:r._raw.input,nonce:d.hexToNumber(r._raw.nonce)},[4,d.buildTransaction(s)];case 4:return o=a.sent(),[4,this.getMethod("estimateGas")(o)];case 5:return u=a.sent(),o.gas=d.numberToHex(u),[4,this.getWalletAddress(o.from)];case 6:return c=a.sent(),[4,this.signTransaction(o,c.derivationPath)];case 7:return h=a.sent(),[4,this.getMethod("sendRawTransaction")(h)];case 8:return f=a.sent(),p=i(i({},o),{input:o.data,hash:f}),[2,d.normalizeTransactionObject(p)]}}))}))},t}(c.LedgerProvider);t.default=g},175:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.EthereumLedgerProvider=void 0;var s=n(r(929));t.EthereumLedgerProvider=s.default},336:e=>{e.exports=require("@ledgerhq/hw-app-eth")},469:e=>{e.exports=require("@liquality/ethereum-utils")},431:e=>{e.exports=require("@liquality/ledger-provider")},522:e=>{e.exports=require("@liquality/types")},157:e=>{e.exports=require("@liquality/utils")},70:e=>{e.exports=require("ethereumjs-tx")},567:e=>{e.exports=require("ethereumjs-util")}},t={},r=function r(n){var s=t[n];if(void 0!==s)return s.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}(175);module.exports=r})();
//# sourceMappingURL=index.js.map