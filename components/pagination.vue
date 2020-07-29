<template>
  <div>
    <div
      class="pagination"
    >
      <div v-for="page in pages"
          :key="page"
          @click="pageClick(page)">
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      users_data: {
        type: Array,
        default: () => {
          return []
        }
      },

    },

    data() {
      return {
        limit: 10,
        currentPage: 1
      }
    },

    computed: {
      pages() {
        return Math.ceil(this.users_data.length / this.limit)
      },

      paginatedUsers() {
        let from = (this.currentPage - 1) * this.limit
        let to = from + this.limit
        return this.users_data.slice(from, to)
      }
    },

    methods: {
      pageClick(page) {
        return this.currentPage = page
      },
    }
  }
</script>

<style scoped>
  .pagination {
    display: inline-flex;
    cursor: pointer;
  }

  .pagination div.active {
    background-color: #4CAF50;
    color: white;
  }
  .pagination div {
    padding: 15px;
  }

  .pagination div:hover:not(.active) {
    background-color: #ddd;
  }
</style>
