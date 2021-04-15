<template lang="html">
  <Modal title="题目" :value.sync="show" :footer-hide="true" :mask-closable="false" @on-visible-change="onChange">
    <h3 class="title font2-b">{{ question }}</h3>
    <br />
    <RadioGroup v-model="selected">
      <Radio :label="v.label" v-for="(v, i) of list" :key="i">{{ v.label }}.{{ v.value }}</Radio>
    </RadioGroup>
    <Button style="margin-top: 2rem" type="primary" @click="submitAanwer" class="btn-center">确 定</Button>
  </Modal>
</template>

<script>
import { Modal, Message, RadioGroup, Radio, Button } from 'view-design'

export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: function() {
        return []
      }
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  components: {
    Modal,
    RadioGroup,
    Radio,
    Button
  },
  data() {
    return {
      selected: '',
      modal: {
        question: false
      }
    }
  },
  computed: {},
  methods: {
    onChange(state) {
      this.$emit('update:show', state)
    },
    submitAanwer() {
      if (this.selected && this.selected == this.answer) {
        Message.success('回答正确')
      } else {
        Message.error('回答错误')
      }
      this.$emit('update:show', false)
      this.$emit('onSubmit', this.answer)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep label {
  width: 100%;
  padding: 0 1rem 2rem 1rem;
  word-break: break-all;
  white-space: pre-wrap;
}
</style>
