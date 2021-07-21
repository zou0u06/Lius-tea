<template>
  <div class="container-xl">
    <validation-observer
      v-slot="{ invalid, handleSubmit }"
      tag="div"
    >
      <form
        class="cuslogin-form"
        @submit.prevent="handleSubmit(signIn)"
      >
        <h2 class="mb-3 font-weight-normal text-white">會員登入</h2>
        <validation-provider
          rules="required|email"
          v-slot="{ classes }"
          class="form-group"
          tag="div"
        >
          <label
            for="inputEmail"
            class="sr-only"
          >請輸入 Email</label>
          <input
            type="email"
            id="inputEmail"
            v-model="user.username"
            class="form-control rounded-top mb-n3"
            :class="classes"
            placeholder="請輸入 Email"
            required
            autofocus
            @change="saveInfo()"
          />
        </validation-provider>

        <validation-provider
          rules="required"
          v-slot="{ classes }"
          class="form-group"
          tag="div"
        >
          <label
            for="inputPassword"
            class="sr-only"
          >請輸入密碼</label>
          <input
            type="password"
            id="inputPassword"
            v-model="user.password"
            placeholder="請輸入密碼"
            class="form-control rounded-bottom mb-1"
            :class="classes"
            required
          />
        </validation-provider>
        <div class="checkbox mb-2">
          <label class="text-white cuslogin-checkbox">
            <input
              type="checkbox"
              class="mr-2"
              @click="rememberInfo()"
            />記住帳號
          </label>
        </div>
        <div
          v-if="errorMsg"
          class="error-msg"
        >帳號或密碼錯誤，請重新輸入</div>
        <button
          type="submit"
          class="btn btn-lg btn-secondary btn-block cuslogin-btn"
          :disabled="invalid"
        >登入</button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      errorMsg: false,
      rememberSwitch: false,
    };
  },
  created() {
    this.user.username = JSON.parse(localStorage.getItem('user')) || '';
    this.$store.commit('SET_CUSACTIVE', 'CusLogin');
  },
  methods: {
    signIn() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      vm.axios.post(api, vm.user).then((response) => {
        if (response.data.success) {
          const { token } = response.data;
          const { expired } = response.data;
          document.cookie = `myToken=${token}; expires=${new Date(expired)}`;
          vm.$router.push('/admin');
        } else {
          vm.user.password = '';
          vm.errorMsg = true;
        }
      });
    },
    rememberInfo() {
      switch (this.rememberSwitch) {
        case true:
          this.rememberSwitch = false;
          this.clearInfo();
          break;
        default:
          this.rememberSwitch = true;
          this.saveInfo();
          break;
      }
    },
    saveInfo() {
      if (this.rememberSwitch) {
        localStorage.setItem('user', JSON.stringify(this.user.username));
      }
    },
    clearInfo() {
      localStorage.setItem('user', JSON.stringify(''));
    },
  },
};
</script>

<style scoped>
</style>
