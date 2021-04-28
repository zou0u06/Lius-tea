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
          <div class="p-3 border-bottom" v-for="cartItem in cart.carts" :key="cartItem.id">
            <div class="d-flex mb-3">
              <div
                class="flex-shrink-0 cuscart_card_img rounded bg_cover"
                :style="{'background-image':`url(${cartItem.product.imageUrl})`}"
              />
              <div class="flex-fill d-flex flex-column justify-content-between">
                <div class="d-flex align-items-start">
                  <div
                    class="cuscart_card_text text-center flex-fill align-self-center"
                  >{{ cartItem.product.title }}</div>
                  <button
                    type="button"
                    class="btn ml-auto"
                    :class="{'btn-danger': carting, 'btn-outline-danger': !carting}"
                    :disabled="carting"
                    @click="openDelModal(cartItem)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
                <div class="input-group">
                  <button
                    class="btn btn_setQty rounded-left border-right-0"
                    :class="{'btn-tertiary': carting, 'btn-outline-tertiary': !carting}"
                    :disabled="carting || cartItem.qty === 1"
                    @click="setCartQty(cartItem, -1, 'operation')"
                  >
                    <span class="btn_setQty_word">－</span>
                  </button>
                  <input
                    type="number"
                    class="form-control border-tertiary text-center"
                    :value="cartItem.qty"
                    min="1"
                    @change="setCartQty(cartItem, parseInt($event.target.value), 'non-operation')"
                  />
                  <button
                    class="btn btn_setQty rounded-right border-left-0"
                    :class="{'btn-tertiary': carting, 'btn-outline-tertiary': !carting}"
                    :disabled="carting"
                    @click="setCartQty(cartItem, 1, 'operation')"
                  >
                    <span class="btn_setQty_word">＋</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <span v-if="!cartItem.coupon"></span>
              <span class="cuscart_card_text text-success" v-if="cartItem.coupon">已套用優惠碼</span>
              <span class="cuscart_card_text">{{ $displayCurrency(cartItem.total) }}</span>
            </div>
          </div>
          <div class="p-3 bg-card-footer">
            <h5 class="text-right mb-3">總計 {{ $displayCurrency(cart.total) }}</h5>
            <h5 class="text-right text-success">折扣價 {{ $displayCurrency(cart.final_total) }}</h5>
          </div>
        </div>
        <div class="input-group mb-3 mb-md-4">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model.trim="coupon" />
          <div class="input-group-append">
            <button
              class="btn"
              :class="{'btn-tertiary':carting,'btn-outline-tertiary': !carting}"
              type="button"
              :disabled="carting"
              @click="checkCoupon"
            >套用優惠碼</button>
          </div>
        </div>
        <router-link
          to="/info"
          class="btn btn-secondary btn-lg btn-block"
          :class="{disabled: carting}"
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
import productsCard from '../productsCard';

export default {
  data() {
    return {
      coupon: '',
      tempQty: 0,
      adProducts: [],
    };
  },
  components: { productsCard },
  methods: {
    ...mapActions(['getProducts', 'getCart']),
    getAdproducts() {
      const stock = [...this.products];
      const stockL = stock.length;
      const cartL = this.cart.carts.length;
      for (let n = 0; n < cartL; n++) {
        for (let i = 0; i < stockL; i++) {
          if (stock[i].id === this.cart.carts[n].product_id) {
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
    openDelModal(cartItem) {
      this.$store.commit('SET_MSG', {
        event: 'delCusCart',
        object: cartItem.product.title,
        objectId: cartItem.id,
      });
    },
    setCartQty(cartItem, qty, action) {
      this.$store.commit('SET_CARTING', true);
      const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const API_D = `${API}/${cartItem.id}`;
      this.axios.delete(API_D);
      switch (action) {
        default: {
          this.axios
            .post(API, {
              data: {
                product_id: cartItem.product.id,
                qty: qty + cartItem.qty,
              },
            })
            .then((response) => {
              if (response.data.success) {
                this.$store.dispatch('getCart');
              }
            });
          break;
        }
        case 'non-operation': {
          this.axios
            .post(API, {
              data: {
                product_id: cartItem.product.id,
                qty,
              },
            })
            .then((response) => {
              if (response.data.success) {
                this.$store.dispatch('getCart');
              }
            });
          break;
        }
      }
    },
    checkCoupon() {
      const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      vm.axios.post(API, { data: { code: vm.coupon } }).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('getCart');
          vm.coupon = '';
        } else {
          vm.$store.commit('SET_MSG', { event: 'wrongCoupon' });
        }
      });
    },
  },
  computed: {
    ...mapState(['products', 'cart', 'carting']),
    watched() {
      const { products, cart } = this;
      return { products, cart };
    },
  },
  watch: {
    watched() {
      if (this.products.length > 1) {
        this.getAdproducts();
      }
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

<style>
</style>
