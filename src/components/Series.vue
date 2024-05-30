<script>
export default {
  props: ['dataS'],
  data() {
    return {};
  },
  methods: {
    getImage(nomefile) {
      return new URL(`../assets/${nomefile}`, import.meta.url);
    },
    showImage() {
      if (this.dataS.poster_path) {
        return 'https://image.tmdb.org/t/p/w200' + this.dataS.poster_path;
      } else {
        return 'https://c7.alamy.com/compit/mfexxe/foto-non-disponibile-icona-isolati-su-sfondo-bianco-illustrazione-vettoriale-mfexxe.jpg';
      }
    },
  },
  mounted() {
    console.log();
  },
};
</script>

<template>
  <div class="card">
    <div>{{ dataS.name }}</div>
    <img width="200px" :src="showImage()" alt="" />
    <div>{{ dataS.id }}</div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
