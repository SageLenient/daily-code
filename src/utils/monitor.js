/*
 * @Author: Yanzhao.Zhang
 * @Date: 2021-09-15 20:11:35
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-03-22 22:10:59
 * @Description: 错误监控
 */
import axios from 'axios';

/**
 * @description:
 * @param {*} error
 * @param {*} type 1: 请求错误 2：默认 3：未被catch的promise 错误 4：控制台的js报错 5：Vue的错误
 * @return {*}
 */
export const errorCatch = function (error, type = 2) {
  if (error) {
    const params = {
      type,
      name: error.name,
      errorMessage: error.url || error.message,
    };
    const url = 'http://localhost:3000/send/error';
    axios.post(url, JSON.stringify(params))
      .catch((err) => {
        console.log(err);
      });
  }
};
export const monitorInit = function (vue) {
  // 未被catch的promise 错误
  window.addEventListener('unhandledrejection', (event) => {
    event.promise.catch((e) => {
      errorCatch(e, 3);
    });
  });

  // vue错误捕获
  vue.config.errorHandler = function (err) {
    errorCatch(err, 5);
  };

  // 控制台的js报错
  window.onerror = function (errorMessage, scriptURI, lineNo, columnNo, error) {
    // 记录堆栈信息
    if (error) {
      error.url = error.stack;
    }
    errorCatch(error, 4);
  };
};
