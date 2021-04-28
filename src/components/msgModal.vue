<template>
  <div class="modal fade" id="msg_modal" data-backdrop="static" data-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog" id="modal_dialog">
      <div class="modal-content">
        <div class="modal-header d-flex" :class="`bg-${theme}`">
          <h5 class="modal-title text-white" id="staticBackdropLabel">{{ title }}</h5>
          <button type="button" class="close line_height_large"
            data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h6 class="mb-3" :class="`text-${theme}`" v-if="msg.object">
            {{ msg.object }}</h6>
          <h6 v-if="action !== ''">{{ action }}</h6>
          <div v-else class="text-center">
            <h6 class="mb-3">為慶祝本茶行開幕九周年</h6>
            <h6 class="line_height_large">只要在結帳時輸入
              <span :class="`text-${theme}`"> ninety </span>
              優惠碼即可取得九折優惠！
            </h6>
          </div>
        </div>
        <div class="modal-footer">
          <!-- 依事件不同使用不同的按鍵及動作 -->
          <button type="button" class="btn btn-outline-dark"
            data-dismiss="modal">關閉</button>
          <button type="button" class="btn" :class="`btn-${theme}`"
            @click="goToCusCart()"
            v-if="msg.event === 'addedToCart'">查看購物車</button>
          <button type="button" class="btn" :class="`btn-${theme}`"
            v-if="msg.event === 'delCusCart' || msg.event === 'delAdminProduct'
              || msg.event === 'delAdminCoupon'"
            @click="delObject(msg.objectId)">確認刪除</button>
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
  methods: {
    dismissWithTiming() {
      setTimeout(() => {
        $('#msg_modal').modal('hide');
      }, 5000);
    },
    goToCusCart() {
      $('#msg_modal').modal('hide');
      this.$router.push('/cart');
    },
    delObject(objectId) {
      const vm = this;
      let keyword1;
      let keyword2;
      switch (this.msg.event) {
        default:
          keyword1 = 'cart';
          keyword2 = 'getCart';
          break;
        case 'delAdminProduct':
          keyword1 = 'admin/product';
          keyword2 = 'getProducts';
          break;
        case 'delAdminCoupon':
          keyword1 = 'admin/coupon';
          keyword2 = 'getCoupons';
          break;
      }
      const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/${keyword1}/${objectId}`;
      vm.axios.delete(API).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch(keyword2);
          $('#msg_modal').modal('hide');
        }
      });
    },
  },
  watch: {
    msg: {
      handler() {
        switch (this.msg.event) {
          default: {
            this.title = '確認刪除';
            this.theme = 'danger';
            this.action = '確認要刪除以上商品／折價券？';
            $('#msg_modal').modal('show');
            break;
          }
          case 'showingCoupon': {
            this.title = '最新優惠';
            this.theme = 'secondary';
            this.action = '';
            $('#msg_modal').modal('show');
            break;
          }
          case 'wrongCoupon': {
            this.title = '優惠碼錯誤';
            this.theme = 'danger';
            this.action = '優惠碼錯誤或已過期';
            $('#msg_modal').modal('show');
            this.dismissWithTiming();
            break;
          }
          case 'wrongServer': {
            this.title = '伺服器錯誤';
            this.theme = 'danger';
            this.action = '網站伺服器錯誤，請直接來電洽詢，將有專人為您服務';
            $('#msg_modal').modal('show');
            this.dismissWithTiming();
            break;
          }
          case 'addedToCart':
            this.title = '商品已加入購物車';
            this.theme = 'secondary';
            this.action = '已加入您的購物車';
            $('#msg_modal').modal('show');
            this.dismissWithTiming();
            break;
        }
      },
      deep: true,
    },
  },
  computed: {
    msg() {
      return this.$store.state.msg;
    },
  },
};
</script>

<style>
</style>
