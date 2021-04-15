<template>
  <div class="page">
    <header>
      <div class="title font2-b">
        汇款信息上链
      </div>
    </header>

    <section class="main">
      <Form ref="formData" :model="formData" :rules="rules" :label-width="180">
        <FormItem label="高度">
          641738
        </FormItem>
        <FormItem label="汇款币种">
          {{ check_pay_cre_remit['remiter_coin_type'] }}
        </FormItem>
        <FormItem label="汇款金额">
          <!-- {{ this.formData.rest_money }} -->
          1,968.00
        </FormItem>
        <FormItem label="汇款人姓名">
          {{ check_pay_cre_remit['remiter_nmae'] }}
        </FormItem>
        <FormItem label="汇款人手机号">
          {{ check_pay_cre_remit['remiter_tel'] }}
        </FormItem>
        <FormItem label="汇款人地址">
          {{ check_pay_cre_remit['remiter_addr'] }}
        </FormItem>
        <FormItem label="转出一卡通账号">
          {{ check_pay_cre_remit['one_card'] }}
        </FormItem>
        <FormItem label="收款人姓名">
          {{ check_pay_cre_remit['payee_name'] }}
        </FormItem>
        <FormItem label="收款人账户">
          {{ check_pay_cre_remit['payee_account'] }}
        </FormItem>
        <FormItem label="收款人国家/地区">
          {{ check_pay_cre_remit['payee_country'] }}
        </FormItem>
        <FormItem label="收款人地址">
          {{ check_pay_cre_remit['payee_addr'] }}
        </FormItem>

        <br />

        <FormItem label="块哈希">
          000000000000000000107d4166db51d66d73a946b7dce4f7939c8f63360ac2aa
        </FormItem>
        <FormItem label="前一个块">
          000000000000000000004d0c7c426910c55a77a0bdf05a9e967caa345903b38d
        </FormItem>
        <FormItem label="后一个块">
          000000000000000000004d0c7c426910c55a77a0bdf05a9e967caa345903b35c
        </FormItem>

        <FormItem label="收款人开户行国家/地区">
          {{ check_pay_cre_remit['payee_bank_country'] }}
        </FormItem>
        <FormItem label="收款人开户行名称">
          {{ check_pay_cre_remit['payee_bank_name'] }}
        </FormItem>
        <!-- <FormItem label="收款人开户行 SWIFT 代码">
          {{ check_pay_cre_remit['payee_swift'] }}
        </FormItem> -->
        <FormItem label="收款人开户行所在城市">
          {{ check_pay_cre_remit['payee_back_city'] }}
        </FormItem>

        <FormItem class="next">
          <Button type="primary" size="large" @click="next">返回</Button>
          <Button v-if="is_freeze == true || is_freeze == 'true'" type="primary" size="large" @click="freeze" style="margin-left: 2rem">资金冻结</Button>
          <Button v-if="is_transfer == true || is_transfer == 'true'" type="primary" size="large" @click="transfer" style="margin-left: 2rem">账户划转</Button>
        </FormItem>
      </Form>
    </section>
    <RadioQuestion :show.sync="modal.question" :list="question.list" :answer="question.answer" :question="question.question" />
    <RadioQuestion :show.sync="modal.question2" :list="question.list2" :answer="question.answer2" :question="question.question2" />
  </div>
</template>

<script>
import {
  Form,
  FormItem,
  Button,
  // Input
  Message,
  // Select,
  //  Option
  Modal
} from 'view-design'
// import Modal from '@/components/Modal'
import {
  mapState
  // mapGetters
} from 'vuex'
import { actionCode, roleStatus } from '@/config/index'
import RadioQuestion from '@/components/question/RadioQuestion'

import { check_pay_cre_remit } from '@/config/form-check'
// import { getFormData } from '@/views/pay/index'

