(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0df3ed"],{"88a8":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container-xl"},[r("validation-observer",{staticClass:"py-md-4 row justify-content-center",attrs:{tag:"div"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.invalid,s=e.handleSubmit;return[r("form",{staticClass:"col-md-8 p-4 bg-light rounded-breakpoint",on:{submit:function(e){return e.preventDefault(),s(t.payOrder)}}},[r("div",{staticClass:"d-flex justify-content-between align-items-center mb-3"},[r("h2",[r("strong",[t._v("付款資訊")])]),r("div",{staticClass:"d-flex justify-content-between progress bg-primary"},[r("div",{staticClass:"progress-icon progress-chara1"}),r("div",{staticClass:"progress-icon progress-chara2"}),r("div",{staticClass:"progress-icon progress-icon-active"})])]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"tempNumPart1",title:"必填"}},[t._v(" 信用卡號 "),r("sup",{staticClass:"text-danger"},[t._v("*")])]),r("div",{staticClass:"d-block d-sm-flex"},[r("div",{staticClass:"d-flex mb-2"},[r("validation-provider",{attrs:{rules:"digits:4|required",tag:"div"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors,s=e.classes;return[r("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCreditNum.part1,expression:"tempCreditNum.part1"}],staticClass:"form-control",class:s,attrs:{type:"number",id:"tempNumPart1",name:"卡號",placeholder:"1234"},domProps:{value:t.tempCreditNum.part1},on:{input:[function(e){e.target.composing||t.$set(t.tempCreditNum,"part1",e.target.value)},function(e){return t.jumpToNext(e.target.value,1)}]}}),r("div",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)}),r("div",{staticClass:"dashes"},[t._v("－")]),r("validation-provider",{attrs:{rules:"digits:4|required",tag:"div"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors,s=e.classes;return[r("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCreditNum.part2,expression:"tempCreditNum.part2"}],staticClass:"form-control",class:s,attrs:{id:"tempNumPart2",type:"number",name:"卡號",placeholder:"1234"},domProps:{value:t.tempCreditNum.part2},on:{input:[function(e){e.target.composing||t.$set(t.tempCreditNum,"part2",e.target.value)},function(e){return t.jumpToNext(e.target.value,2)}]}}),r("div",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)}),r("div",{staticClass:"dashes d-none d-sm-inline"},[t._v("－")])],1),r("div",{staticClass:"d-flex"},[r("validation-provider",{attrs:{rules:"digits:4|required",tag:"div"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors,s=e.classes;return[r("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCreditNum.part3,expression:"tempCreditNum.part3"}],staticClass:"form-control",class:s,attrs:{type:"number",id:"tempNumPart3",name:"卡號",placeholder:"1234"},domProps:{value:t.tempCreditNum.part3},on:{input:[function(e){e.target.composing||t.$set(t.tempCreditNum,"part3",e.target.value)},function(e){return t.jumpToNext(e.target.value,3)}]}}),r("div",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)}),r("div",{staticClass:"dashes"},[t._v("－")]),r("validation-provider",{attrs:{rules:"numeric|required",tag:"div"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors,s=e.classes;return[r("input",{directives:[{name:"model",rawName:"v-model",value:t.tempCreditNum.part4,expression:"tempCreditNum.part4"}],staticClass:"form-control",class:s,attrs:{type:"number",id:"tempNumPart4",name:"卡號",placeholder:"1234"},domProps:{value:t.tempCreditNum.part4},on:{input:function(e){e.target.composing||t.$set(t.tempCreditNum,"part4",e.target.value)}}}),r("div",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)})],1)])]),r("div",{staticClass:"form-group"},[r("label",{attrs:{title:"必填",for:"creditMM"}},[t._v(" 有效期限 "),r("sup",{staticClass:"text-danger"},[t._v("*")])]),r("div",{staticClass:"form-row"},[r("validation-provider",{staticClass:"col",attrs:{rules:"digits:2|required",tag:"div"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors,s=e.classes;return[r("input",{directives:[{name:"model",rawName:"v-model",value:t.card.creditMM,expression:"card.creditMM"}],staticClass:"form-control",class:s,attrs:{type:"number",id:"creditMM",name:"月份",placeholder:"00"},domProps:{value:t.card.creditMM},on:{input:function(e){e.target.composing||t.$set(t.card,"creditMM",e.target.value)}}}),r("div",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)}),r("validation-provider",{staticClass:"col",attrs:{rules:"digits:2|required",tag:"div"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors,s=e.classes;return[r("input",{directives:[{name:"model",rawName:"v-model",value:t.card.creditYY,expression:"card.creditYY"}],staticClass:"form-control",class:s,attrs:{type:"number",id:"creditYY",name:"年份",placeholder:"01"},domProps:{value:t.card.creditYY},on:{input:function(e){e.target.composing||t.$set(t.card,"creditYY",e.target.value)}}}),r("div",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)})],1)]),r("div",{staticClass:"form-group"},[r("label",{attrs:{title:"必填",for:"creditLN"}},[t._v(" 持卡人姓名 "),r("sup",{staticClass:"text-danger"},[t._v("*")])]),r("div",{staticClass:"form-row"},[r("validation-provider",{staticClass:"col",attrs:{rules:"required",tag:"div"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors,s=e.classes;return[r("input",{directives:[{name:"model",rawName:"v-model",value:t.card.creditLN,expression:"card.creditLN"}],staticClass:"form-control",class:s,attrs:{type:"text",id:"creditLN",name:"持卡人姓氏",placeholder:"劉"},domProps:{value:t.card.creditLN},on:{input:function(e){e.target.composing||t.$set(t.card,"creditLN",e.target.value)}}}),r("div",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)}),r("validation-provider",{staticClass:"col",attrs:{rules:"required",tag:"div"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors,s=e.classes;return[r("input",{directives:[{name:"model",rawName:"v-model",value:t.card.creditFN,expression:"card.creditFN"}],staticClass:"form-control",class:s,attrs:{type:"text",id:"creditFN",name:"持卡人名字",placeholder:"好茶"},domProps:{value:t.card.creditFN},on:{input:function(e){e.target.composing||t.$set(t.card,"creditFN",e.target.value)}}}),r("div",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)})],1)]),r("validation-provider",{staticClass:"form-group mb-4",attrs:{rules:"digits:3|required",tag:"div"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors,s=e.classes;return[r("label",{attrs:{title:"必填",for:"creditSC"}},[t._v(" 安全碼 "),r("sup",{staticClass:"text-danger"},[t._v("*")])]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.card.creditSC,expression:"card.creditSC"}],staticClass:"form-control",class:s,attrs:{type:"number",id:"creditSC",name:"安全碼",placeholder:"123"},domProps:{value:t.card.creditSC},on:{input:function(e){e.target.composing||t.$set(t.card,"creditSC",e.target.value)}}}),r("div",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)}),r("button",{staticClass:"btn btn-secondary btn-block",attrs:{type:"submit",disabled:a}},[t._v("確認付款")])],1)]}}])})],1)},s=[],i=(r("a9e3"),r("99af"),{data:function(){return{cusOrderId:"",card:{creditNum:"",creditMM:"",creditYY:"",creditLN:"",creditFN:"",creditSC:""},tempCreditNum:{part1:"",part2:"",part3:"",part4:""}}},watch:{tempCreditNum:{deep:!0,handler:function(){this.card.creditNum=Number("".concat(this.tempCreditNum.part1).concat(this.tempCreditNum.part2).concat(this.tempCreditNum.part3).concat(this.tempCreditNum.part4))}}},created:function(){this.cusOrderId=this.$route.params.cusOrderId},methods:{payOrder:function(){var t=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("zou06","/pay/").concat(t.cusOrderId);t.axios.post(e).then((function(e){e.data.success&&(t.$router.push("/finished/".concat(t.cusOrderId)),localStorage.setItem("cusCart",JSON.stringify([])))})).catch((function(e){e&&t.$store.commit("SET_MSG",{event:"cusServerError"})}))},jumpToNext:function(t,e){4===t.length&&"number"===typeof parseInt(t,10)&&-1===t.indexOf(".")&&document.querySelector("#tempNumPart".concat(e+1)).focus()}}}),d=i,c=r("2877"),o=Object(c["a"])(d,a,s,!1,null,null,null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-2d0df3ed.5e373af9.js.map