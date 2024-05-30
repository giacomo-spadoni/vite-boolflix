<script>
import { searchMovies } from '../data/store.js';
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
    },
  },
  mounted() {},
};
</script>

<template>
  <input v-model="search" type="text" />
  <button @click="searchMovies()">cerca</button>
</template>

<style scoped></style>
