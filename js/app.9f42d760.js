(function(t){function e(e){for(var o,i,r=e[0],s=e[1],u=e[2],d=0,m=[];d<r.length;d++)i=r[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&m.push(a[i][0]),a[i]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o]);l&&l(e);while(m.length)m.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],o=!0,i=1;i<n.length;i++){var s=n[i];0!==a[s]&&(o=!1)}o&&(c.splice(e--,1),t=r(r.s=n[0]))}return t}var o={},a={app:0},c=[];function i(t){return r.p+"js/"+({}[t]||t)+"."+{"chunk-12df1702":"68d36f35","chunk-140e525a":"69d7f221","chunk-1510f368":"96910d01","chunk-232a9e7f":"e2904253","chunk-2c7cde68":"28ea1cdf","chunk-2d0c72da":"d1df2a63","chunk-2d0df3ed":"5616899b","chunk-2d0e44ac":"b5a96ad0","chunk-2d21ad06":"e4bac112","chunk-3369c008":"61cb8a6d","chunk-36bd39ca":"6c6e4e66","chunk-7e6f48db":"7c55a4a6","chunk-e60f5ffa":"a718689d","chunk-f48e7f7a":"181b298b"}[t]+".js"}function r(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.e=function(t){var e=[],n=a[t];if(0!==n)if(n)e.push(n[2]);else{var o=new Promise((function(e,o){n=a[t]=[e,o]}));e.push(n[2]=o);var c,s=document.createElement("script");s.charset="utf-8",s.timeout=120,r.nc&&s.setAttribute("nonce",r.nc),s.src=i(t);var u=new Error;c=function(e){s.onerror=s.onload=null,clearTimeout(d);var n=a[t];if(0!==n){if(n){var o=e&&("load"===e.type?"missing":e.type),c=e&&e.target&&e.target.src;u.message="Loading chunk "+t+" failed.\n("+o+": "+c+")",u.name="ChunkLoadError",u.type=o,u.request=c,n[1](u)}a[t]=void 0}};var d=setTimeout((function(){c({type:"timeout",target:s})}),12e4);s.onerror=s.onload=c,document.head.appendChild(s)}return Promise.all(e)},r.m=t,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r.oe=function(t){throw console.error(t),t};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var d=0;d<s.length;d++)e(s[d]);var l=u;c.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("4de4"),n("159b"),n("b64b");var o=n("2b0e"),a=n("bc3a"),c=n.n(a),i=n("2106"),r=n.n(i),s=n("2f62"),u=n("d6e6"),d=n.n(u),l=(n("4989"),n("1157")),m=n.n(l),h=(n("5f60"),n("2be5"),n("e40d"),n("7b8d"),n("6a2c"),n("7bb1")),f=n("60d4"),p=n("4c93"),g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("msg-modal"),n("loading",{attrs:{active:t.loading},on:{"update:active":function(e){t.loading=e}}}),n("router-view"),n("button",{staticClass:"totop button btn-extra",attrs:{type:"button"},on:{click:function(e){return t.goToTop()}}},[n("i",{staticClass:"fas fa-arrow-up"})])],1)},v=[],S=n("9062"),b=n.n(S),C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"modal fade",attrs:{id:"msgModal","data-backdrop":"static","data-keyboard":"false","aria-labelledby":"msgModalLabel","aria-hidden":"true"}},[n("div",{staticClass:"modal-dialog",attrs:{id:"msgModalDialog"}},[n("div",{staticClass:"modal-content"},[n("div",{staticClass:"modal-header d-flex",class:"bg-"+t.theme},[n("h5",{staticClass:"modal-title text-white",attrs:{id:"msgModalLabel"}},[t._v(t._s(t.title))]),t._m(0)]),n("div",{staticClass:"modal-body"},[t.msg.object?n("h6",{staticClass:"mb-3 line-height-lg",class:"text-"+t.theme},[t._v(t._s(t.msg.object))]):t._e(),""!==t.action?n("h6",{staticClass:"line-height-lg"},[t._v(t._s(t.action))]):n("div",{staticClass:"text-center line-height-lg"},[n("h6",{staticClass:"mb-3"},[t._v("為慶祝本茶行開幕九周年")]),n("h6",[t._v(" 只要在結帳時輸入 "),n("span",{class:"text-"+t.theme},[t._v("ninety")]),t._v(" 優惠碼即可取得九折優惠！ ")])])]),n("div",{staticClass:"modal-footer p-1"},[n("button",{staticClass:"btn btn-outline-dark",attrs:{type:"button","data-dismiss":"modal"}},[t._v("關閉")]),"additionToCusCart"===t.msg.event?n("button",{staticClass:"btn",class:"btn-"+t.theme,attrs:{type:"button"},on:{click:function(e){return t.goToCusCart()}}},[t._v("查看購物車")]):t._e(),"delCusCart"===t.msg.event||"delAdminProduct"===t.msg.event||"delAdminCoupon"===t.msg.event?n("button",{staticClass:"btn",class:"btn-"+t.theme,attrs:{type:"button"},on:{click:function(e){return t.delObject(t.msg.objectId)}}},[t._v("確認刪除")]):t._e()])])])])},T=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[n("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])}],_=(n("99af"),n("a434"),{data:function(){return{title:"",theme:"",action:""}},computed:{msg:function(){return this.$store.state.msg}},watch:{msg:{handler:function(){switch(this.msg.event){case"showingCoupon":this.title="最新優惠",this.theme="secondary",this.action="",$("#msgModal").modal("show");break;case"cusServerError":this.title="網路錯誤",this.theme="danger",this.action="網路發生錯誤，請直接來電洽詢，將有專人為您服務",$("#msgModal").modal("show"),this.dismissWithTiming();break;case"adminServerError":this.title="網路錯誤",this.theme="danger",this.action="網路發生錯誤，請洽網路供應商或網站設計者",$("#msgModal").modal("show"),this.dismissWithTiming();break;case"additionToCusCart":this.title="商品已加入購物車",this.theme="secondary",this.action="已加入您的購物車",$("#msgModal").modal("show"),this.dismissWithTiming();break;case"subscription":this.title="成功訂閱電子報",this.theme="secondary",this.action="您已成功訂閱電子報，將會每週獲得新品優惠、品茶知識等資訊",$("#msgModal").modal("show");break;default:this.title="確認刪除",this.theme="danger",this.action="確認要刪除以上商品／折價券？",$("#msgModal").modal("show");break}},deep:!0}},methods:{dismissWithTiming:function(){setTimeout((function(){$("#msgModal").modal("hide")}),5e3)},goToCusCart:function(){$("#msgModal").modal("hide"),this.$router.push("/cart")},delObject:function(t){var e=this,n=JSON.parse(localStorage.getItem("cusCart"))||[],o=n.length;switch(e.msg.event){case"delAdminProduct":var a="".concat("https://vue-course-api.hexschool.io","/api/").concat("zou06","/admin/product/").concat(t);e.axios.delete(a).then((function(t){t.data.success&&(e.$store.dispatch("getAdminProducts"),$("#msgModal").modal("hide"))})).catch((function(t){t&&e.$store.commit("SET_MSG",{event:"adminServerError"})}));break;case"delAdminCoupon":var c="".concat("https://vue-course-api.hexschool.io","/api/").concat("zou06","/admin/coupon/").concat(t);e.axios.delete(c).then((function(t){t.data.success&&(e.$store.dispatch("getAdminCoupons"),$("#msgModal").modal("hide"))})).catch((function(t){t&&e.$store.commit("SET_MSG",{event:"adminServerError"})}));break;default:for(var i=0;i<o;i+=1)if(n[i].product_id===t){n.splice(i,1);break}localStorage.setItem("cusCart",JSON.stringify(n)),e.$store.dispatch("getCusCart"),$("#msgModal").modal("hide");break}}}}),E=_,A=n("2877"),O=Object(A["a"])(E,C,T,!1,null,null,null),I=O.exports,G={name:"App",components:{loading:b.a,MsgModal:I},data:function(){return{}},computed:{loading:function(){return this.$store.state.loading}},created:function(){this.setToTop()},methods:{setToTop:function(){window.addEventListener("scroll",(function(){window.scrollY>400?document.querySelector(".totop").style.display="inline":document.querySelector(".totop").style.display="none"}))},goToTop:function(){var t=-window.scrollY/200,e=setInterval((function(){0!==window.scrollY?window.scrollBy(0,t):clearInterval(e)}),5)}}},y=G,N=(n("5c0b"),Object(A["a"])(y,g,v,!1,null,null,null)),k=N.exports,M=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f"));o["a"].use(M["a"]);var w=new M["a"]({routes:[{component:function(){return n.e("chunk-2c7cde68").then(n.bind(null,"58e5"))},path:"/",children:[{name:"CusIndex",component:function(){return n.e("chunk-36bd39ca").then(n.bind(null,"1425"))},path:"/"},{name:"CusProducts",component:function(){return n.e("chunk-3369c008").then(n.bind(null,"a9d6"))},path:"/products"},{name:"CusFavs",component:function(){return n.e("chunk-e60f5ffa").then(n.bind(null,"7958"))},path:"/favs"},{name:"CusProduct",component:function(){return n.e("chunk-140e525a").then(n.bind(null,"2511"))},path:"/products/:cusProductId"},{name:"CusCart",component:function(){return n.e("chunk-232a9e7f").then(n.bind(null,"bede"))},path:"/Cart"},{name:"CusCartInfo",component:function(){return n.e("chunk-1510f368").then(n.bind(null,"a851"))},path:"/info"},{name:"CusCartPayment",component:function(){return n.e("chunk-2d0df3ed").then(n.bind(null,"88a8"))},path:"/payment/:cusOrderId"},{name:"CusCartFinished",component:function(){return n.e("chunk-2d0c72da").then(n.bind(null,"5009"))},path:"/finished/:cusOrderId"},{name:"CusLogin",component:function(){return n.e("chunk-2d0e44ac").then(n.bind(null,"9032"))},path:"/login"}]},{component:function(){return n.e("chunk-2d21ad06").then(n.bind(null,"bcb1"))},path:"/admin",meta:{requiresAuth:!0},children:[{name:"AdminProducts",component:function(){return n.e("chunk-12df1702").then(n.bind(null,"c267"))},path:"/",meta:{requiresAuth:!0}},{name:"AdminOrders",component:function(){return n.e("chunk-7e6f48db").then(n.bind(null,"9595"))},path:"/admin/orders",meta:{requiresAuth:!0}},{name:"AdminCoupons",component:function(){return n.e("chunk-f48e7f7a").then(n.bind(null,"992a"))},path:"/admin/coupons",meta:{requiresAuth:!0}}]},{path:"*",redirect:"/"}],scrollBehavior:function(t,e,n){return n||{x:0,y:0}}}),D=(n("6062"),n("a630"),n("7db0"),{state:{adminActive:"",adminCoupons:[],adminProducts:[],adminOrders:[],pagination:{}},actions:{getAdminCoupons:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;t.commit("SET_LOADING",!0);var n="".concat("https://vue-course-api.hexschool.io","/api/").concat("zou06","/admin/coupons?page=").concat(e);c.a.get(n).then((function(e){e.data.coupons?(t.commit("GET_ADMINCOUPONS",e.data.coupons),t.commit("GET_PAGINATION",e.data.pagination),t.commit("SET_LOADING",!1)):(t.commit("SET_MSG",{event:"adminServerError"}),t.commit("SET_LOADING",!1))})).catch((function(e){e&&t.$store.commit("SET_MSG",{event:"adminServerError"})}))},getAdminProducts:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;t.commit("SET_LOADING",!0);var n="".concat("https://vue-course-api.hexschool.io","/api/").concat("zou06","/admin/products?page=").concat(e);c.a.get(n).then((function(e){e.data.success?(t.commit("GET_ADMINPRODUCTS",e.data.products),t.commit("GET_PAGINATION",e.data.pagination),t.commit("SET_LOADING",!1)):(t.commit("SET_MSG",{event:"adminServerError"}),t.commit("SET_LOADING",!1))})).catch((function(e){e&&t.$store.commit("SET_MSG",{event:"adminServerError"})}))},getAdminOrders:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n="".concat("https://vue-course-api.hexschool.io","/api/").concat("zou06","/admin/orders?page=").concat(e);t.commit("SET_LOADING",!0),c.a.get(n).then((function(e){e.data.success?(t.commit("GET_ADMINORDERS",e.data.orders),t.commit("GET_PAGINATION",e.data.pagination),t.commit("SET_LOADING",!1)):(t.commit("SET_MSG",{event:"adminServerError"}),t.commit("SET_LOADING",!1))})).catch((function(e){e&&t.$store.commit("SET_MSG",{event:"adminServerError"})}))}},mutations:{SET_ADMINACTIVE:function(t,e){t.adminActive=e},GET_ADMINCOUPONS:function(t,e){t.adminCoupons=e},GET_ADMINPRODUCTS:function(t,e){t.adminProducts=e},GET_ADMINORDERS:function(t,e){t.adminOrders=e},GET_PAGINATION:function(t,e){t.pagination=e}}});o["a"].use(s["a"]);var P=new s["a"].Store({strict:!0,modules:{adminModule:D},state:{cusActive:"",cusProducts:[{favored:"",favoredDate:"",imageUrl:""}],cusProductsActive:"",cats:[],cusCart:{carts:[{product:{imageUrl:""}}]},loading:!1,carting:!1,msg:{event:"",object:"",objectId:"",times:0}},actions:{getCusProducts:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;t.commit("SET_LOADING",!0);var n="".concat("https://vue-course-api.hexschool.io","/api/").concat("zou06","/products?page=").concat(e);c.a.get(n).then((function(e){if(e.data.success){var n=e.data.products.filter((function(t){return 1===t.is_enabled}));t.commit("GET_CUSPRODUCTS",n),t.commit("GET_PAGINATION",e.data.pagination),t.dispatch("getCats"),t.dispatch("setCusFavs")}else t.commit("SET_LOADING",!1),t.commit("SET_MSG","wrongServer")})).catch((function(e){e&&t.$store.commit("SET_MSG",{event:"cusServerError"})}))},getCats:function(t){var e=new Set;t.state.cusProducts.forEach((function(t){e.add(t.category)})),t.commit("GET_CATS",Array.from(e))},setCusFavs:function(t){var e=JSON.parse(localStorage.getItem("cusFavs"))||[],n=t.state.cusProducts.length,o=e.length;if(o>0){for(var a=0;a<n;a+=1)for(var c=0;c<o;c+=1){if(t.state.cusProducts[a].id===e[c].product_id){t.commit("SET_CUSFAVS",{i:a,boolean:!0,favoredDate:e[c].favored_date});break}t.commit("SET_CUSFAVS",{i:a,boolean:!1})}t.commit("SET_LOADING",!1)}else{for(var i=0;i<n;i+=1)t.commit("SET_CUSFAVS",{i:i,boolean:!1});t.commit("SET_LOADING",!1)}},addToCusFavs:function(t,e){var n,o=JSON.parse(localStorage.getItem("cusFavs"))||[],a=(new Date).getFullYear(),c=(new Date).getMonth()+1;n=c>=10?(new Date).getMonth()+1:"0".concat((new Date).getMonth()+1);var i=(new Date).getDate(),r="".concat(a,"-").concat(n,"-").concat(i);o.push({product_id:e,favored_date:r}),localStorage.setItem("cusFavs",JSON.stringify(o)),t.state.cusProducts.find((function(n,o){return n.id===e&&t.commit("SET_CUSFAVS",{i:o,boolean:!0,favoredDate:r}),!1}))},delCusFav:function(t,e){for(var n=JSON.parse(localStorage.getItem("cusFavs")),o=t.state.cusProducts,a=0;a<n.length;a+=1)for(var c=0;c<o.length;c+=1)if(o[c].id===n[a].product_id&&e===n[a].product_id){n.splice(a,1),localStorage.setItem("cusFavs",JSON.stringify(n)),t.commit("SET_CUSFAVS",{i:c,boolean:!1});break}},addToCusCart:function(t,e){var n=e.cusProduct,o=e.qty,a=JSON.parse(localStorage.getItem("cusCart"))||[],c=a.length;function i(){a.push({product_id:n.id,qty:o}),localStorage.setItem("cusCart",JSON.stringify(a)),t.dispatch("getCusCart"),t.commit("SET_MSG",{event:"additionToCusCart",object:"".concat(n.title," ").concat(o," ").concat(n.unit)})}if(c>0){for(var r,s=0;s<c;s+=1)if(a[s].product_id===n.id){r=!0,a[s].qty+=o,localStorage.setItem("cusCart",JSON.stringify(a)),t.dispatch("getCusCart"),t.commit("SET_MSG",{event:"additionToCusCart",object:"".concat(n.title," ").concat(o," ").concat(n.unit)});break}r||i()}else i()},getCusCart:function(t){t.commit("SET_LOADING",!0);var e=JSON.parse(localStorage.getItem("cusCart"))||[];if(e.length>0){var n=[];t.state.cusProducts.forEach((function(t){e.forEach((function(e){t.id===e.product_id&&e.product?n.push(e):t.id!==e.product_id||e.product||n.push({product:t,qty:e.qty})}))})),n.sort((function(t,e){return t.product.id<e.product.id?-1:t.product.id>e.product.id?1:0})),t.commit("GET_CUSCART",n),t.commit("SET_LOADING",!1)}else t.commit("GET_CUSCART",e),t.commit("SET_LOADING",!1)},getFinalCusCart:function(t){var e="".concat("https://vue-course-api.hexschool.io","/api/").concat("zou06","/cart");c.a.get(e).then((function(e){if(e.data.success){var n=e.data.data;n.carts.sort((function(t,e){return t.product.id<e.product.id?-1:t.product.id>e.product.id?1:0})),localStorage.setItem("cusCart",JSON.stringify(n.carts)),t.commit("GET_FINALCUSCART",n),t.commit("SET_CARTING",!1),t.commit("SET_LOADING",!1)}else t.commit("SET_MSG","wrongServer"),t.commit("SET_CARTING",!1),t.commit("SET_LOADING",!1)})).catch((function(e){e&&t.$store.commit("SET_MSG",{event:"cusServerError"})}))}},mutations:{SET_LOADING:function(t,e){t.loading=e},SET_CARTING:function(t,e){t.carting=e},SET_MSG:function(t,e){t.msg.event=e.event,t.msg.object=e.object,t.msg.objectId=e.objectId,t.msg.times+=1},SET_CUSACTIVE:function(t,e){t.cusActive=e},GET_CUSPRODUCTS:function(t,e){t.cusProducts=e},SET_CUSPRODUCTSACTIVE:function(t,e){t.cusProductsActive=e},GET_CATS:function(t,e){t.cats=e},SET_CUSFAVS:function(t,e){o["a"].set(t.cusProducts["".concat(e.i)],"favored",e.boolean),o["a"].set(t.cusProducts["".concat(e.i)],"favoredDate",e.favoredDate)},GET_CUSCART:function(t,e){t.cusCart.carts=e},GET_FINALCUSCART:function(t,e){o["a"].set(t,"cusCart",e)}}}),j=function(t){if(t){var e,n,o=new Date(1e3*t),a=o.getFullYear();return e=o.getMonth()+1>9?o.getMonth()+1:"0".concat(o.getMonth()+1),n=o.getDate()>9?o.getDate():"0".concat(o.getDate()),"".concat(a,"-").concat(e,"-").concat(n)}return""},x=(n("a9e3"),n("ac1f"),n("5319"),n("b680"),function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=Number(t);return"$".concat(e.toFixed(0).replace(/./g,(function(t,e,n){var o=e&&"."!==t&&(n.length-e)%3===0?", ".concat(t).replace(/\s/g,""):t;return o})))}),L=void 0;window.$=m.a,o["a"].use(r.a,c.a,s["a"],d.a,{id:"GTM-M8SKWZM",defer:!1,compatibility:!0,enabled:!0,debug:!0,loadScript:!0,vueRouter:w,trackOnNextTick:!1}),o["a"].filter("displayCurrency",x),o["a"].filter("displayDate",j),Object.keys(p).forEach((function(t){Object(h["d"])(t,p[t])})),Object(h["e"])("zh_TW",f),o["a"].component("ValidationObserver",h["a"]),o["a"].component("ValidationProvider",h["b"]),Object(h["c"])({classes:{invalid:"is-invalid"}}),o["a"].config.productionTip=!1,new o["a"]({router:w,store:P,render:function(t){return t(k)}}).$mount("#app"),w.beforeEach((function(t,e,n){if(t.meta.requiresAuth){var o="".concat("https://vue-course-api.hexschool.io","/api/user/check");c.a.post(o).then((function(t){t.data.success?n():n({path:"/"})})).catch((function(t){t&&L.$store.commit("SET_MSG",{event:"adminServerError"})}))}else n()}))},"5c0b":function(t,e,n){"use strict";n("9c0c")},"9c0c":function(t,e,n){}});
//# sourceMappingURL=app.9f42d760.js.map