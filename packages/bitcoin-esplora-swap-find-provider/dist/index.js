(()=>{"use strict";var t={545:function(t,e,r){var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function a(t){try{u(n.next(t))}catch(t){i(t)}}function s(t){try{u(n.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(a,s)}u((n=n.apply(t,e||[])).next())}))},a=this&&this.__generator||function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(e,"__esModule",{value:!0});var s=r(126),u=(r(522),function(t){function e(e){return t.call(this,{baseURL:e,responseType:"text",transformResponse:void 0})||this}return o(e,t),e.prototype.findAddressTransaction=function(t,e,r){return i(this,void 0,void 0,(function(){var n,o,i,s,u;return a(this,(function(a){switch(a.label){case 0:return[4,this.nodeGet("/address/"+t+"/txs")];case 1:n=a.sent(),o=0,i=n,a.label=2;case 2:return o<i.length?(s=i[o],[4,this.getMethod("formatTransaction")(s,e)]):[3,5];case 3:if(u=a.sent(),r(u))return[2,u];a.label=4;case 4:return o++,[3,2];case 5:return[2]}}))}))},e.prototype.findSwapTransaction=function(t,e,r){return i(this,void 0,void 0,(function(){var e,n,o,i,s,u,c;return a(this,(function(a){switch(a.label){case 0:return[4,this.getMethod("getBlockHeight")()];case 1:for(e=a.sent(),n=this.getMethod("getSwapOutput")(t),o=this.getMethod("getSwapPaymentVariants")(n),i=0,s=Object.values(o);i<s.length;i++)if(u=s[i],c=this.findAddressTransaction(u.address,e,r))return[2,c];return[2]}}))}))},e.prototype.doesBlockScan=function(){return!1},e}(s.NodeProvider));e.default=u},175:function(t,e,r){var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.BitcoinEsploraSwapFindProvider=void 0;var o=n(r(545));e.BitcoinEsploraSwapFindProvider=o.default},126:t=>{t.exports=require("@liquality/node-provider")},522:t=>{t.exports=require("@liquality/types")}},e={},r=function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}(175);module.exports=r})();
//# sourceMappingURL=index.js.map