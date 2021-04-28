/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    products: [{
      favored: '',
    }],
    cats: [],
    cart: {
      carts: [{
        product: {},
      }],
    },
    coupons: {},
    pagination: {},
    msg: {
      event: '',
      object: '',
      objectId: '',
      times: 0,
    },
    carting: false,

  },
  actions: {
    // setCarting(context, payload) {
    //   context.commit('SET_CARTING', payload);
    // },
    // setLoading(context, payload) {
    //   context.commit('SET_LOADING', payload);
    // },
    getProducts(context, page = 1) {
      context.commit('SET_LOADING', true);
      const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      axios.get(API).then((response) => {
        if (response.data.success) {
          context.commit('GET_PRODUCTS', response.data.products);
          context.commit('GET_PAGINATION', response.data.pagination);
          context.dispatch('getCats');
          context.dispatch('setFavs');
        } else {
          context.commit('SET_LOADING', false);
        }
      });
    },
    getCats(context) {
      const oriCats = new Set();
      context.state.products.forEach((item) => {
        oriCats.add(item.category);
      });
      context.commit('GET_CATS', Array.from(oriCats));
    },
    setFavs(context) {
      const favs = JSON.parse(localStorage.getItem('favs')) || [];
      const productsL = context.state.products.length;
      const favsL = favs.length;
      if (favsL > 0) {
        for (let i = 0; i < productsL; i++) {
          for (let n = 0; n < favsL; n++) {
            if (context.state.products[i].id === favs[n]) {
              context.commit('SET_FAVS', { i, boolean: true });
              break;
            }
            context.commit('SET_FAVS', { i, boolean: false });
          }
        }
        context.commit('SET_LOADING', false);
      } else {
        for (let i = 0; i < productsL; i++) {
          context.commit('SET_FAVS', { i, boolean: false });
        }
        context.commit('SET_LOADING', false);
      }
    },
    addToFavs(context, productId) {
      const favs = JSON.parse(localStorage.getItem('favs')) || [];
      favs.push(productId);
      localStorage.setItem('favs', JSON.stringify(favs));
      context.state.products.find((item, index) => {
        if (item.id === productId) {
          context.commit('SET_FAVS', { i: index, boolean: true });
        } return false;
      });
    },
    delFav(context, productId) {
      const favs = JSON.parse(localStorage.getItem('favs'));
      favs.find((fav, num) => {
        context.state.products.find((item, index) => {
          if (item.id === fav && productId === fav) {
            favs.splice(num, 1);
            localStorage.setItem('favs', JSON.stringify(favs));
            context.commit('SET_FAVS', { i: index, boolean: false });
          } return false;
        });
        return false;
      });
    },
    getCart(context) {
      context.commit('SET_CARTING', true);
      const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      axios.get(API).then((response) => {
        if (response.data.success) {
          const tempCart = response.data.data;
          if (tempCart.carts.length > 0) {
            tempCart.carts.sort((a, b) => {
              if (a.product_id < b.product_id) {
                return -1;
              }
              if (a.product_id > b.product_id) {
                return 1;
              }
              return 0;
            });
          }
          context.commit('GET_CART', tempCart);
          context.commit('SET_CARTING', false);
        } else {
          context.commit('SET_CARTING', false);
        }
      });
    },
    addToCart(context, { product, qty }) {
      context.commit('SET_CARTING', true);
      const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cartsL = context.state.cart.carts.length;
      function notMatched() {
        axios.post(API, { data: { product_id: product.id, qty } }).then((response) => {
          if (response.data.success) {
            context.dispatch('getCart');
            context.commit('SET_MSG', {
              event: 'addedToCart', object: `${product.title} ${qty} ${product.unit}`,
            });
            context.commit('SET_CARTING', false);
          }
        });
      }
      if (cartsL > 0) {
        let match;
        for (let i = 0; i < cartsL; i++) {
          if (context.state.cart.carts[i].product.id === product.id) {
            match = true;
            const API_D = `${API}/${context.state.cart.carts[i].id}`;
            axios.delete(API_D);
            axios.post(API, {
              data: {
                product_id: product.id,
                qty: qty + context.state.cart.carts[i].qty,
              },
            }).then((response) => {
              if (response.data.success) {
                context.dispatch('getCart');
                context.commit('SET_MSG', {
                  event: 'addedToCart', object: `${product.title} ${qty} ${product.unit}`,
                });
                context.commit('SET_CARTING', false);
              }
            });
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
    getCoupons(context, page) {
      context.commit('SET_LOADING', true);
      const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      axios.get(API).then((response) => {
        if (response.data.coupons) {
          context.commit('GET_COUPONS', response.data.coupons);
          context.commit('GET_PAGINATION', response.data.pagination);
          context.commit('SET_LOADING', false);
        }
        context.commit('SET_LOADING', false);
      });
    },
    // openDelModal(context, payload) {
    //   context.commit('SET_MSG', payload);
    // },
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_CARTING(state, payload) {
      state.carting = payload;
    },
    GET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    GET_COUPONS(state, payload) {
      state.coupons = payload;
    },
    GET_PAGINATION(state, payload) {
      state.pagination = payload;
    },
    GET_CATS(state, payload) {
      state.cats = payload;
    },
    SET_FAVS(state, payload) {
      Vue.set(state.products[`${payload.i}`], 'favored', payload.boolean);
    },
    GET_CART(state, payload) {
      state.cart = payload;
    },
    GET_PRODUCT(state, payload) {
      state.product = payload;
    },
    GET_ADPRODUCTS(state, payload) {
      state.adProducts.push(payload);
    },
    SET_MSG(state, payload) {
      state.msg.event = payload.event;
      state.msg.object = payload.object;
      state.msg.objectId = payload.objectId;
      state.msg.times += 1;
    },
  },
});
