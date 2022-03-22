<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-10-13 21:26:32
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-10-18 13:36:26
 * @Description: 搜索框组件
-->
<template>
  <div
    class="cb-search"
    :class="{
      'cb-search--prefix': $slots.prefix || prefixIcon || searchable,
      'cb-search--suffix': $slots.suffix || suffixIcon || clearable,
    }"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <input
      class="cb-search__input"
      v-bind="$attrs"
      ref="input"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keyup="handleEnter"
    >
    <!-- 前置内容 -->
    <span class="cb-search__prefix" v-if="$slots.prefix || prefixIcon || searchable">
      <!-- 搜索图标 -->
      <img
        v-if="searchable"
        class="cb-search-icon"
        src="./search.png"
        @mousedown.prevent
        @click="search"
      >
      <template v-else-if="($slots.prefix || prefixIcon) && !searchable">
        <slot name="prefix"></slot>
        <i
          v-if="prefixIcon"
          class="cb-icon"
          :class="prefixIcon">
        </i>
      </template>
    </span>
    <!-- 后置内容 -->
    <span
      class="cb-search__suffix"
      v-if="getSuffixVisible">
      <!-- 清空图标 -->
      <img
        v-if="showClear"
        class="cb-close-icon"
        src="./close.png"
        @mousedown.prevent
        @click="clear"
      >
      <!-- 只展示一个clear图标或者slot -->
      <template v-else-if="($slots.suffix || suffixIcon) && !clearable">
        <slot name="suffix"></slot>
        <i
          v-if="suffixIcon"
          class="cb-icon"
          :class="suffixIcon">
        </i>
      </template>
    </span>
  </div>
</template>

<script>
export default {
  name: 'CbSearch',

  inheritAttrs: false,

  components: {
  },

  filters: {
  },

  mixins: [
  ],

  props: {
    value: String,
    suffixIcon: String,
    prefixIcon: String,
    searchable: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      hovering: false,
      focused: false,
      isComposing: false,
    };
  },

  computed: {
    showClear() {
      return this.clearable &&
        this.nativeInputValue &&
        (this.focused || this.hovering);
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    },
    getSuffixVisible() {
      return this.$slots.suffix ||
        this.suffixIcon ||
        this.showClear;
    },
  },

  watch: {
    nativeInputValue() {
      this.setNativeInputValue();
    },
  },

  created() {
  },

  mounted() {
    this.setNativeInputValue();
  },

  methods: {
    handleCompositionStart() {
      this.isComposing = true;
    },
    handleCompositionUpdate() {
      this.isComposing = true;
    },
    handleCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput(event) {
      // 防止了在输入框输入中文字符时也会触发input事件
      if (this.isComposing) return;
      if (event.target.value === this.nativeInputValue) return;
      this.$emit('input', event.target.value);
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
    handleEnter(event) {
      this.$emit('enter', event.target.value);
    },
    search() {
      this.$emit('search', this.getInput().value);
    },
    clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    getInput() {
      return this.$refs.input;
    },
  },
};
</script>

<style lang="less" scoped>
.cb-search {
  display: inline-block;
  width: 320px;
  font-size: 14px;
  position: relative;
  &__input {
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding: 0 15px;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  .cb-icon {
    width: 25px;
    height: 100%;
    line-height: 40px;
    text-align: center;
    transition: all .3s;
  }
}
.cb-search--prefix {
  .cb-search__input {
    padding-left: 30px;
  }
  .cb-search__prefix {
    width: 25px;
    height: 100%;
    line-height: 38px;
    position: absolute;
    left: 5px;
    top: 0;
    color: #c0c4cc;
    .cb-search-icon {
      display: inline-block;
      width: 15px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
}
.cb-search--suffix {
  .cb-search__input {
    padding-right: 30px;
  }
  .cb-search__suffix {
    width: 25px;
    height: 100%;
    line-height: 40px;
    position: absolute;
    right: 5px;
    top: 0;
    color: #c0c4cc;
    .cb-close-icon {
      display: inline-block;
      width: 10px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .cb-search__suffix {
    position: absolute;
    right: 5px;
    top: 0;
    color: #c0c4cc;
  }
}

</style>
