<script>
import { searchMovies, searchTv } from '../data/store.js';
import store from '../data/store.js';
export default {
  data() {
    return {
      store,
      search: '',
    };
  },
  methods: {
    searchMovies() {
      this.store.searched = this.search;
      console.log('ur searched movies is: ' + this.store.searched);
      searchMovies();
      searchTv();
    },
  },
  mounted() {},
};
</script>

<template>
  <section>
    <div class="title">BoolFlix</div>
    <div>
      <input v-model="search" type="text" />
      <button @click="searchMovies()">cerca</button>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: space-between;
  width: 1600px;
  margin: 0 auto;
}

.title {
  color: red;
  font-size: 40px;
  font-weight: bold;
}
</style>
