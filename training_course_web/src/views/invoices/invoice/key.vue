<template>
  <div class="invoice-mode all-height">
    <Head class="thrid-head">国家税务总局北京市电子税务局</Head>
    <div class="flex-con page-space-t">
      <div class="menu">
        <Menu active-name="3">
          <MenuItem name="1"><Icon type="md-document" />首页</MenuItem>
          <MenuItem name="2"><Icon type="md-document" />开票模式</MenuItem>
          <MenuItem name="3"><Icon type="md-document" />密钥管理</MenuItem>
          <MenuItem name="4"><Icon type="md-document" />开票统计</MenuItem>
          <MenuItem name="4"><Icon type="md-document" />发票查验</MenuItem>
          <MenuItem name="4"><Icon type="md-document" />收票服务</MenuItem>
        </Menu>
      </div>
      <div class="invoice-mode-content">
        <h2 class="font2">区块链电子发票企业密钥</h2>
        <p class="font3">
          密钥是由系统自动生成的一串随机数字，包括公钥和私钥，涉及您的企业隐私，不可泄露给他人，
        </p>
        <h3 class="font2">
          开票密钥 <span>?</span><Button type="text" v-clipboard:copy="keyCon.public + keyCon.private" v-clipboard:success="onCopy">复制全部</Button>
        </h3>
        <div class="key-con font3">
          <p>公钥：{{ keyCon.public }}</p>
          <p>私钥：{{ keyCon.private }}</p>
        </div>
      </div>
      <Modal title="题目" v-model="visible" :footer-hide="true">
        <h3 class="title">对此密钥作用说法正确的是？</h3>
        <CheckboxGroup v-model="checkbox">
          <Checkbox label="A"> A: 登录区块链电子发票平台</Checkbox>
          <br />
          <br />
          <Checkbox label="B"> B: 授权给个人消费者进行验票</Checkbox>
          <br />
          <br />
          <Checkbox label="C"> C: 拥有和控制该密钥是能够替该企业开票的必要条件之一</Checkbox>
        </CheckboxGroup>
        <Button type="primary" @click="Ok" class="btn-center">确 定</Button>
      </Modal>
      <RadioQuestion :show.sync="modal.question" :list="question.list" :answer="question.answer" :question="question.question" @onSubmit="onSubmit" />
    </div>
  </div>
</template>

<script>
import { Menu, MenuItem, Icon, Button, Message, Modal, Checkbox, CheckboxGroup } from 'view-design'
import { actionCode } from '@/config/index'
import Head from '@/components/common-layout/head'
import RadioQuestion from '@/components/question/RadioQuestion'

export default {
  components: {
    Head,
    Menu,
    MenuItem,
    Icon,
    Button,
    Modal,
    Checkbox,
    CheckboxGroup,
    RadioQuestion
  },
  data() {
    return {
      question: {
        question: '公钥和私钥的用途？',
        answer: 'B',
        list: [
          {
            label: 'A',
            value: '私钥对开具的发票进行签名，税务局可以利用公钥进行验签'
          },
          {
            label: 'B',
            value: '公钥对开具的发票进行签名，税务局可以利用私钥进行验签'
          }
        ]
      },
      modal: {
        question: false
      },
      visible: false,
      checkbox: [],
      keyCon: {
        public: '0231745ADAE24044FF09C3541537160ABB8D5D720275BBAEED0B3D035B1E8B263C',
        private: '8D969EEF6ECAD3C29A3A629280E686CF0C3F5D5A86AFF3CA12020C923ADC6C92'
      }
    }
  },
  methods: {
    onCopy() {
      Message.success('复制成功')
      this.visible = true
    },
    Ok() {
      if (this.checkbox.length === 1 && this.checkbox[0] === 'C') {
        Message.success('回答正确')
      } else {
        Message.error('回答错误')
      }
      this.modal.question = true
      this.visible = false
    },
    onSubmit() {
      this.$router.push({ name: 'invoices-home' })
      this.$store.dispatch('changeStatus', { actionid: actionCode.invoice.manager.a_manager_register })
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-mode {
  .flex-con {
    height: calc(100% - 130px);
  }
  .menu {
    width: 240px;
    .ivu-menu {
      height: 100%;
    }
  }
  &-content {
    flex: 1;
    padding: 0 20px;
  }
}
.title {
  margin: 20px 0 30px;
  font-weight: bold;
}
.btn-center {
  margin: 30px auto;
}
</style>
