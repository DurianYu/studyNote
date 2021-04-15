<template>
  <div class="invoice-application all-height">
    <h2>区块链电子发票申请</h2>
    <Form ref="formData" :label-width="100">
      <FormItem label="企业名称:">
        <p>北京通宇集团有限公司</p>
      </FormItem>
      <FormItem label="纳税人识别号:">
        <p>91410100749214393L</p>
      </FormItem>
      <FormItem label="企业地址:">
        <p>北京中关村金融大道8号</p>
      </FormItem>
      <FormItem label="开户银行:">
        <Input type="password" v-model="formData.bank" />
      </FormItem>
      <FormItem label="开户账户:">
        <Input type="text" v-model="formData.account" />
      </FormItem>
      <FormItem label="企业电话:">
        <Input type="text" v-model="formData.phone" />
      </FormItem>
      <FormItem label="发票专用章:">
        <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
          </div>
        </Upload>
      </FormItem>
      <FormItem label="">
        <Checkbox v-model="single"> 我同意并遵守 <a>企业开通区块链电子发票协议</a></Checkbox>
      </FormItem>
      <FormItem>
        <Button type="primary" size="large" @click="handleSubmit">提交申请</Button>
      </FormItem>
    </Form>
    <Modal v-model="visible" title="区块链电子发票授权协议" :mask-closable="false" ok-text="我知道了">
      <p>在您代表贵单位使用区块链电子发票之前务必阅读并同意以下协议：</p>
      <p>一、本单位承诺将严格按照《中华人民共和国发票管理办法》等相关规定使用区块链电子发票，依法申报缴纳税款，并接受税务部门对区块链电子发票的检查。</p>
      <p>
        二、本单位将确保区块链电子发票由本单位及开票员本人掌握和使用。开票员通过其它平台发生的开票行为，均视为本单位的开票行为，因本单位或开票员的原因导致账号被他人使用，造成本单位或其他第三方遭受损失的，由本单位承担全部责任。
      </p>
    </Modal>
  </div>
</template>

<script>
import { Form, FormItem, Button, Icon, Input, Upload, Checkbox, Message, Modal } from 'view-design'
export default {
  components: {
    Form,
    FormItem,
    Button,
    Icon,
    Input,
    Upload,
    Checkbox,
    Modal
  },
  data() {
    return {
      visible: true,
      single: false,
      formData: {
        name: '',
        number: '',
        addr: '',
        bank: '',
        account: '',
        phone: '',
        seal: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      if (!this.single) {
        Message.error('请勾选协议')
        return
      } else {
        sessionStorage.setItem('invoiceSign', true)
        this.$router.push({ name: 'invoices-invoice' })
      }
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
