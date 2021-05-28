<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="row">
      <div class="col-md-7 mb-4">
        <h3 class="card-header">購物車清單</h3>
        <div class="card-lowerhalf mb-3 mb-md-4 text-center">
          <div v-if="cusCart.length > 0">
            <div
              class="p-3 border-bottom"
              v-for="cusCartItem in cusCart"
              :key="cusCartItem.id"
            >
              <div class="d-flex mb-3">
                <div
                  class="flex-shrink-0 cuscart-card-img rounded bg-cover"
                  :style="{'background-image':`url(${cusCartItem.product.imageUrl || cusCartItem.imageUrl})`}"
                />
                <div class="flex-fill d-flex flex-column justify-content-between">
                  <div class="d-flex align-items-start">
                    <div
                      class="cuscart-card-text text-center flex-fill align-self-center"
                    >{{ cusCartItem.product.title || cusCartItem.title }}</div>
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
                      type="button"
                      class="btn btn-setQty rounded-left border-right-0"
                      :class="{'btn-secondary': carting, 'btn-outline-secondary': !carting}"
                      :disabled="carting || cusCartItem.qty === 1"
                      @click="setCusCartQty(cusCartItem, -1, 'operation')"
                    >
                      <span class="btn-setQty-word">－</span>
                    </button>
                    <input
                      type="number"
                      class="form-control border-secondary text-center"
                      :value="cusCartItem.qty"
                      min="1"
                      @change="setCusCartQty(cusCartItem, parseInt($event.target.value), 'non-operation')"
                    />
                    <button
                      type="button"
                      class="btn btn-setQty rounded-right border-left-0"
                      :class="{'btn-secondary': carting, 'btn-outline-secondary': !carting}"
                      :disabled="carting"
                      @click="setCusCartQty(cusCartItem, 1, 'operation')"
                    >
                      <span class="btn-setQty-word">＋</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <span class="cuscart-card-text text-secondary" v-if="cusCartItem.coupon">已套用優惠碼</span>
                <span v-else></span>
                <span class="cuscart-card-text">{{ cusCartItem.final_total|displayCurrency }}</span>
              </div>
            </div>
            <!-- <div class="p-3 bg-card-footer">
              <h5 class="text-right mb-3">總計 {{ cusCartTotal|displayCurrency }}</h5>
              <h5 class="text-right text-secondary font-weight-bold">
                折扣價
                {{ cusCartFinalTotal|displayCurrency }}
              </h5>
            </div> -->
          </div>
          <div v-else class="flex-center p-3 h3">目前尚無商品</div>
        </div>
        <div class="input-group mb-3 mb-md-4">
          <input type="text" class="form-control" placeholder="請先確認數量再輸入優惠碼" v-model.trim="coupon" />
          <div class="input-group-append">
            <button
              class="btn"
              :class="{'btn-secondary':carting,'btn-outline-secondary-light': !carting}"
              type="button"
              :disabled="carting"
              @click="checkCusCoupon"
            >套用優惠碼</button>
          </div>
        </div>
        <h6 class="error-msg" v-if="couponError">優惠券錯誤或過期，請重新輸入</h6>
        <h6 class="error-msg" v-if="qtyError">商品數量錯誤，請重新輸入</h6>
        <router-link
          to="/info"
          class="btn btn-secondary btn-lg btn-block"
          :class="{ disabled: carting }"
          @click="confirmCusCart"
        >確認並進入下一階段</router-link>
      </div>
      <div class="col-md-5 mb-4">
        <h3 class="card-header">推薦商品</h3>
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
      tempCusCart: [],
      // tempCusCart: JSON.parse(localStorage.getItem('tempCusCart')) || [],
      coupon: '',
      couponError: false,
      tempQty: 0,
      qtyError: false,
      adProducts: [],
    };
  },
  methods: {
    ...mapActions(['getCusProducts', 'getCusCart']),
    getAdproducts() {
      const stock = [...this.cusProducts];
      const stockL = stock.length;
      const cartL = this.cusCart.length;
      for (let n = 0; n < cartL; n++) {
        for (let i = 0; i < stockL; i++) {
          if (stock[i].id === this.cusCart[n].product_id) {
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
    setCusCartQty(cusCartItem, newQty, action) {
      const temp = JSON.parse(localStorage.getItem('tempCusCart'));
      const tempCusCartL = this.tempCusCart.length;
      console.log(temp, cusCartItem.product.title, newQty, action);
      switch (action) {
        default: {
          for (let i = 0; i < tempCusCartL; i++) {
            if (temp[i].product_id === cusCartItem.product_id) {
              temp[i].qty += newQty;
              temp[i].total = temp[i].qty * temp[i].product.price;
              if (temp[i].coupon) {
                temp[i].final_total = temp[i].qty
                * temp[i].product.price * temp[i].coupon.percent * 0.01;
              } else {
                temp[i].final_total = temp[i].qty
                * temp[i].product.price;
              }
              localStorage.setItem('tempCusCart', JSON.stringify(temp));
            }
            break;
          }
          // this.renewCusCart();
          break;
        }
        case 'non-operation': {
          if (newQty < 1 || Number.isNaN(newQty) === true) {
            this.qtyError = true;
            break;
          } else {
            this.qtyError = false;
            for (let i = 0; i < tempCusCartL; i++) {
              if (this.tempCusCart[i].product_id === cusCartItem.product_id) {
                this.tempCusCart[i].qty = newQty;
                this.tempCusCart[i].total = newQty * this.tempCusCart[i].product.price;
                if (this.tempCusCart[i].coupon) {
                  this.tempCusCart[i].final_total = newQty * this.tempCusCart[i].product.price
                  * this.tempCusCart[i].coupon.percent * 0.01;
                } else {
                  this.tempCusCart[i].final_total = newQty * this.tempCusCart[i].product.price;
                }
              }
              localStorage.setItem('tempCusCart', JSON.stringify(this.tempCusCart));
              break;
            }
            break;
          }
        }
      }
    },
    checkCusCoupon() {
      const vm = this;
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
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
    // renewCusCart() {
    //   this.tempCusCart = JSON.parse(localStorage.getItem('tempCusCart')) || [];
    //   console.log('renew');
    // },
    confirmCusCart() {
    // const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
    // const API_D = `${API}/${cusCartItem.id}`;
    // this.axios.delete(API_D);
      console.log('haha');
    },
  },
  computed: {
    ...mapState(['cusProducts', 'cusCart', 'carting']),
  },
  watch: {
    cusProducts() {
      if (this.cusProducts.length >= 1) {
        this.getCusCart();
      }
    },
    cusCart() {
      console.log(this.cusCart);
      this.getAdproducts();
    },
    // cusCart() {
    //   localStorage.setItem('tempCusCart', JSON.stringify(this.cusCart));
    //   this.renewCusCart();
    // },
    // cusCart: {
    //   handler() {
    //     localStorage.setItem('tempCusCart', JSON.stringify(this.cusCart));
    //   },
    //   deep: true,
    // },
    // tempCusCart() {
    //   console.log(this.tempCusCart);
    // },
  },
  created() {
    this.getCusProducts();
    this.$store.commit('SET_CUSACTIVE', 'CusCart');
  },
};
</script>

<style>
</style>
