<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-11-29 10:33:02
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-11-29 20:08:52
 * @Description: 加载更多组件demo
-->
<template>
  <div class="CbLoadMoreExample">
    <CbLoadMore
      :showList="showList"
      :showLoad="showLoad"
      :loading="loading"
      :height="117"
      @loadAll="loadAll"
      @loadMore="loadMore">
      <template v-slot:showList="{ data }">
        <p class="show-content">
          {{ data.value }}
        </p>
      </template>
    </CbLoadMore>
  </div>
</template>

<script>
import CbLoadMore from './CbLoadMore';

export default {
  name: 'CbLoadMoreExample',

  components: {
    CbLoadMore,
  },

  filters: {
  },

  mixins: [
  ],

  props: {
  },

  data() {
    return {
      showList: [
      ],
      showLoad: true,
      limit: 1,
      loading: false,
    };
  },

  computed: {
  },

  watch: {
  },

  created() {
    setTimeout(() => {
      this.showList = [
        {
          value: '啊这？？',
        },
        {
          value: '不知道啊',
        },
        {
          value: '别来问我',
        },
      ];
    }, 1000);
  },

  mounted() {
  },

  methods: {
    loadAll() {
      this.showLoad = false;
    },
    loadMore(currentList) {
      this.loading = true;
      console.log(currentList);
      setTimeout(() => {
        this.limit++;
        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.CbLoadMoreExample {
  .show-content {
    margin: 0;
    padding: 9px;
    line-height: 20px;
    border: 1px solid #eee;
    border-bottom: none;
  }
  .li-limit p:last-child {
    border-bottom: 1px solid #eee;
  }
}
</style>
