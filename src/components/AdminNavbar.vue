<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
      <div class="container-xl px-0 px-xl-3">
        <h2 class="mr-auto text-white">劉記茗茶管理後臺</h2>

        <button
          type="button"
          class="navbar-toggler adminnavbar-toggler border-0"
          data-toggle="collapse"
          data-target=".adminnavbar-collapse"
          aria-controls="adminnavbar-collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"/>
        </button>

        <div class="collapse navbar-collapse adminnavbar-collapse">
          <ul
            class="navbar-nav ml-auto text-center"
            @click="setAdminNavbar()"
          >
            <li class="nav-item">
              <router-link
                to="/admin"
                class="nav-link"
                :class="{active: adminActive === 'AdminProducts'}"
              >產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/admin/orders"
                class="nav-link"
                :class="{active: adminActive === 'AdminOrders'}"
              >訂單列表</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/admin/coupons"
                class="nav-link"
                :class="{active: adminActive === 'AdminCoupons'}"
              >優惠券列表</router-link>
            </li>
            <li
              class="nav-item"
              @click="signOut"
            >
              <a
                href="#"
                class="nav-link"
              >登出</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="collapse adminnavbar-collapse mask adminnavbar-mask"/>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    adminActive() {
      return this.$store.state.adminModule.adminActive;
    },
  },
  methods: {
    setAdminNavbar() {
      if (document.body.clientWidth < 768) {
        document.querySelector('.adminnavbar-toggler').click();
      }
    },
    signOut() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      vm.axios.post(api).then((response) => {
        if (response.data.success === true) {
          vm.$router.push('/login');
        }
      }).catch((error) => {
        if (error) {
          vm.$store.commit('SET_MSG', { event: 'adminServerError' });
        }
      });
    },
  },
};
</script>

<style>

</style>
