/*
 * @Author: Yanzhao.Zhang
 * @Date: 2021-09-15 17:24:04
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-03-22 22:30:18
 * @Description:
 */
module.exports = {
  // lintOnSave: false,
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3000',
      },
    },
  },
};
