<template>
  <div>
    <validation-observer v-slot="{ invalid, handleSubmit }" tag="div">
      <form class="py-5 cuslogin-form text-center" @submit.prevent="handleSubmit(signin)">
        <div class="h1 mb-4 font-weight-normal text-white">會員登入</div>
        <validation-provider
          class="form-group"
          rules="required|email"
          v-slot="{ classes }"
          tag="div"
        >
          <label for="inputEmail" class="sr-only">請輸入 Email</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            :class="classes"
            placeholder="請輸入 Email"
            v-model="user.username"
            @change="saveInfo()"
            required
            autofocus
          />
        </validation-provider>

        <validation-provider
          class="form-group"
          rules="required"
          v-slot="{ classes }"
          tag="div"
        >
          <label for="inputPassword" class="sr-only">請輸入密碼</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control mb-3"
            placeholder="請輸入密碼"
            v-model="user.password"
            :class="classes"
            required
          />
        </validation-provider>
        <div class="checkbox mb-3">
          <label class="text-white cuslogin-checkbox">
            <input type="checkbox" class="mr-2" @click="rememberInfo()" />記住帳號
          </label>
        </div>
        <div class="error-msg" v-if="errorMsg">帳號或密碼錯誤，請重新輸入</div>
        <button class="btn btn-lg btn-secondary btn-block" type="submit"
          :disabled="invalid">登入</button>
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
  methods: {
    signin() {
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
        case true: {
          this.rememberSwitch = false;
          this.clearInfo();
          break;
        }
        default: {
          this.rememberSwitch = true;
          this.saveInfo();
          break;
        }
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
  created() {
    this.user.username = JSON.parse(localStorage.getItem('user')) || '';
    this.$store.commit('SET_CUSACTIVE', 'CusLogin');
  },
};
</script>

<style scoped>
</style>
