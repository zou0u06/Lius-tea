<template>
  <div>
    <validation-observer
      v-slot="{ invalid, handleSubmit }"
      tag="div"
      class="py-md-4 row justify-content-center"
    >
      <form
        @submit.prevent="handleSubmit(payOrder)"
        class="col-md-8 p-4 bg-light rounded_breakpoint"
      >
        <!-- form header -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2>
            <strong>付款資訊</strong>
          </h2>
          <div class="d-flex justify-content-between progress bg-primary">
            <div class="progress_icon progress_chara1"></div>
            <div class="progress_icon progress_chara2"></div>
            <div class="progress_icon progress_icon_active"></div>
          </div>
        </div>

        <!-- form body -->
        <div class="form-group">
          <label title="必填" for="tempNumPart1">
            信用卡號
            <sup class="text-danger">*</sup>
          </label>
          <div class="d-block d-sm-flex">
          <div class="d-flex mb-2">
            <validation-provider rules="digits:4|required"
              v-slot="{ errors, classes }" tag="div">
              <input
                id="tempNumPart1"
                type="number"
                name="卡號"
                v-model="tempCreditNum.part1"
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
            <validation-provider rules="digits:4|required"
              v-slot="{ errors, classes }" tag="div">
              <input
                id="tempNumPart3"
                type="number"
                name="卡號"
                v-model="tempCreditNum.part3"
                placeholder="1234"
                class="form-control"
                :class="classes"
                @input="jumpToNext($event.target.value, 3)"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
            <div class="dashes">－</div>
            <validation-provider
              rules="numeric|required"
              v-slot="{ errors, classes }"
              tag="div"
            >
              <input
                id="tempNumPart4"
                type="number"
                name="卡號"
                v-model="tempCreditNum.part4"
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
          <label title="必填" for="creditMM">
            有效期限
            <sup class="text-danger">*</sup>
          </label>
          <div class="form-row">
            <validation-provider
              rules="digits:2|required"
              class="col"
              v-slot="{ errors, classes }"
              tag="div"
            >
              <input
                id="creditMM"
                type="number"
                name="月份"
                v-model="card.creditMM"
                placeholder="00"
                class="form-control"
                :class="classes"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>

            <validation-provider
              rules="digits:2|required"
              class="col"
              v-slot="{ errors, classes }"
              tag="div"
            >
              <input
                id="creditYY"
                type="number"
                name="年份"
                v-model="card.creditYY"
                placeholder="01"
                class="form-control"
                :class="classes"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>

        <div class="form-group">
          <label title="必填" for="creditLN">
            持卡人姓名
            <sup class="text-danger">*</sup>
          </label>
          <div class="form-row">
            <validation-provider
              rules="required"
              class="col"
              v-slot="{ errors, classes }"
              tag="div"
            >
              <input
                id="creditLN"
                type="text"
                name="持卡人姓氏"
                v-model="card.creditLN"
                placeholder="劉"
                class="form-control"
                :class="classes"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>

            <validation-provider
              rules="required"
              class="col"
              v-slot="{ errors, classes }"
              tag="div"
            >
              <input
                id="creditFN"
                type="text"
                name="持卡人名字"
                v-model="card.creditFN"
                placeholder="好茶"
                class="form-control"
                :class="classes"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>

        <validation-provider
          class="form-group mb-4"
          rules="digits:3|required"
          v-slot="{ errors, classes }"
          tag="div"
        >
          <label title="必填" for="creditSC">
            安全碼
            <sup class="text-danger">*</sup>
          </label>
          <input
            id="creditSC"
            type="number"
            name="安全碼"
            v-model="card.creditSC"
            placeholder="123"
            class="form-control"
            :class="classes"
          />
          <div class="invalid-feedback">{{ errors[0] }}</div>
        </validation-provider>
        <button type="submit" class="btn btn-secondary btn-block" :disabled="invalid">確認付款</button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: '',
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
  methods: {
    payOrder() {
      const vm = this;
      const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.axios.post(API).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/finished/${vm.orderId}`);
        }
      });
    },
    jumpToNext(value, num) {
      if (value.length === 4 && typeof parseInt(value, 10) === 'number' && value.indexOf('.') === -1) {
        document.querySelector(`#tempNumPart${num + 1}`).focus();
      }
    },
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
    this.orderId = this.$route.params.orderId;
  },
};
</script>

<style>
</style>
