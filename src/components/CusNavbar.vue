<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
      <div class="container-xl px-0 px-xl-3">
        <h1 class="brand">
          <router-link
            to="/"
            class="w-100 h-100"
          >劉記茗茶</router-link>
        </h1>

        <button
          type="button"
          class="navbar-toggler cusnavbar-toggler border-0"
          data-toggle="collapse"
          data-target=".cusnavbar-collapse"
          aria-controls="cusnavbar-collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"/>
        </button>

        <div class="collapse navbar-collapse cusnavbar-collapse">
          <ul
            class="navbar-nav ml-auto text-center"
            @click="setCusNavbar($event.target)"
          >
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link"
                :class="{active: cusActive === 'CusIndex'}"
              >首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/products"
                class="nav-link"
                :class="{active: cusActive === 'CusProducts' || cusActive === 'CusProduct'}"
              >商品</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/favs"
                class="nav-link"
                :class="{active: cusActive === 'CusFavs'}"
              >收藏</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/cart"
                class="nav-link"
                :class="{active: cusActive === 'CusCart'}"
              >購物車（{{ cusCart.carts.length }}）</router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/login"
                :class="{active: cusActive === 'CusLogin'}"
              >登入</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="collapse cusnavbar-collapse mask cusnavbar-mask"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['cusProducts', 'cusCart', 'cusActive']),
  },
  created() {
    this.getCusProducts();
  },
  methods: {
    ...mapActions(['getCusProducts', 'getCusCart']),
    setCusNavbar() {
      if (document.body.clientWidth < 768) {
        document.querySelector('.cusnavbar-toggler').click();
      }
    },
  },
};
</script>

<style>
</style>
