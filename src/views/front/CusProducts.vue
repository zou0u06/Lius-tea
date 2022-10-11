<template>
  <div class="container-xl">
    <div class="header cusproducts-header mx-n15px">
      <div class="header-text cusproducts-header-text h1">
        空持百千偈。
        <br />
        <span>不如喫茶去</span>
      </div>
    </div>
    <div class="row justify-content-center cusproducts-content pt-4">
      <div class="col-md-3">
        <div class="card rounded border-0 mb-4">
          <h2 class="card-header h3">商品列表</h2>
          <ul
            class="list-group list-group-flush text-center"
            role="tablist"
          >
            <a
              href="#"
              class="list-group-item list-group-item-action"
              :class="{ active: cusProductsActive === '' }"
              data-toggle="list"
              role="tab"
              @click.prevent="SET_CUSPRODUCTSACTIVE('')"
            >所有茶品</a>
            <a
              href="#"
              v-for="cat in cats"
              :key="cat"
              class="list-group-item list-group-item-action"
              :class="{ active: cusProductsActive === cat }"
              data-toggle="list"
              role="tab"
              @click.prevent="SET_CUSPRODUCTSACTIVE(cat)"
            >{{ cat }}</a>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <product-card
          v-for="cusProduct in filterCusProducts"
          :key="cusProduct.id"
          :cusProduct="cusProduct"
          class="mb-4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  components: { ProductCard },
  computed: {
    ...mapState(['cusProducts', 'cats', 'cusProductsActive']),
    filterCusProducts() {
      switch (this.cusProductsActive) {
        case '':
          return this.cusProducts;
        default: {
          const filteredCusProducts = this.cusProducts.filter(
            (item) => item.category === this.cusProductsActive,
          );
          return filteredCusProducts;
        }
      }
    },
  },
  created() {
    this.getCusProducts();
    this.SET_CUSACTIVE('CusProducts');
  },
  methods: {
    ...mapActions(['getCusProducts']),
    ...mapMutations(['SET_CUSACTIVE', 'SET_CUSPRODUCTSACTIVE']),
    jumpToCusProduct(cusProductId) {
      this.$router.push(`/products/${cusProductId}`);
    },
  },
};
</script>

<style>
</style>
