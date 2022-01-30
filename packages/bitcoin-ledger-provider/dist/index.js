(()=>{"use strict";var t={66:function(t,e,r){var n,i=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),s=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(i,s){function o(t){try{u(n.next(t))}catch(t){s(t)}}function a(t){try{u(n.throw(t))}catch(t){s(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(o,a)}u((n=n.apply(t,e||[])).next())}))},o=this&&this.__generator||function(t,e){var r,n,i,s,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,n&&(i=2&s[0]?n.return:s[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,s[1])).done)return i;switch(n=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,n=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!((i=(i=o.trys).length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){o=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){o.label=s[1];break}if(6===s[0]&&o.label<i[1]){o.label=i[1],i=s;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(s);break}i[2]&&o.ops.pop(),o.trys.pop();continue}s=e.call(t,o)}catch(t){s=[6,t],n=0}finally{r=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}},a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var u=r(431),c=r(838),l=r(939),h=r(524),p=r(320),d=r(522),f=a(r(354)),v=r(731),g=r(543),b=function(t){function e(e){var r=this,n=e.network,i=e.baseDerivationPath,s=e.addressType,o=void 0===s?d.bitcoin.AddressType.BECH32:s,a=e.Transport;return(r=t.call(this,{network:n,baseDerivationPath:i,addressType:o,App:f.default,Transport:a,ledgerScrambleKey:"BTC"})||this)._walletPublicKeyCache={},r}return i(e,t),e.prototype.signMessage=function(t,e){return s(this,void 0,void 0,(function(){var r,n,i,s;return o(this,(function(o){switch(o.label){case 0:return[4,this.getApp()];case 1:return r=o.sent(),[4,this.getWalletAddress(e)];case 2:return n=o.sent(),i=Buffer.from(t).toString("hex"),[4,r.signMessageNew(n.derivationPath,i)];case 3:return[2,(s=o.sent()).r+s.s]}}))}))},e.prototype._buildTransaction=function(t,e,r){return s(this,void 0,void 0,(function(){var n,i,s,a,u,c,l,h,p,f,v,b=this;return o(this,(function(o){switch(o.label){case 0:return[4,this.getApp()];case 1:return n=o.sent(),[4,this.getUnusedAddress(!0)];case 2:return i=o.sent(),[4,this.getInputsForAmount(t,e,r)];case 3:return s=o.sent(),a=s.inputs,u=s.change,c=s.fee,[4,this.getLedgerInputs(a)];case 4:return l=o.sent(),h=a.map((function(t){return t.derivationPath})),p=t.map((function(t){var e=t.script||g.address.toOutputScript(t.address,b._network);return{amount:b.getAmountBuffer(t.value),script:e}})),u&&p.push({amount:this.getAmountBuffer(u.value),script:g.address.toOutputScript(i.address,this._network)}),[4,n.serializeTransactionOutputs({outputs:p}).toString("hex")];case 5:return f=o.sent(),v=[d.bitcoin.AddressType.BECH32,d.bitcoin.AddressType.P2SH_SEGWIT].includes(this._addressType),[4,n.createPaymentTransactionNew({inputs:l,associatedKeysets:h,changePath:i.derivationPath,outputScriptHex:f,segwit:v,useTrustedInputForSegwit:v,additionals:this._addressType===d.bitcoin.AddressType.BECH32?["bech32"]:[]})];case 6:return[2,{hex:o.sent(),fee:c}]}}))}))},e.prototype.signPSBT=function(t,e){return s(this,void 0,void 0,(function(){var r,n,i,a,u,c,l,p,f,v,b,y,w,x,_,m,T,P,S,B,A,k,H,K,I,q,O,C,N,W,D,E,M,L,j,z,G,F,R,V=this;return o(this,(function(U){switch(U.label){case 0:return r=g.Psbt.fromBase64(t,{network:this._network}),[4,this.getApp()];case 1:if(n=U.sent(),(i=r.txInputs.every((function(t,e){return["witnesspubkeyhash","pubkeyhash","p2sh-witnesspubkeyhash"].includes(r.getInputType(e))})))&&r.txInputs.length!==e.length)throw new Error("signPSBT: Ledger must sign all inputs when they are all regular pub key hash payments.");return i?[4,this.getLedgerInputs(r.txInputs.map((function(t){return{txid:t.hash.reverse().toString("hex"),vout:t.index}})))]:[3,10];case 2:return a=U.sent(),u=function(t){return s(V,void 0,void 0,(function(){var e,r,n;return o(this,(function(i){switch(i.label){case 0:return[4,this.getMethod("getRawTransactionByHash")(t.hash.reverse().toString("hex"))];case 1:return e=i.sent(),r=h.decodeRawTransaction(e,this._network),n=r.vout[t.index].scriptPubKey.addresses[0],[4,this.getWalletAddress(n)];case 2:return[2,i.sent()]}}))}))},[4,Promise.all(r.txInputs.map(u))];case 3:return c=U.sent(),l=c.map((function(t){return t.derivationPath})),p=n.serializeTransactionOutputs({outputs:r.txOutputs.map((function(t){return{script:t.script,amount:V.getAmountBuffer(t.value)}}))}).toString("hex"),f=[d.bitcoin.AddressType.BECH32,d.bitcoin.AddressType.P2SH_SEGWIT].includes(this._addressType),[4,this.findAddress(r.txOutputs.map((function(t){return t.address})),!0)];case 4:return v=U.sent(),[4,n.createPaymentTransactionNew({inputs:a,associatedKeysets:l,changePath:v&&v.derivationPath,outputScriptHex:p,segwit:f,useTrustedInputForSegwit:f,additionals:"bech32"===this._addressType?["bech32"]:[]})];case 5:b=U.sent(),y=g.Transaction.fromHex(b),r.setVersion(1),w=function(t){var e;return o(this,(function(n){switch(n.label){case 0:return e={network:x._network,publicKey:Buffer.from(c[t.index].publicKey,"hex"),sign:function(){return s(V,void 0,void 0,(function(){var e;return o(this,(function(r){return(e=y.ins[t.index]).witness.length?[2,g.script.signature.decode(e.witness[0]).signature]:[2,e.script]}))}))}},[4,r.signInputAsync(t.index,e)];case 1:return n.sent(),[2]}}))},x=this,_=0,m=e,U.label=6;case 6:return _<m.length?(R=m[_],[5,w(R)]):[3,9];case 7:U.sent(),U.label=8;case 8:return _++,[3,6];case 9:return[2,r.toBase64()];case 10:T=[],P=[],S=!1,B=0,A=e,U.label=11;case 11:return B<A.length?(R=A[B],[4,this.getDerivationPathAddress(R.derivationPath)]):[3,16];case 12:return k=U.sent(),P.push(k),H=r.data.inputs[R.index],K=H.witnessScript,I=H.redeemScript,q=r.txInputs[R.index],O=q.hash,C=q.index,N=K||I,[4,this.getMethod("getRawTransactionByHash")(O.reverse().toString("hex"))];case 13:return W=U.sent(),[4,n.splitTransaction(W,!0)];case 14:D=U.sent(),T.push([D,C,N.toString("hex"),0]),K&&(S=!0),U.label=15;case 15:return B++,[3,11];case 16:return[4,n.splitTransaction(r.__CACHE.__TX.toHex(),!0)];case 17:return E=U.sent(),[4,n.serializeTransactionOutputs(E)];case 18:return M=U.sent(),[4,n.signP2SHTransaction({inputs:T,associatedKeysets:P.map((function(t){return t.derivationPath})),outputScriptHex:M.toString("hex"),lockTime:r.locktime,segwit:S,transactionVersion:2})];case 19:L=U.sent(),j=function(t){var e;return o(this,(function(n){switch(n.label){case 0:return e={network:z._network,publicKey:Buffer.from(P[t.index].publicKey,"hex"),sign:function(){return s(V,void 0,void 0,(function(){var e;return o(this,(function(r){return e=S?L[t.index]:L[t.index]+"01",[2,g.script.signature.decode(Buffer.from(e,"hex")).signature]}))}))}},[4,r.signInputAsync(t.index,e)];case 1:return n.sent(),[2]}}))},z=this,G=0,F=e,U.label=20;case 20:return G<F.length?(R=F[G],[5,j(R)]):[3,23];case 21:U.sent(),U.label=22;case 22:return G++,[3,20];case 23:return[2,r.toBase64()]}}))}))},e.prototype.signBatchP2SHTransaction=function(t,e,r,n,i){return s(this,void 0,void 0,(function(){var s,a,u,c,l,h,p,d,f,v,g,b,y,w,x,_,m,T,P,S,B;return o(this,(function(o){switch(o.label){case 0:return[4,this.getApp()];case 1:s=o.sent(),a=[],u=0,c=e,o.label=2;case 2:return u<c.length?(l=c[u],[4,this.getWalletAddress(l)]):[3,5];case 3:h=o.sent(),a.push(h.derivationPath),o.label=4;case 4:return u++,[3,2];case 5:if(!i)for(p=0,d=t;p<d.length;p++)w=d[p],r.setInputScript(w.vout.n,w.outputScript);return[4,s.splitTransaction(r.toHex(),!0)];case 6:return f=o.sent(),[4,s.serializeTransactionOutputs(f)];case 7:v=o.sent().toString("hex"),g=[],b=0,y=t,o.label=8;case 8:return b<y.length?(w=y[b],[4,s.splitTransaction(w.inputTxHex,!0)]):[3,11];case 9:x=o.sent(),g.push([x,w.index,w.outputScript.toString("hex"),0]),o.label=10;case 10:return b++,[3,8];case 11:return[4,s.signP2SHTransaction({inputs:g,associatedKeysets:a,outputScriptHex:v,lockTime:n,segwit:i,transactionVersion:2})];case 12:for(_=o.sent(),m=[],T=0,P=_;T<P.length;T++)S=P[T],B=i?S:S+"01",m.push(Buffer.from(B,"hex"));return[2,m]}}))}))},e.prototype.getAmountBuffer=function(t){var e=new d.BigNumber(Math.round(t)).toString(16);return e=l.padHexStart(e,8),Buffer.from(e,"hex").reverse()},e.prototype.getLedgerInputs=function(t){return s(this,void 0,void 0,(function(){var e,r=this;return o(this,(function(n){switch(n.label){case 0:return[4,this.getApp()];case 1:return e=n.sent(),[2,Promise.all(t.map((function(t){return s(r,void 0,void 0,(function(){var r;return o(this,(function(n){switch(n.label){case 0:return[4,this.getMethod("getTransactionHex")(t.txid)];case 1:return r=n.sent(),[4,e.splitTransaction(r,!0)];case 2:return[2,[n.sent(),t.vout,void 0,0]]}}))}))})))]}}))}))},e.prototype._getWalletPublicKey=function(t){return s(this,void 0,void 0,(function(){var e,r;return o(this,(function(n){switch(n.label){case 0:return[4,this.getApp()];case 1:return e=n.sent(),r=this._addressType===d.bitcoin.AddressType.P2SH_SEGWIT?"p2sh":this._addressType,[2,e.getWalletPublicKey(t,{format:r})]}}))}))},e.prototype.getWalletPublicKey=function(t){return s(this,void 0,void 0,(function(){var e;return o(this,(function(r){switch(r.label){case 0:return t in this._walletPublicKeyCache?[2,this._walletPublicKeyCache[t]]:[4,this._getWalletPublicKey(t)];case 1:return e=r.sent(),this._walletPublicKeyCache[t]=e,[2,e]}}))}))},e.prototype.baseDerivationNode=function(){return s(this,void 0,void 0,(function(){var t,e;return o(this,(function(r){switch(r.label){case 0:return this._baseDerivationNode?[2,this._baseDerivationNode]:[4,this.getWalletPublicKey(this._baseDerivationPath)];case 1:return t=r.sent(),e=h.compressPubKey(t.publicKey),this._baseDerivationNode=v.fromPublicKey(Buffer.from(e,"hex"),Buffer.from(t.chainCode,"hex"),this._network),[2,this._baseDerivationNode]}}))}))},e.prototype.getConnectedNetwork=function(){return s(this,void 0,void 0,(function(){var t,e;return o(this,(function(r){switch(r.label){case 0:return[4,this.getWalletPublicKey(this._baseDerivationPath)];case 1:return t=r.sent(),e=h.getAddressNetwork(t.bitcoinAddress),this._network.name===p.BitcoinNetworks.bitcoin_regtest.name&&e.name===p.BitcoinNetworks.bitcoin_testnet.name?[2,p.BitcoinNetworks.bitcoin_regtest]:[2,e]}}))}))},e}(c.BitcoinWalletProvider(u.LedgerProvider));e.default=b},175:function(t,e,r){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.BitcoinLedgerProvider=void 0;var i=n(r(66));e.BitcoinLedgerProvider=i.default},354:t=>{t.exports=require("@ledgerhq/hw-app-btc")},320:t=>{t.exports=require("@liquality/bitcoin-networks")},524:t=>{t.exports=require("@liquality/bitcoin-utils")},838:t=>{t.exports=require("@liquality/bitcoin-wallet-provider")},939:t=>{t.exports=require("@liquality/crypto")},431:t=>{t.exports=require("@liquality/ledger-provider")},522:t=>{t.exports=require("@liquality/types")},731:t=>{t.exports=require("bip32")},543:t=>{t.exports=require("bitcoinjs-lib")}},e={},r=function r(n){var i=e[n];if(void 0!==i)return i.exports;var s=e[n]={exports:{}};return t[n].call(s.exports,s,s.exports,r),s.exports}(175);module.exports=r})();
//# sourceMappingURL=index.js.map