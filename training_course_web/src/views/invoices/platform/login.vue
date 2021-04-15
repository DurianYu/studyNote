<template>
  <div class="wisdom-register con-height">
    <!-- <dl> -->
    <!-- <dt>票链平台</dt> -->
    <!-- <dd>本系统是虚拟系统，仅作学习使用</dd> -->
    <!-- </dl> -->
    <div class="form-con">
      <h2 class="title">用户登录</h2>
      <Form ref="form" :model="formData" :rules="rules">
        <FormItem prop="user">
          <Input v-model="formData.user" placeholder="请输入账号" size="large">
            <img slot="prepend" :src="require('@/assets/images/account.png')" alt="-" />
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formData.password" placeholder="请输入密码" size="large">
            <img slot="prepend" :src="require('@/assets/images/password.png')" alt="" />
          </Input>
        </FormItem>
        <FormItem>
          <Checkbox v-model="agree"> 我已阅读并同意<a style="color: #015FFF">《用户使用协议》</a></Checkbox>
        </FormItem>
        <FormItem>
          <Button style="background: #015FFF" class="form-con-btn" type="primary" @click="handleSubmit('form')">确 定</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button, Checkbox, Message } from 'view-design'
import { mapGetters } from 'vuex'
import { roleName, actionCode } from '@/config/index'
import { check_invoice_platfotm_login1, check_invoice_platfotm_login2 } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'
export default {
  components: {
    Form,
    FormItem,
    Input,
    Button,
    Checkbox
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      const actions = new Map([
        [roleName.invoice.manager.roleId, check_invoice_platfotm_login1],
        [roleName.invoice.accounting.roleId, check_invoice_platfotm_login2]
      ])
      return validateCheckForm(rule, value, callback, actions.get(this.currentRole))
    }
    return {
      agree: false,
      formData: {
        user: '',
        password: ''
      },
      rules: {
        // user: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      },
      account: new Map([
        [roleName.invoice.manager.roleId, { user: 'csyh2', psw: '12345678' }],
        [roleName.invoice.accounting.roleId, { user: '13111111111', psw: '' }]
      ])
    }
  },
  computed: {
    ...mapGetters(['currentRole'])
  },
  mounted() {
    this.formData.user = this.account.get(this.currentRole).user
    this.formData.password = this.account.get(this.currentRole).psw
  },
  methods: {
    // 登录
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (!this.agree) {
            Message.warning('请勾选同意用户使用协议')
            return
          }
          switch (this.currentRole) {
            // 会计
            case roleName.invoice.accounting.roleId:
              this.accountingLogin()
              break
            default:
              this.$router.push({ name: 'invoices-platform-user' })
          }
        }
      })
    },
    // 会计登录
    accountingLogin() {
      this.$store.dispatch('changeStatus', { actionid: actionCode.invoice.accounting.a_accounting_login })
      this.$router.push({ name: 'invoices-platform-invoicing' })
    }
  }
}
</script>
<style lang="scss" scoped>
.wisdom-register {
  background-size: cover;
  background-image: url('~@/assets/images/invoice/login-bg.png');
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  .form-con {
    width: 460px;
    padding: 47px 100px;
    background: white;
    box-shadow: 0px 0px 34px 0px rgba(47, 145, 255, 0.1);
    border-radius: 7px;

    .title {
      font-size: 1.8rem;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      line-height: 2rem;
      margin-bottom: 5rem;
      transform: translateX(-65px);
    }
    &-btn {
      width: 100%;
      height: 40px;
      margin: 20px auto 0;
      display: block;
    }
    .ivu-form-item {
      margin-bottom: 30px;
      ::v-deep .ivu-checkbox {
        margin: 0 1rem 0 0.5rem;
      }
    }
    ::v-deep .ivu-avatar {
      > img {
        object-fit: contain;
      }
    }
    ::v-deep .ivu-input-group-prepend {
      border: none;
      background: transparent;
      padding-right: 1rem;
    }
    ::v-deep .ivu-input:focus {
      box-shadow: none;
    }
    ::v-deep input {
      height: 40px;
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom-right-radius: 0;
    }
    .getcode {
      display: flex;
      justify-content: space-between;
      .ipt {
        width: 300px;
      }
      span {
        display: block;
        width: 90px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        background-color: #3a87c6;
        color: #fff;
        border-radius: 4px;
        font-size: 15px;
        cursor: pointer;
      }
    }
    h2 {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
  dt {
    font-size: 60px;
    font-weight: bold;
    color: #fff;
  }
  dd {
    font-size: 30px;
    color: #fff;
  }
}
</style>
