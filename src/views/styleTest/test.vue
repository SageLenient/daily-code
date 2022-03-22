<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-07-30 11:12:44
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-11-24 16:03:26
 * @Description:
-->
<template>
  <div class="test">
    <el-button>测试按钮</el-button>
    <Test-child></Test-child>
  </div>
</template>

<script>
import TestChild from './test-child';

export default {
  name: 'test',

  components: {
    TestChild,
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
  },
};
</script>
