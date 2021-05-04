<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
      <div class="container-xl px-0 px-xl-3">
        <h2 class="mr-auto text-white">劉記茗茶管理後臺</h2>

        <button
          class="navbar-toggler adminnavbar_toggler border-0"
          type="button"
          data-toggle="collapse"
          data-target=".adminnavbar_collapse"
          aria-controls="adminnavbar_collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse adminnavbar_collapse">
          <ul class="navbar-nav ml-auto text-center" @click.prevent="setAdminNavbar()">
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/admin"
                :class="{active: adminActive === 'adminProducts'}"
              >產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/admin/orders"
                :class="{active: adminActive === 'adminOrders'}"
              >訂單列表</router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/admin/coupons"
                :class="{active: adminActive === 'adminCoupons'}"
              >優惠券列表</router-link>
            </li>
            <li class="nav-item" @click.prevent="signout">
              <a class="nav-link">登出</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="collapse adminnavbar_collapse mask adminnavbar_mask"/>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    setAdminNavbar() {
      if (document.body.clientWidth < 768) {
        document.querySelector('.adminnavbar_toggler').click();
      }
    },
    signout() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      this.axios.post(api).then((response) => {
        if (response.data.success === true) {
          vm.$router.push('/login');
        }
      });
    },
  },
  computed: {
    adminActive() {
      return this.$store.state.adminModule.adminActive;
    },
  },
};
</script>

<style>

</style>
