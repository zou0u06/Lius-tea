<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/index" class="text-tertiary">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/products" class="text-tertiary">商品</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row no-gutters">
      <div class="col-md-7">
        <div class="bg_cover cusproduct_header_img"
        :style="{'background-image': `url(${ product.imageUrl })`}"></div>
      </div>
      <div class="col-md-5 d-flex flex-column justify-content-between bg-light
      p-4 cusproduct_header_text">
        <h2 class="text-center font-weight-bold">{{ product.title }}</h2>
        <h6>{{ product.description }}</h6>
        <div class="d-flex flex-wrap justify-content-between align-items-baseline">
          <del>原價 {{ product.origin_price }} 元</del>
          <div class="h5 text-secondary font-weight-bold">特價 {{ product.price }} 元</div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <span class="h4">購買數量</span>
          <select class="cusproduct_select rounded pl-2" v-model="qty">
            <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
          </select>
        </div>
        <div class="d-flex justify-content-between">
          <button
            type="button"
            class="btn btn-outline-tertiary btn_fav"
            @click="addToFavs(productId)"
            v-if="product.favored === false"
          >加入收藏</button>
          <button
            type="button"
            class="btn btn-tertiary"
            @click="delFav(productId)"
            v-if="product.favored === true"
          >取消收藏</button>
          <button
            type="button"
            class="btn btn-secondary"
            v-if="carting === false"
            @click="addToCart(product)"
          >加入購物車</button>
          <button
            type="button"
            class="btn btn-secondary"
            v-if="carting === true"
            disabled
          >商品處理中</button>
        </div>
      </div>
    </div>
    <div class="row no-gutters pt-4">
      <div class="col-md-7 px-md-3">
        <h3 class="cusproduct_heading">商品介紹</h3>
        <p class="cusproduct_content">{{ product.content }}</p>
        <h3 class="cusproduct_heading">保存方式及期限</h3>
        <p class="cusproduct_content">由於茶葉容易吸收濕氣及周邊氣味，故建議開封後放入密封罐，儲存於陰涼乾燥處，依此方式可保存兩年，製造日期印製於包裝上。</p>
        <h3 class="cusproduct_heading">沖泡方法</h3>
        <p class="cusproduct_content">
          <ul>
            <ol>＊熱水沖泡</ol>
            <ol>１、將茶葉或茶包放入杯中</ol>
            <ol>２、加入約 250c.c. 的熱水</ol>
            <ol>３、浸泡 2～3 分鐘</ol>
            <ol>４、過濾茶葉或取出茶包後即可飲用</ol>
          </ul>
          <ul>
            <ol>＊冷水沖泡</ol>
            <ol>１、將茶葉或茶包放入 600c.c. 冷水中</ol>
            <ol>２、將容器放入冰箱</ol>
            <ol>３、浸泡 4～8 小時後即可飲用</ol>
          </ul>
        </p>
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
      productId: '',
      product: {},
      qty: 1,
      adProducts: [],
    };
  },
  components: { productsCard },
  methods: {
    ...mapActions(['getProducts', 'addToFavs', 'delFav']),
    addToCart(product) {
      const { qty } = this;
      this.$store.dispatch('addToCart', { product, qty });
    },
    getProduct() {
      this.adProducts = [];
      const productsL = this.products.length;
      const stock = [];
      for (let i = 0; i < productsL; i++) {
        if (this.products[i].id === this.productId) {
          this.product = this.products[i];
        } else {
          stock.push(this.products[i]);
        }
      }
      let i = stock.length;
      let index;
      const min = i - 4;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        [stock[i], stock[index]] = [stock[index], stock[i]];
      }
      this.adProducts = stock.slice(min);
    },
  },
  computed: {
    ...mapState(['products', 'carting']),
    watched() {
      const { products, productId } = this;
      return { products, productId };
    },
  },
  watch: {
    watched: {
      handler() {
        if (this.products.length > 1) {
          this.getProduct();
        }
      },
    },
  },
  created() {
    this.getProducts();
    this.productId = this.$route.params.productId;
  },
  beforeRouteUpdate(to, from, next) {
    this.getProducts();
    this.productId = to.params.productId;
    this.qty = 1;
    next();
  },
};
</script>

<style>
</style>
