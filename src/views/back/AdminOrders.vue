<template>
  <div>
    <h2 class="admin-title">訂單列表</h2>
    <div class="table-responsive mb-3">
      <table class="table">
        <thead>
          <tr class="text-center">
            <th class="admin-date">
              <div>購買</div>時間
            </th>
            <th class="adminorders-email">Email</th>
            <th class="adminorders-bought">購買品項</th>
            <th class="adminorders-total">應付金額</th>
            <th class="adminorders-paid">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="adminOrder in adminOrders"
            :key="adminOrder.id"
          >
            <td class="text-center">{{ adminOrder.create_at|displayDate }}</td>
            <td class="text-center">{{ adminOrder.user.email }}</td>
            <td class="text-center">
              <div
                v-for="it in adminOrder.products"
                :key="it.id"
              >{{ it.product.title }} {{ it.qty }} {{ it.product.unit }}</div>
            </td>
            <td class="text-right">{{ adminOrder.total|displayCurrency }}</td>
            <td class="text-center">
              <span
                v-if="adminOrder.is_paid === true"
                class="text-secondary"
              >已付款</span>
              <span v-else>未付款</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination
      :pagination="pagination"
      class="ml-3"
      @click-page="getAdminOrders"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: { Pagination },
  data() {
    return {};
  },
  created() {
    this.getAdminOrders();
    this.$store.commit('SET_ADMINACTIVE', 'AdminOrders');
  },
  computed: {
    adminOrders() {
      return this.$store.state.adminModule.adminOrders;
    },
    pagination() {
      return this.$store.state.adminModule.pagination;
    },
  },
  methods: {
    getAdminOrders(page) {
      this.$store.dispatch('getAdminOrders', page);
    },
  },
};
</script>

<style scope>
</style>
