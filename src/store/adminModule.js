import axios from 'axios';

export default {
  state: {
    adminActive: '',
    adminCoupons: [],
    adminProducts: [],
    adminOrders: [],
    pagination: {},
  },
  actions: {
    getAdminCoupons(context, page = 1) {
      context.commit('SET_LOADING', true);
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      axios.get(API).then((response) => {
        if (response.data.coupons) {
          context.commit('GET_ADMINCOUPONS', response.data.coupons);
          context.commit('GET_PAGINATION', response.data.pagination);
          context.commit('SET_LOADING', false);
        } else {
          context.commit('SET_MSG', { event: 'adminServerError' });
          context.commit('SET_LOADING', false);
        }
      }).catch((error) => {
        if (error) {
          context.$store.commit('SET_MSG', { event: 'adminServerError' });
        }
      });
    },
    getAdminProducts(context, page = 1) {
      context.commit('SET_LOADING', true);
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      axios.get(API).then((response) => {
        if (response.data.success) {
          context.commit('GET_ADMINPRODUCTS', response.data.products);
          context.commit('GET_PAGINATION', response.data.pagination);
          context.commit('SET_LOADING', false);
        } else {
          context.commit('SET_MSG', { event: 'adminServerError' });
          context.commit('SET_LOADING', false);
        }
      }).catch((error) => {
        if (error) {
          context.$store.commit('SET_MSG', { event: 'adminServerError' });
        }
      });
    },
    getAdminOrders(context, page = 1) {
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      context.commit('SET_LOADING', true);
      axios.get(API).then((response) => {
        if (response.data.success) {
          context.commit('GET_ADMINORDERS', response.data.orders);
          context.commit('GET_PAGINATION', response.data.pagination);
          context.commit('SET_LOADING', false);
        } else {
          context.commit('SET_MSG', { event: 'adminServerError' });
          context.commit('SET_LOADING', false);
        }
      }).catch((error) => {
        if (error) {
          context.$store.commit('SET_MSG', { event: 'adminServerError' });
        }
      });
    },
  },
  mutations: {
    SET_ADMINACTIVE(state, payload) {
      state.adminActive = payload;
    },
    GET_ADMINCOUPONS(state, payload) {
      state.adminCoupons = payload;
    },
    GET_ADMINPRODUCTS(state, payload) {
      state.adminProducts = payload;
    },
    GET_ADMINORDERS(state, payload) {
      state.adminOrders = payload;
    },
    GET_PAGINATION(state, payload) {
      state.pagination = payload;
    },
  },
};
