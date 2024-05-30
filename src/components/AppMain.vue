<script>
import { fetchPopularMovies, searchMovies } from '../data/store.js';
import store from '../data/store.js';
import Movie from './Movie.vue';
export default {
  components: {
    Movie,
  },
  data() {
    return {
      store,
    };
  },
  methods: {},
  computed: {
    filmShow() {
      return this.store.searchedMovies.length
        ? this.store.searchedMovies
        : this.store.popular;
    },
  },
  mounted() {
    fetchPopularMovies();
  },
};
</script>

<template>
  <section class="container">
    <Movie v-for="(movie, i) in filmShow" :data="movie" />
  </section>
</template>

<style scoped>
.container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
