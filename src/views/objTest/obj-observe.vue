/* eslint-disable no-debugger */
<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-07-07 16:56:17
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-09-22 14:47:01
 * @Description:
-->
<template>
  <div class="obj-observe">
    <p>{{ obj.b || 'ok' }}</p>
      <button @click="lodashAssignObj">点我lodash</button>
      <br>
      <br>
      <button @click="extendObj">点我jquery</button>
      <br>
      <br>
      <button @click="mergeObj">点我merge</button>
      <br>
      <br>
      <!-- <button @click="cloneObj">点我clone</button>
      <br>
      <br> -->
      <button @click="assignObj">点我assign</button>
      <br>
      <br>
      <button @click="rightAssignObj">点我rightAssign</button>
      <br>
      <br>
      <button @click="changeObj">点我changeObj</button>
      <br>
      <br>
      <button @click="setObj">点我$set</button>
      <br>
      <br>
      <button @click="mergeWithObj">点我mergeWith</button>
      <br>
      <br>
      <button @click="extendObjectObj">点我extendObject</button>
      <br>
      <br>
      <button @click="changeWatch">触发监听</button>
      <br>
      <br>
      <test-obj
        :person="person"
        :objArr="person.obj"></test-obj>
      <button @click="changeArr">点我改数组</button>
      <br>
      <br>
      <button @click="changeAge">点我改变age</button>
      <button @click="showAge">点我输出age</button>
      <button @click="() => $router.push('indexDb')">跳转路由</button>
  </div>
</template>

<script>
import _merge from 'lodash/merge';
import _cloneDeep from 'lodash/cloneDeep';
import _assignIn from 'lodash/assignIn';
import _mergeWith from 'lodash/mergeWith';
import $ from 'jquery';
import extendObject from '../../utils/extendObject';
import TestObj from './test-obj.vue';
import myObject from './myData';

export default {
  name: 'obj-observe',
  data() {
    return {
      closeTag: false,
      obj: {
        a: '哦嚯',
      },
      person: {
        name: '名字',
        age: 666,
        arr: [3, 4],
        obj: [
          {
            com: 'test-watch',
            a: [1],
          },
        ],
      },
      age: 666,
      myObject: myObject.myObject,
      watchObj: {
        a: 1,
        b: [{
          c: [1, 2, 3],
        }],
      },
    };
  },

  watch: {
    watchObj: {
      handler(val) {
        console.log(val, 111111);
      },
      deep: true,
    },
  },

  created() {
  },

  methods: {
    lodashAssignObj() {
      _assignIn(this.obj, { b: '来了吗' });
    },
    assignObj() {
      Object.assign(this.obj, { b: '来了吗' });
    },
    rightAssignObj() {
      this.obj = Object.assign({}, this.obj, { b: '来了吗' });
    },
    changeObj() {
      this.obj = { b: '来了吗' };
    },
    extendObj() {
      $.extend(true, this.obj, { b: '来了吗' });
      // let obj1 = { 'a': { z:7777 }, 'b': [2] };
      // $.extend(true, obj1, { 'a': { x: 1111, y: 22222 }, 'b': [2] })
      // console.log(obj1, 1111111111111)
    },
    mergeObj() {
      _merge(this.obj, { b: '来了吗' });
    },
    setObj() {
      this.$set(this.obj, 'b', '来了吗?');
    },
    cloneObj() {
      console.log(_cloneDeep(this.obj), _cloneDeep(this.obj) === this.obj);
    },
    mergeWithObj() {
      _mergeWith(this.obj, { b: '来了吗' }, () => {
      });
      const obj1 = { a: { z: 7777 }, b: [2] };
      _mergeWith(obj1, { a: { x: 1111, y: 22222 }, b: [2] }, () => {
      });
      console.log(obj1, 1111111111111);
      obj1.a.x = 3333;
      console.log(obj1, 1111111111111);
    },
    extendObjectObj() {
      const obj1 = { a: { z: 7777, r: [{ q: 1, w: 2 }] }, b: [2] };
      const obj2 = { a: { x: 1111, y: 22222, r: [{ x: 1 }, { q: 3, w: 4 }] }, b: [2] };
      extendObject(true, obj1, obj2);
      console.log(obj1, 1111111111111);
      obj1.a.r[0].x = 2;
      console.log(obj1, '>>>', obj2);
    },
    changeArr() {
      console.log('arr changing');
      this.age++;
      this.$set(this.person, 'newValue', 111);
      // this.$set(this.person.arr, 0, [1111])
    },
    changeAge() {
      this.myObject.age = 19;
    },
    showAge() {
      console.log(this.myObject.age);
    },
    changeWatch() {
      extendObject(true, this.watchObj, {
        b: [{
          c: [2, 3, 4],
        }],
      });
    },
  },
  components: {
    TestObj,
  },
};
</script>

<style lang="less" scoped>

</style>

