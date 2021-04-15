<template>
  <div class="page-pay-zhigu-remit-inspect">
    <header>
      <div class="title font2-b">
        汇款申请信息审核
      </div>
    </header>

    <section class="main font3">
      <Form ref="formData" :model="formData" :rules="rules" :label-width="180">
        <FormItem label="业务编号">
          {{ check_pay_cre_remit['business_num'] }}
        </FormItem>
        <FormItem label="汇款币种">
          {{ check_pay_cre_remit['remiter_coin_type'] }}
        </FormItem>
        <FormItem label="汇款金额">
          <!-- {{ this.formData.rest_money }} -->
          2,000.00
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

        <FormItem label="账户余额">
          <!-- {{ check_pay_cre_remit['rest_money'] }} -->
          2,000.00
        </FormItem>
        <FormItem label="账户状态">
          <span style="color: #52c41a">正常</span>
        </FormItem>

        <FormItem label="中间行银行名称" v-if="!isCochain">
          中国工商银行纽约分行
        </FormItem>
        <FormItem label="中间行 SWIFT 代码" v-if="!isCochain">
          ICBKUS33
        </FormItem>
        <FormItem label="收款人开户行国家/地区">
          {{ check_pay_cre_remit['payee_bank_country'] }}
        </FormItem>
        <FormItem label="收款人开户行名称">
          {{ check_pay_cre_remit['payee_bank_name'] }}
        </FormItem>
        <FormItem label="收款人开户行 SWIFT 代码" v-if="!isCochain">
          {{ check_pay_cre_remit['payee_swift'] }}
        </FormItem>
        <FormItem label="收款人开户行所在城市">
          {{ check_pay_cre_remit['payee_back_city'] }}
        </FormItem>

        <FormItem label="手续费" prop="process_cost">
          <Input type="text" v-model="formData.process_cost" />
        </FormItem>
        <FormItem label="支付方式" prop="pay_type">
          <Select v-model="formData.pay_type">
            <Option value="现金">现金</Option>
            <Option value="支票">支票</Option>
            <Option value="账户">账户</Option>
          </Select>
        </FormItem>

        <FormItem class="next">
          <Button type="primary" size="large" @click="next">确认提交</Button>
        </FormItem>
      </Form>
    </section>
    <RadioQuestion :show.sync="modal.question" :list="question.list" :answer="question.answer" :question="question.question" />
  </div>
</template>

<script>
import { Form, FormItem, Button, Input, Select, Option } from 'view-design'
// import Modal from '@/components/Modal'
import { mapState, mapGetters } from 'vuex'
import { actionCode, roleStatus } from '@/config/index'
// import { getFormData } from '@/views/pay/index'
import RadioQuestion from '@/components/question/RadioQuestion'

import { check_pay_cre_remit, check_pay_zhigu_remit_inspect } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'

export default {
  components: {
    Form,
    FormItem,
    Button,
    Input,
    Select,
    Option,
    RadioQuestion
    // Modal
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_pay_zhigu_remit_inspect)
    }
    return {
      question: {
        question: '这里为什么会有中间银行的信息，包括名称和中间行 SWIFT 代码？',
        answer: 'B',
        list: [
          {
            label: 'A',
            value: '智谷银行在美国银行有账户，但是通过中间行进行转账速度更快'
          },
          {
            label: 'B',
            value: '智谷银行在美国银行没有账户，但是在中国工商银行纽约分行设有账户，需要通过中间行进行转账'
          },
          {
            label: 'C',
            value: '智谷银行不知道美国银行的 SWIFT 代码，需要通过中间行发送报文'
          },
          {
            label: 'D',
            value: '从中国发送报文给美国的收款行，必须先将报文发送给中间行进行审核'
          }
        ]
      },
      modal: {
        success: false,
        question: false
      },
      operator_info: {
        up_operator: '王小凯账户  6217 0099 0000 5555',
        down_operator: '智谷银行账户'
      },
      check_pay_cre_remit,
      formData: {},
      rules: {
        process_cost: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        pay_type: [{ required: true, validator: validateCheck, trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    ...mapGetters(['isCochain']),
    currentStatus() {
      return this.$getEntityNewStatus('entity_payment')?.status_id
    }
  },
  methods: {
    back() {
      this.modal.success = false
      this.$router.push({ name: 'pay-task' })
    },
    next() {
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          let mode = this.isCochain ? 'new' : 'old'
          await this.$store.dispatch('changeStatus', { actionid: actionCode.pay[mode][`a_pay_${mode}_zhigu_review_form`] })
          this.$router.push({ name: 'pay-zhigu-transfer' })
        }
      })
    }
  },
  created() {
    // this.formData = { ...this.formData, ...getFormData() }
    const need_queston = [roleStatus.pay.old.s_pay_old_has_write_form.status].find(v => v == this.currentStatus)
    if (need_queston) this.modal.question = true
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
