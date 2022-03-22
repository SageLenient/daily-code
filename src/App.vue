<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-05-07 10:32:00
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-01-26 20:14:56
 * @Description:
-->
<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  data() {
    return {
    };
  },
  created() {
  },
  methods: {

  },
  components: {
    // HelloWorld
  },
};
</script>

<style>
html, body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
