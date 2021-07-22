<template>
  <div>
    <h2 class="admin-title">優惠券列表</h2>
    <div class="text-right mb-3 mr-3">
      <button
        type="button"
        class="btn btn-primary"
        @click="openAdminCouponsModal()"
      >建立新的優惠券</button>
    </div>
    <div class="table-responsive mb-3">
      <table class="table text-center">
        <thead>
          <tr>
            <th class="admin-name">優惠券名稱</th>
            <th class="admincoupons-discount">折扣百分比</th>
            <th class="admin-date">到期日</th>
            <th class="admincoupons-code">優惠碼</th>
            <th class="admin-enabled">是否啟用</th>
            <th class="admin-edition">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="adminCoupon in adminCoupons"
            :key="adminCoupon.id"
          >
            <td>{{ adminCoupon.title }}</td>
            <td>{{ adminCoupon.percent }}%</td>
            <td>{{ adminCoupon.due_date|displayDate }}</td>
            <td class="admincoupons-code">{{ adminCoupon.code }}</td>
            <td>
              <span
                v-if="adminCoupon.is_enabled === 1"
                class="text-secondary"
              >啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openAdminCouponsModal(adminCoupon)"
              >編輯</button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelModal(adminCoupon)"
              >刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination
      :pagination="pagination"
      class="ml-3"
      @click-page="getAdminCoupons"
    />
    <!-- adminCoupons Modal -->
    <div
      id="adminCouponsModal"
      class="modal fade"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div
        id="adminCouponsModalDialog"
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span v-if="addition">新增優惠券</span>
              <span v-else>編輯優惠券</span>
            </h5>
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
            <div class="container-fluid">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="adminCouponTitle">標題</label>
                  <input
                    type="text"
                    id="adminCouponTitle"
                    v-model="tempCoupon.title"
                    class="form-control"
                    placeholder="請輸入標題"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="adminCouponPercent">折扣百分比（1-3 位數字）</label>
                  <input
                    type="number"
                    id="adminCouponPercent"
                    v-model="tempCoupon.percent"
                    class="form-control"
                    placeholder="不需輸入百分比符號"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label>到期日（+0800 台北時間）</label>
                  <input
                    type="date"
                    id="cdd"
                    class="form-control"
                    placeholder="請輸入到期日"
                    :value="tempCoupon.due_date|displayDate"
                    @change="pickDate"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="adminCouponCode">使用代碼</label>
                  <input
                    type="text"
                    id="adminCouponCode"
                    v-model="tempCoupon.code"
                    class="form-control"
                    placeholder="請輸入使用代碼"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      id="adminCouponIsEnabled"
                      v-model="tempCoupon.is_enabled"
                      class="form-check-input"
                      :true-value=1
                      :false-value=0
                    />
                    <label
                      for="adminCouponIsEnabled"
                      class="form-check-label"
                    >是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-black"
              data-dismiss="modal"
            >取消</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="uploadCoupon"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global flatpickr, $ */
import Pagination from '@/components/Pagination.vue';

export default {
  components: { Pagination },
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
    openAdminCouponsModal(adminCoupon) {
      if (adminCoupon) {
        this.tempCoupon = { ...adminCoupon };
        this.addition = false;
      } else {
        this.tempCoupon = {};
        this.addition = true;
      }
      $('#adminCouponsModal').modal('show');
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
            $('#adminCouponsModal').modal('hide');
            vm.getAdminCoupons();
          }
        }).catch((error) => {
          if (error) {
            vm.$store.commit('SET_MSG', { event: 'adminServerError' });
          }
        });
      } else {
        const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        vm.axios.put(API, { data: vm.tempCoupon }).then((response) => {
          if (response.data.success) {
            $('#adminCouponsModal').modal('hide');
            vm.getAdminCoupons();
          }
        }).catch((error) => {
          if (error) {
            vm.$store.commit('SET_MSG', { event: 'adminServerError' });
          }
        });
      }
    },
    openDelModal(adminCoupon) {
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
