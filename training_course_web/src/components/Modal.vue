<template>
  <Modal v-model="show" :title="title" :closable="closable" :mask-closable="false" :footer-hide="footerHide" class-name="vertical-center-modal" :width="width">
    <slot />
    <div slot="footer">
      <button type="button" class="ivu-btn ivu-btn-text" @click="show = false" v-if="cancelHide">
        <span>{{ cancelText || '取消' }}</span>
      </button>
      <button type="button" class="ivu-btn ivu-btn-primary" @click="$emit('ok')">
        <span>{{ okText || '确定' }}</span>
      </button>
    </div>
  </Modal>
</template>

<script>
import { Modal } from 'view-design'
export default {
  name: 'my-component',
  props: {
    // 标题
    title: {
      type: String,
      default: '提示'
    },
    // 显示状态
    visible: {
      type: Boolean,
      default: false
    },
    // 宽度
    width: Number,
    // 确定按钮文字
    okText: String,
    // 取消按钮文字
    cancelText: String,
    // 是否显示底部
    footerHide: {
      type: Boolean,
      default: false
    },
    // 是否显示取消按钮
    cancelHide: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Modal
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  }
}
</script>
<style lang="scss">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
</style>
