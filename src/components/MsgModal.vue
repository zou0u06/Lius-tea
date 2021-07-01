<template>
  <div
    class="modal fade"
    id="msgModel"
    data-backdrop="static"
    data-keyboard="false"
    aria-labelledby="msgModelLabel"
    aria-hidden="true"
  >
    <div
      id="msgModelDialog"
      class="modal-dialog"
    >
      <div class="modal-content">
        <div
          class="modal-header d-flex"
          :class="`bg-${theme}`"
        >
          <h5
            id="msgModelLabel"
            class="modal-title text-white"
          >{{ title }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h6
            v-if="msg.object"
            class="mb-3 line-height-lg"
            :class="`text-${theme}`"
          >{{ msg.object }}</h6>
          <h6
            v-if="action !== ''"
            class="line-height-lg"
          >{{ action }}</h6>
          <div
            v-else
            class="text-center line-height-lg"
          >
            <h6 class="mb-3">為慶祝本茶行開幕九周年</h6>
            <h6>
              只要在結帳時輸入
              <span :class="`text-${theme}`">ninety</span>
              優惠碼即可取得九折優惠！
            </h6>
          </div>
        </div>
        <div class="modal-footer p-1">
          <!-- 依事件不同使用不同的按鍵及動作 -->
          <button
            type="button"
            class="btn btn-outline-dark"
            data-dismiss="modal"
          >關閉</button>
          <button
            type="button"
            v-if="msg.event === 'additionToCusCart'"
            class="btn"
            :class="`btn-${theme}`"
            @click="goToCusCart()"
          >查看購物車</button>
          <button
            type="button"
            v-if="msg.event === 'delCusCart' || msg.event === 'delAdminProduct'
              || msg.event === 'delAdminCoupon'"
            class="btn"
            :class="`btn-${theme}`"
            @click="delObject(msg.objectId)"
          >確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      theme: '',
      action: '',
    };
  },
  computed: {
    msg() {
      return this.$store.state.msg;
    },
  },
  watch: {
    msg: {
      handler() {
        switch (this.msg.event) {
          case 'showingCoupon': {
            this.title = '最新優惠';
            this.theme = 'secondary';
            this.action = '';
            $('#msgModel').modal('show');
            break;
          }
          case 'cusServerError': {
            this.title = '伺服器錯誤';
            this.theme = 'danger';
            this.action = '網站伺服器錯誤，請直接來電洽詢，將有專人為您服務';
            $('#msgModel').modal('show');
            this.dismissWithTiming();
            break;
          }
          case 'adminServerError': {
            this.title = '伺服器錯誤';
            this.theme = 'danger';
            this.action = '網站伺服器錯誤，請洽網路供應商或網站設計者';
            $('#msgModel').modal('show');
            this.dismissWithTiming();
            break;
          }
          case 'additionToCusCart':
            this.title = '商品已加入購物車';
            this.theme = 'secondary';
            this.action = '已加入您的購物車';
            $('#msgModel').modal('show');
            this.dismissWithTiming();
            break;
          case 'subscription':
            this.title = '成功訂閱電子報';
            this.theme = 'secondary';
            this.action = '您已成功訂閱電子報，將會每週獲得新品優惠、品茶知識等資訊';
            $('#msgModel').modal('show');
            break;
          default: {
            this.title = '確認刪除';
            this.theme = 'danger';
            this.action = '確認要刪除以上商品／折價券？';
            $('#msgModel').modal('show');
            break;
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    dismissWithTiming() {
      setTimeout(() => {
        $('#msgModel').modal('hide');
      }, 5000);
    },
    goToCusCart() {
      $('#msgModel').modal('hide');
      this.$router.push('/cart');
    },
    delObject(objectId) {
      const vm = this;
      const tempCusCart = JSON.parse(localStorage.getItem('cusCart')) || [];
      const tempCusCartL = tempCusCart.length;
      let API;
      switch (vm.msg.event) {
        case 'delAdminProduct':
          API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${objectId}`;
          vm.axios.delete(API).then((response) => {
            if (response.data.success) {
              vm.$store.dispatch('getAdminProducts');
              $('#msgModel').modal('hide');
            }
          });
          break;
        case 'delAdminCoupon':
          API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${objectId}`;
          vm.axios.delete(API).then((response) => {
            if (response.data.success) {
              vm.$store.dispatch('getAdminCoupons');
              $('#msgModel').modal('hide');
            }
          });
          break;
        default:
          for (let i = 0; i < tempCusCartL; i++) {
            if (tempCusCart[i].product_id === objectId) {
              tempCusCart.splice(i, 1);
              break;
            }
          }
          localStorage.setItem('cusCart', JSON.stringify(tempCusCart));
          vm.$store.dispatch('getCusCart');
          $('#msgModel').modal('hide');
          break;
      }
    },
  },
};
</script>

<style>
</style>
