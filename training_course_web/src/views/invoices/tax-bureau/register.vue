<template>
  <div class="tax-bureau-register all-height">
    <Head class="thrid-head">国家税务总局北京市电子税务局</Head>
    <div class="main-box page-space-l-t">
      <Steps :current="current">
        <Step title="注册实名账户"></Step>
        <Step title="绑定企业"></Step>
        <Step title="完成注册"></Step>
      </Steps>
      <br />
      <div class="tax-bureau-register-content">
        <Form ref="formData" :model="formData" :rules="rules" :label-width="120" v-if="current === 0">
          <FormItem label="姓名:" prop="userName">
            <Input type="text" v-model="formData.userName" />
          </FormItem>
          <FormItem label="身份证件号码:" prop="id">
            <Input type="text" v-model="formData.id" />
          </FormItem>
          <FormItem label="密码:" prop="password">
            <Input type="password" v-model="formData.password" />
          </FormItem>
          <FormItem label="再次输入:" prop="surePassword">
            <Input type="password" v-model="formData.surePassword" />
          </FormItem>
          <FormItem label="邮箱地址:" prop="email">
            <Input type="text" v-model="formData.email" />
          </FormItem>
          <FormItem label="手机号码:" prop="phone">
            <Input type="number" v-model="formData.phone" />
          </FormItem>
          <!-- <FormItem label="图形验证码:">
          <Input type="text" v-model="formData.codepic" />
        </FormItem>
        <FormItem label="验证码:">
        <Input type="text" v-model="formData.code" />
      </FormItem> -->
          <FormItem class="btn-next-f">
            <Button type="primary" size="large" @click="next">下一步</Button>
          </FormItem>
        </Form>
        <div class="step2" v-else-if="current === 1">
          <p>实名账户注册成功，您的账户信息如下：</p>
          <br />
          <div class="userInfo">
            <p>姓名：{{ formData.userName }}</p>
            <p>身份证件号码：{{ formData.id }}</p>
            <p>手机：{{ formData.phone }}</p>
            <p>邮箱：{{ formData.email }}</p>
            <p>密码：{{ formData.password }}</p>
          </div>
          <br />
          <p>请选择以下单位法定代表人</p>
          <br />
          <Table :columns="columns" :data="[]" border></Table>
          <br />
          <br />
          <br />
          <p>请选择以下单位财务负责人</p>
          <br />
          <Table :columns="columns" :data="list" border @on-selection-change="handleselectList($event, 'selectList')"></Table>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Button type="primary" size="large" class="btn-next-a" @click="bind">绑 定</Button>
        </div>
        <div v-else>
          <Prompt style="margin-top: 0;margin-bottom:0" imgName="home-icon1.png" text="注册成功" />
          <br />
          <Button type="primary" class="btn-next-a" :to="{ name: 'invoices-ticket-office' }">确定</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/common-layout/head'
import { Steps, Step, Form, FormItem, Button, Input, Table, Message } from 'view-design'
import Prompt from '@/components/Prompt'
export default {
  components: {
    Steps,
    Step,
    Form,
    FormItem,
    Button,
    Input,
    Table,
    Prompt,
    Head
  },
  data() {
    const validateSuerPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('两次输入密码保持一致'))
      } else if (this.formData.password !== value) {
        callback(new Error('两次输入密码保持一致'))
      } else {
        callback()
      }
    }
    return {
      current: 0,
      formData: {
        userName: '',
        id: '',
        password: '',
        surePassword: '',
        email: '',
        phone: '',
        codepic: '',
        code: ''
      },
      rules: {
        userName: [{ required: true, type: 'string', min: 2, max: 15, message: '请输入您的真实姓名', trigger: 'blur' }],
        id: [{ required: true, pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份号码', trigger: 'blur' }],
        password: [{ required: true, max: 8, message: '密码规则为不多于8位的字母、数字或者特殊字符', trigger: 'blur' }],
        surePassword: [{ required: true, validator: validateSuerPassword, trigger: 'blur' }],
        email: [{ required: true, type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }],
        phone: [{ required: true, len: 11, message: '请填写您常用的手机号，它将成为以后的登录账号', trigger: 'blur' }]
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '纳税人识别号',
          key: 'id',
          align: 'center'
        },
        {
          title: '纳税人名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '身份',
          key: 'role',
          align: 'center'
        }
      ],
      list: [
        {
          id: '91410100749214393L',
          name: '北京通宇集团有限公司',
          role: '财务负责人'
        }
      ],
      selectList: []
    }
  },
  methods: {
    next() {
      if (this.current === 0) {
        this.$refs['formData'].validate(valid => {
          if (valid) {
            this.current += 1
          }
        })
      } else {
        this.current += 1
      }
    },
    handleselectList(select, type) {
      this[type] = select
    },
    bind() {
      if (!this.selectList.length) {
        Message.error('请先选择')
      } else {
        this.current += 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tax-bureau-register {
  .main-box {
  }
  &-content {
    position: relative;
    form {
      width: 500px;
    }
    .userInfo {
      padding: 30px;
      border: 1px solid #ddd;
      background-color: #eee;
      p {
        line-height: 25px;
      }
    }
  }
}
</style>
