<template>
  <div class="card_lowerhalf px-3 pt-3">
    <div v-for="product in bases" :key="product.id" class="d-flex pb-3">
      <div
        class="productscard_img rounded bg_cover mr-2"
        :style="{'background-image':`url(${product.imageUrl})`}"
      >
        <router-link
          class="w-100 h-100"
          :to="`/products/${product.id}`"
        />
      </div>
      <div class="flex-fill d-flex flex-column justify-content-between">
        <router-link
          class="h6 text-center" :to="`/products/${product.id}`">{{ product.title }}</router-link>
        <div class="d-flex justify-content-around align-items-end">
          <del class="text-muted"><small>原價 {{ product.origin_price }} 元</small></del>
          <span class="text-secondary">特價 {{ product.price }} 元</span>
        </div>
        <div class="d-flex justify-content-around">
          <button
            type="button"
            class="btn btn-outline-tertiary btn-sm btn_fav"
            @click.stop="addToFavs(product.id)"
            v-if="product.favored === false"
          >加入收藏</button>
          <button
            type="button"
            class="btn btn-tertiary btn-sm"
            @click.stop="delFav(product.id)"
            v-if="product.favored === true"
          >取消收藏</button>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            v-if="carting === false"
            @click.stop="addToCart(product)"
          >加入購物車</button>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            v-if="carting === true"
            disabled
          >商品處理中</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    bases: Array,
  },
  methods: {
    ...mapActions(['addToFavs', 'delFav']),
    addToCart(product, qty = 1) {
      this.$store.dispatch('addToCart', { product, qty });
    },
  },
  computed: {
    ...mapState(['carting']),
  },
};
</script>
