<template lang="html">
  <div class="calculator-rule-box" :style="style">
    <el-row >
      <el-col :span="auto_span" v-for="(v, i) of rule_ary" :key="i">
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
    rule_data: Array // 规则按键数据
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
      return this.rule_data;
    },
    // 自动分列
    auto_span() {
      let target = this.rule_ary.length;
      let span = 6;
      switch(true) {
        case (target <= 4):
        span = 24/1;
        break;
        case (4 < target && target <= 8):
        span = 24/2;        
        break;
        case (8 < target && target <= 12):
        span = 24/3;        
        break;
        default: 
        span = 6;
        break;
      }
      return span;
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
