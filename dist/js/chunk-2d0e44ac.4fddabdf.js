(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e44ac"],{9032:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container-xl"},[s("validation-observer",{attrs:{tag:"div"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.invalid,a=t.handleSubmit;return[s("form",{staticClass:"cuslogin-form",on:{submit:function(t){return t.preventDefault(),a(e.signIn)}}},[s("h2",{staticClass:"mb-3 font-weight-normal text-white"},[e._v("會員登入")]),s("validation-provider",{staticClass:"form-group",attrs:{rules:"required|email",tag:"div"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.classes;return[s("label",{staticClass:"sr-only",attrs:{for:"inputEmail"}},[e._v("請輸入 Email")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.username,expression:"user.username"}],staticClass:"form-control rounded-top mb-n3",class:r,attrs:{type:"email",id:"inputEmail",placeholder:"請輸入 Email",required:"",autofocus:""},domProps:{value:e.user.username},on:{change:function(t){return e.saveInfo()},input:function(t){t.target.composing||e.$set(e.user,"username",t.target.value)}}})]}}],null,!0)}),s("validation-provider",{staticClass:"form-group",attrs:{rules:"required",tag:"div"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.classes;return[s("label",{staticClass:"sr-only",attrs:{for:"inputPassword"}},[e._v("請輸入密碼")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],staticClass:"form-control rounded-bottom mb-1",class:r,attrs:{type:"password",id:"inputPassword",placeholder:"請輸入密碼",required:""},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})]}}],null,!0)}),s("div",{staticClass:"checkbox mb-2"},[s("label",{staticClass:"text-white cuslogin-checkbox"},[s("input",{staticClass:"mr-2",attrs:{type:"checkbox"},on:{click:function(t){return e.rememberInfo()}}}),e._v("記住帳號 ")])]),e.errorMsg?s("div",{staticClass:"error-msg"},[e._v("帳號或密碼錯誤，請重新輸入")]):e._e(),s("button",{staticClass:"btn btn-lg btn-secondary btn-block cuslogin-btn",attrs:{type:"submit",disabled:r}},[e._v("登入")])],1)]}}])})],1)},a=[],n=(s("99af"),{data:function(){return{user:{username:"",password:""},errorMsg:!1,rememberSwitch:!1}},created:function(){this.user.username=JSON.parse(localStorage.getItem("user"))||"",this.$store.commit("SET_CUSACTIVE","CusLogin")},methods:{signIn:function(){var e=this,t="".concat("https://vue-course-api.hexschool.io","/admin/signin");e.axios.post(t,e.user).then((function(t){if(t.data.success){var s=t.data.token,r=t.data.expired;document.cookie="myToken=".concat(s,"; expires=").concat(new Date(r)),e.$router.push("/admin")}else e.user.password="",e.errorMsg=!0}))},rememberInfo:function(){switch(this.rememberSwitch){case!0:this.rememberSwitch=!1,this.clearInfo();break;default:this.rememberSwitch=!0,this.saveInfo();break}},saveInfo:function(){this.rememberSwitch&&localStorage.setItem("user",JSON.stringify(this.user.username))},clearInfo:function(){localStorage.setItem("user",JSON.stringify(""))}}}),o=n,i=s("2877"),u=Object(i["a"])(o,r,a,!1,null,"020d03fb",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0e44ac.4fddabdf.js.map