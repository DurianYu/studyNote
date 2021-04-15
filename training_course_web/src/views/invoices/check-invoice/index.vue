<template>
  <div class="invoice-application all-height">
    <h2 class="page-space-t font2">查验发票</h2>
    <Form ref="formData" :model="formData" :rules="rules" :label-width="120">
      <FormItem label="发票代码:" prop="key1">
        <Input type="password" v-model="formData.key1" />
      </FormItem>
      <FormItem label="发票号码:" prop="key2">
        <Input type="text" v-model="formData.key2" />
      </FormItem>
      <FormItem label="开票方识别号:" prop="key3">
        <Input type="text" v-model="formData.key3" />
      </FormItem>
      <FormItem label="校验码:" prop="key4">
        <Input type="text" v-model="formData.key4" />
      </FormItem>
      <FormItem class="btn-next-f">
        <Button type="primary" size="large" @click="handleSubmit">查 验</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Button, Input } from 'view-design'
import { check_invoice } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'
import { actionCode } from '@/config/index'

export default {
  components: {
    Form,
    FormItem,
    Button,
    Input
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_invoice)
    }
    return {
      visible: true,
      single: false,
      formData: {
        key1: '',
        key2: '',
        key3: '',
        key4: ''
      },
      rules: {
        key1: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key2: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key3: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key4: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['formData'].validate(valid => {
        this.$store.dispatch('changeStatus', { actionid: actionCode.invoice.buyer.a_buyer_check_right_ticket })
        this.$router.push({ path: '/invoices/check-result', query: { valid } })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-application {
  h2 {
    font-weight: bold;
    text-align: center;
  }
  form {
    width: 500px;
    margin: 30px auto;
  }
}
</style>
