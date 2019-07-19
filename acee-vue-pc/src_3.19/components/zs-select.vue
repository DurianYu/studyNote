<template>
  <div class="zs-select">
    <div class="zs-select-title">
      <slot></slot>
    </div>
    <el-select v-model="value"
    v-bind="$attrs"
    v-on:input="$emit('input', value)"
    @change="handleChange">
      <template v-if="!multiple">
        <el-option
          v-for="item in options"
          :key="item.value ? item.value : item.code"
          :label="item.label ? item.label : item.name"
          :value="item.value ? item.value : item.code"
          :disabled="item.disabled">
        </el-option>
      </template>
      <template v-else>
        <el-option-group
          v-for="group in options"
          :key="group.label"
          :label="group.label">
          <el-option
            v-for="item in group.options"
            :key="item.value ? item.value : item.code"
            :label="item.label ? item.label : item.name"
            :value="item.value ? item.value : item.code">
          </el-option>
        </el-option-group>
      </template>
    </el-select>
  </div>
</template>

<script type="text/javascript">
export default {
  inheritAttrs: false,
  name: 'zsSelect',
  data () {
    return {
      value: this.selectValue
    }
  },
  props: {
    selectValue: null,
    options: Array,
    multiple: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange: function(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style type="text/css">
.zs-select {
  position: relative;
  display: inline-table;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
}
.zs-select .zs-select-title {
  box-sizing: border-box;
  width: 20%;
  white-space: nowrap;
  overflow: hidden;
  border: 1px solid #dcdfe6;
  border-right: 0px;
  border-radius: 4px 0px 0px 4px;
  padding: 4px 10px;
  display: table-cell;
  vertical-align: middle;
}
.zs-select .el-select {
  display: table-cell;
}
.zs-select .el-select .el-input__inner {
  border-radius: 0px 4px 4px 0px;
}
</style>