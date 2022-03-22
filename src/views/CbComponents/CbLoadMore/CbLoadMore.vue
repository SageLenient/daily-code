<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-11-29 10:32:52
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-11-29 20:10:35
 * @Description: 加载更多组件
-->
<template>
  <div class="CbLoadMore">
    <div
      class="li-limit"
      :class="showLoadMore && height ? 'height-limit' : ''"
      :style="`max-height:${showLoadMore && height ? height + 'px' : 'auto'}`">
      <template v-for="(item, index) in newShowList">
        <slot name="showList" :data="item">
          <div :key="index">
            {{ item }}
          </div>
        </slot>
      </template>
      <div
        class="load-more"
        ref="lll"
        v-if="showLoadMore"
        @click="loadMore">
        <span class="text">
          {{ showText }}
          <i :class="loading ? 'el-icon-loading' : 'el-icon-arrow-down'"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CbLoadMore',

  components: {
  },

  filters: {
  },

  mixins: [
  ],

  props: {
    limit: Number,
    height: Number,
    showList: {
      type: Array,
      default: () => [],
    },
    showLoad: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadMoreText: {
      type: String,
      default: '加载更多',
    },
    loadingText: {
      type: String,
      default: '正在加载',
    },
    // 高度限制才会使用，一次性加载全部
    loadAll: {
      type: String,
      default: '加载全部',
    },
  },

  data() {
    return {
      heightLoad: false,
    };
  },

  computed: {
    newShowList() {
      return this.showList.slice(0, this.limit || this.showList.length);
    },
    showText() {
      if (this.height) {
        return this.loadAll;
      }
      return this.loading ? this.loadingText : this.loadMoreText;
    },
    showLoadMore() {
      if (this.height) {
        return this.heightLoad && this.showLoad;
      }
      return this.showLoad;
    },
  },

  watch: {
    // 监听计算高度是否已经可以展示全部数据
    showList: {
      handler(val, oldVal) {
        if (this.height && (!oldVal || oldVal.length === 0)) {
          this.$nextTick(() => {
            const THeight = this.$el.getBoundingClientRect().height;
            this.heightLoad = THeight > this.height;
          });
        }
      },
      immediate: true,
    },
  },

  created() {
  },

  mounted() {
  },

  methods: {
    loadMore() {
      if (this.height) {
        this.$emit('loadAll');
      } else {
        this.$emit('loadMore', this.newShowList);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.CbLoadMore {
  .height-limit {
    position: relative;
    overflow-y: hidden;
    .load-more {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
  .load-more {
    line-height: 30px;
    background: #ecf8ff;
    cursor: pointer;
  }
}
</style>
