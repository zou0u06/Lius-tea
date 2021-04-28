/* eslint-disable no-unused-vars */
import Vue from 'vue';
import VueRouter from 'vue-router';

import admin from '@/components/pages/admin';
import adminCoupons from '@/components/pages/adminCoupons';
import adminOrders from '@/components/pages/adminOrders';
import adminProducts from '@/components/pages/adminProducts';
import cus from '@/components/pages/cus';
import cusFavs from '@/components/pages/cusFavs';
import cusIndex from '@/components/pages/cusIndex';
import cusLogin from '@/components/pages/cusLogin';
import cusProducts from '@/components/pages/cusProducts';
import cusProduct from '@/components/pages/cusProduct';
import cusCart from '@/components/pages/cusCart';
import cusCartInfo from '@/components/pages/cusCartInfo';
import cusCartPayment from '@/components/pages/cusCartPayment';
import cusCartFinished from '@/components/pages/cusCartFinished';

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
          path: '/products/:productId',
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
          path: '/payment/:orderId',
          component: cusCartPayment,
        },
        {
          name: 'cusCartFinished',
          path: '/finished/:orderId',
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
