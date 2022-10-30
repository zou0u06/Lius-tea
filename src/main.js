import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import VueGtm from '@gtm-support/vue2-gtm';
import 'bootstrap';
import $ from 'jquery';

import 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

// 以下為Vee Validate相關
import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW';
import * as rules from 'vee-validate/dist/rules';

// 以下為自定
import App from './App.vue';
import router from './router';
import store from './store';
import displayDate from './filters/displayDate';
import displayCurrency from './filters/displayCurrency';

window.$ = $;

Vue.use(VueAxios, axios, Vuex, VueGtm, {
  id: 'GTM-M8SKWZM',
  defer: false,
  compatibility: true,
  // nonce: '2726c7f26c', // Will add `nonce` to the script tag
  enabled: true,
  debug: true,
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM
  // manually, but need the dataLayer functionality in your components)(optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  trackOnNextTick: false,
});

Vue.filter('displayCurrency', displayCurrency);
Vue.filter('displayDate', displayDate);

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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/',
        });
      }
    }).catch((error) => {
      if (error) {
        this.$store.commit('SET_MSG', { event: 'adminServerError' });
      }
    });
  } else {
    next();
  }
});
