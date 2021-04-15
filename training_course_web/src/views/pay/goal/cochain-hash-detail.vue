<template>
  <div class="page">
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
          1966.00
        </FormItem>
        <FormItem label="汇款人姓名">
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
        <FormItem label="汇款公司银行账号">
          6217 0099 0000 5555
        </FormItem>

        <FormItem label="申请人姓名">
          王小凯
        </FormItem>
        <FormItem label="申请人电话">
          15600026666
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

        <FormItem label="收款人常驻国家">
          美国
        </FormItem>

        <FormItem label="手续费">
          0.1%
        </FormItem>

        <FormItem label="回执结果" prop="result">
          <RadioGroup v-model="formData.result">
            <Radio label="通过">通过</Radio>
            <Radio label="不通过" disabled>不通过</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem class="next">
          <Button type="primary" size="large" @click="next">提交</Button>
        </FormItem>
      </Form>
    </section>
  </div>
</template>

<script>
import {
  Form,
  FormItem,
  Button,
  // Input
  Message,
  RadioGroup,
  Radio,
  // Select,
  //  Option
  Modal
} from 'view-design'
// import Modal from '@/components/Modal'
import {
  mapState
  // mapGetters
} from 'vuex'
import {
  actionCode
  //  roleStatus
} from '@/config/index'
import { check_pay_cre_remit } from '@/config/form-check'
// import { getFormData } from '@/views/pay/index'

export default {
  components: {
    Form,
    FormItem,
    Button,
    RadioGroup,
    Radio
    // Input
    // Select,
    // Option
    // Modal
  },
  data() {
    return {
      is_transfer: false,
      is_freeze: false,
      operator_info: {
        up_operator: '王小凯账户  6217 0099 0000 5555',
        down_operator: '智谷银行账户'
      },
      show: false,
      check_pay_cre_remit,
      modal: {
        success: false
      },
      formData: {
        input1: '',
        input2: '',
        input3: ''
      },
      rules: {
        result: [{ required: true, message: '请输入', trigger: 'blur' }]
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
    transfer() {
      let _this = this
      Modal.info({
        content: '确认通过智能合约划转相应资金?',
        onOk() {
          Message.success('划转成功')
          _this.$router.push({ name: 'pay-task' })
        }
      })
    },
    freeze() {
      let _this = this
      Modal.info({
        content: '确认通过智能合约冻结相应资金?',
        onOk() {
          Message.success('冻结成功')
          _this.$router.push({ name: 'pay-task' })
        }
      })
    },
    back() {
      this.modal.success = false
      this.$router.push({ name: 'pay-task' })
    },
    next() {
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          await this.$store.dispatch('changeStatus', { actionid: actionCode.pay[`new`][`a_pay_new_usa_sent_receipt`] })
          this.$router.push({ name: 'pay-goal-cochain-hash-list' })
        }
      })
    }
  },
  created() {
    this.is_freeze = this.$route.query.freeze
    this.is_transfer = this.$route.query.transfer
    // this.formData = { ...this.formData, ...getFormData() }
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
