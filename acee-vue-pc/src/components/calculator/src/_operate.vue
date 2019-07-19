<template lang="html">
  <div class="calculator-operate-box" :style="style">
    <el-row >
      <el-col :span="6" v-for="(v, i) of operate_ary" :key="i">
        <el-button
        @click="typing(v)"
        :class="[
          v === '←' ? 'el-button--danger is-plain' : '',
          v === 'c' ? 'el-button--danger is-plain' : '',
        ]"
        > {{ v }} </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'YcOperate',
  props: {
    width: String, // 操作键盘的宽度
  },
  data() {
    return {};
  },
  computed: {
    style() {
      let style = {};
      if (this.width) {
        style.width = this.width;
      }
      return style;
    },
    operate_ary() {
      return [
        '(', ')', 'c', '←',
        '*', '/', '-', '+',
        '≤', '≥', '<', '>',
        '与', '或', '非', '等于',
      ];
    }
  },
  methods: {
    typing(str) {
      //   switch (str) {
      //     case '等于':
      //       str = '=';
      //       break;
      //     default:
      //   }
      this.$emit('typingOperate', String(str));
    }
  }
};
</script>

<style lang="scss" scoped>
$danger: #f56c6c;
$primary: #409eff;
.calculator-operate-box {
    .el-col {
        padding: 4px 3px;
    }
    .el-button {
        width: -webkit-fill-available;
        padding: 12px 8px;
    }
}
</style>
