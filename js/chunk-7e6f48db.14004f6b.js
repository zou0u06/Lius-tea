(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e6f48db"],{1799:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("nav",[e("ul",{staticClass:"pagination"},[e("li",{staticClass:"page-item rounded-left",class:{disabled:!t.pagination.has_pre}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.changePage(t.pagination.current_page-1)}}},[t._v("上一頁")])]),t._l(t.pagination.total_pages,(function(a){return e("li",{key:a,staticClass:"page-item",class:{active:a===t.pagination.current_page}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.changePage(a)}}},[t._v(t._s(a))])])})),e("li",{staticClass:"page-item rounded-right",class:{disabled:!t.pagination.has_next}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.changePage(t.pagination.current_page+1)}}},[t._v("下一頁")])])],2)])},n=[],i={props:{pagination:{type:Object}},methods:{changePage:function(t){this.$emit("click-page",t)}}},r=i,c=e("2877"),l=Object(c["a"])(r,s,n,!1,null,null,null);a["a"]=l.exports},9595:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("h2",{staticClass:"admin-title"},[t._v("訂單列表")]),e("div",{staticClass:"table-responsive mb-3"},[e("table",{staticClass:"table"},[t._m(0),e("tbody",t._l(t.adminOrders,(function(a){return e("tr",{key:a.id},[e("td",{staticClass:"text-center"},[t._v(t._s(t._f("displayDate")(a.create_at)))]),e("td",{staticClass:"text-center"},[t._v(t._s(a.user.email))]),e("td",{staticClass:"text-center"},t._l(a.products,(function(a){return e("div",{key:a.id},[t._v(t._s(a.product.title)+" "+t._s(a.qty)+" "+t._s(a.product.unit))])})),0),e("td",{staticClass:"text-right"},[t._v(t._s(t._f("displayCurrency")(a.total)))]),e("td",{staticClass:"text-center"},[!0===a.is_paid?e("span",{staticClass:"text-secondary"},[t._v("已付款")]):e("span",[t._v("未付款")])])])})),0)])]),e("pagination",{staticClass:"ml-3",attrs:{pagination:t.pagination},on:{"click-page":t.getAdminOrders}})],1)},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",{staticClass:"text-center"},[e("th",{staticClass:"admin-date"},[e("div",[t._v("購買")]),t._v("時間 ")]),e("th",{staticClass:"adminorders-email"},[t._v("Email")]),e("th",{staticClass:"adminorders-bought"},[t._v("購買品項")]),e("th",{staticClass:"adminorders-total"},[t._v("應付金額")]),e("th",{staticClass:"adminorders-paid"},[t._v("是否付款")])])])}],i=e("1799"),r={components:{Pagination:i["a"]},data:function(){return{}},created:function(){this.getAdminOrders(),this.$store.commit("SET_ADMINACTIVE","AdminOrders")},computed:{adminOrders:function(){return this.$store.state.adminModule.adminOrders},pagination:function(){return this.$store.state.adminModule.pagination}},methods:{getAdminOrders:function(t){this.$store.dispatch("getAdminOrders",t)}}},c=r,l=e("2877"),d=Object(l["a"])(c,s,n,!1,null,null,null);a["default"]=d.exports}}]);
//# sourceMappingURL=chunk-7e6f48db.14004f6b.js.map