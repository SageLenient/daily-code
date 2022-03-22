<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-11-24 14:40:17
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-03-22 23:08:04
 * @Description: 粘性组件
-->
<template>
  <div
    class="CbSticky"
    ref="box"
    :style="boxStyle">
    <div
      class="content-sticky"
      ref="content"
      :style="contentStyle">
      <slot>
          粘性组件
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CbSticky',

  components: {
  },

  filters: {
  },

  mixins: [
  ],

  props: {
    zIndex: {
      type: Number,
      default: 1,
    },
    top: {
      type: [String, Number],
      default: 'unset',
    },
    left: {
      type: [String, Number],
      default: 'unset',
    },
  },

  data() {
    return {
      stickyLock: false,
      boxStyle: {
        position: 'static',
        top: 0,
        left: 0,
        width: 'auto',
        height: 'auto',
      },
      contentStyle: {
        position: 'static',
        top: 0,
        left: 0,
        width: 'auto',
        height: 'auto',
      },
      isFixedX: false, // 是否已经设置为fixed布局，用于优化性能，防止多次设置
      isFixedY: false, // 是否已经设置为fixed布局，用于优化性能，防止多次设置
    };
  },

  computed: {
  },

  watch: {
  },

  created() {
  },

  mounted() {
    // 保证盒子的高和宽度
    const originBoxStyle = this.$el.getBoundingClientRect();
    this.boxStyle.width = originBoxStyle.width;
    this.boxStyle.height = originBoxStyle.height;
    // 主动触发
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  },

  activated() {
    // 如果keep-alive包裹，需要再触发一次
    this.handleScroll();
  },

  methods: {
    handleScroll() {
      const { content, box } = this.$refs;
      const { contentStyle } = this;
      const boxTop = box.getBoundingClientRect().top;
      const boxLeft = box.getBoundingClientRect().left;
      const contentTop = content.getBoundingClientRect().top;
      const contentLeft = content.getBoundingClientRect().left;

      if (this.top !== 'unset') {
        if (boxTop > parseInt(this.top, 10) && this.isFixedY) {
          this.isFixedY = false;
          contentStyle.position = 'static';
        } else if (boxTop < parseInt(this.top, 10) && !this.isFixedY) {
          this.isFixedY = true;
          contentStyle.position = 'fixed';
          this.handleResize();
        }

        // 当位置距左位置不对时，重新设置fixed对象left的值，防止左右滚动位置不对问题
        if (contentLeft !== boxLeft && this.left === 'unset') {
          this.handleResize();
        }
      }

      if (this.left !== 'unset') {
        if (boxLeft > parseInt(this.left, 10) && this.isFixedX) {
          this.isFixedX = false;
          contentStyle.position = 'static';
        } else if (boxLeft < parseInt(this.left, 10) && !this.isFixedX) {
          this.isFixedX = true;
          contentStyle.position = 'fixed';
          this.handleResize();
        }

        // 当位置距左位置不对时，重新设置fixed对象left的值，防止左右滚动位置不对问题
        if (contentTop !== boxTop && this.top === 'unset') {
          this.handleResize();
        }
      }
    },
    // 根据窗口宽高改变
    handleResize() {
      const boxStyle = this.$el.getBoundingClientRect();
      const { contentStyle } = this;
      const boxTop = boxStyle.top;
      const boxLeft = boxStyle.left;

      if (contentStyle.position === 'fixed') {
        contentStyle.top = this.top === 'unset' ? `${boxTop}px` : this.top;
        contentStyle.left = this.left === 'unset' ? `${boxLeft}px` : this.left;
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
    },
  },
};
</script>

<style lang="less" scoped>

</style>
