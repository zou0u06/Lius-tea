<template>
  <div
    class="card border-0 productcard"
    @click="jumpToCusProduct(cusProduct.id)"
  >
    <div
      class="bg-cover rounded-top productcard-img"
      :style="{'background-image': `url(${cusProduct.imageUrl})`}"
    />
    <div class="card-body">
      <span
        class="badge badge-primary productcard-badge float-right ml-2"
      >{{ cusProduct.category }}</span>
      <h5 class="card-title">{{ cusProduct.title }}</h5>
      <div class="d-flex justify-content-between align-items-baseline">
        <del class="h6">原價 {{ cusProduct.origin_price }} 元</del>
        <div class="h5 text-secondary">特價 {{ cusProduct.price }} 元</div>
      </div>
    </div>
    <product-btns
      class="card-footer d-flex justify-content-between"
      :cusProduct="cusProduct"
      :hideIcon="true"
    />
  </div>
</template>

<script>
import ProductBtns from '@/components/ProductBtns.vue';

export default {
  components: { ProductBtns },
  props: {
    cusProduct: Object,
  },
  methods: {
    jumpToCusProduct(cusProductId) {
      this.$router.push(`/products/${cusProductId}`);
    },
  },
};
</script>
