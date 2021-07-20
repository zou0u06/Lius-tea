<template>
  <div class="container-xl cusproduct">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link
            to="/"
            class="breadcrumb-link"
          >首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            to="/products"
            class="breadcrumb-link"
          >商品</router-link>
        </li>
        <li
          class="breadcrumb-item active"
          aria-current="page"
        >{{ cusProduct.title }}</li>
      </ol>
    </nav>
    <div class="row no-gutters">
      <div class="col-md-7">
        <div
          class="bg-cover cusproduct-header-img"
          :style="{'background-image': `url(${ cusProduct.imageUrl })`}"
        />
      </div>
      <div class="col-md-5 d-flex flex-column justify-content-around bg-light
      p-4 cusproduct-header-text">
        <h2 class="text-center font-weight-bold">{{ cusProduct.title }}</h2>
        <p class="mb-0">{{ cusProduct.description }}</p>
        <div class="d-flex flex-wrap justify-content-around align-items-baseline">
          <del class="h5">原價 {{ cusProduct.origin_price }} 元</del>
          <div class="h4 text-secondary font-weight-bold">特價 {{ cusProduct.price }} 元</div>
        </div>
        <div class="cusproduct-header-text-lowerhalf">
          <div class="d-flex justify-content-around align-items-center">
            <span class="h4">購買數量</span>
            <select
              v-model="qty"
              class="cusproduct-select rounded pl-2"
            >
              <option
                v-for="i in 10"
                :key="i"
                :value="i"
              >{{ i }}</option>
            </select>
          </div>
            <products-btns
              class="d-flex justify-content-around"
              :cusProduct="cusProduct"
              :qty="qty"
            />
        </div>
      </div>
    </div>
    <div class="row no-gutters pt-4">
      <div class="col-md-7 px-md-3">
        <h3 class="cusproduct-heading">商品介紹</h3>
        <p class="cusproduct-content">{{ cusProduct.content }}</p>
        <h3 class="cusproduct-heading">保存方式及期限</h3>
        <p class="cusproduct-content">由於茶葉容易吸收濕氣及周邊氣味，故建議開封後放入密封罐，儲存於陰涼乾燥處，依此方式可保存兩年，製造日期印製於包裝上。</p>
        <h3 class="cusproduct-heading">沖泡方法</h3>
        <p class="cusproduct-content">
          <ul>
            <li>＊熱水沖泡</li>
            <li>１、將茶葉或茶包放入杯中</li>
            <li>２、加入約 250c.c. 的熱水</li>
            <li>３、浸泡 2～3 分鐘</li>
            <li>４、過濾茶葉或取出茶包後即可飲用</li>
          </ul>
          <ul>
            <li>＊冷水沖泡</li>
            <li>１、將茶葉或茶包放入 600c.c. 冷水中</li>
            <li>２、將容器放入冰箱</li>
            <li>３、浸泡 4～8 小時後即可飲用</li>
          </ul>
        </p>
      </div>
      <div class="col-md-5 mb-4">
        <h3 class="rounded-top card-header">推薦商品</h3>
        <products-card :bases="adProducts" />
      </div>
    </div>
    <products-btns
      :cusProduct="cusProduct"
      :favTheme="'light'"
      :short="true"
      :qty="qty"
      class="cusproduct-feature"
    />
  </div>
</template>

<script>
import ProductsCard from '@/components/ProductsCard.vue';
import ProductsBtns from '@/components/ProductsBtns.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: { ProductsCard, ProductsBtns },
  data() {
    return {
      cusProductId: '',
      cusProduct: {
        imageUrl: '',
      },
      qty: 1,
      adProducts: [],
    };
  },
  computed: {
    ...mapState(['cusProducts']),
    watched() {
      const { cusProducts, cusProductId } = this;
      return { cusProducts, cusProductId };
    },
  },
  watch: {
    watched: {
      handler() {
        if (this.cusProducts.length > 1) {
          this.getCusProduct();
        }
      },
    },
  },
  created() {
    this.getCusProducts();
    this.cusProductId = this.$route.params.cusProductId;
    this.$store.commit('SET_CUSACTIVE', 'CusProduct');
    this.setCusproductFeature();
  },
  beforeRouteUpdate(to, from, next) {
    this.getCusProducts();
    this.cusProductId = to.params.cusProductId;
    this.qty = 1;
    next();
  },
  destroyed() {
    window.removeEventListener('scroll', this.switchOfCusproductFeature);
  },
  methods: {
    ...mapActions(['getCusProducts']),
    setCusproductFeature() {
      window.addEventListener('scroll', this.switchOfCusproductFeature);
    },
    switchOfCusproductFeature() {
      if ((
        window.scrollY < 400
        || window.scrollY > 700)
        && document.body.clientWidth >= 768
      ) {
        document.querySelector('.cusproduct-feature').style.display = 'none';
      } else {
        document.querySelector('.cusproduct-feature').style.display = 'flex';
      }
    },
    addToCusCart(cusProduct) {
      const { qty } = this;
      this.$store.dispatch('addToCusCart', { cusProduct, qty });
    },
    getCusProduct() {
      this.adProducts = [];
      const productsL = this.cusProducts.length;
      const stock = [];
      for (let i = 0; i < productsL; i++) {
        if (this.cusProducts[i].id === this.cusProductId) {
          this.cusProduct = this.cusProducts[i];
        } else {
          stock.push(this.cusProducts[i]);
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
};
</script>

<style>
</style>
