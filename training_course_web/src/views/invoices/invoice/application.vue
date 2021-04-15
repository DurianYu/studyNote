<template>
  <div class="invoice-application all-height">
    <h2 class="font2">区块链电子发票申请</h2>
    <Form ref="formData" :model="formData" :rules="rules" :label-width="100" class="font3">
      <FormItem label="企业名称:">
        <p>北京通宇集团有限公司</p>
      </FormItem>
      <FormItem label="纳税人识别号:">
        <p>91410100749214393L</p>
      </FormItem>
      <FormItem label="企业地址:">
        <p>北京中关村金融大道8号</p>
      </FormItem>
      <FormItem label="开户银行:" prop="bank">
        <Input type="text" v-model="formData.bank" />
      </FormItem>
      <FormItem label="开户账户:" prop="account">
        <Input type="text" v-model="formData.account" />
      </FormItem>
      <FormItem label="企业电话:" prop="phone">
        <Input type="text" v-model="formData.phone" />
      </FormItem>
      <FormItem label="发票专用章:">
        <Button v-if="!sel_chapter" type="primary" class="all-width" @click="modal.chapter = true">选 择</Button>
        <img class="chapter-img" v-if="sel_chapter" :src="sel_chapter" alt="" />
      </FormItem>
      <FormItem label="">
        <Checkbox v-model="single"> 我同意并遵守 <a>企业开通区块链电子发票协议</a></Checkbox>
      </FormItem>
      <div class="btn-next-a" style="bottom: 2rem">
        <Button type="primary" size="large" @click="handleSubmit">提交申请</Button>
      </div>
    </Form>
    <Modal title="区块链电子发票授权协议" v-model="visible" class-name="modal-protocol" :closable="false" :mask-closable="false">
      <p class="font3">在您代表贵单位使用区块链电子发票之前务必阅读并同意以下协议：</p>
      <p class="font3">
        一、本单位承诺将严格按照《中华人民共和国发票管理办法》等相关规定使用区块链电子发票，依法申报缴纳税款，并接受税务部门对区块链电子发票的检查。
      </p>
      <p class="font3">
        二、本单位将确保区块链电子发票由本单位及开票员本人掌握和使用。开票员通过其它平台发生的开票行为，均视为本单位的开票行为，因本单位或开票员的原因导致账号被他人使用，造成本单位或其他第三方遭受损失的，由本单位承担全部责任。
      </p>
      <div slot="footer">
        <span v-if="time_cnt != 0" style="margin: 0 2rem 0 0;">{{ time_cnt + '秒' }}</span>
        <Button type="info" @click="know" :disabled="time_cnt == 0 ? false : true">我知道了</Button>
      </div>
    </Modal>

    <Modal v-model="modal.chapter" class-name="modal-chapter" title="请选择发票专用章" :mask-closable="false" :footer-hide="true">
      <div class="chapter-box">
        <img @click="selectChapter(require('@/assets/images/chapter.png'))" :src="require('@/assets/images/chapter.png')" alt="" />
      </div>
    </Modal>
  </div>
</template>

<script>
import { Form, FormItem, Button, Input, Checkbox, Message, Modal } from 'view-design'
import { actionCode } from '@/config/index'
import { check_application } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'

export default {
  components: {
    Form,
    FormItem,
    Button,
    Input,
    Checkbox,
    Modal
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_application)
    }
    return {
      timer: '',
      sel_chapter: '',
      modal: {
        chapter: false
      },
      time_cnt: 10,
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
      },
      rules: {
        bank: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        account: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        phone: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  methods: {
    selectChapter(img_addr) {
      this.sel_chapter = img_addr
      this.modal.chapter = false
    },
    know() {
      this.visible = false
    },
    countDown() {
      this.timer = setTimeout(() => {
        this.time_cnt -= 1
        if (this.time_cnt != 0) {
          this.countDown()
        }
      }, 1e3)
    },
    handleSubmit() {
      if (!this.single) {
        Message.warning('请勾选协议')
        return
      } else {
        this.$refs['formData'].validate(valid => {
          if (valid) {
            this.$router.push({ name: 'invoices-invoice' })
            this.$store.dispatch('changeStatus', { actionid: actionCode.invoice.manager.a_manager_apply_invoice })
          }
        })
      }
    }
  },
  created() {
    this.countDown()
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.timer)
    })
  }
}
</script>

<style lang="scss" scoped>
.invoice-application {
  h2 {
    padding: 40px 0 0 0;
    font-weight: bold;
    text-align: center;
  }
  form {
    width: 500px;
    margin: 30px auto;
  }
}

.chapter-img {
  max-width: 160px;
  object-fit: contain;
  box-shadow: 0px 0px 34px 0px rgba(47, 145, 255, 0.1);
}

.modal-protocol {
  .ivu-modal-footer {
    > div {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}

.modal-chapter {
  .chapter-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem 0;

    img {
      max-width: 160px;
      object-fit: contain;
      box-shadow: 0px 0px 34px 0px rgba(47, 145, 255, 0.1);
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
