<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-07-07 16:59:53
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-07-07 22:08:33
 * @Description: 编程式插入组件
-->
<template>
  <div class="myMessage" v-if="dialogShow">
    <div class="message-box">
      <h2 class="common-style">编程式插入组件</h2>
      <p class="common-style">{{ content }}</p>
      <div class="common-style">
        <el-button @click="cancelDialog">取消</el-button>
        <el-button @click="confirmDialog">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myMessage',

  props: {
    content: {
      type: String,
      default: '默认内容',
    },
    cancel: {
      type: Function,
      default: () => {},
    },
    confirm: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      dialogShow: true,
    };
  },

  methods: {
    cancelDialog() {
      this.cancel();
      this.dialogShow = false;
    },
    confirmDialog() {
      this.confirm();
      this.dialogShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.myMessage {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #595959;
  .message-box {
    margin-top: 300px;
    .common-style {
      text-align: center;
    }
  }
}
</style>
