<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-05-19 14:37:20
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-07-21 21:40:38
 * @Description:
-->
<template>
  <div class="testObj">
    <div
      v-for="(item,index) in objArr"
      :key="index">
      <component
        :is="item.com"
        :data="item"
      ></component>
    </div>
  </div>
</template>

<script>
import TestWatch from './test-watch.vue';
import TestWatch1 from './test-watch1.vue';

export default {
  name: 'testObj',

  components: {
    TestWatch,
    TestWatch1,
  },

  filters: {
  },

  mixins: [
  ],

  props: {
    person: {
      type: Object,
      default: () => {},
    },
    objArr: {
      type: Array,
      default: () => ([]),
    },
  },

  data() {
    return {
      name: '张三',
    };
  },

  computed: {

  },

  watch: {
    person: {
      handler() {
        console.log('触发了person监听');
      },
      deep: true,
    },
    'person.obj': {
      handler() {
        console.log('触发了person.obj监听');
      },
    },
    'person.arr': {
      handler() {
        console.log('触发了person.arr监听');
      },
    },
  },

  created() {
  },

  mounted() {
  },

  methods: {
    OK() {
      setTimeout(() => {
        this.name = '李四';
      }, 1000);
      return this.person.name;
    },
  },
};
</script>

<style scoped>

</style>
