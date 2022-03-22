/*
 * @Author: Yanzhao.Zhang
 * @Date: 2021-09-15 16:58:41
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-10-21 16:13:45
 * @Description: 请求路由
 */
import req from '@/axios/index';

export function sendError(data) {
  return req({
    url: 'send/error',
    data,
  });
}
// 不存在错误路径测试
export function errorUrl(params) {
  return req({
    url: 'errorUrl',
    method: 'get',
    params,
  });
}

