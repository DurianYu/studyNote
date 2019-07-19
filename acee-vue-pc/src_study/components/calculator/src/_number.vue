<template lang="html">
  <div class="calculator-num-box" :style="style">
    <el-row >
      <el-col :span="8" v-for="(num, i) of num_ary" :key="i">
        <el-button @click="typing(num)"> {{ num }} </el-button>
      </el-col>
      <el-col :span="16">
        <el-button @click="typing('0')">0</el-button>
      </el-col>
      <el-col :span="8">
        <el-button @click="typing('.')">.</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'YcNumber',
  props: {
    width: String, // 数字键盘的宽度
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
    num_ary() {
      return [7, 8, 9, 4, 5, 6, 1, 2, 3];
    }
  },
  methods: {
    typing(str) {
      this.$emit('typingNum', String(str));
    }
  }
};
</script>

<style lang="scss" scoped>
$danger: #f56c6c;
$primary: #409eff;
.calculator-num-box {
    .el-col {
        padding: 4px 3px;
    }
    .el-button {
        width: -webkit-fill-available;
        padding: 12px 8px;
    }
}
</style>
