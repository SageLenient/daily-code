<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-07-07 22:02:37
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-07-08 09:55:15
 * @Description:
-->
<template>
  <div class="index">
    <el-button @click="createComponent">生成弹窗</el-button>
  </div>
</template>

<script>
export default {
  name: 'index',

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
  },

  mounted() {
  },

  methods: {
    createComponent() {
      this.$myMessage({
        content: '传入的内容',
      });
    },
  },
};
</script>

<style lang="less" scoped>

</style>
