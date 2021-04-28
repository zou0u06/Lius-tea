<template>
  <div class="container-xl">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/index" class="text-tertiary">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">收藏</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-md-7 mb-4">
        <h3 class="rounded-top card_header">收藏清單</h3>
        <products-card :bases="favoredProducts" />
      </div>
      <div class="col-md-5 mb-4">
        <h3 class="rounded-top card_header">推薦商品</h3>
        <products-card :bases="adProducts" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import productsCard from '../productsCard';

export default {
  data() {
    return {
      favoredProducts: [],
      adProducts: [],
    };
  },
  components: { productsCard },
  methods: {
    ...mapActions(['getProducts', 'addToFavs', 'delFav']),
    getAdproducts() {
      this.favoredProducts = [];
      const stock = [];
      const productsL = this.products.length;
      for (let i = 0; i < productsL; i++) {
        if (this.products[i].favored) {
          this.favoredProducts.push(this.products[i]);
        } else {
          stock.push(this.products[i]);
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
    addToCart(product, qty = 1) {
      this.$store.dispatch('addToCart', { product, qty });
    },
  },
  computed: {
    ...mapState(['products', 'carting']),
  },
  watch: {
    products: {
      handler() {
        if (this.products.length > 1) {
          this.getAdproducts();
        }
      },
      deep: true,
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>
</style>
