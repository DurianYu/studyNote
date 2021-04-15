<template>
  <div class="page-pay-zhigu-remit-inspect">
    <header>
      <div class="title">
        跨境支付交易详细信息
      </div>
    </header>

    <section class="main">
      <Form ref="formData" :model="formData" :rules="rules" :label-width="180">
        <FormItem label="银行业务编号">
          {{ check_pay_cre_remit['business_num'] }}
        </FormItem>
        <FormItem label="汇款币种">
          {{ check_pay_cre_remit['remiter_coin_type'] }}
        </FormItem>
        <FormItem label="汇款金额">
          <!-- {{ this.formData.rest_money }} -->
          1,968.00
        </FormItem>
        <FormItem label="汇款人中文姓名">
          {{ check_pay_cre_remit['remiter_nmae'] }}
        </FormItem>
        <FormItem label="汇款人身份证号">
          {{ check_pay_cre_remit['remitter_id_card'] }}
        </FormItem>
        <FormItem label="汇款人地址">
          {{ check_pay_cre_remit['remiter_addr'] }}
        </FormItem>
        <FormItem label="汇款银行">
          智谷银行成都万象南路支行
        </FormItem>
        <FormItem label="汇款人银行账号">
          6217 0099 0000 5555
        </FormItem>
        <FormItem label="汇款银行账号">
          6217 0099 0000 4444
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

        <FormItem label="收款行国别">
          美国
        </FormItem>
        <FormItem label="收款人开户行名称">
          {{ check_pay_cre_remit['payee_bank_name'] }}
        </FormItem>
        <FormItem label="收款人开户行 SWIFT 代码">
          {{ check_pay_cre_remit['payee_swift'] }}
        </FormItem>
        <FormItem label="收款人开户行所在城市">
          {{ check_pay_cre_remit['payee_back_city'] }}
        </FormItem>
        <FormItem label="收款人常驻国家">
          美国
        </FormItem>

        <FormItem class="next">
          <Button type="primary" size="large" @click="next">审核通过</Button>
        </FormItem>
      </Form>
    </section>

    <Modal v-model="modal.freeze" width="50%" :closable="false" :mask-closable="false" class-name="freeze">
      <p slot="header" style="text-align:center">
        智谷银行账户
      </p>
      <div style="main">
        <Form ref="formData" :model="formData" :rules="rules" :label-width="120">
          <FormItem label="操作" prop="key1">
            <RadioGroup v-model="formData.key1">
              <Radio label="增计" disabled>增计</Radio>
              <Radio label="减计" disabled>减计</Radio>
              <Radio label="冻结">冻结</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="金额" prop="freeze_num" style="width: 65%">
            <Input type="text" v-model="formData.freeze_num">
              <span slot="append">美元</span>
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="display:flex; align-item: center; justify-content: center;">
        <Button type="primary" size="large" @click="submit">审核通过</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  Form,
  FormItem,
  Button,
  Input,
  RadioGroup,
  Radio,
  Modal,
  Message
  // Select,
  //  Option
} from 'view-design'
// import Modal from '@/components/Modal'
import {
  mapState
  // mapGetters
} from 'vuex'
import { actionCode } from '@/config/index'
import { check_pay_cre_remit, check_pay_middle_tradition_inspect } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'
// import { getFormData } from '@/views/pay/index'

export default {
  components: {
    Form,
    FormItem,
    Input,
    RadioGroup,
    Radio,
    Button,
    // Select,
    // Option
    Modal
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_pay_middle_tradition_inspect)
    }
    return {
      operator_info: {
        up_operator: '智谷银行账户  6217 0099 0000 4444',
        down_operator: '美国银行账户',
        hide_input3: true
      },
      show: false,
      check_pay_cre_remit,
      modal: {
        success: false,
        freeze: false
      },
      formData: {},
      rules: {
        key1: [{ required: true, validator: validateCheck, trigger: 'change' }],
        freeze_num: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    pre_amount: function() {
      return (this.formData.input3 * 699.34 * 1) / 100
    }
  },
  methods: {
    onAccountTransfer(info) {
      console.log('dd', info)
      this.$router.push({ name: 'pay-middle-tradition-list' })
    },
    async submit() {
      let _this = this
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          await this.$store.dispatch('changeStatus', { actionid: actionCode.pay[`old`][`a_pay_old_mid_bank_frozen`] })
          this.modal.freeze = false
          Modal.info({
            content: '资金冻结成功',
            onOk() {
              _this.$router.push({ name: 'pay-task' })
            }
          })
        }
      })
    },
    back() {
      this.modal.success = false
      this.$router.push({ name: 'pay-task' })
    },
    next() {
      this.modal.freeze = true
      Message.success('审核成功')
      // this.$router.push({ name: 'pay-zhigu-tradition-list' })
    }
  },
  created() {
    this.pay_info = sessionStorage.getItem('pay_info') ? JSON.parse(sessionStorage.getItem('pay_info')) : {}
    // this.formData = { ...this.formData, ...getFormData() }
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
