<script>
export default {
  props: ['data'],
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<template>
  <div class="card">
    <div>{{ data.name }}</div>
    <div>{{ data.title }}</div>
    <!-- <div>{{ data.original_name }}</div>
    <div>{{ data.popularity }}</div> -->
    <div>{{ data.id }}</div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
