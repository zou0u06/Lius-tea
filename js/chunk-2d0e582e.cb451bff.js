(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e582e"],{9595:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("h3",{staticClass:"admin-title"},[t._v("訂單列表")]),s("div",{staticClass:"table-responsive mb-3"},[s("table",{staticClass:"table"},[t._m(0),s("tbody",t._l(t.adminOrders,(function(a){return s("tr",{key:a.id},[s("td",{staticClass:"text-center"},[t._v(t._s(t._f("displayDate")(a.create_at)))]),s("td",{staticClass:"text-center"},[t._v(t._s(a.user.email))]),s("td",{staticClass:"text-center"},t._l(a.products,(function(a){return s("div",{key:a.id},[t._v(" "+t._s(a.product.title)+" "+t._s(a.qty)+" "+t._s(a.product.unit))])})),0),s("td",{staticClass:"text-right"},[t._v(t._s(t._f("displayCurrency")(a.total)))]),s("td",{staticClass:"text-center"},[!0===a.is_paid?s("span",{staticClass:"text-secondary"},[t._v("已付款")]):s("span",[t._v("未付款")])])])})),0)])]),s("pagination",{staticClass:"ml-3",attrs:{pagination:t.pagination},on:{"click-page":t.getAdminOrders}})],1)},i=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("thead",[s("tr",{staticClass:"text-center"},[s("th",{staticClass:"admin-date"},[t._v("購買時間")]),s("th",{staticClass:"adminorders-email"},[t._v("Email")]),s("th",{staticClass:"adminorders-bought"},[t._v("購買品項")]),s("th",{staticClass:"adminorders-total"},[t._v("應付金額")]),s("th",{staticClass:"adminorders-paid"},[t._v("是否付款")])])])}],n=(s("99af"),{data:function(){return{adminOrders:[],pagination:{}}},created:function(){this.getAdminOrders(),this.$store.commit("SET_ADMINACTIVE","AdminOrders")},methods:{getAdminOrders:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=this,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("zou06","/admin/orders?page=").concat(t);a.$store.commit("SET_LOADING",!0),a.axios.get(s).then((function(t){t.data.success&&(a.adminOrders=t.data.orders,a.pagination=t.data.pagination,a.$store.commit("SET_LOADING",!1)),a.$store.commit("SET_LOADING",!1)}))}}}),r=n,c=s("2877"),d=Object(c["a"])(r,e,i,!1,null,null,null);a["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d0e582e.cb451bff.js.map