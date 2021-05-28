<template>
  <div>
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
          <h3 class="card-header">商品列表</h3>
          <ul class="list-group list-group-flush text-center" role="tablist">
            <a
              href="#"
              class="list-group-item list-group-item-action"
              data-toggle="list"
              role="tab"
              @click.prevent="filterCusProducts(); isActive = ''"
              :class="{ active: isActive === '' }"
            >所有茶品</a>
            <a
              href="#"
              class="list-group-item list-group-item-action"
              data-toggle="list"
              role="tab"
              v-for="cat in cats"
              @click.prevent="filterCusProducts(); isActive = cat"
              :class="{ active: isActive === cat }"
              :key="cat"
            >{{ cat }}</a>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-6 mb-4" v-for="cusProduct in filterCusProducts()" :key="cusProduct.id">
            <div class="card border-0 rounded shadow-sm">
              <div
                class="bg-cover rounded-top"
                style="height: 200px"
                :style="{'background-image': `url(${cusProduct.imageUrl})`}"
              >
                <router-link :to="`/products/${cusProduct.id}`" class="w-100 h-100" />
              </div>
              <div class="card-body">
                <span
                  class="badge badge-primary cusproducts-badge float-right ml-2"
                >{{ cusProduct.category }}</span>
                <h5 class="card-title">{{ cusProduct.title }}</h5>
                <div class="d-flex justify-content-between align-items-baseline">
                  <del class="h6">原價 {{ cusProduct.origin_price }} 元</del>
                  <div class="h5 text-secondary">現在只要 {{ cusProduct.price }} 元</div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <router-link class="btn btn-outline-primary btn-sm"
                  :to="`/products/${cusProduct.id}`">
                  商品
                  <br />資訊
                </router-link>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm btn-fav"
                  @click="addToCusFavs(cusProduct.id)"
                  v-if="cusProduct.favored === false"
                >
                  加入
                  <br />收藏
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="delCusFav(cusProduct.id)"
                  v-if="cusProduct.favored === true"
                >
                  取消
                  <br />收藏
                </button>
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  v-if="carting === false"
                  @click="addToCusCart(cusProduct)"
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
    ...mapActions(['getCusProducts', 'addToCusFavs', 'delCusFav']),
    filterCusProducts() {
      switch (this.isActive) {
        case '': {
          return this.cusProducts;
        }
        case 'all': {
          this.setScrollY();
          return this.cusProducts;
        }
        default: {
          this.setScrollY();
          const filteredCusProducts = this.cusProducts.filter(
            (item) => item.category === this.isActive,
          );
          return filteredCusProducts;
        }
      }
    },
    setScrollY() {
      if (document.body.clientWidth < 768) {
        window.scrollTo(0, 420);
      } else if (document.body.clientWidth >= 768 && document.body.clientWidth < 992) {
        window.scrollTo(0, 520);
      } else if (document.body.clientWidth >= 992) {
        window.scrollTo(0, 670);
      }
    },
    addToCusCart(cusProduct, qty = 1) {
      this.$store.dispatch('addToCusCart', { cusProduct, qty });
    },
  },
  computed: mapState(['cusProducts', 'cats', 'pagination', 'carting']),
  created() {
    this.getCusProducts();
    this.$store.commit('SET_CUSACTIVE', 'CusProducts');
  },
};
</script>

<style>
</style>
