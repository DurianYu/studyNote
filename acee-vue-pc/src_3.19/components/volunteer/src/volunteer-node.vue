<template>
  <li @click.stop="toggleTree($event)"
  class="zs-tree-node"
  ref="node"
  :class="{
    'isExpand': isExpand
  }">
    <template v-if="childNodes.type ? childNodes.type == 'input' : true ">
      <slot name="volunteerRoot">
        <div class="zs-tree-node-label">
          <el-input
          :disabled="!!childNodes.disabled"
          :value="childNodes.value"
          v-model="input"
          ref="input">
            <template slot="prepend">{{childNodes.label}}</template>
          </el-input>
          <div class="float-icon">
            <i class="el-icon-arrow-up" @click.stop="handleVolunUp"></i>
            <i class="el-icon-arrow-down" @click.stop="handleVolunDown"></i>
            <i class="el-icon-error" @click.stop="handleVolunItemEmpty"></i>
          </div>
        </div>
      </slot>
    </template>
    <template
    v-else-if="childNodes.type == 'button'">
      <div class="button-content">
        <div class="button-item"
        v-for="(item, index) in childNodes.children"
        :key="item.id">
          <el-radio v-if="item.type == 'radio'"
          :disabled="!!item.disabled"
          :label="item.label"
          :id="item.id"
          v-model="model[index]"
          @change="volunRoleChange">{{item.label}}</el-radio>
          <el-checkbox v-if="item.type == 'checkbox'"
          :true-label="item.label"
          :disabled="!!item.disabled"
          :id="item.id"
          v-model="model[index]"
          @change="volunRoleChange">{{item.label}}</el-checkbox>
        </div>
      </div>
    </template>
    
    <template v-if="hasChild">
      <transition
        v-on:before-enter="transBeforeEnter"
        v-on:enter="transEnter"
        v-on:leave="transLeave">
        <ul v-show="open">
          <volunteer-node
          v-for="item of childNodes.children"
          :key="parentKey + item.id"
          :node="item"
          :accordion="accordion"
          @tree-expand="handleExpandTree"
        ></volunteer-node>
        </ul>
      </transition>
    </template>
  </li>
</template>

<script type="text/javascript">
// import volunteerNode from './volunteer-node.vue'

