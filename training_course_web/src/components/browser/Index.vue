<template>
  <Modal :visible.sync="show" title="CTIS·区块链浏览器" :width="1200" :footerHide="true" :closable="true">
    <div class="main-con">
      <div class="list-browser" v-show="showList">
        <i-tabs value="name1">
          <i-tab-pane :label="`区块数(${$store.state.chainList.length})`" name="name1"><List @toDetail="toDetail"/></i-tab-pane>
          <i-tab-pane :label="`节点数(${nodeNumber})`" name="name2"><Node /></i-tab-pane>
        </i-tabs>
      </div>
      <div class="" v-show="!showList">
        <Detail :dataObj="currentData" @back="showList = true" />
      </div>
    </div>
  </Modal>
</template>

<script>
import { Tabs, TabPane } from 'view-design'
import Modal from '../Modal'
import List from './List'
import Node from './Node'
import Detail from './Detail'
import { nodeConfig } from './browser'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Modal,
    'i-tabs': Tabs,
    'i-tab-pane': TabPane,
    List,
    Node,
    Detail
  },
  data() {
    return {
      showList: true,
      currentData: {}
    }
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    nodeNumber() {
      return nodeConfig[this.$store.getters.currentCourse].nodeNumber
    }
  },
  methods: {
    toDetail(obj) {
      this.showList = false
      this.currentData = obj
    }
  }
}
</script>

<style lang="scss" scoped>
.main-con {
  height: 600px;
  overflow-y: auto;
}
</style>
