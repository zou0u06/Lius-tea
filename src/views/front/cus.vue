<template>
  <div>
    <cus-navbar/>
    <main class="cus bg-primary">
      <router-view class="container-xl"/>
    </main>
    <cus-footer/>
  </div>
</template>

<script>
import cusNavbar from '../../components/cusNavbar';
import cusFooter from '../../components/cusFooter';

export default {
  components: { cusNavbar, cusFooter },
};
</script>

<style>

</style>
