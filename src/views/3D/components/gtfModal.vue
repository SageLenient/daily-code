<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2022-01-13 16:33:11
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-03-22 22:55:22
 * @Description:
-->
<template>
  <div class="gtfModal">

  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default {
  name: 'gtfModal',

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
      mixer: null,
    };
  },

  computed: {
  },

  watch: {
  },

  created() {
    /**
    * 创建场景对象
    */
    const scene = new THREE.Scene();
    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    const axesHelper = new THREE.AxesHelper(250);
    scene.add(axesHelper);

    const loader = new GLTFLoader();
    // 加载文件返回一个对象obj
    loader.load('AIfemale_all.glb', (model) => {
      console.log(model, 1111111);
      scene.add(model.scene);
      // obj作为混合器的参数，可以播放obj包含的帧动画数据
      // this.mixer = new THREE.AnimationMixer(model.scene);
      // obj.animations[0]：获得剪辑clip对象
      // // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
      // var AnimationAction = mixer.clipAction(mixer.animations[0]);
      // AnimationAction.play();
    });


    // 点光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300);// 点光源位置
    scene.add(point);// 点光源添加到场景中

    // //环境光
    // var ambient = new THREE.AmbientLight(0x444444);
    // scene.add(ambient);

    /**
     * 相机设置：透视投影
     */
    const width = window.innerWidth; // 窗口宽度
    const height = window.innerHeight; // 窗口高度
    /** 透视投影相机对象 */
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(292, 109, 268);// 设置相机位置
    camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)

    /**
    * 创建渲染器对象
    */
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xb9d3ff, 1);// 设置背景颜色
    document.body.appendChild(renderer.domElement);// body元素中插入canvas对象

    new OrbitControls(camera, renderer.domElement);// 创建控件对象
    // 创建一个时钟对象Clock
    const clock = new THREE.Clock();
    // 渲染函数
    const render = () => {
      renderer.render(scene, camera); // 执行渲染操作
      requestAnimationFrame(render); // 请求再次执行渲染函数render，渲染下一帧

      if (this.mixer !== null) {
        // clock.getDelta()方法获得两帧的时间间隔
        // 更新混合器相关的时间
        this.mixer.update(clock.getDelta());
      }
    };
    setTimeout(() => {
      render();
    }, 1000);

    // onresize 事件会在窗口被调整大小时发生
    window.onresize = function () {
      // 重置渲染器输出画布canvas尺寸
      renderer.setSize(window.innerWidth, window.innerHeight);
      // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
      camera.aspect = window.innerWidth / window.innerHeight;
      // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
      // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
      // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
      camera.updateProjectionMatrix();
    };
  },

  mounted() {
  },

  methods: {
  },
};
</script>

<style lang="less" scoped>

</style>
