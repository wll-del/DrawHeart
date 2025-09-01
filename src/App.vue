<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
#app {
  /* margin-top: 1vh;
  margin-bottom: 1vh;
  margin-left: 1vw;
  margin-right: 1vw; */
  height: 100vh;
  overflow: hidden;
}
body.no-scroll {
  overflow: hidden;
} 
</style>
