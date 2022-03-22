/*
 * @Author: Yanzhao.Zhang
 * @Date: 2021-09-15 16:58:24
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-03-22 23:04:47
 * @Description: axios封装
 */
import axios from 'axios';
import { Message } from 'element-ui'; // 消息组建
import { errorCatch } from '@/utils/monitor';

const _Message = function (params = {}) {
  const _duration = params.duration || 2000;
  params.duration = _duration;
  Message(params);
};

// 创建axios实例
const http = axios.create({
  baseURL: '',
  method: 'post', // 默认 post
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    return config; // 此处切记记得将请求参数return出去
  },
  (error) => {
    // 对请求错误做些什么
    console.log(error);
    Promise.reject(error);
  },
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    if (response) {
      const { data } = response;
      _Message({
        message: data.msg,
        type: 'success',
      });
      return data;
    } else {
      return {};
    }
  },
  (err) => {
    if (err && err.response) {
      _Message({
        message: 'Something Error',
        type: 'error',
      });
    }
    errorCatch(err, 1);
    return Promise.reject(err);
  },
);

export default http;
