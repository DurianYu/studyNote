<template>
  <div class="page-cre-remit">
    <header>
      <div class="title font2-b">
        汇款人向汇出银行申请汇款，填写汇款单
      </div>
    </header>

    <section class="main">
      <Form ref="formData" :model="formData" :rules="rules" :label-width="200">
        <FormItem label="转出一卡通账号" prop="one_card">
          <Input type="text" v-model="formData.one_card" />
        </FormItem>
        <FormItem label="汇款人姓名" prop="remiter_nmae">
          <Input type="text" v-model="formData.remiter_nmae" />
        </FormItem>
        <FormItem label="汇款人手机号" prop="remiter_tel">
          <Input type="text" v-model="formData.remiter_tel" />
        </FormItem>
        <FormItem label="汇款人地址" prop="remiter_addr">
          <Input type="text" v-model="formData.remiter_addr" />
        </FormItem>
        <FormItem label="收款人姓名" prop="payee_name">
          <Input type="text" v-model="formData.payee_name" />
        </FormItem>
        <FormItem label="收款人账户" prop="payee_account">
          <Input type="text" v-model="formData.payee_account" />
        </FormItem>
        <FormItem label="收款人国家/地区" prop="payee_country">
          <Select v-model="formData.payee_country">
            <Option value="美国">美国</Option>
            <Option value="日本">日本</Option>
            <Option value="韩国">韩国</Option>
            <Option value="英国">英国</Option>
          </Select>
        </FormItem>
        <FormItem label="收款人地址" prop="payee_addr">
          <Input type="text" v-model="formData.payee_addr" />
        </FormItem>
        <FormItem label="汇款币种" prop="remiter_coin_type">
          <Select v-model="formData.remiter_coin_type">
            <Option value="美元">美元</Option>
            <Option value="日元">日元</Option>
            <Option value="欧元">欧元</Option>
            <Option value="澳元">澳元</Option>
          </Select>
        </FormItem>
        <FormItem label="现钞/现汇" prop="paymnet">
          <Select v-model="formData.paymnet">
            <Option value="现汇">现汇</Option>
            <Option value="现钞">现钞</Option>
          </Select>
        </FormItem>
        <FormItem label="可用余额" prop="rest_money">
          <!-- 原型1-3的购汇金额 -->
          <!-- <Input type="text" disabled v-model="formData.rest_money" /> -->
          <!-- {{ check_pay_cre_remit.rest_money }} -->
          2,000.00
        </FormItem>
        <FormItem label="汇款金额" prop="remit_money">
          <Input type="text" v-model="formData.remit_money" />
        </FormItem>
        <FormItem label="收款人开户行SWIFT 代码" prop="payee_swift" v-if="!isCochain">
          <Input type="text" v-model="formData.payee_swift" />
        </FormItem>
        <FormItem label="收款人开户行国家/地区" prop="payee_bank_country">
          <Input type="text" v-model="formData.payee_bank_country" />
        </FormItem>
        <FormItem label="收款人开户行名称" prop="payee_bank_name">
          <Input type="text" v-model="formData.payee_bank_name" />
        </FormItem>
        <FormItem label="收款人开户行所在城市" prop="payee_back_city">
          <Input type="text" v-model="formData.payee_back_city" />
        </FormItem>

        <FormItem class="next">
          <Button type="primary" size="large" @click="next">提交申请</Button>
        </FormItem>
      </Form>
    </section>

    <IModal title="" v-model="modal.success" fullscreen>
      <div class="text-box" style="text-align: center; margin-top: 12rem;">
        <h1>申请成功！</h1>
        <pre style="font-size: 18px">
您的汇款申请已提交，汇款结果将在 7 个工作日内到达对方账户
请耐心等待邮件通知</pre
        >
      </div>
      <div slot="footer" style="display: flex; justify-content: center;">
        <Button size="large" @click="back">返回</Button>
      </div>
    </IModal>
  </div>
</template>

<script>
import { Form, FormItem, Button, Input, Select, Option, Modal as IModal } from 'view-design'
// import Modal from '@/components/Modal'
import { actionCode, roleStatus } from '@/config/index'
import { mapState, mapGetters } from 'vuex'
import { check_pay_cre_remit } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'

export default {
  components: {
    Form,
    FormItem,
    Button,
    Input,
    Select,
    Option,
    IModal
    // Modal
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_pay_cre_remit)
    }
    return {
      check_pay_cre_remit,
      modal: {
        success: false
      },
      formData: {},
      rules: {
        one_card: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        remiter_nmae: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        remiter_tel: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        remiter_addr: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        payee_name: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        payee_account: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        payee_country: [{ required: true, validator: validateCheck, trigger: 'change' }],
        payee_addr: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        remiter_coin_type: [{ required: true, validator: validateCheck, trigger: 'change' }],
        paymnet: [{ required: true, validator: validateCheck, trigger: 'change' }],
        rest_money: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        remit_money: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        payee_swift: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        payee_bank_country: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        payee_bank_name: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        payee_back_city: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    ...mapGetters(['isCochain'])
  },
  methods: {
    back() {
      this.modal.success = false
      this.$router.push({ name: 'pay-task' })
    },
    next() {
      let _this = this
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          let mode = _this.isCochain ? 'new' : 'old'
          await _this.$store.dispatch('changeStatus', { actionid: actionCode.pay[mode][`a_pay_${mode}_write_apply_form`], data: JSON.stringify(this.formData) })
          _this.modal.success = true
        }
      })
    }
  },
  created() {
    let mode = this.isCochain ? 'new' : 'old'
    const result_form = this.teamStatus['entity_payment']?.find(item => item.status_id === roleStatus.pay[mode][`s_pay_${mode}_remitter_buy_success`].status)
    this.formData = Object.assign(this.formData, { rest_money: result_form?.data ? JSON.parse(result_form.data).rest_money : '' })
  }
}
</script>

<style lang="scss" scoped>
.page-cre-remit {
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
