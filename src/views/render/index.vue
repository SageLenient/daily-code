<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-10-22 15:26:55
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-10-22 15:26:56
 * @Description: render运用
-->
<script>
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
    };
  },

  computed: {
  },

  watch: {
  },

  created() {
  },

  mounted() {
  },

  methods: {
  },

  render(h) {
    return (
      <div>
        {
          h(
            `h${this.level}`,
            [
              this.$slots.default,
              <button>好了</button>,
            ],
          )
        }
        <span>这样也行</span>
      </div>
    );
  },
  // render(h) {
  //   return (
  //     h('div', [
  //       h(
  //         'h' + this.level,
  //         this.$slots.default,
  //       ),
  //       <span>这样也行</span>
  //     ])
  //   )
  // }
};
</script>

<style lang="less" scoped>

</style>
