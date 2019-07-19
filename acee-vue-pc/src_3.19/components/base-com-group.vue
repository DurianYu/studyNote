<!-- 
    /*
  * @file 根据 父组件传递的数据，绘制一些组件：input(1)、 select(2)、 button(3)、 radio(4)、 checkbox(5)
  * @author ltt
  * @param {Array} data 绘制的组件类型及配置
  * @example 
  * [
  *   {
  *      type: Number, // 必须。 组件类型， 如 1 代表input
  *      isDisplay: Boolean, // 是否渲染 默认 true 渲染
  *      model: String,
  *      label: {
  *        pos: String,  // label label的位置：prepend /append/，input、 select组件才会使用  
  *        title: String, // 值
  *      },
  *      class: {},
  *      props: {
  *        options: Array, // 必须，select组件选项特有属性
  *        multiple: Boolean, // 是否是option group，如果数据格式是option group 格式，必须设置此值为true
  *        selectValue: String, // 组件默认选中的初始值
  *      },
  *      attr: {
  *        disabled: Boolean,
  *        readonly: Boolean,
  *        placeholder: String, // 占位符，当该组件没有占位符属性时， 不显示占位符
  *        ........
  *      }
  *   }
  * ]
  *
  * @param {Object} model 该对象的key值对应data[].model值， 当数据更新时， 会更新该key的值，如果只提供
  *   data[].model或只提供 model 将不会把值更新到model对象上。
  *
  * @example
  *  <zs-base-group
         class="search-input"
         :data="schSearchBox"
         v-bind:model="searchItem"
         v-on:update:model="updataSearchItem"
         @btn-click="searchCoolege">
      </zs-base-group>
  *
  *
  *
  */
 -->


<template>
  <div class="base-com-group">
    <div class="com-item" v-for="item in data">

      <div v-if="hasPro(item, 'isDisplay') ? item.isDisplay : true">
        <!-- input -->
        <el-input
          v-if="item.type == 1"
          v-bind:class="hasPro(item, 'class') ? item.class : {}"
          v-bind="assignAttr(item, 'props', 'attr')"
          @change="handleInputChange(item, $event)"
          @input="handleInput"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @click.native="handleInputClick">
          <template v-if="(hasPro(item, 'label') && hasPro(item.label, 'title'))">
            <!-- 前置内容 -->
            <template v-if="labelPos(item.label)" slot="prepend">
              {{item.label.title}}
            </template>
            <!-- 后置内容 -->
            <template v-else slot="append">
              {{item.label.title}}
            </template>
          </template>
        </el-input>
  
        <!-- select -->
        <zs-select  
          v-if="item.type == 2"
          v-bind:class="hasPro(item, 'class') ? item.class : {}"
          v-bind="assignAttr(item, 'props', 'attr')"
          @change="handleSelectChange(item, $event)">
          <template v-if="hasPro(item, 'label') && hasPro(item.label, 'title')">
            {{item.label.title}}
          </template>
        </zs-select>      
  
        <!-- button -->
        <el-button
          v-if="item.type == 3"
          v-bind="assignAttr(item, 'props', 'attr')"
          @click="handleBtnClick">
          {{item | getBtnLabel}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'baseCom',

  inheritAttrs: false,

  props: {
    data: {
      type: Array,
      required: true
    },
    model: {
      type: Object,
      default: null
    }
  },

  filters: {
    getBtnLabel: function(item) {
      if (item.hasOwnProperty('label') && item.label.hasOwnProperty('title')) {
        return item.label.title;
      }
      return '';
    }
  },

  methods: {
    labelPos: function(obj) {
      if (obj.hasOwnProperty('pos')) {
        let type = Object.prototype.toString.call(obj.pos);
        if (type !== '[object String]') {
          return console.error('Invalid data: type check failed. Expected String, got ' + type.slice(8, -1))
        }
        return obj.pos === 'append' ? false : true;
      }
      return true;
    },
    hasPro: function(obj, property) {
      return obj.hasOwnProperty(property)
    },
    assignAttr: function(obj, props, attr) {
      if (this.hasPro(obj, props) && this.hasPro(obj, attr) ){
        return Object.assign({}, obj[props], obj[attr]);
      }

      if (this.hasPro(obj, props)) {
        return obj[props];
      }

      if (this.hasPro(obj, attr)) {
        return obj[attr];
      }

      return {};
      
    },
    bindModel: function(item, value) {
      const vm = this;
      if(this.hasPro(item, 'model') && this.model) {
        if (this.hasPro(this.model, item.model)) {
          this.model[item.model] = value;
          this.$emit('update:model', this.model)
          // this.$emit('update:model', item.model, value)
        }
      }
    },
    handleInputChange: function(item, value) {
      this.bindModel(item, value)
      this.$emit('input-change', value)
    },
    handleInput: function(value) {
      this.$emit('input', value)
    },
    handleInputFocus: function(el) {
      this.$emit('input-focus', el)
    },
    handleInputBlur: function(el) {
      this.$emit('input-blur', el)
    },
    handleInputClick: function(el) {
      this.$emit('input-click', el)
    },
    handleBtnClick: function(el) {
      console.log('btn', el)
      this.$emit('btn-click', el)
    },
    handleSelectChange: function(item, value) {
      this.bindModel(item, value)
      this.$emit('select-change', value)
    }
  }
}
</script>

<style type="text/css">
  .base-com-group .com-item {
    margin: 7px 0px;
  }
</style>