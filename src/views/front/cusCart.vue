<!-- eslint-disable max-len -->
<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/index" class="text-tertiary">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">購物車</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-md-7 mb-4">
        <h3 class="card_header">購物車清單</h3>
        <div class="card_lowerhalf mb-3 mb-md-4 text-center">
          <div v-if="cusCart.carts.length > 0">
            <div class="p-3 border-bottom" v-for="cusCartItem in cusCart.carts"
              :key="cusCartItem.id">
              <div class="d-flex mb-3">
                <div
                  class="flex-shrink-0 cuscart_card_img rounded bg_cover"
                  :style="{'background-image':`url(${cusCartItem.product.imageUrl})`}"
                />
                <div class="flex-fill d-flex flex-column justify-content-between">
                  <div class="d-flex align-items-start">
                    <div
                      class="cuscart_card_text text-center flex-fill align-self-center"
                    >{{ cusCartItem.product.title }}</div>
                    <button
                      type="button"
                      class="btn ml-auto"
                      :class="{'btn-danger': carting, 'btn-outline-danger': !carting}"
                      :disabled="carting"
                      @click="openDelModal(cusCartItem)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </div>
                  <div class="input-group">
                    <button
                      class="btn btn_setQty rounded-left border-right-0"
                      :class="{'btn-tertiary': carting, 'btn-outline-tertiary': !carting}"
                      :disabled="carting || cusCartItem.qty === 1"
                      @click="setCartQty(cusCartItem, -1, 'operation')"
                    >
                      <span class="btn_setQty_word">－</span>
                    </button>
                    <input
                      type="number"
                      class="form-control border-tertiary text-center"
                      :value="cusCartItem.qty"
                      min="1"
                      @change="setCartQty(cusCartItem, parseInt($event.target.value), 'non-operation')"
                    />
                    <button
                      class="btn btn_setQty rounded-right border-left-0"
                      :class="{'btn-tertiary': carting, 'btn-outline-tertiary': !carting}"
                      :disabled="carting"
                      @click="setCartQty(cusCartItem, 1, 'operation')"
                    >
                      <span class="btn_setQty_word">＋</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <span v-if="!cusCartItem.coupon"></span>
                <span class="cuscart_card_text text-success" v-if="cusCartItem.coupon">已套用優惠碼</span>
                <span class="cuscart_card_text">{{ $displayCurrency(cusCartItem.total) }}</span>
              </div>
            </div>
            <div class="p-3 bg-card-footer">
              <h5 class="text-right mb-3">總計 {{ $displayCurrency(cusCart.total) }}</h5>
              <h5 class="text-right text-success">折扣價
                {{ $displayCurrency(cusCart.final_total) }}</h5>
            </div>
          </div>
          <div v-else class="flex_center p-3 h3">目前尚無商品</div>
        </div>
        <div class="input-group mb-3 mb-md-4">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model.trim="coupon" />
          <div class="input-group-append">
            <button
              class="btn"
              :class="{'btn-tertiary':carting,'btn-outline-tertiary': !carting}"
              type="button"
              :disabled="carting"
              @click="checkCusCoupon"
            >套用優惠碼</button>
          </div>
        </div>
        <h6 class="error_msg" v-if="couponError">優惠券錯誤或過期，請重新輸入</h6>
        <h6 class="error_msg" v-if="qtyError">商品數量錯誤，請重新輸入</h6>
        <router-link
          to="/info"
          class="btn btn-secondary btn-lg btn-block"
          :class="{ disabled: carting }"
        >確認並進入下一階段</router-link>
      </div>
      <div class="col-md-5 mb-4">
        <h3 class="card_header">推薦商品</h3>
        <products-card :bases="adProducts" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import productsCard from '../../components/productsCard';

export default {
  data() {
    return {
      coupon: '',
      couponError: false,
      tempQty: 0,
      qtyError: false,
      adProducts: [],
    };
  },
  components: { productsCard },
  methods: {
    ...mapActions(['getCusProducts', 'getCusCart']),
    getAdproducts() {
      const stock = [...this.cusProducts];
      const stockL = stock.length;
      const cartL = this.cusCart.carts.length;
      for (let n = 0; n < cartL; n++) {
        for (let i = 0; i < stockL; i++) {
          if (stock[i].id === this.cusCart.carts[n].product_id) {
            stock.splice(i, 1);
            break;
          }
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
    openDelModal(cusCartItem) {
      this.$store.commit('SET_MSG', {
        event: 'delCusCart',
        object: cusCartItem.product.title,
        objectId: cusCartItem.id,
      });
    },
    setCartQty(cusCartItem, qty, action) {
      this.$store.commit('SET_CARTING', true);
      const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const API_D = `${API}/${cusCartItem.id}`;
      this.axios.delete(API_D);
      switch (action) {
        default: {
          this.axios
            .post(API, {
              data: {
                product_id: cusCartItem.product.id,
                qty: qty + cusCartItem.qty,
              },
            })
            .then((response) => {
              if (response.data.success) {
                this.$store.dispatch('getCusCart');
              }
            });
          break;
        }
        case 'non-operation': {
          // eslint-disable-next-line no-restricted-globals
          if (qty < 1 || isNaN(qty) === true) {
            this.qtyError = true;
            break;
          } else {
            this.qtyError = false;
            this.axios
              .post(API, {
                data: {
                  product_id: cusCartItem.product.id,
                  qty,
                },
              })
              .then((response) => {
                if (response.data.success) {
                  this.$store.dispatch('getCusCart');
                }
              });
            break;
          }
        }
      }
    },
    checkCusCoupon() {
      const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      vm.axios.post(API, { data: { code: vm.coupon } }).then((response) => {
        if (response.data.success) {
          vm.couponError = false;
          vm.coupon = '';
          vm.$store.dispatch('getCusCart');
        } else {
          vm.couponError = true;
        }
      });
    },
  },
  computed: {
    ...mapState(['cusProducts', 'cusCart', 'carting']),
    watched() {
      const { cusProducts, cusCart } = this;
      return { cusProducts, cusCart };
    },
  },
  watch: {
    watched() {
      if (this.cusProducts.length > 1) {
        this.getAdproducts();
      }
    },
  },
  created() {
    this.getCusProducts();
    this.getCusCart();
    this.$store.commit('SET_CUSACTIVE', 'cusCart');
  },
};
</script>

<style>
</style>
