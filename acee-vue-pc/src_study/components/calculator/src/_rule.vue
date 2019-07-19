<template lang="html">
  <div class="calculator-rule-box" :style="style">
    <el-row >
      <el-col :span="24" v-for="(v, i) of rule_ary" :key="i">
        <el-button @click="typing(v)"> {{ v }} </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'YcRule',
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
    rule_ary() {
      return [
        '平均分',
        '录取分',
        '平均分',
        '平均分',
      ];
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
.calculator-rule-box {
    .el-col {
        padding: 4px 3px;
    }
    .el-button {
        width: -webkit-fill-available;
        padding: 12px 8px;
    }
}
</style>
