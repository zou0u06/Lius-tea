<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="sidebar-sticky pt-3">
      <h4
        class="d-flex align-items-center px-3 my-2 text-muted">
        管理介面
      </h4>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link to="/admin" class="nav-link">
            <i class="fas mr-2 fa-box-open"></i>
            產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/orders" class="nav-link">
            <i class="fas mr-2 fa-truck-loading"></i>
            訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupons" class="nav-link">
            <i class="fas mr-2 fa-ticket-alt"></i>
            優惠券列表
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>
