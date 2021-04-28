<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/index" class="text-tertiary">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">商品</li>
      </ol>
    </nav>
    <div class="header cusproducts_header mx_n15px">
      <div class="header_text cusproducts_header_text h1">
        空持百千偈。
        <br />
        <span>不如喫茶去</span>
      </div>
    </div>
    <div class="row justify-content-center cusproducts_content pt-4">
      <div class="col-md-3">
        <div class="card rounded border-0 mb-4">
          <h3 class="card_header">商品列表</h3>
          <ul class="list-group list-group-flush text-center" role="tablist">
            <a
              href="#"
              class="list-group-item list-group-item-action"
              data-toggle="list"
              role="tab"
              @click.prevent="filterProducts(); isActive = ''"
              :class="{ active: isActive === '' }"
            >所有茶品</a>
            <a
              href="#"
              class="list-group-item list-group-item-action"
              data-toggle="list"
              role="tab"
              v-for="cat in cats"
              @click.prevent="filterProducts(); isActive = cat"
              :class="{ active: isActive === cat }"
              :key="cat"
            >{{ cat }}</a>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-6 mb-4" v-for="product in filterProducts()" :key="product.id">
            <div class="card border-0 rounded shadow-sm">
              <div
                class="bg_cover rounded-top"
                style="height: 200px"
                :style="{'background-image': `url(${product.imageUrl})`}"
              >
                <router-link :to="`/products/${product.id}`" class="w-100 h-100" />
              </div>
              <div class="card-body">
                <span
                  class="badge badge-primary cusproducts_badge float-right ml-2"
                >{{ product.category }}</span>
                <h5 class="card-title">{{ product.title }}</h5>
                <div class="d-flex justify-content-between align-items-baseline">
                  <del class="h6">原價 {{ product.origin_price }} 元</del>
                  <div class="h5 text-secondary">現在只要 {{ product.price }} 元</div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <router-link class="btn btn-outline-primary btn-sm" :to="`/products/${product.id}`">
                  商品
                  <br />資訊
                </router-link>
                <button
                  type="button"
                  class="btn btn-outline-tertiary btn-sm btn_fav"
                  @click="addToFavs(product.id)"
                  v-if="product.favored === false"
                >
                  加入
                  <br />收藏
                </button>
                <button
                  type="button"
                  class="btn btn-tertiary btn-sm"
                  @click="delFav(product.id)"
                  v-if="product.favored === true"
                >
                  取消
                  <br />收藏
                </button>
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  v-if="carting === false"
                  @click="addToCart(product)"
                >
                  加入
                  <br />購物車
                </button>
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  v-if="carting === true"
                  disabled
                >
                  商品
                  <br />處理中
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      isActive: '',
    };
  },
  methods: {
    ...mapActions(['getProducts', 'addToFavs', 'delFav']),
    filterProducts() {
      switch (this.isActive) {
        case '': {
          return this.products;
        }
        default: {
          const filteredProducts = this.products.filter(
            (item) => item.category === this.isActive,
          );
          return filteredProducts;
        }
      }
    },
    addToCart(product, qty = 1) {
      this.$store.dispatch('addToCart', { product, qty });
    },
  },
  computed: mapState(['products', 'cats', 'pagination', 'carting']),
  created() {
    this.getProducts();
  },
};
</script>

<style>
</style>
