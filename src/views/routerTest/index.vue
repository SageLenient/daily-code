<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-08-24 19:35:44
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-08-24 20:36:15
 * @Description:
-->
<template>
  <div class="index">
    <keep-alive>
      <router-view :key="111"></router-view>
    </keep-alive>
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
  },
};
</script>

<style scoped>

</style>
