import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/views/front/Cus.vue'),
      children: [
        {
          name: 'CusIndex',
          path: '/',
          component: () => import('@/views/front/CusIndex.vue'),
        },
        {
          name: 'CusProducts',
          path: '/products',
          component: () => import('@/views/front/CusProducts.vue'),
        },
        {
          name: 'CusFavs',
          path: '/favs',
          component: () => import('@/views/front/CusFavs.vue'),
        },
        {
          name: 'CusProduct',
          path: '/products/:cusProductId',
          component: () => import('@/views/front/CusProduct.vue'),
        },
        {
          name: 'CusCart',
          path: '/Cart',
          component: () => import('@/views/front/CusCart.vue'),
        },
        {
          name: 'CusCartInfo',
          path: '/info',
          component: () => import('@/views/front/CusCartInfo.vue'),
        },
        {
          name: 'CusCartPayment',
          path: '/payment/:cusOrderId',
          component: () => import('@/views/front/CusCartPayment.vue'),
        },
        {
          name: 'CusCartFinished',
          path: '/finished/:cusOrderId',
          component: () => import('@/views/front/CusCartFinished.vue'),
        },
        {
          name: 'CusLogin',
          path: '/login',
          component: () => import('@/views/front/CusLogin.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('@/views/back/Admin.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          name: 'AdminProducts',
          path: '/',
          component: () => import('@/views/back/AdminProducts.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'AdminOrders',
          path: '/admin/orders',
          component: () => import('@/views/back/AdminOrders.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'AdminCoupons',
          path: '/admin/coupons',
          component: () => import('@/views/back/AdminCoupons.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});
