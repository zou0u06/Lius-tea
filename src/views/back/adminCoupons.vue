<template>
  <div>
    <h3 class="admin-title">優惠券列表</h3>
    <div class="text-right mb-3 mr-3">
      <button type="button" class="btn btn-primary" @click="openCouponModal()">建立新的優惠券</button>
    </div>
    <div class="table-responsive mb-3">
      <table class="table text-center">
        <thead>
          <tr>
            <th class="admin-name">優惠券名稱</th>
            <th class="admincoupons-discount">折扣百分比</th>
            <th class="admin-date">到期日</th>
            <th class="admincoupons-code">使用代碼</th>
            <th class="admin-enabled">是否啟用</th>
            <th class="admin-edition">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="adminCoupon in adminCoupons" :key="adminCoupon.id">
            <td>{{ adminCoupon.title }}</td>
            <td>{{ adminCoupon.percent }}%</td>
            <td>{{ adminCoupon.due_date|displayDate }}</td>
            <td>{{ adminCoupon.code }}</td>
            <td>
              <span v-if="adminCoupon.is_enabled === 1" class="text-secondary">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(adminCoupon)"
              >編輯</button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelCModal(adminCoupon)"
              >刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :pagination="pagination" @click-page="getAdminCoupons" class="ml-3"/>
    <!-- coupon Modal -->
    <div class="modal fade" id="couponModal" data-backdrop="static" data-keyboard="false"
      tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="addition">新增優惠券</span>
              <span v-else>編輯優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題"
                    v-model="tempCoupon.title"/>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="percent">折扣百分比</label>
                    <input type="number" class="form-control" id="percent"
                      v-model="tempCoupon.percent" placeholder="請輸入折扣百分比" />
                  </div>
                  <div class="form-group col-md-6">
                    <label>到期日</label>
                    <input class="form-control" id="cdd" @focus="pickDate" placeholder="請輸入到期日"
                      :value="tempCoupon.due_date|displayDate"/>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="code">使用代碼</label>
                    <input type="text" class="form-control" id="code"
                      v-model="tempCoupon.code" placeholder="請輸入使用代碼" />
                  </div>
                </div>

                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_enabled"
                      :true-value=1 :false-value=0 v-model="tempCoupon.is_enabled"/>
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-black" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="uploadCoupon">確認</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tempCoupon: {},
      addition: false,
    };
  },
  computed: {
    adminCoupons() {
      return this.$store.state.adminModule.adminCoupons;
    },
    pagination() {
      return this.$store.state.adminModule.pagination;
    },
  },
  created() {
    this.getAdminCoupons();
    this.$store.commit('SET_ADMINACTIVE', 'AdminCoupons');
  },
  methods: {
    getAdminCoupons(page) {
      this.$store.dispatch('getAdminCoupons', page);
    },
    openCouponModal(adminCoupon) {
      if (adminCoupon) {
        this.tempCoupon = { ...adminCoupon };
        this.addition = false;
      } else {
        this.tempCoupon = {};
        this.addition = true;
      }
      $('#couponModal').modal('show');
    },
    pickDate() {
      const fp = flatpickr('#cdd', {});
      this.tempCoupon.due_date = Date.parse(fp.selectedDates[0]) / 1000;
    },
    uploadCoupon() {
      const vm = this;
      if (vm.addition) {
        const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
        vm.axios.post(API, { data: vm.tempCoupon }).then((response) => {
          if (response.data.success) {
            $('#couponModal').modal('hide');
            vm.getAdminCoupons();
          }
        });
      } else {
        const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        vm.axios.put(API, { data: vm.tempCoupon }).then((response) => {
          if (response.data.success) {
            $('#couponModal').modal('hide');
            vm.getAdminCoupons();
          }
        });
      }
    },
    openDelCModal(adminCoupon) {
      this.$store.commit('SET_MSG', {
        event: 'delAdminCoupon',
        object: adminCoupon.title,
        objectId: adminCoupon.id,
      });
    },
  },
};
</script>

<style scope>
</style>
