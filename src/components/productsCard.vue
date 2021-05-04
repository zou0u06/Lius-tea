<template>
  <div class="card_lowerhalf px-3 pt-3">
    <div v-if="bases.length > 0">
      <div v-for="cusProduct in bases" :key="cusProduct.id" class="d-flex pb-3">
        <div
          class="productscard_img rounded bg_cover mr-2"
          :style="{'background-image':`url(${cusProduct.imageUrl})`}"
        >
          <router-link
            class="w-100 h-100"
            :to="`/products/${cusProduct.id}`"
          />
        </div>
        <div class="flex-fill d-flex flex-column justify-content-between">
          <router-link
            class="h6 text-center" :to="`/products/${cusProduct.id}`">{{ cusProduct.title }}
          </router-link>
          <div class="d-flex justify-content-around align-items-end">
            <del class="text-muted"><small>原價 {{ cusProduct.origin_price }} 元</small></del>
            <span class="text-secondary">特價 {{ cusProduct.price }} 元</span>
          </div>
          <div class="d-flex justify-content-around">
            <button
              type="button"
              class="btn btn-outline-tertiary btn-sm btn_fav"
              @click.stop="addToCusFavs(cusProduct.id)"
              v-if="cusProduct.favored === false"
            >加入收藏</button>
            <button
              type="button"
              class="btn btn-tertiary btn-sm"
              @click.stop="delCusFav(cusProduct.id)"
              v-if="cusProduct.favored === true"
            >取消收藏</button>
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              v-if="carting === false"
              @click.stop="addToCusCart(cusProduct)"
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
    <div v-else class="flex_center pb-3 h3">目前尚無商品</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    bases: Array,
  },
  methods: {
    ...mapActions(['addToCusFavs', 'delCusFav']),
    addToCusCart(cusProduct, qty = 1) {
      this.$store.dispatch('addToCusCart', { cusProduct, qty });
    },
  },
  computed: {
    ...mapState(['carting']),
  },
};
</script>
