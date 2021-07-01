<template>
  <div>
    <cus-navbar/>
    <main class="cus bg-primary">
      <router-view/>
    </main>
    <cus-footer/>
  </div>
</template>

<script>
import CusNavbar from '@/components/CusNavbar.vue';
import CusFooter from '@/components/CusFooter.vue';

export default {
  components: { CusNavbar, CusFooter },
};
</script>

<style>
</style>
