<template>
  <div class="invoice-application all-height">
    <Form ref="formData" :model="formData" :rules="rules" :label-width="120">
      <h2 class="font2">发票信息</h2>
      <Divider />
      <FormItem label="发票类型:" prop="type">
        <RadioGroup v-model="formData.type">
          <Radio label="1">增值税普通电子发票</Radio>
          <Radio label="2" disabled>增值税普通发票</Radio>
          <Radio label="3" disabled>增值税专用发票</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="发票抬头:" prop="header">
        <Input type="text" v-model="formData.header" />
      </FormItem>
      <FormItem label="纳税人识别号:" prop="number">
        <Input type="text" v-model="formData.number" />
      </FormItem>
      <FormItem label="发票金额:">
        <p class="red blod">¥ 15000</p>
      </FormItem>
      <h2>电子发票邮寄地址</h2>
      <Divider />
      <FormItem label="手机:" prop="phone">
        <Input type="number" v-model="formData.phone" />
      </FormItem>
      <FormItem label="邮箱:" prop="email">
        <Input type="text" v-model="formData.email" />
      </FormItem>
      <FormItem class="btn-next-f">
        <Button type="primary" size="large" @click="handleSubmit">提交申请</Button>
      </FormItem>
    </Form>
    <Modal title="提交成功！" v-model="visible" :footer-hide="true">
      <br />
      <p class="center">发票开出后会议短信或邮件的方式发送给您！</p>
      <br />
      <br />
      <Button type="primary" size="large" class="btn-center" @click="$router.push({ name: 'invoices-home' })">返回</Button>
      <br />
    </Modal>
  </div>
</template>

<script>
import { Form, FormItem, Button, Input, Divider, RadioGroup, Radio, Modal } from 'view-design'
import { actionCode } from '@/config/index'
export default {
  components: {
    Form,
    FormItem,
    Button,
    Input,
    Divider,
    RadioGroup,
    Radio,
    Modal
  },
  data() {
    return {
      visible: false,
      single: false,
      formData: {
        type: '',
        header: '',
        number: '',
        phone: '',
        email: ''
      },
      rules: {
        type: [{ required: true, message: '请选择', trigger: 'blur' }],
        header: [{ required: true, message: '请填写', trigger: 'blur' }],
        number: [{ required: true, message: '请填写', trigger: 'blur' }],
        email: [{ required: true, type: 'email', message: '请填写正确的邮箱', trigger: 'blur' }],
        phone: [{ required: true, len: 11, message: '请填写正确的手机号', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.changeStatus()
        }
      })
    },
    async changeStatus() {
      // 申请成功
      const dataObj = {
        phone: this.formData.phone,
        email: this.formData.email
      }
      await this.$store.dispatch('changeStatus', { actionid: actionCode.invoice.buyer.a_buyer_apply_wrong_ticket, data: JSON.stringify(dataObj) })
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-application {
  h2 {
    font-weight: bold;
    margin-top: 40px;
  }
  form {
    width: 600px;
    margin: 0 auto;
  }
}
</style>
