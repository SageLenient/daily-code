<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-08-24 19:36:43
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-08-24 20:41:54
 * @Description:
-->
<template>
  <div class="routerTest1">
    routerTest1
    <br>
    <br>
    <el-button @click="jumpTo">jumpTo routerTest2</el-button>
  </div>
</template>

<script>
export default {
  name: 'routerTest1',

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
    console.log('routerTest1 created');
  },

  mounted() {
  },

  activated() {
    console.log('routerTest1 activated');
  },

  methods: {
    jumpTo() {
      this.$router.push({ name: 'routerTest2' });
    },
  },
};
</script>

<style scoped>

</style>
