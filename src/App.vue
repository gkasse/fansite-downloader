<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import FanboxDownload from './components/FanboxDownload.vue';
import FantiaDownload from './components/FantiaDownload.vue';
import PatreonDownload from './components/PatreonDownload.vue';
</script>

<template>
  <div>
    <FanboxDownload />
  </div>
  <div>
    <FantiaDownload />
  </div>
  <div>
    <PatreonDownload />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
