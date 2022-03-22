<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-05-19 16:11:12
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-05-19 18:03:21
 * @Description:
-->
<template>
  <div class="test-watch">
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'test-watch',

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
    'data.a': {
      handler() {
        console.log('a have been changed');
      },
      // deep: true
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
