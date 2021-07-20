<template>
  <div class="cuscartfinished">
    <div class="container-xl">
      <div class="py-md-4 row justify-content-center">
        <div class="col-md-8 bg-light p-3 rounded-breakpoint">
          <!-- head -->
          <h2 class="text-center mb-4">
            <strong>訂購已完成</strong>
          </h2>
          <div class="d-flex justify-content-between mx-auto progress bg-primary mb-4">
            <div class="progress-icon progress-chara1"/>
            <div class="progress-icon progress-chara2"/>
            <div class="progress-icon progress-chara3"/>
          </div>
          <button
            type="button"
            class="btn btn-secondary d-block w-50 mx-auto mb-5"
            @click.prevent="goToCusProducts()"
          >繼續漫步茶園</button>

          <!-- table of order-->
          <h3 class="mb-3 text-center">已購買商品</h3>
          <table class="table">
            <thead>
              <th>品名</th>
              <th class="text-center cuscartfinished-cell-sm">數量</th>
              <th class="text-center cuscartfinished-cell-sm">單價</th>
            </thead>
            <tbody>
              <tr
                v-for="orderedProduct in cusOrder.products"
                :key="orderedProduct.id"
              >
                <td>{{ orderedProduct.product.title }}</td>
                <td class="text-center">
                  {{ orderedProduct.qty }}{{ orderedProduct.product.unit }}
                </td>
                <td class="text-right">{{ orderedProduct.final_total|displayCurrency }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td
                  colspan="2"
                  class="text-right"
                >
                  <strong>總計</strong>
                </td>
                <td class="text-right">{{ cusOrder.total|displayCurrency }}</td>
              </tr>
            </tfoot>
          </table>

          <!-- table of info -->
          <h3 class="mb-3 text-center">聯絡資訊及付款狀態</h3>
          <table class="table">
            <tbody>
              <tr>
                <th>Email</th>
                <td class="cuscartfinished-cell-lg">{{ cusOrder.user.email }}</td>
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
                  <span v-else class="text-secondary">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
  created() {
    this.cusOrderId = this.$route.params.cusOrderId;
    this.getCusOrder();
  },
  methods: {
    getCusOrder() {
      const vm = this;
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.cusOrderId}`;
      vm.axios.get(API).then((response) => {
        if (response.data.success) {
          vm.cusOrder = response.data.order;
        } else {
          vm.$store.commit('SET_MSG', { event: 'cusServerError' });
        }
      });
    },
    goToCusProducts() {
      this.$router.push('/products');
    },
  },
};
</script>

<style>
</style>
