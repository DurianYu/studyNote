<template lang="html">
  <div class="page">
    <header>
      <div class="title">
        划转账户
      </div>
    </header>
    <section class="main">
      <div style="margin-left: -2rem">中国工商银行纽约分行柜员</div>
      <br />
      <Form ref="formData" :model="formData" :rules="rules" :label-width="120">
        <p>智谷银行账户 6217 0099 0000 4444</p>
        <br />
        <FormItem label="操作" prop="up_operate">
          <RadioGroup v-model="formData.up_operate">
            <Radio label="增计">增计</Radio>
            <Radio label="减计">减计</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="数值" prop="up_num">
          <Input type="text" v-model="formData.up_num">
            <span slot="append">美元</span>
          </Input>
        </FormItem>
        <!-- <FormItem label="手续费" prop="input3">
          <div>{{ this.formData.up_num && Math.round(this.formData.up_num * 0.001) }}</div>
        </FormItem> -->

        <br />

        <p>美国银行账户</p>
        <br />
        <FormItem label="操作" prop="down_operator">
          <RadioGroup v-model="formData.down_operator">
            <Radio label="增计">增计</Radio>
            <Radio label="减计">减计</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="数值" prop="down_num">
          <Input type="text" v-model="formData.down_num">
            <span slot="append">美元</span>
          </Input>
        </FormItem>
      </Form>
      <div class="next">
        <Button type="primary" size="large" @click="next">确认提交</Button>
      </div>
    </section>
    <RadioQuestion :show.sync="modal.question" :list="question.list" :answer="question.answer" :question="question.question" />
  </div>
</template>

<script>
import {
  Form,
  FormItem,
  RadioGroup,
  Radio,
  Button,
  // Modal,
  Input,
  // Message,
  Modal as IModal
} from 'view-design'
import {
  mapState
  // mapGetters
} from 'vuex'
import { actionCode, roleStatus } from '@/config/index'
import RadioQuestion from '@/components/question/RadioQuestion'

import { check_pay_middle_tradition_transfer } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'
export default {
  name: 'AccountTransfer',
  components: {
    RadioGroup,
    Radio,
    Button,
    Form,
    FormItem,
    Input,
    RadioQuestion
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_pay_middle_tradition_transfer)
    }
    return {
      question: {
        question: '在什么情况下，中间行可以进行汇出和汇入行之间的资金结算？',
        answer: 'D',
        list: [
          {
            label: 'A',
            value: '冻结了汇出行的账户资金后，中间行就可以进行资金结算'
          },
          {
            label: 'B',
            value: '不用冻结汇出行的账户资金，中间行可以直接进行资金结算'
          },
          {
            label: 'C',
            value: '汇入行将资金转给收款人后，中间行可以进行资金结算'
          },
          {
            label: 'D',
            value: '汇入行对报文信息进行审核后，中间行才可以进行资金结算'
          }
        ]
      },
      modal: {
        question: false
      },
      formData: { up_num: '' },
      rules: {
        up_operate: [{ required: true, validator: validateCheck, trigger: 'change' }],
        up_num: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        down_operator: [{ required: true, validator: validateCheck, trigger: 'change' }],
        down_num: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['smsList']),
    currentStatus() {
      return this.$getEntityNewStatus('entity_payment')?.status_id
    }
  },
  methods: {
    next() {
      let _this = this
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          await this.$store.dispatch('changeStatus', { actionid: actionCode.pay[`old`][`a_pay_old_mid_bank_out_money`] })
          IModal.info({
            content: '账户划转成功',
            onOk() {
              _this.$router.push({ name: 'pay-middle-tradition-list' })
            }
          })
        }
      })
    },
    setRead() {
      this.$fetch({
        uriCode: 'API1002',
        msg_type: 'sms',
        status: true
      })
        .then(() => {
          this.$store.dispatch('getUserInfo')
          this.$store.dispatch('getMsg')
        })
        .catch(() => {})
    }
  },
  created() {
    const need_queston = [roleStatus.pay.old.s_pay_old_mid_can_out_money.status].find(v => v == this.currentStatus)
    if (need_queston) this.modal.question = true
  }
}
</script>

<style lang="scss" scoped>
.page {
  ::v-deep {
    header {
      margin: 2rem 0 0 0;
      .title {
        text-align: center;
      }
    }
    .main {
      padding: 2.5rem 0 0 0;
      width: 50%;
      margin: 0 auto;

      .box {
        .ivu-table-row:nth-of-type(1) {
          cursor: pointer;
        }
      }

      .next {
        margin: 2rem 0 4rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
