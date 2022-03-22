/*
 * @Author: Yanzhao.Zhang
 * @Date: 2021-07-07 21:31:50
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-07-08 09:54:00
 * @Description:
 */
import Vue from 'vue';
import myMessage from './myMessage.vue';

const createComponent = function (options = {}, component) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const Action = Vue.extend(component);
  new Action({
    propsData: options,
  }).$mount(div);
};

export function createMyMessage(options = {}) {
  createComponent(options, myMessage);
}
