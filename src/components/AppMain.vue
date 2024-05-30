<script>
import { PopularMovies, searchMovies } from '../data/store.js';
import store from '../data/store.js';
import Movie from './Movie.vue';
import Series from './Series.vue';
export default {
  components: {
    Movie,
    Series,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    getImage(nomefile) {
      return new URL(`../assets/${nomefile}`, import.meta.url);
    },
  },
  computed: {
    filmShow() {
      return this.store.searchedMovies.length
        ? this.store.searchedMovies
        : this.store.popular;
    },
    seriesShow() {
      return this.store.searchedTv.length ? this.store.searchedTv : '';
    },
  },
  mounted() {
    PopularMovies();
  },
};
</script>

<template>
  <section class="container">
    <Movie v-for="(movie, i) in filmShow" :dataM="movie" />
    <Series v-for="(series, i) in seriesShow" :dataS="series" />
  </section>
</template>

<style scoped>
.container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
