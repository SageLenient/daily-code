/*
 * @Author: Yanzhao.Zhang
 * @Date: 2021-07-07 17:27:32
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-01-26 11:16:33
 * @Description: 路由
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/indexDb',
    name: 'indexDb',
    component: () => import('@/views/indexDb/indexDB.vue'),
  },
  {
    path: '/obj-observe',
    name: 'obj-observe',
    component: () => import('@/views/objTest/obj-observe.vue'),
  },
  {
    path: '/myMessage',
    name: 'myMessage',
    component: () => import('@/views/extend/index.vue'),
  },
  {
    path: '/style-test',
    name: 'styleTest',
    component: () => import('@/views/styleTest/index.vue'),
  },
  {
    path: '/routerTest',
    name: 'routerTest',
    component: () => import('@/views/routerTest/index.vue'),
    children: [
      {
        path: 'routerTest1',
        name: 'routerTest1',
        component: () => import('@/views/routerTest/routerTest1.vue'),
      },
      {
        path: 'routerTest2',
        name: 'routerTest2',
        component: () => import('@/views/routerTest/routerTest2.vue'),
      },
    ],
  },
  {
    path: '/3D',
    name: '3D',
    component: () => import('@/views/3D/index.vue'),
    children: [
      {
        path: 'sprite',
        name: 'sprite',
        component: () => import('@/views/3D/components/sprite.vue'),
      },
      {
        path: 'modal',
        name: 'modal',
        component: () => import('@/views/3D/components/modal.vue'),
      },
      {
        path: 'gtfModal',
        name: 'gtfModal',
        component: () => import('@/views/3D/components/gtfModal.vue'),
      },
      {
        path: 'virtualHuman',
        name: 'virtualHuman',
        component: () => import('@/views/3D/components/virtualHuman.vue'),
      },
    ],
  },
  {
    path: '/myCss',
    name: 'myCss',
    component: () => import('@/views/myCss/index.vue'),
  },
  {
    path: '/countdown',
    name: 'countdown',
    component: () => import('@/views/countdown/index.vue'),
  },
  {
    path: '/errorLog',
    name: 'errorLog',
    component: () => import('@/views/errorLog/index.vue'),
  },
  {
    path: '/CbSearch',
    name: 'CbSearch',
    component: () => import('@/views/CbComponents/CbSearch/CbSearchExample.vue'),
  },
  {
    path: '/CbUpload',
    name: 'CbUpload',
    component: () => import('@/views/CbComponents/CbUpload/CbUploadExample.vue'),
  },
  {
    path: '/CbSticky',
    name: 'CbSticky',
    component: () => import('@/views/CbComponents/CbSticky/CbStickyExample.vue'),
  },
  {
    path: '/CbLoadMore',
    name: 'CbLoadMore',
    component: () => import('@/views/CbComponents/CbLoadMore/CbLoadMoreExample.vue'),
  },
  {
    path: '/CbTransfer',
    name: 'CbTransfer',
    component: () => import('@/views/CbComponents/CbTransfer/CbTransferExample.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
