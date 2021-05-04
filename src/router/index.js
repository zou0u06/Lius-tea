import Vue from 'vue';
import VueRouter from 'vue-router';

import admin from '@/views/back/admin';
import adminCoupons from '@/views/back/adminCoupons';
import adminOrders from '@/views/back/adminOrders';
import adminProducts from '@/views/back/adminProducts';

import cus from '@/views/front/cus';
import cusFavs from '@/views/front/cusFavs';
import cusIndex from '@/views/front/cusIndex';
import cusLogin from '@/views/front/cusLogin';
import cusProducts from '@/views/front/cusProducts';
import cusProduct from '@/views/front/cusProduct';
import cusCart from '@/views/front/cusCart';
import cusCartInfo from '@/views/front/cusCartInfo';
import cusCartPayment from '@/views/front/cusCartPayment';
import cusCartFinished from '@/views/front/cusCartFinished';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/index',
      component: cus,
      children: [
        {
          name: 'cusIndex',
          path: '/',
          component: cusIndex,
        },
        {
          name: 'cusProducts',
          path: '/products',
          component: cusProducts,
        },
        {
          name: 'cusFavs',
          path: '/favs',
          component: cusFavs,
        },
        {
          name: 'cusProduct',
          path: '/products/:cusProductId',
          component: cusProduct,
        },
        {
          name: 'cusCart',
          path: '/Cart',
          component: cusCart,
        },
        {
          name: 'cusCartInfo',
          path: '/info',
          component: cusCartInfo,
        },
        {
          name: 'cusCartPayment',
          path: '/payment/:cusOrderId',
          component: cusCartPayment,
        },
        {
          name: 'cusCartFinished',
          path: '/finished/:cusOrderId',
          component: cusCartFinished,
        },
        {
          name: 'cusLogin',
          path: '/login',
          component: cusLogin,
        },
      ],
    },
    {
      path: '*',
      redirect: '/index',
    },
    {
      path: '/admin',
      component: admin,
      meta: { requiresAuth: true },
      children: [
        {
          name: 'adminProducts',
          path: '/',
          component: adminProducts,
          meta: { requiresAuth: true },
        },
        {
          name: 'adminOrders',
          path: '/admin/orders',
          component: adminOrders,
          meta: { requiresAuth: true },
        },
        {
          name: 'adminCoupons',
          path: '/admin/coupons',
          component: adminCoupons,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});
