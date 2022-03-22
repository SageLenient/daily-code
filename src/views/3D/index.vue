<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-12-04 14:20:20
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-03-22 23:05:51
 * @Description:
-->
<template>
  <div class="index">
    <!-- <div id="container" v-if="$route.name === '3D'"></div> -->
    <router-view></router-view>
  </div>
</template>

<script>
import * as Three from 'three';

export default {
  name: 'index',

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
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
    };
  },

  computed: {
  },

  watch: {
  },

  created() {
  },

  mounted() {
    // this.init()
    // this.animate()
  },

  methods: {
    init() {
      const container = document.getElementById('container');
      if (!container) return;
      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10,
      );
      this.camera.position.z = 0.6;
      this.scene = new Three.Scene();
      // 创建一个立方体几何对象Geometry
      const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      const material = new Three.MeshNormalMaterial();
      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style lang="less" scoped>
#container {
  height: 400px;
}
</style>
