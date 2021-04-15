<template>
  <div class="apply-claim all-padding">
    <Form ref="formData" :model="formData" :rules="rules" style="width: 50%;" class="page-space-l-t">
      <FormItem label="付款账户" prop="pay_account">
        <Input type="text" v-model="formData.pay_account" disabled />
      </FormItem>
      <FormItem label="收款账户" prop="payee_account">
        <Input type="text" v-model="formData.payee_account" />
      </FormItem>
      <FormItem label="赔付金额" prop="pay_money">
        <Input type="text" v-model="formData.pay_money" />
      </FormItem>
    </Form>
    <Button class="btn-next-a" type="primary" size="large" @click="handleSubmit">确定转账</Button>
  </div>
</template>

<script>
import { actionCode } from '@/config/index'
import {
  Form,
  FormItem,
  Input,
  Button
  // Row,
  // Col
} from 'view-design'
// import { roleStatus } from '@/config/index'
import {
  mapState
  // mapGetters
} from 'vuex'
import { check_insurance_tradition_payfor } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'
export default {
  components: {
    Form,
    FormItem,
    Input,
    Button
    // Row,
    // Col
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_insurance_tradition_payfor)
    }
    return {
      formData: {
        pay_account: '6217 0000 2020 200 600',
        payee_account: '',
        pay_money: ''
      },
      rules: {
        payee_account: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        pay_money: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['teamStatus'])
  },
  methods: {
    async handleSubmit() {
      await this.$store.dispatch('changeStatus', { actionid: actionCode.insurance.a_insurance_old_checker_pay })
      this.$router.push({ name: 'insurance-traditional-insurance-inspect' })
    }
  },
  created() {}
}
</script>
