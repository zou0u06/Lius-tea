<template>
  <div>
    <admin-navbar/>
    <main class="container-xl admin px-0 px-md-3">
      <router-view/>
    </main>
  </div>
</template>

<script>
import adminNavbar from '../adminNavbar';

export default {
  components: { adminNavbar },
  created() {
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    this.axios.defaults.headers.common.Authorization = myCookie;
  },
};
</script>

<style>
</style>
