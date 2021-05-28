<template>
  <div>
    <div class="py-md-4 row justify-content-center">
      <validation-observer v-slot="{ invalid, handleSubmit }" tag="div"
      class="col-md-8 bg-light-breakpoint">
        <form @submit.prevent="handleSubmit(createOrder)" class="p-4 bg-light rounded-breakpoint">
          <!-- form header -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h2><strong>收件資訊</strong></h2>
            <div class="d-flex justify-content-between progress bg-primary">
              <div class="progress-icon progress-chara1"></div>
              <div class="progress-icon progress-icon-active"></div>
              <div class="progress-icon"></div>
            </div>
          </div>

          <!-- form body -->
          <validation-provider class="form-group" rules="required"
          v-slot="{ errors, classes }" tag="div">
            <label title="必填" for="receiverName">收件人姓名
              <sup class="text-danger">*</sup>
            </label>
            <input
              id="receiverName"
              type="text"
              name="收件人姓名"
              v-model="form.user.name"
              placeholder="劉好茶"
              class="form-control"
              :class="classes"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </validation-provider>

          <validation-provider class="form-group" rules="required|email"
          v-slot="{ errors, classes }" tag="div">
            <label title="必填" for="receiverEmail">收件人 Email
              <sup class="text-danger">*</sup>
            </label>
            <input
              id="receiverEmail"
              type="email"
              name="收件人 Email"
              v-model="form.user.email"
              placeholder="goodtea@mmmmail.com"
              class="form-control"
              :class="classes"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </validation-provider>

          <validation-provider class="form-group" rules="required"
          v-slot="{ errors, classes }" tag="div">
            <label title="必填" for="receiverTel">收件人電話
              <sup class="text-danger">*</sup>
            </label>
            <input
              id="receiverTel"
              type="tel"
              name="收件人電話"
              v-model="form.user.tel"
              placeholder="+886-2-26000000"
              class="form-control"
              :class="classes"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </validation-provider>

          <validation-provider class="form-group" rules="required"
          v-slot="{ errors, classes }" tag="div">
            <label title="必填" for="receiverAdd">收件地址
              <sup class="text-danger">*</sup>
            </label>
            <input
              id="receiverAdd"
              type="text"
              name="收件地址"
              v-model="form.user.address"
              placeholder="新北市林口區竹林路27號"
              class="form-control"
              :class="classes"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </validation-provider>

          <div class="form-group mb-4">
            <label for="comment">留言</label>
            <textarea
              name="留言"
              id="comment"
              placeholder="請留下寄送備註或其他想說的話"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>

          <div>
            <button type="submit" class="btn btn-secondary btn-block"
              :disabled="invalid">送出訂單</button>
          </div>
        </form>
      </validation-observer>
      <!-- side block -->
      <div class="col-lg-4 d-none d-lg-block">
        <!-- side block of price -->
        <div class="mb-4">
          <h3 class="card-header">訂單金額</h3>
          <div class="card-lowerhalf p-3">
            <div class="d-flex justify-content-between mb-2">
              <span>小計</span>
              <span>{{ cusCart.final_total|displayCurrency }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>運費</span>
              <span>$0</span>
            </div>
            <div class="d-flex justify-content-between h5">
              <b>總計</b>
              <b>{{ cusCart.final_total|displayCurrency }}</b>
            </div>
          </div>
        </div>
        <!-- side block of order -->
        <div>
          <h3 class="card-header">訂單內容</h3>
          <div class="card-lowerhalf pt-3 px-3">
            <div class="d-flex pb-3" v-for="cusCartItem in cusCart.carts" :key="cusCartItem.id">
              <div class="cuscartinfo-card-img bg-cover mr-3"
              :style="{'background-image':`url(${cusCartItem.product.imageUrl})`}"></div>
              <div class="flex-fill d-flex flex-column justify-content-around">
                <div class="text-center">{{ cusCartItem.product.title }}</div>
                <div class="text-center text-secondary-dark" v-if="cusCartItem.coupon">已使用優惠券</div>
                <div class="d-flex justify-content-around">
                  <span>{{ cusCartItem.qty }}{{ cusCartItem.product.unit }}</span>
                  <span>{{ discountedPrice(cusCartItem)|displayCurrency }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: {},
      },
      cusCart: {},
    };
  },
  methods: {
    getCusCart() {
      this.$store.commit('SET_CARTING', true);
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.axios.get(API).then((response) => {
        if (response.data.success) {
          this.cusCart = response.data.data;
          this.$store.commit('SET_CARTING', false);
        } else {
          this.$store.commit('SET_CARTING', false);
          this.$store.commit('SET_MSG', 'wrongServer');
        }
      });
    },
    discountedPrice(cusCartItem) {
      if (cusCartItem.coupon) {
        return cusCartItem.product.price * cusCartItem.qty * cusCartItem.coupon.percent * 0.01;
      }
      return cusCartItem.product.price * cusCartItem.qty;
    },
    createOrder() {
      const vm = this;
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      vm.axios.post(API, { data: vm.form }).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/payment/${response.data.orderId}`);
        }
      });
    },
  },
  created() {
    this.getCusCart();
  },
};
</script>

<style>
</style>
