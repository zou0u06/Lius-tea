<template>
  <div>
    <h3 class="admin_title">優惠券列表</h3>
    <div class="text-right mb-3 mr-3">
      <button class="btn btn-primary" @click="openCouponModal(true)">建立新的優惠券</button>
    </div>
    <div class="table-responsive">
      <table class="table text-center">
        <thead>
          <tr>
            <th class="admin_name">優惠券名稱</th>
            <th class="admincoupons_discount">折扣百分比</th>
            <th class="admin_date">到期日</th>
            <th class="admincoupons_code">使用代碼</th>
            <th class="admin_enabled">是否啟用</th>
            <th class="admin_edition">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon.id">
            <td>{{ coupon.title }}</td>
            <td>{{ coupon.percent }}%</td>
            <td>{{ $displayDate(coupon.due_date) }}</td>
            <td>{{ coupon.code }}</td>
            <td>
              <span v-if="coupon.is_enabled === 1" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, coupon)"
              >編輯</button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDelCModal(coupon)"
              >刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :pagination="pagination" @click-page="getCoupons" class="ml-3"/>
    <!-- coupon Modal -->
    <div class="modal fade" id="couponModal" data-backdrop="static" data-keyboard="false"
      tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增優惠券</span>
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
                      :value="$displayDate(tempCoupon.due_date)"/>
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
import pagination from '../pagination';

export default {
  components: { pagination },
  data() {
    return {
      tempCoupon: {},
      isNew: false,
    };
  },
  methods: {
    getCoupons(page) {
      this.$store.dispatch('getCoupons', page);
    },
    openCouponModal(PMNew, coupon) {
      if (PMNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = { ...coupon };
        this.isNew = false;
      }
      $('#couponModal').modal('show');
    },
    pickDate() {
      const fp = flatpickr('#cdd', {});
      this.tempCoupon.due_date = Date.parse(fp.selectedDates[0]) / 1000;
    },
    uploadCoupon() {
      const vm = this;
      if (vm.isNew) {
        const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
        vm.axios.post(API, { data: vm.tempCoupon }).then((response) => {
          if (response.data.success) {
            $('#couponModal').modal('hide');
            vm.getCoupons();
          }
        });
      } else {
        const API = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        vm.axios.put(API, { data: vm.tempCoupon }).then((response) => {
          if (response.data.success) {
            $('#couponModal').modal('hide');
            vm.getCoupons();
          }
        });
      }
    },
    openDelCModal(coupon) {
      this.$store.commit('SET_MSG', {
        event: 'delAdminCoupon',
        object: coupon.title,
        objectId: coupon.id,
      });
    },
  },
  computed: {
    coupons() {
      return this.$store.state.coupons;
    },
    pagination() {
      return this.$store.state.pagination;
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

<style scope>
</style>
