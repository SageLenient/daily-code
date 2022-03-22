/*
 * @Author: Yanzhao.Zhang
 * @Date: 2021-05-07 10:32:00
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-01-15 14:15:37
 * @Description:
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
// import { monitorInit } from './utils/monitor'
import { createMyMessage } from './views/extend/extendComponent';
import 'element-ui/lib/theme-chalk/index.css';
import '@/api';
import '@/directives';
import Test from './views/styleTest/test.vue';

Vue.component('Test', Test);

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.$myMessage = createMyMessage;

// monitorInit(Vue)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// 重写原生方法
// const originAddEventListener = EventTarget.prototype.addEventListener;
// EventTarget.prototype.addEventListener = function (type, listener, options) {
//   const wrappedListener = function (...args) {
//     try {
//       return listener.apply(this, args);
//     }
//     catch (err) {
//       console.log(err)
//       throw err;
//     }
//   }
//   return originAddEventListener.call(this, type, wrappedListener, options);
// }