export default {
  name: 'volunteerNode',

  inheritAttrs: false,

  props: {
    node: Object,
    accordion: { // 是否要展开一个树节点关闭同一级的兄弟节点
      type: Boolean,
      default: true
    }
  },

  componentName: 'volunteerNode',

  // components: {
  //   volunteerNode
  // },

  data () {
    return {
      open: this.node.open,
      tree: null,
      componentId: [],
      parentKey: null
    }
  },

  computed: {
    childNodes: function () {
      return this.node;
    },
    isExpand: function () {
      return this.open;
    },
    hasChild: function () {
      return this.childNodes.children && this.childNodes.children.length && this.childNodes.type != 'button'
    },
    model: {
      get: function () {
        let model = [];
        if (this.childNodes.type == 'button') {
          for( let i = 0, len = this.childNodes.children.length; i < len; i++) {
            if (this.childNodes.children[i].hasOwnProperty('checked')) {
              model[i] = this.childNodes.children[i].checked ? this.childNodes.children[i].label : false;
            } else {
              model[i] = false;
            }
          }
          return model;
        }
        if (this.childNodes.hasOwnProperty('value')) {
          return this.childNodes.value;
        }
        return undefined;
      },
      set: function (val) {
        console.log(val)
      }
    },
    input: {
      get: function () {
        if (this.childNodes.hasOwnProperty('value')) {
          return this.childNodes.value;
        }
        return undefined;
      },
      set: function (val) {
        if (this.childNodes.hasOwnProperty('value')) {
          this.childNodes.value = val ? val : null;
        } else {
          this.$set(this.childNodes, 'value', val ? val : null);
        }
      }
    }
  },

  methods: {
    toggleTree: function () {
      if (this.accordion) {
        this.handleExpandTree()
      } else if (this.hasChild) {
        this.open = !this.open
      }
    },
    // 展开一个树节点关闭同一级的树节点
    handleExpandTree: function () {
      let $vue = this;
      let open = this.open;
      let prevEle = this.$refs.node.previousElementSibling;
      let nextEle = this.$refs.node.nextElementSibling;
      let children = this.$parent.$children;
      if (prevEle || nextEle) {
        for (let i = 0, len = children.length; i < len; i++) {
          children[i].$data.open = false;
        }
      }
      this.$nextTick(() => {
        $vue.$data.open = !open;
      })
    },
    transBeforeEnter: function (el) {
      
      if (this.$refs.node.parentElement.style.height) {
        this.$refs.node.parentElement.style.height = 'auto';
      }
      el.style.height = 0;
    },
    transEnter: function (el) {
      
      el.style.transition='height 0.5s';
      el.style.height = el.scrollHeight + 'px';
    },
    transLeave: function (el) {
      
      el.style.transition='height 0.5s';
      el.style.height = 0;

      // 当打开一个节点时，其中它的子节点是展开的，关闭此展开的节点时，使包裹此节点的ul高度为auto
      if(this.$refs.node.parentElement.style.height) {
        this.$refs.node.parentElement.style.height = 'auto';
      }
      setTimeout(()=>{
        el.style.height = '';
      }, 600)
     
    },
    handleVolunItemEmpty: function (el) {
      this.tree.$emit('volun-item-empty', el, this.$refs.input.value, this.componentId);
    },
    handleVolunUp: function (el) {
      this.tree.$emit('volun-up', el, this.$refs.input.value, this.componentId);
    },
    handleVolunDown: function (el) {
      this.tree.$emit('volun-down', el, this.$refs.input.value, this.componentId);
    },
    volunRoleChange: function (value, el) {
      let trueValue = el.target.getAttribute('true-value');
      let $this = this;
      for( let i = 0, len = this.childNodes.children.length; i < len; i++) {
        if(this.childNodes.children[i].label == trueValue) {
          if (value.hasOwnProperty('checked')) {
            console.log(this.childNodes.children[i]['checked'])
            this.childNodes.children[i]['checked'] = value ? true : false;
          } else {
            $this.$set(this.childNodes.children[i], 'checked', value ? true : false);
            // console.log(this.childNodes.children[i]['checked'])
          }
        }
      }
      this.tree.$emit('volun-role-change', value, this.componentId)
    },
    matchSubIndex: function (value) {
      switch (value) {
        case '专业一:':
          return 0;
        case '专业二:':
          return 1;
        case '专业三:':
          return 2;
        case '专业四:':
          return 3;
        case '专业五:':
          return 4;
        case '专业六:':
          return 5;
      }
    }
  },

  created: function () {
    
    // this.parentKey = this.$parent.parentKey ? this.$parent.parentKey + (this.$parent.$vnode.key ? this.$parent.$vnode.key: '') : this.$parent.$vnode.key ? this.$parent.$vnode.key: '';
    const $this = this;
    const parent = this.$parent;
    const {componentId} = parent;
    
    if ( parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree
    }

    if ({}.toString.call(componentId) !== '[object Array]') {
      $this.componentId.push($this.childNodes.id);
    } else if ({}.toString.call(componentId) === '[object Array]') {
      $this.componentId = componentId.concat($this.componentId);
      if (this.childNodes.type ? this.childNodes.type == 'button' : false) {
        let buttonId = {}
        this.childNodes.children.forEach(function (currentValue) {
          buttonId[currentValue.id] = currentValue.label;
        })
        $this.componentId.push(buttonId);
      } else {
        $this.componentId.push($this.childNodes.id);
      }
    }
  },
  mounted: function () {
    this.parentKey = this.parentKey ? this.parentKey + (this.$vnode.key ? this.$vnode.key : '') : this.$vnode.key ? this.$vnode.key : '';
  }
}
</script>

<style type="text/css">
  input {
    cursor: default !important;
  }
  .zs-tree-node {
    box-sizing: border-box;
    color: #007bff;
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    padding: 10px 0px;
    border-bottom: 1px solid rgb(240, 240, 240);
    min-height: 38px;
  }
  .zs-tree-node .el-input{
    min-height: 38px;
  }
  .zs-tree-node .el-input .el-input__inner{
    color: #77797d;
  }
  .zs-tree-node .zs-tree-node-label {
    position: relative;
    max-height: 3rem;
  }
  .zs-tree-node .zs-tree-node-label .el-input-group {
    vertical-align: top;
  }
  .zs-tree-node .zs-tree-node-label .float-icon {
    display: flex;
    position: absolute;
    transform: translate(0%, -50%);
    top: 50%;
    right: 10px;
    cursor: pointer;
  }
  .zs-tree-node>ul>li ul {
    padding-left: 10px;
  }
  .zs-tree-node-label .el-input-group__append,
  .zs-tree-node-label .el-input-group__prepend {
    padding: 0 10px;
  }
  .zs-tree-node .button-content {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
    margin: 10px 0px;
  }
  .zs-tree-node .button-content .button-item {
    width: 50%;
  }
</style>
