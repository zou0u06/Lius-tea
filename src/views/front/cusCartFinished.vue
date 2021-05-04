<template>
  <div class="cuscartfinished_container">
    <div class="py-md-4 row justify-content-center">
      <div class="col-md-8 bg-light p-3 rounded_breakpoint">
        <!-- head -->
        <h2 class="text-center mb-4"><strong>訂購已完成</strong></h2>
        <div class="d-flex justify-content-between mx-auto progress bg-primary mb-5">
          <div class="progress_icon progress_chara1"></div>
          <div class="progress_icon progress_chara2"></div>
          <div class="progress_icon progress_chara3"></div>
        </div>
        <button class="btn btn-secondary d-block w-50 mx-auto mb-5"
        @click.prevent="goToCusProducts()">繼續漫步茶園</button>

        <!-- table of order-->
        <h3 class="mb-3 text-center">已購買商品</h3>
        <table class="table">
          <thead>
            <th>品名</th>
            <th class="text-center cuscartfinished_small">數量</th>
            <th class="text-center cuscartfinished_small">單價</th>
          </thead>
          <tbody>
            <tr v-for="orderedProduct in cusOrder.products" :key="orderedProduct.id">
              <td>{{ orderedProduct.product.title }}</td>
              <td class="text-center">
                {{ orderedProduct.qty }}{{ orderedProduct.product.unit }}</td>
              <td class="text-right">
                {{ $displayCurrency(orderedProduct.final_total) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right"><strong>總計</strong></td>
              <td class="text-right">{{ $displayCurrency(cusOrder.total) }}</td>
            </tr>
          </tfoot>
        </table>

        <!-- table of info -->
        <h3 class="mb-3 text-center">聯絡資訊及付款狀態</h3>
        <table class="table">
          <tbody>
            <tr>
              <th>Email</th>
              <td class="cuscartfinished_large">{{ cusOrder.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ cusOrder.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ cusOrder.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ cusOrder.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!cusOrder.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cusOrderId: '',
      cusOrder: {
        user: {},
      },
    };
  },
  methods: {
    getCusOrder() {
      const vm = this;
      const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.cusOrderId}`;
      vm.axios.get(API).then((response) => {
        if (response.data.success) {
          vm.cusOrder = response.data.order;
        } else {
          vm.$store.commit('SET_MSG', { event: 'wrongServer' });
        }
      });
    },
    goToCusProducts() {
      this.$router.push('/products');
    },
  },
  created() {
    this.cusOrderId = this.$route.params.cusOrderId;
    this.getCusOrder();
  },
};
</script>

<style>
</style>
