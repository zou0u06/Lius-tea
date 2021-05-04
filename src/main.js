// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import 'bootstrap';
import $ from 'jquery';

import 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// 以下為Vee Validate相關
import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW';
import * as rules from 'vee-validate/dist/rules';

// 以下為自定
import App from './App';
import router from './router';
import store from './store';
import './filters/displayDate';
import './filters/displayCurrency';

window.$ = $;

Vue.use(VueAxios, axios, Vuex);

Vue.component('loading', loading);

// 以下為Vee Validate相關
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize('zh_TW', TW);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
configure({
  classes: {
    invalid: 'is-invalid',
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/index',
        });
      }
    });
  } else {
    next();
  }
});
