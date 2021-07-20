<template>
  <div>
    <h3 class="admin-title">產品列表</h3>
    <div class="text-right mb-3 mr-3">
      <button
        type="button"
        class="btn btn-primary"
        @click="openAdminProductsModel()"
      >建立新的商品</button>
    </div>
    <div class="table-responsive mb-3">
      <table class="table">
        <thead>
          <tr class="text-center">
            <th class="adminproducts-cat">分類</th>
            <th class="admin-name">商品名稱</th>
            <th class="adminproducts-oriprice">原價</th>
            <th class="adminproducts-price">售價</th>
            <th class="admin-enabled">是否啟用</th>
            <th class="admin-edition">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="adminProduct in adminProducts"
            :key="adminProduct.id"
          >
            <td class="text-center">{{ adminProduct.category }}</td>
            <td class="text-center">{{ adminProduct.title }}</td>
            <td class="adminproducts-oriprice text-right">
              {{ adminProduct.origin_price|displayCurrency }}
            </td>
            <td class="text-right">{{ adminProduct.price|displayCurrency }}</td>
            <td class="text-center">
              <span
                v-if="adminProduct.is_enabled === 1"
                class="text-secondary"
              >啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td class="text-center">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openAdminProductsModel(adminProduct)"
              >編輯</button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelModal(adminProduct)"
              >刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination
      :pagination="pagination"
      class="ml-3"
      @click-page="getAdminProducts"
    />
    <!-- adminProducts Modal -->
    <div
      id="adminProductsModel"
      class="modal fade"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-lg"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span v-if="addition">新增商品</span>
              <span v-else>編輯商品</span>
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
            <div class="row">
              <!-- 上傳圖片欄位 -->
              <div class="col-sm-5 mb-3">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    class="form-control"
                    placeholder="請輸入網址"
                  />
                </div>
                <div class="form-group">
                  <label for="adminProductsPic">
                    或上傳圖片（3MB內）
                    <i
                      v-if="picUploading"
                      class="fas fa-spinner fa-spin"
                    />
                  </label>
                  <input
                    type="file"
                    id="adminProductsPic"
                    ref="files"
                    class="form-control"
                    @change="uploadPic"
                  />
                </div>
                <div
                  v-if="picErrorMsg"
                  class="border border-danger p-3 text-center"
                >圖片檔案過大或格式錯誤，請重新上傳</div>
                <img
                  v-else
                  alt
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                />
              </div>

              <div class="col-sm-7">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    id="title"
                    v-model="tempProduct.title"
                    class="form-control"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-sm-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      id="category"
                      v-model="tempProduct.category"
                      class="form-control"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-sm-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      id="unit"
                      v-model="tempProduct.unit"
                      class="form-control"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-sm-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      class="form-control"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-sm-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      id="price"
                      v-model="tempProduct.price"
                      class="form-control"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">商品簡述</label>
                  <textarea
                    type="text"
                    id="description"
                    v-model="tempProduct.description"
                    class="form-control"
                    placeholder="請輸入商品簡述"
                  />
                </div>
                <div class="form-group">
                  <label for="content">商品說明</label>
                  <textarea
                    type="text"
                    id="content"
                    v-model="tempProduct.content"
                    class="form-control"
                    placeholder="請輸入商品說明"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      class="form-check-input"
                      :true-value=1
                      :false-value=0
                    />
                    <label
                      for="is_enabled"
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
              @click="uploadProduct"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: { Pagination },
  data() {
    return {
      tempProduct: {},
      addition: false,
      picUploading: false,
      picErrorMsg: false,
    };
  },
  computed: {
    adminProducts() {
      return this.$store.state.adminModule.adminProducts;
    },
    pagination() {
      return this.$store.state.adminModule.pagination;
    },
  },
  created() {
    this.getAdminProducts();
    this.$store.commit('SET_ADMINACTIVE', 'AdminProducts');
  },
  methods: {
    getAdminProducts(page) {
      this.$store.dispatch('getAdminProducts', page);
    },
    openAdminProductsModel(adminProduct) {
      if (adminProduct) {
        this.tempProduct = { ...adminProduct };
        this.addition = false;
      } else {
        this.tempProduct = {};
        this.addition = true;
      }
      $('#adminProductsModel').modal('show');
    },
    uploadProduct() {
      const vm = this;
      if (vm.addition) {
        const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
        vm.axios.post(API, { data: vm.tempProduct }).then((response) => {
          if (response.data.success) {
            this.clearPic();
            $('#adminProductsModel').modal('hide');
            vm.getAdminProducts();
          }
        });
      } else {
        const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        vm.axios.put(API, { data: vm.tempProduct }).then((response) => {
          if (response.data.success) {
            this.clearPic();
            $('#adminProductsModel').modal('hide');
            vm.getAdminProducts();
          }
        });
      }
    },
    uploadPic() {
      const vm = this;
      const API = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.picUploading = true;
      const formData = new FormData();
      formData.append('file-to-upload', vm.$refs.files.files[0]);
      vm.axios.post(API, formData, {
        Headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        if (response.data.success) {
          vm.picUploading = false;
          vm.picErrorMsg = false;
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
        } else {
          vm.picUploading = false;
          vm.picErrorMsg = true;
        }
      });
    },
    clearPic() {
      const adminProductsPic = document.getElementById('adminProductsPic');
      // eslint-disable-next-line no-self-assign
      adminProductsPic.outerHTML = adminProductsPic.outerHTML;
    },
    openDelModal(adminProduct) {
      this.$store.commit('SET_MSG', {
        event: 'delAdminProduct',
        object: adminProduct.title,
        objectId: adminProduct.id,
      });
    },
  },
};
</script>

<style scope>

</style>
