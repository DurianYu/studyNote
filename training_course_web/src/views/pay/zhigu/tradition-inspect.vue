<template>
  <div class="page-pay-zhigu-remit-inspect">
    <header>
      <div class="title">
        汇款申请信息审核
      </div>
    </header>

    <section class="main">
      <Form ref="formData" :model="formData" :rules="rules" :label-width="180">
        <FormItem label="业务编号">
          {{ check_pay_cre_remit['business_num'] }}
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

        <FormItem label="电报费" prop="telegraph">
          <Input type="text" v-model="formData.telegraph">
            <span slot="append">美元</span>
          </Input>
        </FormItem>

        <FormItem class="next">
          <Button type="primary" size="large" @click="next">确定</Button>
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
  Input,
  Message
  // Select,
  //  Option
} from 'view-design'
import {
  mapState
  // mapGetters
} from 'vuex'
import // actionCode,
// roleStatus
'@/config/index'
// import Modal from '@/components/Modal'
// import { getFormData } from '@/views/pay/index'
import { check_pay_cre_remit, check_pay_zhigu_tradition_inspect } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'
export default {
  components: {
    Form,
    FormItem,
    Button,
    Input
    // Select,
    // Option
    // Modal
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_pay_zhigu_tradition_inspect)
    }
    return {
      operator_info: {
        up_operator: '王小凯账户  6217 0099 0000 5555',
        down_operator: '智谷银行账户'
      },
      show: false,
      check_pay_cre_remit,
      modal: {
        success: false
      },
      formData: {},
      rules: {
        telegraph: [{ required: true, validator: validateCheck, trigger: 'blur' }]
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
    back() {
      this.modal.success = false
      this.$router.push({ name: 'pay-task' })
    },
    next() {
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          let pay_local_status = sessionStorage.getItem('pay_local_status') ? JSON.parse(sessionStorage.getItem('pay_local_status')) : {}
          sessionStorage.setItem(
            'pay_local_status',
            JSON.stringify({
              ...pay_local_status,
              has_zhigu_tradition_inspect: true
            })
          )
          Message.success('审核成功')
          this.$router.push({ name: 'pay-zhigu-tradition-list' })
        }
      })
    }
  },
  created() {
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
