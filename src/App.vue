<template>
  <div id="app">
    <msg-modal/>
    <loading :active.sync="loading"/>
    <router-view/>
    <button type="button" class="totop button btn-extra" @click="goToTop()">
      <i class="fas fa-arrow-up"/>
    </button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  created() {
    this.setToTop();
  },
  methods: {
    setToTop() {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          document.querySelector('.totop').style.display = 'inline';
        } else {
          document.querySelector('.totop').style.display = 'none';
        }
      });
    },
    goToTop() {
      const scrollStep = -window.scrollY / (1000 / 5);
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 5);
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';

</style>
