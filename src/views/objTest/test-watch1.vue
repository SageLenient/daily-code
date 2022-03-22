<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-05-19 16:11:12
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-05-19 18:15:37
 * @Description:
-->
<template>
  <div class="test-watch1">
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'test-watch1',

  components: {
  },

  filters: {
  },

  mixins: [
  ],

  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
    };
  },

  computed: {
  },

  watch: {
    'data.c': {
      handler() {
        console.log('c have been changed');
      },
      deep: true,
    },
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
