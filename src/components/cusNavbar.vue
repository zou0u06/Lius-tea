<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
      <div class="container-xl px-0 px-xl-3">
        <h1 class="brand" @click.prevent="isActive = ''">
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
          <ul class="navbar-nav ml-auto text-center">
            <li class="nav-item" @click.prevent="navActive('')">
              <router-link
                class="nav-link"
                to="/index"
                :class="{active: isActive === ''}"
              >首頁</router-link>
            </li>
            <li class="nav-item" @click.prevent="navActive('products')">
              <router-link
                class="nav-link"
                to="/products"
                :class="{active: isActive === 'products'}"
              >商品</router-link>
            </li>
            <li class="nav-item" @click.prevent="navActive('favs')">
              <router-link
                class="nav-link"
                to="/favs"
                :class="{active: isActive === 'favs'}"
              >收藏</router-link>
            </li>
            <li class="nav-item" @click.prevent="navActive('cart')">
              <router-link
                class="nav-link"
                to="/cart"
                :class="{active: isActive === 'cart'}"
              >購物車（{{ carts.length }}）</router-link>
            </li>
            <li class="nav-item" @click.prevent="navActive('login')">
              <router-link class="nav-link" to="/login"
              :class="{active: isActive === 'login'}">登入</router-link>
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
    return {
      isActive: '',
    };
  },
  methods: {
    getCart() {
      this.$store.dispatch('getCart');
    },
    navActive(nav) {
      this.isActive = nav;
      if (document.body.clientWidth < 768) {
        document.querySelector('.cusnavbar_toggler').click();
      }
    },
  },
  computed: {
    carts() {
      return this.$store.state.cart.carts;
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style>
</style>
