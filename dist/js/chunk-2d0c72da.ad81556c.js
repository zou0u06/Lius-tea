(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c72da"],{5009:function(t,s,e){"use strict";e.r(s);var r=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"cuscartfinished"},[e("div",{staticClass:"container-xl"},[e("div",{staticClass:"py-md-4 row justify-content-center"},[e("div",{staticClass:"col-md-8 bg-light p-3 rounded-breakpoint"},[t._m(0),t._m(1),e("button",{staticClass:"btn btn-secondary d-block w-50 mx-auto mb-5",attrs:{type:"button"},on:{click:function(s){return s.preventDefault(),t.goToCusProducts()}}},[t._v("繼續漫步茶園")]),e("h3",{staticClass:"mb-3 text-center"},[t._v("已購買商品")]),e("table",{staticClass:"table"},[t._m(2),e("tbody",t._l(t.cusOrder.products,(function(s){return e("tr",{key:s.id},[e("td",[t._v(t._s(s.product.title))]),e("td",{staticClass:"text-center"},[t._v(" "+t._s(s.qty)+t._s(s.product.unit)+" ")]),e("td",{staticClass:"text-right"},[t._v(t._s(t._f("displayCurrency")(s.final_total)))])])})),0),e("tfoot",[e("tr",[t._m(3),e("td",{staticClass:"text-right"},[t._v(t._s(t._f("displayCurrency")(t.cusOrder.total)))])])])]),e("h3",{staticClass:"mb-3 text-center"},[t._v("聯絡資訊及付款狀態")]),e("table",{staticClass:"table"},[e("tbody",[e("tr",[e("th",[t._v("Email")]),e("td",{staticClass:"cuscartfinished-cell-lg"},[t._v(t._s(t.cusOrder.user.email))])]),e("tr",[e("th",[t._v("姓名")]),e("td",[t._v(t._s(t.cusOrder.user.name))])]),e("tr",[e("th",[t._v("收件人電話")]),e("td",[t._v(t._s(t.cusOrder.user.tel))])]),e("tr",[e("th",[t._v("收件人地址")]),e("td",[t._v(t._s(t.cusOrder.user.address))])]),e("tr",[e("th",[t._v("付款狀態")]),e("td",[t.cusOrder.is_paid?e("span",{staticClass:"text-secondary"},[t._v("付款完成")]):e("span",[t._v("尚未付款")])])])])])])])])])},c=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("h2",{staticClass:"text-center mb-4"},[e("strong",[t._v("訂購已完成")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"d-flex justify-content-between mx-auto progress bg-primary mb-5"},[e("div",{staticClass:"progress-icon progress-chara1"}),e("div",{staticClass:"progress-icon progress-chara2"}),e("div",{staticClass:"progress-icon progress-chara3"})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("thead",[e("th",[t._v("品名")]),e("th",{staticClass:"text-center cuscartfinished-cell-sm"},[t._v("數量")]),e("th",{staticClass:"text-center cuscartfinished-cell-sm"},[t._v("單價")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("td",{staticClass:"text-right",attrs:{colspan:"2"}},[e("strong",[t._v("總計")])])}],a=(e("99af"),{data:function(){return{cusOrderId:"",cusOrder:{user:{}}}},created:function(){this.cusOrderId=this.$route.params.cusOrderId,this.getCusOrder()},methods:{getCusOrder:function(){var t=this,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("zou06","/order/").concat(t.cusOrderId);t.axios.get(s).then((function(s){s.data.success?t.cusOrder=s.data.order:t.$store.commit("SET_MSG",{event:"wrongServer"})}))},goToCusProducts:function(){this.$router.push("/products")}}}),n=a,i=e("2877"),o=Object(i["a"])(n,r,c,!1,null,null,null);s["default"]=o.exports}}]);
//# sourceMappingURL=chunk-2d0c72da.ad81556c.js.map