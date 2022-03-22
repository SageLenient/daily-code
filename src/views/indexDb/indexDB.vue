<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-06-05 15:45:58
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-07-15 20:13:30
 * @Description: indexDB
-->
<template>
  <div class="indexDB">
    <h2>indexDB的使用</h2>
    <input v-model="name">
    <br>
    <br>
    <button @click="addPerson">增加</button>
    <br>
    <br>
    <button @click="removePerson">删除</button>
    <br>
    <br>
    <button @click="searchPerson">查询</button>
    <br>
    <br>
    <button @click="updatePerson">修改</button>
    <br>
    <br>
    <button @click="searchAll">游标</button>

    <div v-for="person in personList" :key="person.id">
      姓名：{{ person.name }}
      年龄：{{ person.age }}
      邮箱：{{ person.email }}
    </div>
  </div>
</template>

<script>
import myObject from '../objTest/myData.js';

export default {
  name: 'indexDB',

  components: {
  },

  filters: {
  },

  mixins: [
  ],

  props: {
  },

  data() {
    return {
      id: 1,
      name: '',
      // 查询的key值
      personList: [],
      keyList: [],
      myObject: myObject.myObject,
    };
  },

  computed: {
  },

  watch: {
    myObject: {
      handler() {
        // console.log('myObject的age', val.age)
      },
      deep: true,
      immediate: true,
    },
  },

  created() {
    const request = window.indexedDB.open('mySage');

    request.onerror = (err) => {
      console.log('数据库打开错误', err);
    };

    request.onsuccess = () => {
      this.db = request.result;
      console.log('数据库打开成功', this.db);
    };

    request.onupgradeneeded = function ({ target: { result } }) {
      console.log('数据库升级', result);
      this.db = result;
      let objStore;
      // Node.contains()返回的是一个boolean，来表示传入的节点是否为该节点的后代节点。
      // 判断是否有person对象仓库 若没有则新建一个对象仓库(即新建表)
      if (!this.db.objectStoreNames.contains('person')) {
        /**
         * 新建person表 主键(key)是默认建立的索引，比如下面我们使用id做为主键
         * @param name: string
         * @param optionalParameters?: IDBIndexParameters
         * keyPath
         * autoIncrement
        */
        objStore = this.db.createObjectStore('person', { keyPath: 'id' });
        /**
         * 创建索引 用于快速检索
         * @param name: string
         * @param keyPath: string | string[]
         * @param optionalParameters?: IDBIndexParameters
        */
        objStore.createIndex('nameIndex', 'name', { unique: false });
      }
      // if (!this.db.objectStoreNames.contains('noKey')) {
      //   objStore = this.db.createObjectStore('noKey')
      //   objStore.createIndex('nameIndex', 'name', { unique: false })
      // }
      // if (!this.db.objectStoreNames.contains('keyAndAuto')) {
      //   objStore = this.db.createObjectStore('keyAndAuto', {
      //     keyPath: 'id',
      //     autoIncrement: true,
      //   })
      //   objStore.createIndex('nameIndex', 'name', { unique: false })
      // }
    };
  },

  mounted() {
  },

  methods: {
    addPerson() {
      // this.myObject.age = 19;
      const content = this.db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .add({
          id: Date.now(),
          name: this.name,
          age: this.id,
          // eat: 'apple',
          email: `${this.name}@example.com`,
        });
      // 未设立主键添加
      // let noKey = this.db.transaction(['noKey'], 'readwrite')
      //   .objectStore('noKey')
      //   .add('任意类型', Date.now());
      // noKey.onsuccess = (event) => {
      //   console.log('数据写入成功', event)
      // }
      // noKey.onerror = (event) => {
      //   console.log('数据写入失败', event)
      // }
      // // 都已设立
      // let keyAndAuto = this.db.transaction(['keyAndAuto'], 'readwrite')
      //   .objectStore('keyAndAuto')
      //   .add({
      //     id: 1,
      //     other: '其他'
      //   });
      // keyAndAuto.onsuccess = (event) => {
      //   console.log('数据写入成功', event)
      // }
      // keyAndAuto.onerror = (event) => {
      //   console.log('数据写入失败', event)
      // }


      this.id++;
      content.onsuccess = (event) => {
        console.log('数据写入成功', event);
      };

      content.onerror = (event) => {
        console.log('数据写入失败', event);
      };
    },
    removePerson() {
      const request = this.db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .delete(1626351136541);

      request.onsuccess = () => {
        console.log('数据删除成功');
      };

      request.onerror = () => {
        console.log('数据删除失败');
      };
    },
    searchPerson() {
      // 新建查询事务
      const request = this.db.transaction(['person'])
        .objectStore('person')
        // 查询主键是1的
        // .get(1)
        // 通过索引查
        .index('nameIndex')
        .get(this.name);

      request.onsuccess = () => {
        if (request.result) {
          console.log('data===', request.result);
        } else {
          console.log('未获得数据记录');
        }
      };

      request.onerror = () => {
        console.log('事务失败');
      };
    },
    updatePerson() {
      const request = this.db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com', sex: 'man' });

      request.onsuccess = () => {
        console.log('数据更新成功');
      };

      request.onerror = () => {
        console.log('数据更新失败');
      };
    },
    searchAll() {
      this.personList = [];
      const nameIndex = this.db.transaction(['person'])
        .objectStore('person')
        .index('nameIndex');
      nameIndex.openCursor().onsuccess = (event) => {
        const person = event.target.result;
        console.log(person);
        if (person) {
          // person.key 是一个 name, 就像 id, 然后 person.value 是整个对象。
          if (person.key === this.name) this.personList.push(person.value);
          person.continue();
        }
      };
      //  匹配所有超过5的，但不包括5
      // IDBKeyRange.lowerBound(5, true)
      // nameIndex.openKeyCursor(IDBKeyRange.lowerBound(5, true)).onsuccess = (event) => {
      //   const person = event.target.result;
      //   console.log(person, 55555555);
      //   if (person) {
      //     // if(person.key === '李四') this.keyList.push(person.primaryKey);
      //     person.continue();
      //   }
      // };
    },
  },
};
</script>

<style lang="less" scoped>

</style>
