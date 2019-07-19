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
          <!-- 加入学校 -->
          <div v-if="show_add_btn == childNodes.lvl" class="add-sch" @click.stop="$emit('addSchEvent', childNodes)">
            <el-button v-if="childNodes.value" type="primary" size="mini" plain>替换</el-button>
            <el-button v-else type="primary" size="mini" plain>加入</el-button>
          </div>
          <div class="float-icon" v-show="childNodes.value">
              <i v-show="childNodes.pos+1 !== 1" class="el-icon-arrow-up" @click.stop="$emit('handleVolunUp', $event, $refs.input.value, componentId, childNodes)"></i>
              <i v-show="childNodes.pos+1 !== childNodes.subject_cnt" class="el-icon-arrow-down" @click.stop="$emit('handleVolunDown', $event, $refs.input.value, componentId, childNodes)"></i>
              <i class="el-icon-error" @click.stop="$emit('handleVolunItemEmpty', $event, $refs.input.value, componentId, childNodes)"></i>
          </div>
        </div>
      </slot>
    </template>
    <template
    v-else-if="childNodes.type == 'button'">
      <div class="button-content">
        <div class="button-item"
        v-for="(item, index) in childNodes.children"
        :key="index">
          <el-radio v-if="item.type == 'radio'"
          :disabled="!!item.disabled"
          :label="item.label"
          :id="item.id"
          v-model="model[index]"
          @change="volunRoleChange($event, item)">{{item.label}}</el-radio>
          <el-checkbox v-if="item.type == 'checkbox'"
          :true-label="item.label"
          :disabled="!!item.disabled"
          :id="item.id"
          v-model="model[index]"
          @change="volunRoleChange($event, item)">{{item.label}}</el-checkbox>
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
          v-for="item, i of childNodes.children"
          :key="parentKey + i"
          :show_add_btn="show_add_btn"
          :node="item"
          :accordion="accordion"
          @addSchEvent="addSchEvent"
          @tree-expand="handleExpandTree"
          @handleVolunUp="handleVolunUp"
          @handleVolunDown="handleVolunDown"
          @handleVolunItemEmpty="handleVolunItemEmpty"
          @volunRoleChangeEvent="volunRoleChangeEvent"
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
    },
    show_add_btn: {
      default: false,
      type: [Boolean, Number]
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
    addSchEvent(childNodes) {
      console.log('addSchEvent', childNodes);
      this.$emit('addSchEvent', childNodes);
    },
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
    handleVolunItemEmpty: function (el, value, componentId, childNodes) {
      console.log('el', el);
      this.$emit('handleVolunItemEmpty', el, value, componentId, childNodes);
    },
    handleVolunUp: function (el, value, componentId, childNodes) {
      console.log(el, value, componentId);
      this.$emit('handleVolunUp', el, value, componentId, childNodes);
    },
    handleVolunDown: function (el, value, componentId, childNodes) {
      console.log('el', el, 'value', value, 'componentId', componentId);
      this.$emit('handleVolunDown', el, value, componentId, childNodes);
    },
    volunRoleChangeEvent(value, componentId, childNodes) {
      this.$emit('volunRoleChangeEvent', value, componentId, childNodes);
    },
    volunRoleChange: function (value, item) {

      let trueValue = item.label;
      let $this = this;
      let type = '';
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
      this.$emit('volunRoleChangeEvent', value, this.componentId, item)
    },
    // matchSubIndex: function (value) {
    //   switch (value) {
    //     case '专业一:':
    //       return 0;
    //     case '专业二:':
    //       return 1;
    //     case '专业三:':
    //       return 2;
    //     case '专业四:':
    //       return 3;
    //     case '专业五:':
    //       return 4;
    //     case '专业六:':
    //       return 5;
    //   }
    // }
  },

  created: function () {
// ------------------- 原版本
    // this.parentKey = this.$parent.parentKey ? this.$parent.parentKey + (this.$parent.$vnode.key ? this.$parent.$vnode.key: '') : this.$parent.$vnode.key ? this.$parent.$vnode.key: '';
    const $this = this;
    const parent = this.$parent;
    const {
      componentId
    } = parent;
    // console.log('parent', parent);
    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree
    }
    // console.log('this.tree', this.tree);

    if ({}.toString.call(componentId) !== '[object Array]') {
      $this.componentId.push($this.childNodes.id);
    } else if ({}.toString.call(componentId) === '[object Array]') {
      $this.componentId = componentId.concat($this.componentId);
      if (this.childNodes.type ? this.childNodes.type == 'button' : false) {
        let buttonId = {}
        this.childNodes.children.forEach(function(currentValue) {
          buttonId[currentValue.id] = currentValue.label;
        })
        $this.componentId.push(buttonId);
      } else {
        $this.componentId.push($this.childNodes.id);
      }
    }
// ------------------- 原版本

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
    background-color: #ffffff87;
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

  /*加入学校部分*/
    .zs-tree-node .add-sch {
        position: absolute;
    top: 0;
    left: 40%;
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
