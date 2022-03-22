<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-11-24 14:40:39
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-11-24 21:42:32
 * @Description: 粘性组件demo
-->
<template>
  <div class="CbStickyExample">
    <CbSticky top="20px" left="20px">
      <CbUploadExample></CbUploadExample>
    </CbSticky>
  </div>
</template>

<script>
import CbSticky from './CbSticky';
import CbUploadExample from '../CbUpload/CbUploadExample.vue';

export default {
  name: 'CbStickyExample',

  components: {
    CbSticky,
    CbUploadExample,
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

<style lang="less" scoped>
.CbStickyExample {
  height: 4000px;
  padding: 10px;
}
</style>
