<template>
  <div>
    <router-link
      to="/products"
      v-if="short"
      class="btn btn-extra productsbtns-back"
    >
      <i class="fas fa-mug-hot mr-1"></i>
      回到商品一覽頁
    </router-link>
    <button
      type="button"
      v-if="cusProduct.favored === false"
      :class="`btn btn-outline-${favTheme} btn-fav`"
      @click.stop="addToCusFavs(cusProduct.id)"
    >
      <i class="far fa-heart mr-1"></i>
      <span :class="{ 'productsbtns-short': short }">加入</span>收藏
    </button>
    <button
      type="button"
      v-if="cusProduct.favored === true"
      :class="`btn btn-${favTheme}`"
      @click.stop="delCusFav(cusProduct.id)"
    >
      <i class="fas fa-heart mr-1"></i>
      <span :class="{ 'productsbtns-short': short }">取消</span>收藏
    </button>
    <button
      type="button"
      class="btn btn-secondary"
      @click.stop="addToCusCart(cusProduct)"
    >
      <i class="fas fa-shopping-cart"></i>
      加入購物車
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    cusProduct: Object,
    favTheme: {
      type: String,
      default: 'primary',
    },
    short: {
      type: Boolean,
      default: false,
    },
    qty: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    ...mapActions(['addToCusFavs', 'delCusFav']),
    addToCusCart(cusProduct) {
      this.$store.dispatch('addToCusCart', { cusProduct, qty: this.qty });
    },
  },
};
</script>
