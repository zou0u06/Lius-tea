<template>
  <div class="container-xl">
    <div class="row">
      <div class="col-md-7 mb-4">
        <h2 class="card-header h3">購物車清單</h2>
        <div class="card-lowerhalf mb-3 mb-md-4 text-center">
          <div v-if="cusCart.carts.length > 0">
            <div
              v-for="cusCartItem in cusCart.carts"
              :key="cusCartItem.product.id"
              class="p-3 border-bottom"
            >
              <div class="d-flex mb-3">
                <div
                  class="flex-shrink-0 cuscart-card-img rounded bg-cover"
                  :style="{'background-image':`url(${cusCartItem.product.imageUrl})`}"
                />
                <div class="flex-fill d-flex flex-column justify-content-between">
                  <div class="d-flex align-items-start">
                    <div
                      class="cuscart-card-text text-center flex-fill align-self-center"
                    >{{ cusCartItem.product.title }}</div>
                    <button
                      type="button"
                      class="btn ml-auto"
                      :class="{'btn-danger': carting, 'btn-outline-danger': !carting}"
                      :disabled="carting"
                      @click="openDelModal(cusCartItem)"
                    >
                      <i class="far fa-trash-alt"/>
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
                      @change="setCusCartQty(cusCartItem, parseInt($event.target.value),
                        'non-operation')"
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
                <span
                  v-if="cusCartItem.hasOwnProperty('coupon')"
                  class="cuscart-card-text text-secondary"
                >已套用優惠碼</span>
                <span v-else></span>
                <span
                  v-if="cusCartItem.hasOwnProperty('coupon')"
                  class="cuscart-card-text"
                >{{ cusCartItem.qty * cusCartItem.product.price
                * cusCartItem.coupon.percent * 0.01|displayCurrency }}</span>
                <span
                  v-else
                  class="cuscart-card-text"
                >{{ cusCartItem.qty * cusCartItem.product.price|displayCurrency }}</span>
              </div>
            </div>
            <div class="p-3 bg-card-footer">
              <h5 class="text-right mb-3">總計 {{ tempTotal|displayCurrency }}</h5>
              <h5 class="text-right text-secondary font-weight-bold">
                折扣價
                {{ tempFinalTotal|displayCurrency }}
              </h5>
            </div>
          </div>
          <div
            v-else
            class="flex-center p-3 h3"
          >目前尚無商品</div>
        </div>
        <div class="input-group mb-3 mb-md-4">
          <input
            type="text"
            v-model.trim="coupon"
            class="form-control"
            placeholder="請先確認數量再輸入優惠碼"
          />
          <div class="input-group-append">
            <button
              type="button"
              class="btn"
              :class="{'btn-secondary':carting,'btn-outline-secondary-light': !carting}"
              :disabled="carting || cusCart.carts.length === 0 || coupon === ''"
              @click="addToFinalCusCart('coupon')"
            >套用優惠碼</button>
          </div>
        </div>
        <h6
          v-if="couponOK"
          class="error-msg"
        >套用優惠碼成功，如需調整商品數量，調整後請再次套用優惠碼，否則將會以較高價格計算</h6>
        <h6
          v-if="couponError"
          class="error-msg"
        >優惠券錯誤或過期，請重新輸入</h6>
        <h6
          v-if="qtyError"
          class="error-msg"
        >商品數量錯誤，請重新輸入</h6>
        <button
          type="button"
          class="btn btn-secondary btn-lg btn-block p-0"
          :disabled="carting || cusCart.carts.length === 0"
          @click="addToFinalCusCart('no-coupon')"
        >確認並進入下一階段</button>
      </div>
      <div class="col-md-5 mb-4">
        <h3 class="card-header">推薦商品</h3>
        <products-card-sm :bases="adProducts" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductsCardSm from '@/components/ProductsCardSm.vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  components: { ProductsCardSm },
  data() {
    return {
      coupon: '',
      couponError: false,
      couponOK: false,
      tempQty: 0,
      qtyError: false,
      adProducts: [],
    };
  },
  computed: {
    ...mapState(['cusProducts', 'cusCart', 'carting']),
    tempTotal() {
      let tempTotal = 0;
      this.cusCart.carts.forEach((item) => {
        tempTotal += item.qty * item.product.price;
      });
      return tempTotal;
    },
    tempFinalTotal() {
      let tempFinalTotal = 0;
      this.cusCart.carts.forEach((item) => {
        if (item.coupon) {
          tempFinalTotal += item.qty * item.product.price * item.coupon.percent * 0.01;
        } else {
          tempFinalTotal += item.qty * item.product.price;
        }
      });
      return tempFinalTotal;
    },
  },
  watch: {
    cusProducts() {
      if (this.cusProducts.length >= 1) {
        this.getCusCart();
      }
    },
    cusCart: {
      handler() {
        this.getAdproducts();
      },
      deep: true,
    },
  },
  created() {
    this.getCusProducts();
    this.SET_CUSACTIVE('CusCart');
  },
  methods: {
    ...mapActions(['getCusProducts', 'getCusCart', 'getFinalCusCart']),
    ...mapMutations(['SET_CUSACTIVE', 'SET_MSG', 'SET_LOADING', 'SET_CARTING']),
    getAdproducts() {
      let stock = [...this.cusProducts];
      const cusCartIndex = this.cusCart.carts.map((item) => item.product.num);
      stock = stock.filter((item) => !cusCartIndex.includes(item.num));
      let j = stock.length;
      let index;
      if (j >= 4) {
        const min = j - 4;
        // eslint-disable-next-line no-plusplus
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
      this.SET_MSG({
        event: 'delCusCart',
        object: cusCartItem.product.title,
        objectId: cusCartItem.product.id,
      });
    },
    setCusCartQty(cusCartItem, newQty, action) {
      const tempCusCart = JSON.parse(localStorage.getItem('cusCart'));
      const tempCusCartL = tempCusCart.length;
      switch (action) {
        default:
          for (let i = 0; i < tempCusCartL; i += 1) {
            if (tempCusCart[i].product_id === cusCartItem.product.id) {
              tempCusCart[i].qty += newQty;
              break;
            }
          }
          localStorage.setItem('cusCart', JSON.stringify(tempCusCart));
          this.getCusCart();
          break;
        case 'non-operation':
          if (newQty < 1 || Number.isNaN(newQty) === true) {
            this.qtyError = true;
            break;
          } else {
            this.qtyError = false;
            for (let i = 0; i < tempCusCartL; i += 1) {
              if (tempCusCart[i].product_id === cusCartItem.product.id) {
                tempCusCart[i].qty = newQty;
                break;
              }
            }
            localStorage.setItem('cusCart', JSON.stringify(tempCusCart));
            this.getCusCart();
            break;
          }
      }
    },
    addToFinalCusCart(action) {
      const vm = this;
      const cusCartAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      let tempCusCart = JSON.parse(localStorage.getItem('cusCart'));
      vm.SET_CARTING(true);
      vm.SET_LOADING(true);
      vm.axios.get(cusCartAPI).then((res) => {
        if (res.data.success) {
          let finalCusCart = res.data.data.carts;
          const delTempCusCartIndex = [];
          const delFinalCusCartIndex = [];
          if (finalCusCart.length > 0 && tempCusCart.length > 0) {
            // 此段處理已加入 finalCusCart 且仍存在於訂單的商品
            tempCusCart.forEach((item, index) => {
              finalCusCart.forEach((ite, inde) => {
                if (
                  item.product_id === ite.product_id
                  && item.qty !== ite.qty
                ) {
                  delTempCusCartIndex.push(index);
                  delFinalCusCartIndex.push(inde);
                  vm.axios
                    .delete(`${cusCartAPI}/${ite.id}`);
                  vm.axios
                    .post(cusCartAPI, { data: item });
                } else if (
                  item.product_id === ite.product_id
                  && item.qty === ite.qty
                ) {
                  delTempCusCartIndex.push(index);
                  delFinalCusCartIndex.push(inde);
                }
              });
            });
            // 此段處理完成加入 finalCusCart 後新加入購物車的商品
            tempCusCart = tempCusCart.filter((item, index) => !delTempCusCartIndex
              .includes(index));
            if (tempCusCart.length > 0) {
              tempCusCart.forEach((item) => {
                vm.axios.post(cusCartAPI, { data: item }).catch((error) => {
                  if (error) {
                    vm.$store.commit('SET_MSG', { event: 'cusServerError' });
                  }
                });
              });
            }
            // 此段處理加入 finalCusCart 後又刪除的商品
            finalCusCart = finalCusCart.filter((item, index) => !delFinalCusCartIndex
              .includes(index));
            if (finalCusCart.length > 0) {
              finalCusCart.forEach((item) => {
                vm.axios.delete(`${cusCartAPI}/${item.id}`).catch((error) => {
                  if (error) {
                    vm.$store.commit('SET_MSG', { event: 'cusServerError' });
                  }
                });
              });
            }
          } else {
            tempCusCart.forEach((item) => {
              vm.axios.post(cusCartAPI, { data: item }).catch((error) => {
                if (error) {
                  vm.$store.commit('SET_MSG', { event: 'cusServerError' });
                }
              });
            });
          }

          switch (action) {
            case 'coupon': {
              const couponAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
              vm.axios
                .post(couponAPI, { data: { code: vm.coupon } })
                .then((response) => {
                  if (response.data.success) {
                    vm.coupon = '';
                    vm.couponError = false;
                    vm.couponOK = true;
                    vm.getFinalCusCart();
                    vm.SET_LOADING(false);
                  } else {
                    vm.couponError = true;
                    vm.couponOK = false;
                    vm.getFinalCusCart();
                    vm.SET_CARTING(false);
                    vm.SET_LOADING(false);
                  }
                })
                .catch((error) => {
                  if (error) {
                    vm.$store.commit('SET_MSG', { event: 'cusServerError' });
                  }
                });
              break;
            }
            default: {
              vm.getFinalCusCart();
              const GTMitems = [];
              let GTMitemsValue = 0;
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < vm.cusCart.carts.length; i++) {
                const GTMitem = {};
                GTMitem.item_id = vm.cusCart.carts[i].product.id;
                GTMitem.item_name = vm.cusCart.carts[i].product.title;
                if (vm.cusCart.carts[i].coupon) {
                  GTMitem.coupon = vm.cusCart.carts[i].coupon.title;
                }
                GTMitem.currency = 'NTD';
                GTMitem.item_category = vm.cusCart.carts[i].product.category;
                GTMitem.price = vm.cusCart.carts[i].final_total || vm.cusCart.carts[i].product.price
                  * vm.cusCart.carts[i].qty;
                GTMitemsValue += GTMitem.price;
                GTMitem.quantity = vm.cusCart.carts[i].qty;
                GTMitems.push(GTMitem);
              }
              console.log(GTMitems);
              window.gtag('event', 'begin_checkout', {
                currency: 'NTD',
                value: GTMitemsValue,
                items: GTMitems,
              });
              vm.$router.push('/info');
              break;
            }
          }
        } else {
          vm.SET_MSG({ event: 'cusServerError' });
          vm.SET_CARTING(false);
          vm.SET_LOADING(false);
        }
      }).catch((error) => {
        if (error) {
          vm.$store.commit('SET_MSG', { event: 'cusServerError' });
        }
      });
    },
  },
};
</script>

<style>
</style>
