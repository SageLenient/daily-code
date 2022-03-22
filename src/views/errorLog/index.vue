<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-09-15 17:16:07
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-10-21 19:40:58
 * @Description: 发送错误测试
-->
<template>
  <div class="index">
    <el-button @click="addVueError" v-dataBury="{bury: '埋点数据'}">
      添加VUE错误数据
    </el-button>
    <br>
    <br>
    <el-button @click="addPromiseError">
      添加Promise错误数据
    </el-button>
    <br>
    <br>
    <el-button @click="addFetchError">
      添加Promise请求错误数据
    </el-button>
    <br>
    <br>
    <el-button @click="addJsError">
      添加Js错误数据
    </el-button>
  </div>
</template>

<script>
import { errorUrl } from '@/api';

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
    // Vue的报错
    addVueError() {
      console.log(this.my.ok);
    },

    // 未被catch的promise 错误
    addPromiseError() {
      this.PromiseError().then((res) => {
        console.log(res.xxx);
      });
    },

    PromiseError() {
      return new Promise((resolve) => {
        resolve();
      });
    },

    // Js错误
    addJsError() {
      setTimeout((a) => {
        console.log(a.b);
      });
    },

    // 未被catch的请求错误
    addFetchError() {
      errorUrl({});
    },
  },
};
</script>

<style lang="less" scoped>

</style>
