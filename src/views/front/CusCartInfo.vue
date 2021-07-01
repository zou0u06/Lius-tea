<template>
  <div class="container-xl">
    <div class="py-md-4 row justify-content-center">
      <validation-observer
        v-slot="{ invalid, handleSubmit }"
        tag="div"
        class="col-md-8 bg-light-breakpoint"
      >
        <form
          class="p-4 bg-light rounded-breakpoint"
          @submit.prevent="handleSubmit(createOrder)"
        >
          <!-- form header -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h2><strong>收件資訊</strong></h2>
            <div class="d-flex justify-content-between progress bg-primary">
              <div class="progress-icon progress-chara1"/>
              <div class="progress-icon progress-icon-active"/>
              <div class="progress-icon"/>
            </div>
          </div>

          <!-- form body -->
          <validation-provider
            v-slot="{ errors, classes }"
            rules="required"
            class="form-group"
            tag="div"
          >
            <label
              for="receiverName"
              title="必填"
            >收件人姓名
              <sup class="text-danger">*</sup>
            </label>
            <input
              type="text"
              id="receiverName"
              v-model="form.user.name"
              name="收件人姓名"
              placeholder="劉好茶"
              class="form-control"
              :class="classes"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </validation-provider>

          <validation-provider
            v-slot="{ errors, classes }"
            rules="required|email"
            class="form-group"
            tag="div"
          >
            <label
              for="receiverEmail"
              title="必填"
            >收件人 Email
              <sup class="text-danger">*</sup>
            </label>
            <input
              type="email"
              id="receiverEmail"
              v-model="form.user.email"
              name="收件人 Email"
              placeholder="goodtea@mmmmail.com"
              class="form-control"
              :class="classes"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </validation-provider>

          <validation-provider
            v-slot="{ errors, classes }"
            rules="required"
            class="form-group"
            tag="div"
          >
            <label
              for="receiverTel"
              title="必填"
            >收件人電話
              <sup class="text-danger">*</sup>
            </label>
            <input
              type="tel"
              id="receiverTel"
              v-model="form.user.tel"
              name="收件人電話"
              placeholder="+886-2-26000000"
              class="form-control"
              :class="classes"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </validation-provider>

          <validation-provider
            v-slot="{ errors, classes }"
            rules="required"
            class="form-group"
            tag="div"
          >
            <label
              for="receiverAdd"
              title="必填"
            >收件地址
              <sup class="text-danger">*</sup>
            </label>
            <input
              type="text"
              id="receiverAdd"
              v-model="form.user.address"
              name="收件地址"
              placeholder="新北市林口區竹林路27號"
              class="form-control"
              :class="classes"
            />
            <div class="invalid-feedback">{{ errors[0] }}</div>
          </validation-provider>

          <div class="form-group mb-4">
            <label for="comment">留言</label>
            <textarea
              id="comment"
              v-model="form.message"
              class="form-control"
              name="留言"
              placeholder="請留下寄送備註或其他想說的話"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              class="btn btn-secondary btn-block"
              :disabled="invalid"
            >送出訂單</button>
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
            <div
              v-for="finalCusCartItem in cusCart.carts"
              :key="finalCusCartItem.id"
              class="d-flex pb-3"
            >
              <div
                class="cuscartinfo-card-img bg-cover mr-3"
                :style="{'background-image':`url(${finalCusCartItem.product.imageUrl})`}"
              />
              <div class="flex-fill d-flex flex-column justify-content-around">
                <div class="text-center">{{ finalCusCartItem.product.title }}</div>
                <div
                  v-if="finalCusCartItem.coupon"
                  class="text-center text-secondary-dark"
                >
                  已使用優惠券</div>
                <div class="d-flex justify-content-around">
                  <span>{{ finalCusCartItem.qty }}{{ finalCusCartItem.product.unit }}</span>
                  <span>{{ finalCusCartItem.final_total|displayCurrency }}</span>
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
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        user: {},
      },
    };
  },
  computed: {
    ...mapState(['cusCart']),
  },
  created() {
    this.getFinalCusCart();
  },
  methods: {
    ...mapActions(['getFinalCusCart']),
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
};
</script>

<style>
</style>
