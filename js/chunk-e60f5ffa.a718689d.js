(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e60f5ffa"],{"057f":function(t,r,e){var n=e("fc6a"),o=e("241c").f,s={}.toString,c="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return o(t)}catch(r){return c.slice()}};t.exports.f=function(t){return c&&"[object Window]"==s.call(t)?a(t):o(n(t))}},5530:function(t,r,e){"use strict";e.d(r,"a",(function(){return s}));e("b64b"),e("a4d3"),e("4de4"),e("e439"),e("159b"),e("dbb4");function n(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}function o(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}function s(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?o(Object(e),!0).forEach((function(r){n(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):o(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}},"746f":function(t,r,e){var n=e("428f"),o=e("5135"),s=e("e538"),c=e("9bf2").f;t.exports=function(t){var r=n.Symbol||(n.Symbol={});o(r,t)||c(r,t,{value:s.f(t)})}},7958:function(t,r,e){"use strict";e.r(r);var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"container-xl"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-7 mb-4"},[e("h2",{staticClass:"rounded-top card-header h3"},[t._v("收藏清單")]),e("products-card-sm",{attrs:{bases:t.favoredProducts,kind:"favoredProducts"}})],1),e("div",{staticClass:"col-md-5 mb-4"},[e("h3",{staticClass:"rounded-top card-header"},[t._v("推薦商品")]),e("products-card-sm",{attrs:{bases:t.adProducts}})],1)])])},o=[],s=e("5530"),c=(e("fb6a"),e("eadd")),a=e("2f62"),i={components:{ProductsCardSm:c["a"]},data:function(){return{favoredProducts:[],adProducts:[]}},computed:Object(s["a"])({},Object(a["d"])(["cusProducts","carting"])),watch:{cusProducts:{handler:function(){this.cusProducts.length>1&&this.getAdproducts()},deep:!0}},created:function(){this.getCusProducts(),this.$store.commit("SET_CUSACTIVE","CusFavs")},methods:Object(s["a"])(Object(s["a"])({},Object(a["b"])(["getCusProducts","addToCusFavs","delCusFav"])),{},{getAdproducts:function(){this.favoredProducts=[];for(var t=[],r=this.cusProducts.length,e=0;e<r;e+=1)this.cusProducts[e].favored?this.favoredProducts.push(this.cusProducts[e]):t.push(this.cusProducts[e]);var n,o=t.length;if(o>=4){var s=o-4;while(o-- >s){n=Math.floor((o+1)*Math.random());var c=[t[n],t[o]];t[o]=c[0],t[n]=c[1]}this.adProducts=t.slice(s)}else t.sort((function(){return Math.random()-.5})),this.adProducts=t},addToCusCart:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.$store.dispatch("addToCusCart",{cusProduct:t,qty:r})}})},u=i,d=e("2877"),f=Object(d["a"])(u,n,o,!1,null,null,null);r["default"]=f.exports},a4d3:function(t,r,e){"use strict";var n=e("23e7"),o=e("da84"),s=e("d066"),c=e("c430"),a=e("83ab"),i=e("4930"),u=e("fdbf"),d=e("d039"),f=e("5135"),l=e("e8b5"),b=e("861d"),p=e("825a"),v=e("7b0b"),h=e("fc6a"),g=e("c04e"),m=e("5c6c"),y=e("7c73"),O=e("df75"),C=e("241c"),P=e("057f"),w=e("7418"),j=e("06cf"),_=e("9bf2"),S=e("d1e7"),k=e("9112"),x=e("6eeb"),T=e("5692"),E=e("f772"),F=e("d012"),A=e("90e3"),D=e("b622"),$=e("e538"),N=e("746f"),J=e("d44e"),M=e("69f3"),q=e("b727").forEach,I=E("hidden"),U="Symbol",Q="prototype",V=D("toPrimitive"),W=M.set,z=M.getterFor(U),B=Object[Q],G=o.Symbol,H=s("JSON","stringify"),K=j.f,L=_.f,R=P.f,X=S.f,Y=T("symbols"),Z=T("op-symbols"),tt=T("string-to-symbol-registry"),rt=T("symbol-to-string-registry"),et=T("wks"),nt=o.QObject,ot=!nt||!nt[Q]||!nt[Q].findChild,st=a&&d((function(){return 7!=y(L({},"a",{get:function(){return L(this,"a",{value:7}).a}})).a}))?function(t,r,e){var n=K(B,r);n&&delete B[r],L(t,r,e),n&&t!==B&&L(B,r,n)}:L,ct=function(t,r){var e=Y[t]=y(G[Q]);return W(e,{type:U,tag:t,description:r}),a||(e.description=r),e},at=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof G},it=function(t,r,e){t===B&&it(Z,r,e),p(t);var n=g(r,!0);return p(e),f(Y,n)?(e.enumerable?(f(t,I)&&t[I][n]&&(t[I][n]=!1),e=y(e,{enumerable:m(0,!1)})):(f(t,I)||L(t,I,m(1,{})),t[I][n]=!0),st(t,n,e)):L(t,n,e)},ut=function(t,r){p(t);var e=h(r),n=O(e).concat(pt(e));return q(n,(function(r){a&&!ft.call(e,r)||it(t,r,e[r])})),t},dt=function(t,r){return void 0===r?y(t):ut(y(t),r)},ft=function(t){var r=g(t,!0),e=X.call(this,r);return!(this===B&&f(Y,r)&&!f(Z,r))&&(!(e||!f(this,r)||!f(Y,r)||f(this,I)&&this[I][r])||e)},lt=function(t,r){var e=h(t),n=g(r,!0);if(e!==B||!f(Y,n)||f(Z,n)){var o=K(e,n);return!o||!f(Y,n)||f(e,I)&&e[I][n]||(o.enumerable=!0),o}},bt=function(t){var r=R(h(t)),e=[];return q(r,(function(t){f(Y,t)||f(F,t)||e.push(t)})),e},pt=function(t){var r=t===B,e=R(r?Z:h(t)),n=[];return q(e,(function(t){!f(Y,t)||r&&!f(B,t)||n.push(Y[t])})),n};if(i||(G=function(){if(this instanceof G)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,r=A(t),e=function(t){this===B&&e.call(Z,t),f(this,I)&&f(this[I],r)&&(this[I][r]=!1),st(this,r,m(1,t))};return a&&ot&&st(B,r,{configurable:!0,set:e}),ct(r,t)},x(G[Q],"toString",(function(){return z(this).tag})),x(G,"withoutSetter",(function(t){return ct(A(t),t)})),S.f=ft,_.f=it,j.f=lt,C.f=P.f=bt,w.f=pt,$.f=function(t){return ct(D(t),t)},a&&(L(G[Q],"description",{configurable:!0,get:function(){return z(this).description}}),c||x(B,"propertyIsEnumerable",ft,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!i,sham:!i},{Symbol:G}),q(O(et),(function(t){N(t)})),n({target:U,stat:!0,forced:!i},{for:function(t){var r=String(t);if(f(tt,r))return tt[r];var e=G(r);return tt[r]=e,rt[e]=r,e},keyFor:function(t){if(!at(t))throw TypeError(t+" is not a symbol");if(f(rt,t))return rt[t]},useSetter:function(){ot=!0},useSimple:function(){ot=!1}}),n({target:"Object",stat:!0,forced:!i,sham:!a},{create:dt,defineProperty:it,defineProperties:ut,getOwnPropertyDescriptor:lt}),n({target:"Object",stat:!0,forced:!i},{getOwnPropertyNames:bt,getOwnPropertySymbols:pt}),n({target:"Object",stat:!0,forced:d((function(){w.f(1)}))},{getOwnPropertySymbols:function(t){return w.f(v(t))}}),H){var vt=!i||d((function(){var t=G();return"[null]"!=H([t])||"{}"!=H({a:t})||"{}"!=H(Object(t))}));n({target:"JSON",stat:!0,forced:vt},{stringify:function(t,r,e){var n,o=[t],s=1;while(arguments.length>s)o.push(arguments[s++]);if(n=r,(b(r)||void 0!==t)&&!at(t))return l(r)||(r=function(t,r){if("function"==typeof n&&(r=n.call(this,t,r)),!at(r))return r}),o[1]=r,H.apply(null,o)}})}G[Q][V]||k(G[Q],V,G[Q].valueOf),J(G,U),F[I]=!0},dbb4:function(t,r,e){var n=e("23e7"),o=e("83ab"),s=e("56ef"),c=e("fc6a"),a=e("06cf"),i=e("8418");n({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(t){var r,e,n=c(t),o=a.f,u=s(n),d={},f=0;while(u.length>f)e=o(n,r=u[f++]),void 0!==e&&i(d,r,e);return d}})},e439:function(t,r,e){var n=e("23e7"),o=e("d039"),s=e("fc6a"),c=e("06cf").f,a=e("83ab"),i=o((function(){c(1)})),u=!a||i;n({target:"Object",stat:!0,forced:u,sham:!a},{getOwnPropertyDescriptor:function(t,r){return c(s(t),r)}})},e538:function(t,r,e){var n=e("b622");r.f=n},eadd:function(t,r,e){"use strict";var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"card-lowerhalf container-fluid pt-3"},[t.bases.length>0?e("div",{staticClass:"row"},t._l(t.bases,(function(r){return e("div",{key:r.id,staticClass:"d-flex pb-3 col-sm-6 col-md-12 productscardsm-block",on:{click:function(e){return t.jumpToCusProduct(r.id)}}},[e("div",{staticClass:"productscardsm-img rounded bg-cover mr-2",style:{"background-image":"url("+r.imageUrl+")"}}),e("div",{staticClass:"flex-fill d-flex flex-column justify-content-around"},[e("div",{staticClass:"h6 d-flex justify-content-around mb-2"},[t._v(" "+t._s(r.title)+" "),e("span",{staticClass:"badge badge-primary productscardsm-badge"},[t._v(t._s(r.category))])]),e("div",{staticClass:"d-flex align-items-center justify-content-around"},[e("div",{staticClass:"productscardsm-priceblock"},[e("del",{staticClass:"text-muted mr-2"},[t._v("原價 "+t._s(r.origin_price)+" 元")]),e("span",{staticClass:"text-secondary"},[t._v("特價 "+t._s(r.price)+" 元")])]),e("div",[!1===r.favored?e("i",{staticClass:"far fa-heart productscardsm-btn-fav",on:{click:function(e){return e.stopPropagation(),t.addToCusFavs(r.id)}}}):t._e(),!0===r.favored?e("i",{staticClass:"fas fa-heart productscardsm-btn-fav",on:{click:function(e){return e.stopPropagation(),t.delCusFav(r.id)}}}):t._e(),e("i",{staticClass:"fas fa-shopping-cart productscardsm-btn-cart",on:{click:function(e){return e.stopPropagation(),t.addToCusCart(r)}}})])])]),"favoredProducts"===t.kind?e("div",{staticClass:"productscardsm-date"},[t._v(" 收藏日期："),e("br"),t._v(" "+t._s(r.favoredDate)+" ")]):t._e()])})),0):e("div",{staticClass:"flex-center pb-3 h3"},[t._v("目前尚無商品")])])},o=[],s=e("5530"),c=e("2f62"),a={props:{bases:Array,kind:String},methods:Object(s["a"])(Object(s["a"])({},Object(c["b"])(["addToCusFavs","delCusFav"])),{},{addToCusCart:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.$store.dispatch("addToCusCart",{cusProduct:t,qty:r})},jumpToCusProduct:function(t){this.$router.push("/products/".concat(t))}})},i=a,u=e("2877"),d=Object(u["a"])(i,n,o,!1,null,null,null);r["a"]=d.exports},fb6a:function(t,r,e){"use strict";var n=e("23e7"),o=e("861d"),s=e("e8b5"),c=e("23cb"),a=e("50c4"),i=e("fc6a"),u=e("8418"),d=e("b622"),f=e("1dde"),l=f("slice"),b=d("species"),p=[].slice,v=Math.max;n({target:"Array",proto:!0,forced:!l},{slice:function(t,r){var e,n,d,f=i(this),l=a(f.length),h=c(t,l),g=c(void 0===r?l:r,l);if(s(f)&&(e=f.constructor,"function"!=typeof e||e!==Array&&!s(e.prototype)?o(e)&&(e=e[b],null===e&&(e=void 0)):e=void 0,e===Array||void 0===e))return p.call(f,h,g);for(n=new(void 0===e?Array:e)(v(g-h,0)),d=0;h<g;h++,d++)h in f&&u(n,d,f[h]);return n.length=d,n}})}}]);
//# sourceMappingURL=chunk-e60f5ffa.a718689d.js.map