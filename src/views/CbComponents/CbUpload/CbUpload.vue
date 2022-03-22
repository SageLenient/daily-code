<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-10-20 15:20:31
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-11-24 16:10:39
 * @Description: 文件上传组件
-->
<template>
  <div @click="handleClick" class="CbUpload">
    <div
      v-if="drag"
      class="upload-dragger"
      :class="{
        'is-dragover': dragover
      }"
      @drop.prevent="onDrop"
      @dragover.prevent="dragover = true"
      @dragleave.prevent="dragover = false"
    >
      <slot></slot>
    </div>
    <slot v-else></slot>
    <input
      type="file"
      ref="input"
      v-show="!$slots.default"
      :name="name"
      :multiple="multiple"
      @change="handleChange"
    />
  </div>
</template>

<script>
function emptyFn() {}
export default {
  name: 'CbUpload',

  props: {
    limit: Number,
    multiple: Boolean,
    drag: Boolean,
    fileList: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: 'file',
    },
    onExceed: {
      type: Function,
      default: emptyFn,
    },
    startUpload: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      dragover: false,
    };
  },

  methods: {
    handleClick() {
      if (this.$slots.default) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    handleChange(ev) {
      const { files } = ev.target;
      this.handleUpload(files);
    },

    handleUpload(files) {
      if (!files) return;
      this.uploadFiles(files);
    },

    uploadFiles(files) {
      if (this.limit && this.fileList.length + files.length > this.limit) {
        this.onExceed && this.onExceed(files, this.fileList);
        return;
      }
      this.startUpload(files);
    },

    onDrop(e) {
      const { files } = e.dataTransfer;
      this.handleUpload(files);
    },
  },
};
</script>

<style lang="less" scoped>
.CbUpload {
  .upload-dragger {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    width: 200px;
    height: 180px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &.is-dragover {
      background-color:rgba(32, 159, 255, .06);
      border:2px dashed #409EFF;
    }
  }
}
</style>
