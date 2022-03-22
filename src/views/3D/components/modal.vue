<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2022-01-13 16:10:20
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-03-22 22:14:15
 * @Description:
-->
<template>
  <div class="modal">

  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default {
  name: 'modal',

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
    const axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    /**
     * 创建两个网格模型并设置一个父对象group
     */
    const box1 = new THREE.BoxGeometry(50, 20, 20);
    const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh1 = new THREE.Mesh(box1, material1);// 网格模型对象
    const box2 = new THREE.SphereGeometry(20, 100, 100);// 创建一个球体几何对象
    // var material1 = new THREE.MeshLambertMaterial({
    //   color: 0x0000ff,
    //   specular:0x4488ee,
    //   shininess:12
    // });//材质对象(漫反射)
    const material2 = new THREE.MeshPhongMaterial({
      color: 0x0000ff,
      specular: 0x4488ee,
      shininess: 12,
    }); // 高光效果(镜面反射)
    const mesh2 = new THREE.Mesh(box2, material2);// 网格模型对象

    const group = new THREE.Group();
    mesh1.name = 'Box'; // 网格模型1命名
    mesh2.name = 'Sphere'; // 网格模型2命名
    group.add(mesh1); // 网格模型添加到组中
    group.add(mesh2); // 网格模型添加到组中

    scene.add(group);

    /**
     * 编辑group子对象网格模型mesh1和mesh2的帧动画数据
     */
    // 创建名为Box对象的关键帧数据
    const times = [0, 10]; // 关键帧时间数组，离散的时间点序列
    const values = [0, 0, 0, 220, 0, 0]; // 与时间点对应的值组成的数组
    // 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
    const posTrack = new THREE.KeyframeTrack('Box.position', times, values);
    // 创建颜色关键帧对象：10时刻对应颜色1, 0, 0   20时刻对应颜色0, 0, 1
    const colorKF = new THREE.KeyframeTrack('Box.material.color', [10, 20], [1, 0, 0, 0, 0, 1]);
    // 创建名为Sphere对象的关键帧数据  从0~20时间段，尺寸scale缩放3倍
    const scaleTrack = new THREE.KeyframeTrack('Sphere.scale', [0, 20], [1, 1, 1, 3, 3, 3]);

    // duration决定了默认的播放时间，一般取所有帧动画的最大时间`
    // duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
    const duration = 20;
    // 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
    const clip = new THREE.AnimationClip('default', duration, [posTrack, colorKF, scaleTrack]);

    /**
     * 播放编辑好的关键帧数据
     */
    // group作为混合器的参数，可以播放group中所有子对象的帧动画
    const mixer = new THREE.AnimationMixer(group);
    // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
    const AnimationAction = mixer.clipAction(clip);
    // 通过操作Action设置播放方式
    AnimationAction.timeScale = 20;// 默认1，可以调节播放速度
    // AnimationAction.loop = THREE.LoopOnce; //不循环播放
    AnimationAction.play();// 开始播放

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

    // 创建一个时钟对象Clock
    const clock = new THREE.Clock();
    // 渲染函数
    function render() {
      renderer.render(scene, camera); // 执行渲染操作
      requestAnimationFrame(render); // 请求再次执行渲染函数render，渲染下一帧

      // clock.getDelta()方法获得两帧的时间间隔
      // 更新混合器相关的时间
      mixer.update(clock.getDelta());
    }
    render();

    new OrbitControls(camera, renderer.domElement);// 创建控件对象
    // function render() {
    //   renderer.render(scene,camera);//执行渲染操作
    // }
    // render();
    // controls.addEventListener('change', render);//监听鼠标、键盘事件

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

