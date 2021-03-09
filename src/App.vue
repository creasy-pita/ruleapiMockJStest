<template>
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <apitest></apitest>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import apitest from "./components/apitest";
export default {
  name: 'App',
  components: {
    apitest
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
