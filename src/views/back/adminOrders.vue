<template>
  <div>
    <h3 class="admin-title">訂單列表</h3>
    <div class="table-responsive mb-3">
      <table class="table">
        <thead>
          <tr class="text-center">
            <th class="admin-date">購買時間</th>
            <th class="adminorders-email">Email</th>
            <th class="adminorders-bought">購買品項</th>
            <th class="adminorders-total">應付金額</th>
            <th class="adminorders-paid">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="adminOrder in adminOrders" :key="adminOrder.id">
            <td class="text-center">{{ adminOrder.create_at|displayDate }}</td>
            <td class="text-center">{{ adminOrder.user.email }}</td>
            <td class="text-center">
              <div v-for="it in adminOrder.products" :key="it.id">
                {{ it.product.title }} {{ it.qty }} {{ it.product.unit }}</div>
            </td>
            <td class="text-right">{{ adminOrder.total|displayCurrency }}</td>
            <td class="text-center">
              <span v-if="adminOrder.is_paid === true" class="text-secondary">已付款</span>
              <span v-else>未付款</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :pagination="pagination" @click-page="getAdminOrders" class="ml-3"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminOrders: [],
      pagination: {},
    };
  },
  created() {
    this.getAdminOrders();
    this.$store.commit('SET_ADMINACTIVE', 'AdminOrders');
  },
  methods: {
    getAdminOrders(page = 1) {
      const vm = this;
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      vm.$store.commit('SET_LOADING', true);
      vm.axios.get(API).then((response) => {
        if (response.data.success) {
          vm.adminOrders = response.data.orders;
          vm.pagination = response.data.pagination;
          vm.$store.commit('SET_LOADING', false);
        }
        vm.$store.commit('SET_LOADING', false);
      });
    },
  },
};
</script>

<style scope>

</style>
