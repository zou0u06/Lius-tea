import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import 'bootstrap';
import $ from 'jquery';

import 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';

// 以下為Vee Validate相關
import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW';
import * as rules from 'vee-validate/dist/rules';

// 以下為自定
import MsgModal from '@/components/MsgModal.vue';
import ProductsCard from '@/components/ProductsCard.vue';
import Pagination from '@/components/Pagination.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import displayDate from './filters/displayDate';
import displayCurrency from './filters/displayCurrency';

window.$ = $;

Vue.use(VueAxios, axios, Vuex);

// Vue.component('loading', loading);
Vue.component('msg-modal', MsgModal);
Vue.component('products-card', ProductsCard);
Vue.component('pagination', Pagination);

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
          path: '/index',
        });
      }
    });
  } else {
    next();
  }
});
