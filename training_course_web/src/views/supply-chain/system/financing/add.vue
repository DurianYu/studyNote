<template>
  <div class="core-business">
    <h3 class="font2-b">融资管理-申请融资</h3>
    <Steps :current="current">
      <Step title="新建账款信息"></Step>
      <Step title="完成"></Step>
    </Steps>
    <br />
    <Form class="form" ref="formData" :model="formData" :rules="rules" :label-width="120" v-if="current === 0">
      <FormItem label="保理商：">
        <Input value="北京招商保理公司" disabled />
      </FormItem>
      <FormItem label="融资金额：" prop="key2">
        <Input v-model="formData.key2" type="text">
          <span slot="append">元</span>
        </Input>
        <p>融资金额小于原金额，信条将会被自动拆分</p>
      </FormItem>
      <FormItem label="融资利率：">
        <Input value="4.5" disabled>
          <span slot="append">%</span>
        </Input>
        <p>融资利率与保利商线下确定更改后方可变更</p>
      </FormItem>
      <FormItem label="备注：" prop="key4">
        <Input v-model="formData.key4" />
      </FormItem>
      <FormItem label="">
        <Button type="primary" size="large" @click="handleSubmit">提 交</Button>
        <Button type="primary" size="large">取 消</Button>
      </FormItem>
    </Form>
    <div class="done" v-else>
      <!-- <Icon type="ios-checkmark-circle" :size="60" color="cadetblue" /> -->
      <img :src="require('@/assets/images/success-toast.png')" style="width: 240px;margin-bottom: 1rem;" alt="" />
      <h2>操作成功</h2>
      <div class="done-content">
        <p>融资金额：{{ financeInfo.key4 }}</p>
        <p>融资利率：{{ financeInfo.key6 }}%</p>
        <p>融资单hash：{{ financeInfo.key7 }}</p>
      </div>
      <Button type="primary" :to="{ name: 'supply-chain-sys-financing' }">完 成</Button>
    </div>
  </div>
</template>

<script>
import { Steps, Step, Modal, Form, FormItem, Input, Button } from 'view-design'
import { actionCode, roleName } from '@/config/index'
import { mapGetters } from 'vuex'
import { financeData } from '../data'
import { validateCheckForm } from '@/utils/index'
import { check_finance_financing_add, check_finance_financing_add2, check_finance_financing_add3 } from '@/config/form-check'
export default {
  components: {
    Form,
    FormItem,
    Input,
    Button,
    Steps,
    Step
    // Icon
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      const actions = new Map([
        [this.roleName.role_first_supplier.roleId, check_finance_financing_add],
        [this.roleName.role_second_supplier.roleId, check_finance_financing_add2],
        [this.roleName.role_third_supplier.roleId, check_finance_financing_add3]
      ])
      return validateCheckForm(rule, value, callback, actions.get(this.currentRole))
    }
    return {
      roleName: roleName.finance,
      current: 0,
      formData: {},
      rules: {
        key2: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['currentRole']),
    financeInfo() {
      let obj = {}
      switch (this.currentRole) {
        case roleName.finance.role_first_supplier.roleId:
          obj = { ...financeData.supplier1 }
          break
        case roleName.finance.role_second_supplier.roleId:
          obj = { ...financeData.supplier2 }
          break
        case roleName.finance.role_third_supplier.roleId:
          obj = { ...financeData.supplier3 }
          break
      }
      return obj
    }
  },
  methods: {
    // 确认弹窗
    handleSubmit() {
      let _valid = false
      this.$refs['formData'].validate(valid => {
        _valid = valid
      })
      if (!_valid) return
      Modal.confirm({
        title: '确认提示',
        content:
          this.currentRole === roleName.finance.role_first_supplier.roleId
            ? `本账款申请融资，将会将元账款拆分为两个账款，申请融资账款将转让给资金方，金额为5000万元，保留剩余账款金额为2600万元，是否继续？`
            : this.currentRole === roleName.finance.role_second_supplier.roleId
            ? '本账款申请融资，将会将元账款拆分为两个账款，申请融资账款将转让给资金方，金额为1000万元，保留剩余账款金额为350万元，是否继续？'
            : '本账款申请融资，将会将元账款拆分为两个账款，申请融资账款将转让给资金方，金额为500万元，保留剩余账款金额为350万元，是否继续？',
        onOk: () => {
          this.handleCreate()
        }
      })
    },
    async handleCreate() {
      let actionid = ''
      switch (this.currentRole) {
        case roleName.finance.role_first_supplier.roleId:
          actionid = actionCode.finance.a_finance_order_1_apply
          break
        case roleName.finance.role_second_supplier.roleId:
          actionid = actionCode.finance.a_finance_order_2_apply
          break
        case roleName.finance.role_third_supplier.roleId:
          actionid = actionCode.finance.a_finance_order_3_apply
          break
      }
      await this.$store.dispatch('changeStatus', { actionid })
      this.current = 1
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.form {
  width: 500px;
  margin: 50px auto;
  button {
    margin-right: 10px;
  }
}
.done {
  width: 400px;
  margin: 20px auto;
  text-align: center;
  h2 {
    font-size: 18px;
    margin-bottom: 20px;
    text-align: center;
  }
  &-content {
    background-color: #eee;
    padding: 20px;
    text-align: left;
    margin-bottom: 30px;
  }
}
</style>
