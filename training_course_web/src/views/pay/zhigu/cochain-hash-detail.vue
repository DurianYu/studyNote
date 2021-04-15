<template>
  <div class="page-pay-zhigu-remit-inspect">
    <header>
      <div class="title">
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
          1,998.00
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
        </FormItem>
      </Form>
    </section>
    <RadioQuestion :show.sync="modal.question" :list="question.list" :answer="question.answer" :question="question.question" />
  </div>
</template>

<script>
import {
  Form,
  FormItem,
  Button
  // Input
  // Message
  // Select,
  //  Option
} from 'view-design'
// import Modal from '@/components/Modal'
import { check_pay_cre_remit } from '@/config/form-check'
import RadioQuestion from '@/components/question/RadioQuestion'

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
        question: '交易哈希和块哈希的区别？',
        answer: 'C',
        list: [
          {
            label: 'A',
            value: '交易哈希和区块哈希都是该交易所在区块的哈希值'
          },
          {
            label: 'B',
            value: '交易哈希是该交易所在区块的哈希值，块哈希是单笔交易的哈希值'
          },
          {
            label: 'C',
            value: '交易哈希是单笔交易的哈希值，块哈希是该交易所在区块的哈希值'
          },
          {
            label: 'D',
            value: '交易哈希和区块哈希都是单笔交易的哈希值'
          }
        ]
      },
      modal: {
        question: true
      },
      operator_info: {
        up_operator: '王小凯账户  6217 0099 0000 5555',
        down_operator: '智谷银行账户'
      },
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
    pre_amount: function() {
      return (this.formData.input3 * 699.34 * 1) / 100
    }
  },
  methods: {
    back() {
      this.modal.success = false
      this.$router.push({ name: 'pay-task' })
    },
    next() {
      this.$router.push({ name: 'pay-zhigu-cochain-hash-list' })
      // this.$refs['formData'].validate(valid => {
      //   if (valid) {
      //     Message.success('审核成功')
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-pay-zhigu-remit-inspect {
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
        justify-content: center;
      }
    }
  }
}
</style>
