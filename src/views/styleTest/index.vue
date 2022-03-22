<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-07-30 10:50:48
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-07-30 13:35:02
 * @Description: css样式测试
-->
<template>
  <div class="styleTest">
    <h2>样式是否生效</h2>
    <Test></Test>
    <el-button @click="dialogVisible = true">打开弹窗</el-button>
    <el-button @click="appendToBody = !appendToBody">切换弹窗位置</el-button>
    <br>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-dialog
      title="提示"
      width="30%"
      :append-to-body="appendToBody"
      :visible.sync="dialogVisible">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import Test from './test'
export default {
  name: 'styleTest',

  components: {
    // Test,
  },

  filters: {
  },

  mixins: [
  ],

  props: {
  },

  data() {
    return {
      appendToBody: false,
      dialogVisible: false,
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }, {
        value: '选项3',
        label: '蚵仔煎',
      }, {
        value: '选项4',
        label: '龙须面',
      }, {
        value: '选项5',
        label: '北京烤鸭',
      }],
      value: '',
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
.el-dialog__title {
  color: blue !important;
}
.el-button--default{
  background: red;
}
.el-dialog__body {
  background: red;
}
.el-select {
  margin: 20px;
}

</style>
<style>
.selected {
  background: blue;
}
</style>
