<template>
  <div>
    <div class="py-md-4 row justify-content-center">
      <validation-observer v-slot="{ invalid, handleSubmit }" tag="div"
      class="col-md-8 bg_light_breakpoint">
        <form @submit.prevent="handleSubmit(createOrder)" class="p-4 bg-light rounded_breakpoint">
          <!-- form header -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h2><strong>收件資訊</strong></h2>
            <div class="d-flex justify-content-between progress bg-primary">
              <div class="progress_icon progress_chara1"></div>
              <div class="progress_icon progress_icon_active"></div>
              <div class="progress_icon"></div>
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
          <h3 class="card_header">訂單金額</h3>
          <div class="card_lowerhalf p-3">
            <div class="d-flex justify-content-between mb-1">
              <span>小計</span>
              <span>{{ $displayCurrency(cart.final_total) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>運費</span>
              <span>{{ $displayCurrency() }}</span>
            </div>
            <div class="d-flex justify-content-between h5">
              <b>總計</b>
              <b>{{ $displayCurrency(cart.final_total) }}</b>
            </div>
          </div>
        </div>
        <!-- side block of order -->
        <div>
          <h3 class="card_header">訂單內容</h3>
          <div class="card_lowerhalf pt-3 px-3">
            <div class="d-flex pb-3" v-for="item in cart.carts" :key="item.id">
              <div class="cuscartinfo_card_img bg_cover mr-3"
              :style="{'background-image':`url(${item.product.imageUrl})`}"></div>
              <div class="flex-fill d-flex flex-column justify-content-between">
                <h6 class="text-center">{{ item.product.title }}</h6>
                <div class="text-center text-success" v-if="item.coupon">已使用優惠券</div>
                <div class="d-flex justify-content-between">
                  <span>{{ item.qty }}{{ item.product.unit }}</span>
                  <span>{{ $displayCurrency(discountedPrice(item)) }}</span>
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
      // cart: {},
      isLoading: true,
    };
  },
  methods: {
    getCart() {
      this.$store.dispatch('getCart');
    },
    discountedPrice(item) {
      if (item.coupon) {
        return item.product.price * item.qty * item.coupon.percent * 0.01;
      }
      return item.product.price * item.qty;
    },
    createOrder() {
      const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      vm.axios.post(API, { data: vm.form }).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/payment/${response.data.orderId}`);
        }
      });
    },
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style>
</style>
