<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-07-30 13:36:28
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-07-30 13:51:29
 * @Description:
-->
<template>
  <div
    :class="{
      'el-button--default': isName,
    }"
    @click="isName = !isName">
    <p>啊?</p>
  </div>
</template>

<script>
export default {
  name: 'test-child',

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
      isName: false,
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
