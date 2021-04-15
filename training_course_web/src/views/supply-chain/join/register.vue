<template>
  <div class="register all-padding">
    <h2 class="font2-b page-space-l-t">注册账号</h2>
    <Form ref="formData" :model="formData" :rules="rules" :label-width="120">
      <FormItem label="手机号码：" prop="key1">
        <Input v-model="formData.key1" type="text" placeholder="请输入您自己的手机号码并牢记" />
      </FormItem>
      <FormItem label="密码：" prop="key2">
        <Input v-model="formData.key2" type="password" placeholder="请输入至少6位数字的密码" />
      </FormItem>
      <FormItem label="短信验证码：" prop="key3">
        <div class="sms-code">
          <Input v-model="formData.key3" type="text" />
          <Button type="primary">获取</Button>
        </div>
      </FormItem>
      <FormItem label="邀请码：" prop="key4">
        <Input v-model="formData.key4" type="text" />
      </FormItem>
    </Form>
    <Button class="btn-next-a" type="primary" size="large" @click="submit">注 册</Button>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'view-design'
import { validateCheckForm } from '@/utils/index'
import { check_finance_join_register } from '@/config/form-check'
export default {
  components: {
    Form,
    FormItem,
    Input,
    Button
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_finance_join_register)
    }
    return {
      formData: {},
      rules: {
        key1: [{ required: true, len: 11, message: '手机号格式错误', trigger: 'blur' }],
        key2: [{ required: true, min: 6, message: '密码格式错误', trigger: 'blur' }],
        key3: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key4: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submit() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.$router.push({ name: 'supply-chain-join-type' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  form {
    width: 500px;
    margin: 50px auto;
  }
}
</style>
