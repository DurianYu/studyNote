<template>
  <div class="add-account">
    <Steps :current="current">
      <Step title="新建账款信息"></Step>
      <Step title="填写交易信息"></Step>
      <Step title="完成"></Step>
    </Steps>
    <br />
    <Form ref="formData" :model="formData" :rules="rules" :label-width="130" v-if="current === 0">
      <FormItem label="供应商名称：" prop="key1">
        <Select v-model="formData.key1">
          <Option value="浙江百维电子科技有限公司" v-if="currentRole === roleName.role_core.roleId">浙江百维电子科技有限公司</Option>
          <Option value="四川海洋科技有限公司" v-if="currentRole === roleName.role_first_supplier.roleId">四川海洋科技有限公司</Option>
          <Option value="深圳锐光科技有限公司" v-if="currentRole === roleName.role_second_supplier.roleId">深圳锐光科技有限公司</Option>
        </Select>
      </FormItem>
      <FormItem label="账单金额：" prop="key2">
        <Input v-model="formData.key2" type="text" />
      </FormItem>
      <FormItem label="账期选择方式：" prop="key3">
        <RadioGroup v-model="formData.key3">
          <Radio label="账期时间" disabled>账期时间</Radio>
          <Radio label="到期日期">到期日期</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="" prop="key4">
        <Input v-model="formData.key4" type="text" placeholder="请输入到期天数">
          <span slot="append">天</span>
        </Input>
      </FormItem>
      <FormItem label="">
        <Button type="primary" size="large" @click="submit1">下一步</Button>
        <Button size="large" :to="{ name: 'supply-chain-sys-accounts-payable' }">取 消</Button>
      </FormItem>
    </Form>
    <Form ref="formData2" :model="formData2" :rules="rules2" :label-width="130" v-else-if="current === 1">
      <FormItem label="合同名称：" prop="key1">
        <Select v-model="formData2.key1">
          <Option value="车子啊物联网系统采购合同" v-if="currentRole === roleName.role_core.roleId">车子啊物联网系统采购合同</Option>
          <Option value="智能终端采购合同" v-if="currentRole === roleName.role_first_supplier.roleId">智能终端采购合同</Option>
          <Option value="屏幕面板采购合同" v-if="currentRole === roleName.role_second_supplier.roleId">屏幕面板采购合同</Option>
        </Select>
      </FormItem>
      <FormItem label="合同编号：" prop="key2">
        <Input v-model="formData2.key2" type="text" />
      </FormItem>
      <FormItem label="合同哈希：">
        BKVD86VBHMJQJBK765DOV5CTRDRTD489
      </FormItem>
      <FormItem label="">
        <Button type="primary" size="large" @click="handleCreate">创建</Button>
        <Button size="large" @click="current -= 1">上一步</Button>
      </FormItem>
    </Form>
    <div class="done" v-else>
      <!-- <Icon type="ios-checkmark-circle" :size="60" color="cadetblue" /> -->
      <img :src="require('@/assets/images/success-toast.png')" style="width: 240px;margin-bottom: 1rem;" alt="" />
      <h3>操作成功</h3>
      <div class="done-content">
        <p>账款编号：SD00001</p>
        <p>
          供应商：{{
            currentRole === roleName.role_core.roleId
              ? '浙江百维电子科技有限公司'
              : currentRole === roleName.role_core.roleId
              ? '四川海洋科技有限公司'
              : '深圳锐光科技有限公司'
          }}
        </p>
        <p>账款金额：98000000</p>
        <p>账款hash：BKVD86VBHMJQJBK765DOV5CTRDR89</p>
      </div>
      <Button type="primary" :to="{ name: 'supply-chain-sys-accounts-payable' }">完 成</Button>
    </div>
  </div>
</template>

<script>
import { Steps, Step, Form, FormItem, Button, Input, Select, Option, Radio, RadioGroup } from 'view-design'
import { actionCode, roleStatus, roleName } from '@/config/index'
import { mapGetters } from 'vuex'
import { validateCheckForm } from '@/utils/index'
import { check_finance_sys_accounts_payable_add, check_finance_sys_accounts_payable_add2 } from '@/config/form-check'
export default {
  components: {
    Steps,
    Step,
    Form,
    FormItem,
    Button,
    Input,
    Select,
    Option,
    Radio,
    RadioGroup
    // Icon
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_finance_sys_accounts_payable_add)
    }
    const validateCheck2 = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_finance_sys_accounts_payable_add2)
    }
    return {
      current: 0,
      roleName: roleName.finance,
      formData: {},
      formData2: {},
      rules: {
        key1: [{ required: true, validator: validateCheck, trigger: 'change' }],
        key2: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key3: [{ required: true, validator: validateCheck, trigger: 'change' }],
        key4: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      },
      rules2: {
        key1: [{ required: true, validator: validateCheck2, trigger: 'change' }],
        key2: [{ required: true, validator: validateCheck2, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['accountApply', 'currentRole'])
  },
  methods: {
    submit1() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.current += 1
        }
      })
    },
    async handleCreate() {
      let actionid = ''
      switch (this.accountApply.newStatus.status_id) {
        case roleStatus.finance.entity_finance_contract_account.s_finance_0_1_account_can_create.status:
          actionid = actionCode.finance.a_finance_0_1_account_0_create
          break
        case roleStatus.finance.entity_finance_contract_account.s_finance_1_2_account_can_create.status:
          actionid = actionCode.finance.a_finance_1_2_account_1_create
          break
        case roleStatus.finance.entity_finance_contract_account.s_finance_2_3_account_can_create.status:
          actionid = actionCode.finance.a_finance_2_3_account_2_create
          break
      }
      this.$refs['formData2'].validate(async valid => {
        if (valid) {
          await this.$store.dispatch('changeStatus', { actionid })
          this.current += 1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  width: 600px;
  margin: 0 auto;
  button {
    margin-right: 20px;
  }
}
.done {
  width: 400px;
  margin: 20px auto;
  text-align: center;
  h3 {
    font-size: 18px;
    margin-bottom: 20px;
  }
  &-content {
    background-color: #eee;
    padding: 20px;
    text-align: left;
    margin-bottom: 30px;
  }
}
</style>
