<template>
  <nav>
    <ul class="pagination">
      <li
        class="page-item rounded-left"
        :class="{'disabled': !pagination.has_pre}"
      >
        <a
          href="#"
          class="page-link"
          @click.prevent="changePage(pagination.current_page - 1)"
        >上一頁</a>
      </li>
      <li
        v-for="page in pagination.total_pages"
        :key="page"
        class="page-item"
        :class="{'active': page === pagination.current_page}">
        <a
          href="#"
          class="page-link"
          @click.prevent="changePage(page)"
        >{{ page }}</a>
      </li>
      <li
        class="page-item rounded-right"
        :class="{'disabled': !pagination.has_next}"
      >
        <a
          href="#"
          class="page-link"
          @click.prevent="changePage(pagination.current_page + 1)"
        >下一頁</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
    },
  },
  methods: {
    changePage(page) {
      this.$emit('click-page', page);
    },
  },
};
</script>

<style>
</style>
