/*
 * @Author: Yanzhao.Zhang
 * @Date: 2021-10-21 18:41:03
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-03-22 23:05:12
 * @Description: 数据埋点
 */
export default {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el, { value: { bury } }) {
    // el.$bury = bury;
    el.buryHandler = () => {
      console.log(bury);
    };
    el.addEventListener('click', el.buryHandler, false);
  },
  unbind(el) {
    el.removeEventListener('click', el.buryHandler, false);
    console.log(el, '元素解绑');
  },
};
