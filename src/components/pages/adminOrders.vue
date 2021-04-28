<template>
  <div>
    <h3 class="admin_title">訂單列表</h3>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr class="text-center">
            <th class="admin_date">購買時間</th>
            <th class="adminorders_email">Email</th>
            <th class="adminorders_bought">購買品項</th>
            <th class="adminorders_total">應付金額</th>
            <th class="adminorders_paid">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td class="text-center">{{ $displayDate(item.create_at) }}</td>
            <td class="text-center">{{ item.user.email }}</td>
            <td class="text-center">
              <div v-for="it in item.products" :key="it.id">
                {{ it.product.title }} {{ it.qty }} {{ it.product.unit }}</div>
            </td>
            <td class="text-right">{{ $displayCurrency(item.total) }}</td>
            <td class="text-center">
              <span v-if="item.is_paid === true" class="text-success">已付款</span>
              <span v-else>未付款</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :pagination="pagination" @click-page="getOrders" class="ml-3"/>
  </div>
</template>

<script>
import pagination from '../pagination';

export default {
  components: { pagination },
  data() {
    return {
      orders: [],
      pagination: {},
    };
  },
  methods: {
    getOrders(page = 1) {
      const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.$store.commit('SET_LOADING', true);
      vm.axios.get(API).then((response) => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.$store.commit('SET_LOADING', false);
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

<style scope>

</style>
