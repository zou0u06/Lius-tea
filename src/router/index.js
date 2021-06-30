import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      component: () => import('@/views/front/Cus.vue'),
      path: '/',
      children: [
        {
          name: 'CusIndex',
          component: () => import('@/views/front/CusIndex.vue'),
          path: '/',
        },
        {
          name: 'CusProducts',
          component: () => import('@/views/front/CusProducts.vue'),
          path: '/products',
        },
        {
          name: 'CusFavs',
          component: () => import('@/views/front/CusFavs.vue'),
          path: '/favs',
        },
        {
          name: 'CusProduct',
          component: () => import('@/views/front/CusProduct.vue'),
          path: '/products/:cusProductId',
        },
        {
          name: 'CusCart',
          component: () => import('@/views/front/CusCart.vue'),
          path: '/Cart',
        },
        {
          name: 'CusCartInfo',
          component: () => import('@/views/front/CusCartInfo.vue'),
          path: '/info',
        },
        {
          name: 'CusCartPayment',
          component: () => import('@/views/front/CusCartPayment.vue'),
          path: '/payment/:cusOrderId',
        },
        {
          name: 'CusCartFinished',
          component: () => import('@/views/front/CusCartFinished.vue'),
          path: '/finished/:cusOrderId',
        },
        {
          name: 'CusLogin',
          component: () => import('@/views/front/CusLogin.vue'),
          path: '/login',
        },
      ],
    },
    {
      component: () => import('@/views/back/Admin.vue'),
      path: '/admin',
      meta: { requiresAuth: true },
      children: [
        {
          name: 'AdminProducts',
          component: () => import('@/views/back/AdminProducts.vue'),
          path: '/',
          meta: { requiresAuth: true },
        },
        {
          name: 'AdminOrders',
          component: () => import('@/views/back/AdminOrders.vue'),
          path: '/admin/orders',
          meta: { requiresAuth: true },
        },
        {
          name: 'AdminCoupons',
          component: () => import('@/views/back/AdminCoupons.vue'),
          path: '/admin/coupons',
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
