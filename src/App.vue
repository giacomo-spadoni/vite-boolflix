<script>
// api key: 0a49dcbac60744c975965cc089b51ddf
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import store from './data/store.js';

export default {
  components: {
    AppHeader,
    AppMain,
  },
  data() {
    return {
      store,
    };
  },
  methods: {},
  mounted() {},
};
</script>

<template>
  <div v-show="store.showGlobal" class="global"></div>
  <div class="container">
    <AppHeader />
    <AppMain />
  </div>
</template>

<style scoped>
.global {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.526);
  z-index: 8;
}

.container {
  width: 100%;
  height: 100vh;
  overflow: auto;
}
</style>
