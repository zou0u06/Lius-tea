(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21ad06"],{bcb1:function(a,t,n){"use strict";n.r(t);var i=function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",[n("admin-navbar"),n("main",{staticClass:"container-xl admin px-0 px-md-3"},[n("router-view")],1)],1)},s=[],e=(n("ac1f"),n("5319"),function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",[n("nav",{staticClass:"navbar navbar-expand-md navbar-dark fixed-top bg-primary"},[n("div",{staticClass:"container-xl px-0 px-xl-3"},[n("h2",{staticClass:"mr-auto text-white"},[a._v("劉記茗茶管理後臺")]),a._m(0),n("div",{staticClass:"collapse navbar-collapse adminnavbar-collapse"},[n("ul",{staticClass:"navbar-nav ml-auto text-center",on:{click:function(t){return t.preventDefault(),a.setAdminNavbar()}}},[n("li",{staticClass:"nav-item"},[n("router-link",{staticClass:"nav-link",class:{active:"AdminProducts"===a.adminActive},attrs:{to:"/admin"}},[a._v("產品列表")])],1),n("li",{staticClass:"nav-item"},[n("router-link",{staticClass:"nav-link",class:{active:"AdminOrders"===a.adminActive},attrs:{to:"/admin/orders"}},[a._v("訂單列表")])],1),n("li",{staticClass:"nav-item"},[n("router-link",{staticClass:"nav-link",class:{active:"AdminCoupons"===a.adminActive},attrs:{to:"/admin/coupons"}},[a._v("優惠券列表")])],1),n("li",{staticClass:"nav-item",on:{click:function(t){return t.preventDefault(),a.signout(t)}}},[n("a",{staticClass:"nav-link"},[a._v("登出")])])])])])]),n("div",{staticClass:"collapse adminnavbar-collapse mask adminnavbar-mask"})])}),l=[function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("button",{staticClass:"navbar-toggler adminnavbar-toggler border-0",attrs:{type:"button","data-toggle":"collapse","data-target":".adminnavbar-collapse","aria-controls":"adminnavbar-collapse","aria-expanded":"false","aria-label":"Toggle navigation"}},[n("span",{staticClass:"navbar-toggler-icon"})])}],c={data:function(){return{}},computed:{adminActive:function(){return this.$store.state.adminModule.adminActive}},methods:{setAdminNavbar:function(){document.body.clientWidth<768&&document.querySelector(".adminnavbar-toggler").click()},signout:function(){var a=this,t="".concat("https://vue-course-api.hexschool.io","/logout");a.axios.post(t).then((function(t){!0===t.data.success&&a.$router.push("/login")}))}}},r=c,o=n("2877"),d=Object(o["a"])(r,e,l,!1,null,null,null),u=d.exports,v={components:{AdminNavbar:u},created:function(){var a=document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.axios.defaults.headers.common.Authorization=a}},m=v,p=Object(o["a"])(m,i,s,!1,null,null,null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d21ad06.0c8d5700.js.map