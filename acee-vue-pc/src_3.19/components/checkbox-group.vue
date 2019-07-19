<!-- 
 /*
  *
  * 注意: 1、必须提供checkList，就算此数组为空
  *       2、绑定data prop时必须使用 .sync 修饰符。如 ：data.sync=data
  *       3、el-checkbox 组件中无法使用true-labeol
  * @param  {Object} data  checkbox group配置文件
  * @param  {Array} checkList   checkbox的label与数组中的元素值相对应，
  *   如果存在指定的值则为选中状态，否则为不选中。
  * @param  {Object} groupAttr 参数为element 组件中的 Checkbox-group Attributes。
  * @param  {Array} itemAttr 多个checkbox参数（对象）组成的数组,
  * checkbox参数为element 组件中的 checkbox Attributes
  *
  */
 -->

<template>
  <el-checkbox-group
   v-model="data.checkList"
   v-bind="data.groupAttr"
   @change="handleChange">
    <el-checkbox
     v-for="attr in data.itemAttr"
     :key="getId()"
     v-bind="deleteAttr(attr, 'value')"
     >{{attr.value}}</el-checkbox>
  </el-checkbox-group>
</template>

<script type="text/javascript">
export default {
  name: 'checkboxGroup',

  data() {
   return {
   }
  },

  props: {
    data: Object
  },

  methods: {
    handleChange: function(value) {
      this.$emit('change', value)
    },
    getId: function() {
      return Math.random() * 100000
    },
    deleteAttr: function(obj, key) {
      let obj1 = Object.assign({}, {}, obj);
      delete obj1[key];
      return obj1;
    }
  }
}
</script>

<style type="text/css">
.el-checkbox-group {
  text-align: left;
}
.el-checkbox-group .el-checkbox {
  margin: 10px;
}
</style>