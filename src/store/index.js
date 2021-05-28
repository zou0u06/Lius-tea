/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import adminModule from './adminModule';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: { adminModule },
  state: {
    cusActive: '',
    cusProducts: [{
      favored: '',
    }],
    cats: [],
    cusCart: [{
      product: {
        imageUrl: 'https://github.com/zou0u06/Lius-tea/blob/gh-pages/src/assets/images/favicon.png?raw=true',
      },
    }],
    loading: false,
    carting: false,
    msg: {
      event: '',
      object: '',
      objectId: '',
    },
  },
  actions: {
    getCusProducts(context, page = 1) {
      context.commit('SET_LOADING', true);
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      axios.get(API).then((response) => {
        if (response.data.success) {
          const tempCusProduct = response.data.products.filter((item) => item.is_enabled === 1);
          context.commit('GET_CUSPRODUCTS', tempCusProduct);
          context.commit('GET_PAGINATION', response.data.pagination);
          context.dispatch('getCats');
          context.dispatch('setCusFavs');
        } else {
          context.commit('SET_LOADING', false);
          context.commit('SET_MSG', 'wrongServer');
        }
      });
    },
    getCats(context) {
      const oriCats = new Set();
      context.state.cusProducts.forEach((item) => {
        oriCats.add(item.category);
      });
      context.commit('GET_CATS', Array.from(oriCats));
    },
    setCusFavs(context) {
      const cusFavs = JSON.parse(localStorage.getItem('cusFavs')) || [];
      const productsL = context.state.cusProducts.length;
      const cusFavsL = cusFavs.length;
      if (cusFavsL > 0) {
        for (let i = 0; i < productsL; i++) {
          for (let n = 0; n < cusFavsL; n++) {
            if (context.state.cusProducts[i].id === cusFavs[n]) {
              context.commit('SET_CUSFAVS', { i, boolean: true });
              break;
            }
            context.commit('SET_CUSFAVS', { i, boolean: false });
          }
        }
        context.commit('SET_LOADING', false);
      } else {
        for (let i = 0; i < productsL; i++) {
          context.commit('SET_CUSFAVS', { i, boolean: false });
        }
        context.commit('SET_LOADING', false);
      }
    },
    addToCusFavs(context, cusProductId) {
      const cusFavs = JSON.parse(localStorage.getItem('cusFavs')) || [];
      cusFavs.push(cusProductId);
      localStorage.setItem('cusFavs', JSON.stringify(cusFavs));
      context.state.cusProducts.find((item, index) => {
        if (item.id === cusProductId) {
          context.commit('SET_CUSFAVS', { i: index, boolean: true });
        } return false;
      });
    },
    delCusFav(context, cusProductId) {
      const cusFavs = JSON.parse(localStorage.getItem('cusFavs'));
      cusFavs.find((fav, num) => {
        context.state.cusProducts.find((item, index) => {
          if (item.id === fav && cusProductId === fav) {
            cusFavs.splice(num, 1);
            localStorage.setItem('cusFavs', JSON.stringify(cusFavs));
            context.commit('SET_CUSFAVS', { i: index, boolean: false });
          } return false;
        });
        return false;
      });
    },
    getCusCart(context) {
      context.commit('SET_CARTING', true);
      const tempCusCart = [];
      const cusCartId = JSON.parse(localStorage.getItem('cusCart')) || [];
      if (cusCartId.length > 0) {
        context.state.cusProducts.forEach((item) => {
          cusCartId.forEach((ite) => {
            if (item.id === ite.product_id) {
              console.log(item.id, ite.product_id);
              tempCusCart.push(item);
            }
          });
        });
        console.log(tempCusCart);
        context.commit('GET_CUSCART', tempCusCart);
      }
      // if (tempCart.length > 0) {
      //   tempCart.sort((a, b) => {
      //     if (a.product_id < b.product_id) {
      //       return -1;
      //     }
      //     if (a.product_id > b.product_id) {
      //       return 1;
      //     }
      //     return 0;
      //   });
      // }
      context.commit('SET_CARTING', false);
    },
    addToCusCart(context, { cusProduct, qty }) {
      context.commit('SET_CARTING', true);
      console.log(localStorage.getItem('cusCart'));
      const tempCusCart = JSON.parse(localStorage.getItem('cusCart')) || [];
      const tempCusCartL = tempCusCart.length;
      function notMatched() {
        tempCusCart.push({ product_id: cusProduct.id, qty });
        localStorage.setItem('cusCart', JSON.stringify(tempCusCart));
        context.dispatch('getCusCart');
        context.commit('SET_MSG', {
          event: 'addedToCusCart', object: `${cusProduct.title} ${qty} ${cusProduct.unit}`,
        });
        context.commit('SET_CARTING', false);
      }
      if (tempCusCartL > 0) {
        let match;
        for (let i = 0; i < tempCusCartL; i++) {
          if (tempCusCart[i].product_id === cusProduct.id) {
            match = true;
            tempCusCart[i].qty += qty;
            localStorage.setItem('cusCart', JSON.stringify(tempCusCart));
            context.dispatch('getCusCart');
            context.commit('SET_MSG', {
              event: 'addedToCusCart', object: `${cusProduct.title} ${qty} ${cusProduct.unit}`,
            });
            context.commit('SET_CARTING', false);
            break;
          }
        }
        if (!match) {
          notMatched();
        }
      } else {
        notMatched();
      }
    },
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_CARTING(state, payload) {
      state.carting = payload;
    },
    SET_MSG(state, payload) {
      state.msg.event = payload.event;
      state.msg.object = payload.object;
      state.msg.objectId = payload.objectId;
    },
    SET_CUSACTIVE(state, payload) {
      state.cusActive = payload;
    },
    GET_CUSPRODUCTS(state, payload) {
      state.cusProducts = payload;
    },
    GET_CATS(state, payload) {
      state.cats = payload;
    },
    SET_CUSFAVS(state, payload) {
      Vue.set(state.cusProducts[`${payload.i}`], 'favored', payload.boolean);
    },
    GET_CUSCART(state, payload) {
      Vue.set(state, 'cusCart', payload);
    },
  },
});
