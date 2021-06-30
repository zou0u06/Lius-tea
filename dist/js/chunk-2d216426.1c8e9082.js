(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d216426"],{c267:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h3",{staticClass:"admin-title"},[t._v("產品列表")]),a("div",{staticClass:"text-right mb-3 mr-3"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.openProductModal()}}},[t._v("建立新的商品")])]),a("div",{staticClass:"table-responsive mb-3"},[a("table",{staticClass:"table"},[t._m(0),a("tbody",t._l(t.adminProducts,(function(e){return a("tr",{key:e.id},[a("td",{staticClass:"text-center"},[t._v(t._s(e.category))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.title))]),a("td",{staticClass:"adminproducts-oriprice text-right"},[t._v(" "+t._s(t._f("displayCurrency")(e.origin_price))+" ")]),a("td",{staticClass:"text-right"},[t._v(t._s(t._f("displayCurrency")(e.price)))]),a("td",{staticClass:"text-center"},[1===e.is_enabled?a("span",{staticClass:"text-secondary"},[t._v("啟用")]):a("span",[t._v("未啟用")])]),a("td",{staticClass:"text-center"},[a("button",{staticClass:"btn btn-outline-primary btn-sm",attrs:{type:"button"},on:{click:function(a){return t.openProductModal(e)}}},[t._v("編輯")]),a("button",{staticClass:"btn btn-outline-danger btn-sm",attrs:{type:"button"},on:{click:function(a){return t.openDelModal(e)}}},[t._v("刪除")])])])})),0)])]),a("pagination",{staticClass:"ml-3",attrs:{pagination:t.pagination},on:{"click-page":t.getAdminProducts}}),a("div",{staticClass:"modal fade",attrs:{id:"productModal","data-backdrop":"static","data-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog modal-lg",attrs:{role:"document"}},[a("div",{staticClass:"modal-content border-0"},[a("div",{staticClass:"modal-header bg-primary text-white"},[a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t.addition?a("span",[t._v("新增商品")]):a("span",[t._v("編輯商品")])]),t._m(1)]),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-4 mb-3"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"image"}},[t._v("輸入圖片網址")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.imageUrl,expression:"tempProduct.imageUrl"}],staticClass:"form-control",attrs:{type:"text",id:"image",placeholder:"請輸入網址"},domProps:{value:t.tempProduct.imageUrl},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"imageUrl",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"adminProductsPic"}},[t._v(" 或上傳圖片（3MB內） "),t.picUploading?a("i",{staticClass:"fas fa-spinner fa-spin"}):t._e()]),a("input",{ref:"files",staticClass:"form-control",attrs:{type:"file",id:"adminProductsPic"},on:{change:t.uploadPic}})]),t.picErrorMsg?a("div",{staticClass:"border border-danger p-3 text-center"},[t._v("圖片檔案過大或格式錯誤，請重新上傳")]):a("img",{staticClass:"img-fluid",attrs:{alt:"",src:t.tempProduct.imageUrl}})]),a("div",{staticClass:"col-sm-8"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"title"}},[t._v("標題")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.title,expression:"tempProduct.title"}],staticClass:"form-control",attrs:{type:"text",id:"title",placeholder:"請輸入標題"},domProps:{value:t.tempProduct.title},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"title",e.target.value)}}})]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"form-group col-md-6"},[a("label",{attrs:{for:"category"}},[t._v("分類")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.category,expression:"tempProduct.category"}],staticClass:"form-control",attrs:{type:"text",id:"category",placeholder:"請輸入分類"},domProps:{value:t.tempProduct.category},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"category",e.target.value)}}})]),a("div",{staticClass:"form-group col-md-6"},[a("label",{attrs:{for:"price"}},[t._v("單位")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.unit,expression:"tempProduct.unit"}],staticClass:"form-control",attrs:{type:"unit",id:"unit",placeholder:"請輸入單位"},domProps:{value:t.tempProduct.unit},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"unit",e.target.value)}}})])]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"form-group col-md-6"},[a("label",{attrs:{for:"origin_price"}},[t._v("原價")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.origin_price,expression:"tempProduct.origin_price"}],staticClass:"form-control",attrs:{type:"number",id:"origin_price",placeholder:"請輸入原價"},domProps:{value:t.tempProduct.origin_price},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"origin_price",e.target.value)}}})]),a("div",{staticClass:"form-group col-md-6"},[a("label",{attrs:{for:"price"}},[t._v("售價")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.price,expression:"tempProduct.price"}],staticClass:"form-control",attrs:{type:"number",id:"price",placeholder:"請輸入售價"},domProps:{value:t.tempProduct.price},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"price",e.target.value)}}})])]),a("hr"),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"description"}},[t._v("商品簡述")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.description,expression:"tempProduct.description"}],staticClass:"form-control",attrs:{type:"text",id:"description",placeholder:"請輸入商品簡述"},domProps:{value:t.tempProduct.description},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"description",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"content"}},[t._v("商品說明")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.content,expression:"tempProduct.content"}],staticClass:"form-control",attrs:{type:"text",id:"content",placeholder:"請輸入商品說明"},domProps:{value:t.tempProduct.content},on:{input:function(e){e.target.composing||t.$set(t.tempProduct,"content",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("div",{staticClass:"form-check"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.tempProduct.is_enabled,expression:"tempProduct.is_enabled"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"is_enabled","true-value":1,"false-value":0},domProps:{checked:Array.isArray(t.tempProduct.is_enabled)?t._i(t.tempProduct.is_enabled,null)>-1:t._q(t.tempProduct.is_enabled,1)},on:{change:function(e){var a=t.tempProduct.is_enabled,o=e.target,i=o.checked?1:0;if(Array.isArray(a)){var s=null,r=t._i(a,s);o.checked?r<0&&t.$set(t.tempProduct,"is_enabled",a.concat([s])):r>-1&&t.$set(t.tempProduct,"is_enabled",a.slice(0,r).concat(a.slice(r+1)))}else t.$set(t.tempProduct,"is_enabled",i)}}}),a("label",{staticClass:"form-check-label",attrs:{for:"is_enabled"}},[t._v("是否啟用")])])])])])]),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-outline-black",attrs:{type:"button","data-dismiss":"modal"}},[t._v("取消")]),a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.uploadProduct}},[t._v("確認")])])])])])],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",{staticClass:"text-center"},[a("th",{staticClass:"adminproducts-cat"},[t._v("分類")]),a("th",{staticClass:"admin-name"},[t._v("商品名稱")]),a("th",{staticClass:"adminproducts-oriprice"},[t._v("原價")]),a("th",{staticClass:"adminproducts-price"},[t._v("售價")]),a("th",{staticClass:"admin-enabled"},[t._v("是否啟用")]),a("th",{staticClass:"admin-edition"},[t._v("編輯")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])}],s=a("5530"),r=(a("99af"),{data:function(){return{tempProduct:{},addition:!1,picUploading:!1,picErrorMsg:!1}},computed:{adminProducts:function(){return this.$store.state.adminModule.adminProducts},pagination:function(){return this.$store.state.adminModule.pagination}},created:function(){this.getAdminProducts(),this.$store.commit("SET_ADMINACTIVE","AdminProducts")},methods:{getAdminProducts:function(t){this.$store.dispatch("getAdminProducts",t)},openProductModal:function(t){t?(this.tempProduct=Object(s["a"])({},t),this.addition=!1):(this.tempProduct={},this.addition=!0),$("#productModal").modal("show")},uploadProduct:function(){var t=this,e=this;if(e.addition){var a="".concat("https://vue-course-api.hexschool.io","/api/").concat("zou06","/admin/product");e.axios.post(a,{data:e.tempProduct}).then((function(a){a.data.success&&(t.clearPic(),$("#productModal").modal("hide"),e.getAdminProducts())}))}else{var o="".concat("https://vue-course-api.hexschool.io","/api/").concat("zou06","/admin/product/").concat(e.tempProduct.id);e.axios.put(o,{data:e.tempProduct}).then((function(a){a.data.success&&(t.clearPic(),$("#productModal").modal("hide"),e.getAdminProducts())}))}},uploadPic:function(){var t=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("zou06","/admin/upload");t.picUploading=!0;var a=new FormData;a.append("file-to-upload",t.$refs.files.files[0]),t.axios.post(e,a,{Headers:{"Content-Type":"multipart/form-data"}}).then((function(e){e.data.success?(t.picUploading=!1,t.picErrorMsg=!1,t.$set(t.tempProduct,"imageUrl",e.data.imageUrl)):(t.picUploading=!1,t.picErrorMsg=!0)}))},clearPic:function(){var t=document.getElementById("adminProductsPic");t.outerHTML=t.outerHTML},openDelModal:function(t){this.$store.commit("SET_MSG",{event:"delAdminProduct",object:t.title,objectId:t.id})}}}),c=r,d=a("2877"),n=Object(d["a"])(c,o,i,!1,null,null,null);e["default"]=n.exports}}]);
//# sourceMappingURL=chunk-2d216426.1c8e9082.js.map