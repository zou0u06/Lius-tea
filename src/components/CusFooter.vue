<template>
  <div>
    <validation-observer
      v-slot="{ invalid, handleSubmit }"
      tag="div"
      class="bg-primary-dark"
    >
      <div class="container-xl d-md-flex justify-content-around align-items-center py-3">
        <div class="h2 text-white text-center mb-3 mb-md-0">
          <i class="fas fa-mug-hot mr-2"></i>
          <label
            for="cusfooter-subscription"
            class="mb-0"
          >訂閱每週樂活鮮茶報</label>
        </div>
        <form
          class="cusfooter-subscription-form"
          @submit.prevent="handleSubmit(subscribe)"
        >
          <div
            id="basic-addon"
            class="far fa-envelope cusfooter-subscription-addon"
          />
          <validation-provider
            rules="required|email"
            class="flex-fill"
            tag="div"
          >
            <input
              type="text"
              class="form-control rounded-0 border-0"
              id="cusfooter-subscription"
              aria-describedby="basic-addon"
              placeholder="請輸入 Email"
              v-model="subscriptionEmail"
            />
          </validation-provider>
          <button
            type="submit"
            class="btn btn-secondary cusfooter-subscription-submit"
            :disabled="invalid"
          >
            <i class="fas fa-arrow-right"></i>
          </button>
        </form>
      </div>
    </validation-observer>
    <div class="bg-primary cusfooter-info">
      <div class="container-xl py-3 text-white text-center">
        <h2 class="mb-3 font-weight-bold">劉記茗茶 Lius' Tea</h2>
        <div class="mb-3">
          <a href="#">
            <i class="fab fa-github icon-common mr-5"></i>
          </a>
          <a href="#">
            <i class="fab fa-instagram icon-common mr-5"></i>
          </a>
          <a href="#">
            <i class="fab fa-facebook icon-common"></i>
          </a>
        </div>
        <div class="row">
          <div class="col-sm-6 mb-3">
            <a
              href="tel:+886-2-26000000"
              class="h6 mb-3"
              target="_blank"
            >
              <i class="fas fa-phone-alt"></i>
              +886-2-2600-0000
            </a>
            <br />
            <a
              href="mailto:goodtea@mmmmail.com"
              class="h6"
              target="_blank"
            >
              <i class="far fa-envelope mr-1"></i>
              goodtea@mmmmail.com
            </a>
          </div>
          <div class="col-sm-6 mb-3">
            <a
              href="https://www.google.com.tw/maps/place/244%E6%96%B0%E5%8C%97%E5%B8%82%E6%9E%97%E5%8F%A3%E5%8D%80%E7%AB%B9%E6%9E%97%E8%B7%AF27%E8%99%9F/"
              class="h6 mb-3"
              target="_blank"
            >
              <i class="fas fa-map-pin mr-1"></i>
              244 新北市林口區竹林路27號
            </a>
            <br/>
            <span>© 2021 Lius' Tea All Rights Reserved</span>
          </div>
        </div>
        <h6>本網站僅為練習用，所有資訊均屬虛構，如有雷同純屬巧合</h6>
      </div>
    </div>
    <div
      v-if="cusActive === 'CusProduct'"
      class="cusfooter-space"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      subscriptionEmail: '',
    };
  },
  computed: {
    cusActive() {
      return this.$store.state.cusActive;
    },
  },
  methods: {
    subscribe() {
      this.$store.commit('SET_MSG', { event: 'subscription' });
    },
  },
};
</script>

<style>
</style>
