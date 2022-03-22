<!--
 * @Author: Yanzhao.Zhang
 * @Date: 2021-09-18 15:44:18
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2022-03-22 23:08:28
 * @Description: 倒计时
-->
<template>
  <div class="index">
    <el-date-picker
      v-model="yourTime"
      type="datetime"
      placeholder="选择日期时间"
      @change="changeTime">
    </el-date-picker>
    <hr>
    <span style="font-size:80px">
      {{ timeString }}
    </span>
  </div>
</template>

<script>
import axios from 'axios';

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
      yourTime: '',
      hour: '',
      minute: '',
      second: '',
      timer: '',
      remainTime: 0,
    };
  },

  computed: {
    hourString() {
      return this.formatNum(this.hour);
    },
    minuteString() {
      return this.formatNum(this.minute);
    },
    secondString() {
      return this.formatNum(this.second);
    },
    timeString() {
      return this.hour ? `${this.hourString}:${this.minuteString}:${this.secondString}`
        : `${this.minuteString}:${this.secondString}`;
    },
  },

  watch: {
    remainTime: {
      handler(val) {
        console.log(val, '有啥问题');
        this.hour = Math.floor(val / 3600);
        this.minute = Math.floor((val / 60) % 60);
        this.second = Math.floor(val % 60);
        this.countDown();
      },
    },
  },

  created() {
    axios.get('/').then((res) => {
      this.remainTime = (new Date('2021 10-15 18:30').getTime() - new Date(res.headers.date).getTime()) / 1000;
    });
  },

  mounted() {
  },

  methods: {
    changeTime() {
      axios.get('/').then((res) => {
        const timeNow = new Date(res.headers.date).getTime();
        if (this.yourTime && this.yourTime.getTime() > timeNow) {
          this.remainTime = (this.yourTime.getTime() - timeNow) / 1000;
        }
      });
    },
    countDown() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        console.log(+new Date());
        if (this.hour === 0) {
          if (this.minute !== 0 && this.second === 0) {
            this.second = 59;
            this.minute -= 1;
          } else if (this.minute === 0 && this.second === 0) {
            this.second = 0;
            console.log('清空了？', this);
            clearInterval(this.timer);
          } else {
            this.second -= 1;
          }
        } else if (this.minute !== 0 && this.second === 0) {
          this.second = 59;
          this.minute -= 1;
        } else if (this.minute === 0 && this.second === 0) {
          this.hour -= 1;
          this.minute = 59;
          this.second = 59;
        } else {
          this.second -= 1;
        }
      }, 1000);
    },
    formatNum(num) {
      return num < 10 ? `0${num}` : `${num}`;
    },
  },
};
</script>

<style lang="less" scoped>

</style>
