<!--
  事件：
  volun-empty：清空志愿事件，参数：事件、志愿索引
  volun-up： 志愿上移事件，参数：事件、input值，志愿索引
  volun-down： 志愿下移事件，参数：事件、input值，志愿索引
  volun-item-empty: 清空志愿项事件，参数：事件、input值，志愿索引
  volun-role-change： 志愿调配选择事件，参数：选中后的值、志愿索引
  数据:
   label： 标签，输入框关联的label文字
   id: 志愿id
   disabled: 禁用input组件
   value: input的value
   type: input类型, 默认输入框
   children: 子数据
   传入数据格式为：
    [
      label: ,
      id: ,
      children: [
        {
          label: ',
          id: ,
          disabled: ,
          value: ,
          children: [{
            label: ,
            id: ,
            disabled: ,
            value: 
          },
          {
            type: 'button',
            children: [{
              label: '专业调配',
              type: 'checkbox',
              id: '01',
            },{
              label: '定向调配',
              type: 'checkbox',
              id: '02'
            }]
          }
        }
      ]
    ]
 -->

<template>
  <el-popover
    v-bind="$attrs"
    :width="width"
    :trigger="trigger"
    >
    <div class="el-zs-volunteer">
      <ul>
        <volunteer-node
          v-for="item of childNodes"
          :node="item"
          :key="item.id"
          :accordion="accordion">
            <p slot="volunteerRoot"
            @mouseenter="mouseenterHandler"
            @mouseleave="mouseleaveHandler">
              {{item.label}}
            <i class="el-icon-error" @click.stop="handleClick(item.id, $event)"></i>
          </p>
        </volunteer-node>
      </ul>
    </div>
    <span slot="reference"><slot name="label"></slot></span>
  </el-popover>
</template>

<script type="text/javascript">
import volunteerNode from './volunteer-node.vue'
export default{
  name: 'zsVolunteer', 

  inheritAttrs: false,

  props: {
    nodes: Array,
    width: String,
    trigger: {
      type: String,
      default: 'click'
    },
    accordion: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      childNodes: this.nodes
    }
  },

  watch: {
    childNodes: {
      handler: function (val, oldVal) {
        this.$emit('input', val, oldVal)
      },
      deep: true
    }
  },

  methods: {
    mouseenterHandler: function (el) {
      el.target.childNodes[1].style.display = 'inline-block';
      this.$emit('mouseenter', el);
    },
    mouseleaveHandler: function (el) {
      el.target.childNodes[1].removeAttribute('style');
      this.$emit('mouserleave', el);
    },
    handleClick: function (value, el) {
      this.$emit('volun-empty', el, value)
    }
  },
  created: function () {
    this.isTree = true;
  },
  components: {
    volunteerNode
  }
}
</script>

<style type="text/css">
.el-zs-volunteer {
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  font-size: 16px;
  background-color: #fff;
  width: 100%;
  min-width: 300px;
}
.el-zs-volunteer [class^=el-icon-] {
  line-height: 1.4em;
  color: #38b1ff;
  padding: 0px 7px;
  font-size: 18px;
  font-weight: bold;
  display: none;
  cursor: pointer;
}
.el-zs-volunteer .isExpand [class^=el-icon-] {
  display: inline-block;
}
.el-zs-volunteer ul {
  list-style: none;
}
.el-zs-volunteer p {
  position: relative;
  box-sizing: border-box;
  line-height: 1.4em;
  padding: 0px 10px;
  text-align: left;
  color: #757575;
}
.el-zs-volunteer p>[class^=el-icon-] {
  position: absolute;
  right: 11px;
  top: 0px;
}

</style>