export default {
  components: {
    Form,
    FormItem,
    Button,
    RadioQuestion

    // Input
    // Select,
    // Option
    // Modal
  },
  data() {
    const validateSuerPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('两次输入密码保持一致'))
      } else if (this.formData.password !== value) {
        callback(new Error('两次输入密码保持一致'))
      } else {
        callback()
      }
    }
    return {
      question: {
        question: '在区块链平台上，冻结链上账户资金时，冻结的是哪个账户的资金？',
        answer: 'C',
        list: [
          {
            label: 'A',
            value: '汇出行账户'
          },
          {
            label: 'B',
            value: '汇入行账户'
          },
          {
            label: 'C',
            value: '汇出行账户和汇入行账户'
          },
          {
            label: 'D',
            value: '区块链平台账户'
          }
        ],
        question2: '在什么情况下，区块链平台会进行汇出行和汇入行链上账户的资金结算？',
        answer2: 'C',
        list2: [
          {
            label: 'A',
            value: '冻结了汇出行和汇入行链上账户的资金后，区块链平台就会进行资金结算'
          },
          {
            label: 'B',
            value: '不用冻结链上账户的资金，区块链平台就可以进行资金结算'
          },
          {
            label: 'C',
            value: '汇入行发送回执后，区块链平台可以进行资金结算'
          },
          {
            label: 'D',
            value: '汇入行将资金转给收款人后，区块链平台可以进行资金结算'
          }
        ]
      },
      modal: {
        question: false,
        question2: false
      },
      is_transfer: false,
      is_freeze: false,
      operator_info: {
        up_operator: '王小凯账户  6217 0099 0000 5555',
        down_operator: '智谷银行账户'
      },
      show: false,
      check_pay_cre_remit,
      formData: {
        input1: '',
        input2: '',
        input3: ''
      },
      rules: {
        input: [{ required: true, type: 'string', min: 2, max: 15, message: '请输入您的真实姓名', trigger: 'blur' }],
        id: [{ required: true, pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份号码', trigger: 'blur' }],
        password: [{ required: true, max: 8, message: '密码规则为不多于8位的字母、数字或者特殊字符', trigger: 'blur' }],
        surePassword: [{ required: true, validator: validateSuerPassword, trigger: 'blur' }],
        email: [{ required: true, type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }],
        phone: [{ required: true, len: 11, message: '请填写您常用的手机号，它将成为以后的登录账号', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    currentStatus() {
      return this.$getEntityNewStatus('entity_payment')?.status_id
    },
    pre_amount: function() {
      return (this.formData.input3 * 699.34 * 1) / 100
    }
  },
  methods: {
    transfer() {
      let _this = this
      Modal.info({
        content: '确认通过智能合约划转相应资金?',
        async onOk() {
          await _this.$store.dispatch('changeStatus', { actionid: actionCode.pay[`new`][`a_pay_new_mid_bank_out_money`] })
          Message.success('划转成功')
          _this.$router.push({ name: 'pay-task' })
        }
      })
    },
    async freeze() {
      let _this = this
      Modal.info({
        content: '确认通过智能合约冻结相应资金?',
        async onOk() {
          await _this.$store.dispatch('changeStatus', { actionid: actionCode.pay[`new`][`a_pay_new_mid_bank_frozen`] })
          Message.success('冻结成功')
          _this.$router.push({ name: 'pay-task' })
        }
      })
    },
    next() {
      this.$router.push({ name: 'pay-middle-cochain-hash-node' })
      // this.$refs['formData'].validate(valid => {
      //   if (valid) {
      //     Message.success('审核成功')
      //   }
      // })
    }
  },
  created() {
    this.is_freeze = this.$route.query.freeze
    this.is_transfer = this.$route.query.transfer
    // this.formData = { ...this.formData, ...getFormData() }
    this.modal.question = [roleStatus.pay.new.s_pay_new_zhigu_has_online.status].find(v => v == this.currentStatus) ? true : false
    this.modal.question2 = [roleStatus.pay.new.s_pay_new_mid_can_out_money.status].find(v => v == this.currentStatus) ? true : false
  }
}
</script>

<style lang="scss" scoped>
.page {
  ::v-deep {
    header {
      margin: 2rem 0 0 0;
      .title {
        // text-align: center;
        margin: 0 0 0 2.5rem;
      }
    }
    .main {
      padding: 2.5rem 0 0 0;
      width: 50%;

      .next {
        clear: both;
        margin: 2rem 0 4rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
