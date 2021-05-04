<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
      <div class="container-xl px-0 px-xl-3">
        <h1 class="brand">
          <router-link class="w-100 h-100" to="/index"/>劉記茗茶
        </h1>

        <button
          class="navbar-toggler cusnavbar_toggler border-0"
          type="button"
          data-toggle="collapse"
          data-target=".cusnavbar_collapse"
          aria-controls="cusnavbar_collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse cusnavbar_collapse">
          <ul class="navbar-nav ml-auto text-center" @click="setCusNavbar($event.target)">
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/index"
                :class="{active: cusActive === 'cusIndex'}"
              >首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/products"
                :class="{active: cusActive === 'cusProducts'}"
              >商品</router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/favs"
                :class="{active: cusActive === 'cusFavs'}"
              >收藏</router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/cart"
                :class="{active: cusActive === 'cusCart'}"
              >購物車（{{ carts.length }}）</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login"
              :class="{active: cusActive === 'cusLogin'}">登入</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="collapse cusnavbar_collapse mask cusnavbar_mask"/>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getCusCart() {
      this.$store.dispatch('getCusCart');
    },
    setCusNavbar() {
      if (document.body.clientWidth < 768) {
        document.querySelector('.cusnavbar_toggler').click();
      }
    },
  },
  computed: {
    cusActive() {
      return this.$store.state.cusActive;
    },
    carts() {
      return this.$store.state.cusCart.carts;
    },
  },
  created() {
    this.getCusCart();
  },
};
</script>

<style>
</style>
