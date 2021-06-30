<template>
  <div class="container-xl">
    <div class="row">
      <div class="col-md-7 mb-4">
        <h3 class="rounded-top card-header">收藏清單</h3>
        <products-card :bases="favoredProducts" :kind="'favoredProducts'"/>
      </div>
      <div class="col-md-5 mb-4">
        <h3 class="rounded-top card-header">推薦商品</h3>
        <products-card :bases="adProducts" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      favoredProducts: [],
      adProducts: [],
    };
  },
  computed: {
    ...mapState(['cusProducts', 'carting']),
  },
  watch: {
    cusProducts: {
      handler() {
        if (this.cusProducts.length > 1) {
          this.getAdproducts();
        }
      },
      deep: true,
    },
  },
  created() {
    this.getCusProducts();
    this.$store.commit('SET_CUSACTIVE', 'CusFavs');
  },
  methods: {
    ...mapActions(['getCusProducts', 'addToCusFavs', 'delCusFav']),
    getAdproducts() {
      this.favoredProducts = [];
      const stock = [];
      const productsL = this.cusProducts.length;
      for (let i = 0; i < productsL; i++) {
        if (this.cusProducts[i].favored) {
          this.favoredProducts.push(this.cusProducts[i]);
        } else {
          stock.push(this.cusProducts[i]);
        }
      }
      let j = stock.length;
      let index;
      if (j >= 4) {
        const min = j - 4;
        while (j-- > min) {
          index = Math.floor((j + 1) * Math.random());
          [stock[j], stock[index]] = [stock[index], stock[j]];
        }
        this.adProducts = stock.slice(min);
      } else {
        stock.sort(() => Math.random() - 0.5);
        this.adProducts = stock;
      }
    },
    addToCusCart(cusProduct, qty = 1) {
      this.$store.dispatch('addToCusCart', { cusProduct, qty });
    },
  },
};
</script>

<style>
</style>
