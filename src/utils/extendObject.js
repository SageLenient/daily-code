/*
 * @Author: Yanzhao.Zhang
 * @Date: 2021-07-26 21:51:42
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-09-22 15:07:16
 * @Description: 替换$.extend方法
 */
import Vue from 'vue';
import _mergeWith from 'lodash/mergeWith';

function extendObject(...args) {
  const { length } = args;
  let i = 1;
  const newArguments = [];
  // 是否深拷贝
  let deep = false;
  // 合并目标对象
  let target = args[0];
  // 第一个值为布尔值代表是否深拷贝
  if (typeof target === 'boolean') {
    deep = target;
    target = args[1] || {};
    i = 2;
  }
  // 兼容处理
  if (typeof target !== 'object' && target !== 'function') {
    target = {};
  }
  // 如果只有一个对象，直接返回
  if (length === i) {
    return target;
  }
  // 给予一个新的接受参数的对象
  for (i; i < length; i++) {
    newArguments.push(args[i]);
  }
  // 深浅拷贝的不同处理
  if (deep) {
    _mergeWith(target, ...newArguments, (objValue, srcValue, key, object) => {
      if (!Object.keys(object).includes(key) || Array.isArray(object)) {
        Vue.set(object, key);
      }
    });
  } else {
    target = Object.assign({}, target, ...newArguments);
  }
}

export default extendObject;
