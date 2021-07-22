<template>
  <div class="container-xl">
    <validation-observer
      v-slot="{ invalid, handleSubmit }"
      class="py-md-4 row justify-content-center"
      tag="div"
    >
      <form
        class="col-md-8 p-4 bg-light rounded-breakpoint"
        @submit.prevent="handleSubmit(payOrder)"
      >
        <!-- form header -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2>
            <strong>付款資訊</strong>
          </h2>
          <div class="d-flex justify-content-between progress bg-primary">
            <div class="progress-icon progress-chara1"></div>
            <div class="progress-icon progress-chara2"></div>
            <div class="progress-icon progress-icon-active"></div>
          </div>
        </div>

        <!-- form body -->
        <div class="form-group">
          <label
            for="tempNumPart1"
            title="必填"
          >
            信用卡號
            <sup class="text-danger">*</sup>
          </label>
          <div class="d-block d-sm-flex">
            <div class="d-flex mb-2">
              <validation-provider
                v-slot="{ errors, classes }"
                rules="digits:4|required"
                tag="div"
              >
                <input
                  type="number"
                  id="tempNumPart1"
                  v-model="tempCreditNum.part1"
                  name="卡號"
                  placeholder="1234"
                  class="form-control"
                  :class="classes"
                  @input="jumpToNext($event.target.value, 1)"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </validation-provider>
              <div class="dashes">－</div>
              <validation-provider rules="digits:4|required"
                v-slot="{ errors, classes }" tag="div">
                <input
                  id="tempNumPart2"
                  type="number"
                  name="卡號"
                  v-model="tempCreditNum.part2"
                  placeholder="1234"
                  class="form-control"
                  :class="classes"
                  @input="jumpToNext($event.target.value, 2)"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </validation-provider>
              <div class="dashes d-none d-sm-inline">－</div>
            </div>
            <div class="d-flex">
              <validation-provider
                v-slot="{ errors, classes }"
                rules="digits:4|required"
                tag="div"
              >
                <input
                  type="number"
                  id="tempNumPart3"
                  v-model="tempCreditNum.part3"
                  name="卡號"
                  placeholder="1234"
                  class="form-control"
                  :class="classes"
                  @input="jumpToNext($event.target.value, 3)"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </validation-provider>
              <div class="dashes">－</div>
              <validation-provider
                v-slot="{ errors, classes }"
                rules="numeric|required"
                tag="div"
              >
                <input
                  type="number"
                  id="tempNumPart4"
                  v-model="tempCreditNum.part4"
                  name="卡號"
                  placeholder="1234"
                  class="form-control"
                  :class="classes"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </validation-provider>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label
            title="必填"
            for="creditMM"
          >
            有效期限
            <sup class="text-danger">*</sup>
          </label>
          <div class="form-row">
            <validation-provider
              v-slot="{ errors, classes }"
              rules="digits:2|required"
              class="col"
              tag="div"
            >
              <input
                type="number"
                id="creditMM"
                v-model="card.creditMM"
                name="月份"
                placeholder="00"
                class="form-control"
                :class="classes"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>

            <validation-provider
              v-slot="{ errors, classes }"
              rules="digits:2|required"
              class="col"
              tag="div"
            >
              <input
                type="number"
                id="creditYY"
                v-model="card.creditYY"
                name="年份"
                placeholder="01"
                class="form-control"
                :class="classes"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>

        <div class="form-group">
          <label
            title="必填"
            for="creditLN"
          >
            持卡人姓名
            <sup class="text-danger">*</sup>
          </label>
          <div class="form-row">
            <validation-provider
              v-slot="{ errors, classes }"
              rules="required"
              class="col"
              tag="div"
            >
              <input
                type="text"
                id="creditLN"
                v-model="card.creditLN"
                name="持卡人姓氏"
                placeholder="劉"
                class="form-control"
                :class="classes"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>

            <validation-provider
              v-slot="{ errors, classes }"
              rules="required"
              class="col"
              tag="div"
            >
              <input
                type="text"
                id="creditFN"
                v-model="card.creditFN"
                name="持卡人名字"
                placeholder="好茶"
                class="form-control"
                :class="classes"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>

        <validation-provider
          v-slot="{ errors, classes }"
          rules="digits:3|required"
          class="form-group mb-4"
          tag="div"
        >
          <label
            title="必填"
            for="creditSC"
          >
            安全碼
            <sup class="text-danger">*</sup>
          </label>
          <input
            type="number"
            id="creditSC"
            v-model="card.creditSC"
            name="安全碼"
            placeholder="123"
            class="form-control"
            :class="classes"
          />
          <div class="invalid-feedback">{{ errors[0] }}</div>
        </validation-provider>
        <button
          type="submit"
          class="btn btn-secondary btn-block"
          :disabled="invalid"
        >確認付款</button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cusOrderId: '',
      card: {
        creditNum: '',
        creditMM: '',
        creditYY: '',
        creditLN: '',
        creditFN: '',
        creditSC: '',
      },
      tempCreditNum: {
        part1: '',
        part2: '',
        part3: '',
        part4: '',
      },
    };
  },
  watch: {
    tempCreditNum: {
      deep: true,
      handler() {
        this.card.creditNum = Number(
          `${this.tempCreditNum.part1}${this.tempCreditNum.part2}${this.tempCreditNum.part3}${this.tempCreditNum.part4}`,
        );
      },
    },
  },
  created() {
    this.cusOrderId = this.$route.params.cusOrderId;
  },
  methods: {
    payOrder() {
      const vm = this;
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.cusOrderId}`;
      vm.axios.post(API).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/finished/${vm.cusOrderId}`);
          localStorage.setItem('cusCart', JSON.stringify([]));
        }
      }).catch((error) => {
        if (error) {
          vm.$store.commit('SET_MSG', { event: 'cusServerError' });
        }
      });
    },
    jumpToNext(value, num) {
      if (
        value.length === 4
        && typeof parseInt(value, 10) === 'number'
        && value.indexOf('.') === -1
      ) {
        document.querySelector(`#tempNumPart${num + 1}`).focus();
      }
    },
  },
};
</script>

<style>
</style>
