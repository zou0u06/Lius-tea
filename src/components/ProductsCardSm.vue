<template>
  <div class="card-lowerhalf container-fluid pt-3">
    <div
      v-if="bases.length > 0"
      class="row"
    >
      <div
        v-for="cusProduct in bases"
        class="d-flex pb-3 col-sm-6 col-md-12 productscardsm-block"
        :key="cusProduct.id"
        @click="jumpToCusProduct(cusProduct.id)"
      >
        <div
          class="productscardsm-img rounded bg-cover mr-2"
          :style="{'background-image':`url(${cusProduct.imageUrl})`}"
        />
        <div class="flex-fill d-flex flex-column justify-content-around">
          <div class="h6 d-flex justify-content-around mb-2">
            {{ cusProduct.title }}
            <span class="badge badge-primary productscardsm-badge">{{ cusProduct.category }}</span>
          </div>
          <div class="d-flex align-items-center justify-content-around">
            <div class="productscardsm-priceblock">
              <del class="text-muted mr-2">原價 {{ cusProduct.origin_price }} 元</del>
              <span class="text-secondary">特價 {{ cusProduct.price }} 元</span>
            </div>
            <div>
              <i
                v-if="cusProduct.favored === false"
                class="far fa-heart productscardsm-btn-fav"
                @click.stop="addToCusFavs(cusProduct.id)"
              />
              <i
                v-if="cusProduct.favored === true"
                class="fas fa-heart productscardsm-btn-fav"
                @click.stop="delCusFav(cusProduct.id)"
              />
              <i
                class="fas fa-shopping-cart productscardsm-btn-cart"
                @click.stop="addToCusCart(cusProduct)"
              />
            </div>
          </div>
        </div>
        <div
          v-if="kind === 'favoredProducts'"
          class="productscardsm-date"
        >
          收藏日期：<br/>
          {{ cusProduct.favoredDate }}
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex-center pb-3 h3"
    >目前尚無商品</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    bases: Array,
    kind: String,
  },
  methods: {
    ...mapActions(['addToCusFavs', 'delCusFav']),
    addToCusCart(cusProduct, qty = 1) {
      this.$store.dispatch('addToCusCart', { cusProduct, qty });
    },
    jumpToCusProduct(cusProductId) {
      this.$router.push(`/products/${cusProductId}`);
    },
  },
};
</script>
