<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2022-01-13 17:18:46
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-03-22 22:13:43
 * @Description: 虚拟人
-->
<template>
  <div class="virtualHuman">
    <div class="action">
      <el-select v-model="actionName">
        <el-option
          v-for="item in options"
          :key="item"
          :value="item">
        </el-option>
      </el-select>
      <el-select v-model="expression">
        <el-option
          v-for="(item, key) in expressionData"
          :key="key"
          :label="key"
          :value="item">
        </el-option>
      </el-select>
      <el-button @click="changeExpression">表情改变</el-button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default {
  name: 'virtualHuman',

  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      domElement: null,
      light: null,
      clock: null,
      mixer: null,
      bodyAnimations: {},
      actionName: '',
      options: [],
      prevTime: null,
      modelMouth: null,
      expression: null,
    };
  },

  watch: {
    actionName(newAction, originAction) {
      if (originAction) {
        this.bodyAnimations[originAction].action.stop();
      }
      this.bodyAnimations[newAction].action.play();
    },
  },

  computed: {
    expressionData() {
      return (this.modelMouth && this.modelMouth.morphTargetDictionary) || {};
    },
  },

  mounted() {
    this.init();
    window.addEventListener('resize', this.handelResize);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.handelResize);
    });
  },

  methods: {
    init() {
      // 场景配置
      const scene = new THREE.Scene();
      this.scene = scene;

      // 相机配置
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        100,
      );
      camera.position.set(0, 1.1, 2.2);
      camera.lookAt(0, 0.7, 0);
      this.camera = camera;

      // 渲染器配置
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.outputEncoding = THREE.sRGBEncoding;
      // 阴影贴图
      renderer.shadowMap.enabled = true;
      // 像素比
      renderer.setPixelRatio(window.devicePixelRatio);

      renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer = renderer;
      this.domElement = renderer.domElement;

      // 灯光配置
      const light = new THREE.HemisphereLight(0xffffff, 0xffffff);
      light.position.set(0, 20, 0);
      this.light = light;
      scene.add(light);

      // 加载模型
      const loader = new GLTFLoader();
      loader.load(
        `${process.env.BASE_URL}AIfemale_all.glb`,
        (model) => {
          // 处理模型
          scene.add(model.scene);
          // 嘴型和表情动画
          this.modelMouth = model.scene.getObjectByName('head');

          this.clock = new THREE.Clock();
          this.mixer = new THREE.AnimationMixer(model.scene);
          console.log('模型数据', model);
          (model.animations || []).forEach((clip) => {
            const action = this.mixer.clipAction(clip);
            action.time = 0;
            action.duration = clip.duration;
            action.loop = THREE.LoopOnce;
            this.bodyAnimations[clip.name] = {
              clip,
              action,
            };
            !this.options.includes(clip.name) && this.options.push(clip.name);
          });
        },
        (xhr) => {
          console.log('加载过程指标', xhr);
        },
        (e) => {
          console.log('执行错误', e);
        },
      );
      this.renderScene();
      this.$el.append(this.domElement);
    },

    animation(t) {
      if (!this.prevTime) {
        this.prevTime = t;
      }
      this.mixer && this.mixer.update((t - this.prevTime) * 0.001);
      this.prevTime = t;
    },

    renderScene() {
      window.requestAnimationFrame((t) => {
        this.renderer.render(this.scene, this.camera);
        this.animation(t);
        this.renderScene();
      });
    },

    // 窗口大小适应
    handelResize() {
      // 重置渲染器输出画布canvas尺寸
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
      this.camera.aspect = window.innerWidth / window.innerHeight;
      // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
      // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
      // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
      this.camera.updateProjectionMatrix();
    },

    changeExpression() {
      if (this.expression !== null) {
        const newData = [];
        this.modelMouth.morphTargetInfluences.forEach((item, index) => {
          if (index === this.expression) {
            item = 0.99;
          } else {
            item = 0;
          }
          newData.push(item);
        });
        this.modelMouth.morphTargetInfluences = newData;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.action {
  position: absolute;
  left: 50px;
  top: 50px;
}
</style>
