/* eslint-disable max-len */
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
      favoredDate: '',
      imageUrl: '',
    }],
    cusProductsActive: '',
    cats: [],
    cusCart: {
      carts: [{
        product: {
          imageUrl: '',
        },
      }],
    },
    loading: false,
    carting: false,
    msg: {
      event: '',
      object: '',
      objectId: '',
      times: 0,
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
      }).catch((error) => {
        if (error) {
          context.$store.commit('SET_MSG', { event: 'cusServerError' });
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
        for (let i = 0; i < productsL; i += 1) {
          for (let n = 0; n < cusFavsL; n += 1) {
            if (context.state.cusProducts[i].id === cusFavs[n].product_id) {
              context.commit('SET_CUSFAVS', { i, boolean: true, favoredDate: cusFavs[n].favored_date });
              break;
            }
            context.commit('SET_CUSFAVS', { i, boolean: false });
          }
        }
        context.commit('SET_LOADING', false);
      } else {
        for (let i = 0; i < productsL; i += 1) {
          context.commit('SET_CUSFAVS', { i, boolean: false });
        }
        context.commit('SET_LOADING', false);
      }
    },
    addToCusFavs(context, cusProductId) {
      const cusFavs = JSON.parse(localStorage.getItem('cusFavs')) || [];
      const yyyy = new Date().getFullYear();
      let mm;
      const oriMm = new Date().getMonth() + 1;
      if (oriMm >= 10) {
        mm = new Date().getMonth() + 1;
      } else {
        mm = `0${new Date().getMonth() + 1}`;
      }
      const dd = new Date().getDate();
      const favoredDate = `${yyyy}-${mm}-${dd}`;
      cusFavs.push({ product_id: cusProductId, favored_date: favoredDate });
      localStorage.setItem('cusFavs', JSON.stringify(cusFavs));
      context.state.cusProducts.find((item, index) => {
        if (item.id === cusProductId) {
          context.commit('SET_CUSFAVS', { i: index, boolean: true, favoredDate });
        } return false;
      });
    },
    delCusFav(context, cusProductId) {
      const cusFavs = JSON.parse(localStorage.getItem('cusFavs'));
      const { cusProducts } = context.state;
      for (let n = 0; n < cusFavs.length; n += 1) {
        for (let i = 0; i < cusProducts.length; i += 1) {
          if (
            cusProducts[i].id === cusFavs[n].product_id
            && cusProductId === cusFavs[n].product_id
          ) {
            cusFavs.splice(n, 1);
            localStorage.setItem('cusFavs', JSON.stringify(cusFavs));
            context.commit('SET_CUSFAVS', { i, boolean: false });
            break;
          }
        }
      }
    },
    addToCusCart(context, { cusProduct, qty }) {
      const tempCusCart = JSON.parse(localStorage.getItem('cusCart')) || [];
      const tempCusCartL = tempCusCart.length;
      function notMatched() {
        tempCusCart.push({ product_id: cusProduct.id, qty });
        localStorage.setItem('cusCart', JSON.stringify(tempCusCart));
        context.dispatch('getCusCart');
        context.commit('SET_MSG', {
          event: 'additionToCusCart', object: `${cusProduct.title} ${qty} ${cusProduct.unit}`,
        });
      }
      if (tempCusCartL > 0) {
        let matched;
        for (let i = 0; i < tempCusCartL; i += 1) {
          if (tempCusCart[i].product_id === cusProduct.id) {
            matched = true;
            tempCusCart[i].qty += qty;
            localStorage.setItem('cusCart', JSON.stringify(tempCusCart));
            context.dispatch('getCusCart');
            context.commit('SET_MSG', {
              event: 'additionToCusCart', object: `${cusProduct.title} ${qty} ${cusProduct.unit}`,
            });
            break;
          }
        }
        if (!matched) {
          notMatched();
        }
      } else {
        notMatched();
      }
    },
    getCusCart(context) {
      context.commit('SET_LOADING', true);
      const tempCusCart = JSON.parse(localStorage.getItem('cusCart')) || [];
      if (tempCusCart.length > 0) {
        const temp = [];
        context.state.cusProducts.forEach((item) => {
          tempCusCart.forEach((ite) => {
            if (item.id === ite.product_id && ite.product) {
              temp.push(ite);
            } else if (item.id === ite.product_id && !ite.product) {
              temp.push({ product: item, qty: ite.qty });
            }
          });
        });
        temp.sort((a, b) => {
          if (a.product.id < b.product.id) {
            return -1;
          }
          if (a.product.id > b.product.id) {
            return 1;
          }
          return 0;
        });
        context.commit('GET_CUSCART', temp);
        context.commit('SET_LOADING', false);
      } else {
        context.commit('GET_CUSCART', tempCusCart);
        context.commit('SET_LOADING', false);
      }
    },
    getFinalCusCart(context) {
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(API).then((response) => {
        if (response.data.success) {
          const finalCusCart = response.data.data;
          finalCusCart.carts.sort((a, b) => {
            if (a.product.id < b.product.id) {
              return -1;
            }
            if (a.product.id > b.product.id) {
              return 1;
            }
            return 0;
          });
          localStorage.setItem('cusCart', JSON.stringify(finalCusCart.carts));
          context.commit('GET_FINALCUSCART', finalCusCart);
          context.commit('SET_CARTING', false);
          context.commit('SET_LOADING', false);
        } else {
          context.commit('SET_MSG', 'wrongServer');
          context.commit('SET_CARTING', false);
          context.commit('SET_LOADING', false);
        }
      }).catch((error) => {
        if (error) {
          context.$store.commit('SET_MSG', { event: 'cusServerError' });
        }
      });
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
      state.msg.times += 1;
    },
    SET_CUSACTIVE(state, payload) {
      state.cusActive = payload;
    },
    GET_CUSPRODUCTS(state, payload) {
      state.cusProducts = payload;
    },
    SET_CUSPRODUCTSACTIVE(state, payload) {
      state.cusProductsActive = payload;
    },
    GET_CATS(state, payload) {
      state.cats = payload;
    },
    SET_CUSFAVS(state, payload) {
      Vue.set(state.cusProducts[`${payload.i}`], 'favored', payload.boolean);
      Vue.set(state.cusProducts[`${payload.i}`], 'favoredDate', payload.favoredDate);
    },
    GET_CUSCART(state, payload) {
      state.cusCart.carts = payload;
    },
    GET_FINALCUSCART(state, payload) {
      Vue.set(state, 'cusCart', payload);
    },
  },
});
