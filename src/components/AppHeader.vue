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
      this.search = '';
    },
  },
  mounted() {},
};
</script>

<template>
  <section>
    <div class="title">BoolFlix</div>
    <div class="container">
      <input @keyup.enter="searchMovies()" v-model="search" type="text" />
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

.container {
  display: flex;
  align-items: center;
}

input {
  display: block;
  margin-top: 1px;
  height: 2rem;
  width: 300px;
  font-size: 1.5rem;
}

button {
  display: block;
  height: 2.5rem;
}
</style>
