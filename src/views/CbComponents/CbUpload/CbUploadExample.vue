<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-10-20 16:57:03
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-11-24 14:44:57
 * @Description: 文件上传demo
-->
<template>
  <div class="CbUploadExample">
    <CbUpload
      multiple
      :drag="true"
      :limit="2"
      :fileList="fileList"
      :onExceed="onExceed"
      :startUpload="startUpload">
      <button>上传文件</button>
    </CbUpload>
    <h5>文件列表：</h5>
    <div class="img-show"
      v-for="(img, index) in fileList"
      :key="index">
      <p>{{ img.name }}</p>
    </div>
  </div>
</template>

<script>
import CbUpload from './CbUpload';

export default {
  name: 'CbUploadExample',

  components: {
    CbUpload,
  },

  data() {
    return {
      fileList: [
        {
          name: '1.jpg',
          url: '/1.jpg',
        },
      ],
    };
  },

  methods: {
    // 超出限制逻辑
    onExceed(files, fileList) {
      console.log('超出限制', files, fileList);
    },
    // 上传接口逻辑
    startUpload(files) {
      console.log('开始上传', files);
      this.fileList.push(...files);
    },
  },
};
</script>

<style lang="less" scoped>
.CbUploadExample {
  width: 100px;
  button {
    margin-top: 68px;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: .1s;
    font-weight: 500;
  }
  .img-show {
    margin-top: 15px;
    width: 100px;
  }
}
</style>
