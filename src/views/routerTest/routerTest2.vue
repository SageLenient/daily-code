<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-08-24 19:37:16
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-08-24 20:41:48
 * @Description:
-->
<template>
  <div class="routerTest2">
    routerTest2
    <br>
    <br>
    <el-button @click="jumpTo">jumpTo routerTest1</el-button>
  </div>
</template>

<script>
export default {
  name: 'routerTest2',

  components: {
  },

  filters: {
  },

  mixins: [
  ],

  props: {
  },

  data() {
    return {
    };
  },

  computed: {
  },

  watch: {
  },

  created() {
    console.log('routerTest2 created');
  },

  mounted() {
  },

  activated() {
    console.log('routerTest2 activated');
  },

  methods: {
    jumpTo() {
      this.$router.push({ name: 'routerTest1' });
    },
  },
};
</script>

<style scoped>

</style>
