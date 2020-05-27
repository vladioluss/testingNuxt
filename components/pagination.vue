<template>
  <div class="pagination">
    <a >&laquo;</a>
    <a >1</a>
    <a class="active">2</a>
    <a >3</a>
    <a >&raquo;</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //
      }
    },

    methods: {




    }
  }
</script>

<style scoped>
  .pagination {
    display: inline-block;
  }

  .pagination a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
  }

  .pagination a.active {
    background-color: #4CAF50;
    color: white;
  }

  .pagination a:hover:not(.active) {
    background-color: #ddd;
  }
</style>
