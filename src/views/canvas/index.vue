<template>
  <div class="box">
    <div class="shadow"></div>
    <canvas id="cw" width="600" height="600"></canvas>
  </div>
</template>

<script>
import CreateLine from './line-animation';

export default {
  name: 'line-canvas',

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
      line: null,
    };
  },

  computed: {
  },

  watch: {
  },

  created() {
  },

  mounted() {
    this.line = new CreateLine({
      id: 'cw',
      lineWidth: 80,
      timeStep: 1,
    });
    this.line.draw();
  },

  methods: {
  },

  destroyed() {
    this.line.destroy();
  },
};
</script>

<style lang="less" scoped>
  .box {
    width: 600px;
    height: 600px;
    border-radius: 80px;
    overflow: hidden;
    position: relative;
  }
  .shadow {
    width: 560px;
    height: 560px;
    position: absolute;
    background: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 60px;
  }
</style>
