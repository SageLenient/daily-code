<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-10-14 16:23:03
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-11-24 14:44:36
 * @Description: 使用cb-search的demo
-->
<template>
  <div class="CbSearchExample">
    <CbSearch
      v-model="value"
      searchable
      clearable
      @search="search"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @enter="handleEnter"
    >
    </CbSearch>
  </div>
</template>

<script>
import CbSearch from './CbSearch';

export default {
  name: 'CbSearchExample',

  components: {
    CbSearch,
  },

  filters: {
  },

  mixins: [
  ],

  props: {
  },

  data() {
    return {
      value: 'xxx',
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
    search(value) {
      console.log('search', value);
    },
    handleInput(value) {
      console.log('input', value);
    },
    handleBlur(event) {
      console.log('blur', event.target.value);
    },
    handleFocus(event) {
      console.log('focus', event.target.value);
    },
    handleEnter(value) {
      console.log('enter', value);
    },
  },
};
</script>

<style lang="less" scoped>

</style>
