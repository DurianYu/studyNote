<template>
  <div class="core-business">
    <h3>应付账款管理-转出账款</h3>
    <Steps :current="current">
      <Step title="新建账款信息"></Step>
      <Step title="完成"></Step>
    </Steps>
    <br />
    <Form class="form" ref="formData" :model="formData" :rules="rules" :label-width="120" v-if="current === 0">
      <FormItem prop="key1" label="供应商名称：">
        <Select v-model="formData.key1">
          <!-- <Option value="浙江百维电子科技有限公司" v-if="currentRole === roleName.role_core.roleId">浙江百维电子科技有限公司</Option> -->
          <Option value="四川海洋科技有限公司" v-if="currentRole === roleName.role_first_supplier.roleId">四川海洋科技有限公司</Option>
          <Option value="深圳锐光科技有限公司" v-if="currentRole === roleName.role_second_supplier.roleId">深圳锐光科技有限公司</Option>
        </Select>
      </FormItem>
      <FormItem prop="key2" label="转让金额：">
        <Input v-model="formData.key2" type="text">
          <span slot="append">元</span>
        </Input>
      </FormItem>
      <FormItem prop="key3" label="合同名称：">
        <Select v-model="formData.key3">
          <Option value="智能终端采购合同" v-if="currentRole === roleName.role_first_supplier.roleId">智能终端采购合同</Option>
          <Option value="屏幕面板采购合同" v-if="currentRole === roleName.role_second_supplier.roleId">屏幕面板采购合同</Option>
        </Select>
      </FormItem>
      <FormItem prop="key4" label="合同编号：">
        <Input v-model="formData.key4" type="text" />
      </FormItem>
      <FormItem label="合同哈希">
        <p>在确定万合同名称和编号时自动获取。</p>
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
        <p>转让编号：{{ transferInfo.key1 }}</p>
        <p>关联账款：{{ transferInfo.key2 }}</p>
        <p>供应商：{{ transferInfo.key3 }}</p>
        <p>账款金额：{{ transferInfo.key4 }}</p>
        <p>账款hash：{{ transferInfo.key5 }}</p>
      </div>
      <Button type="primary" :to="{ name: 'supply-chain-sys-transfer-out' }">完 成</Button>
    </div>
  </div>
</template>

<script>
import { Steps, Step, Modal, Form, FormItem, Input, Button, Select, Option } from 'view-design'
import { roleName, actionCode } from '@/config/index'
import { mapGetters } from 'vuex'
import { validateCheckForm } from '@/utils/index'
import { check_finance_sys_transfer_out_add, check_finance_sys_transfer_out_add2 } from '@/config/form-check'
export default {
  components: {
    Form,
    FormItem,
    Input,
    Button,
    Select,
    Option,
    Steps,
    Step
    // Icon
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      const actions = new Map([
        [this.roleName.role_first_supplier.roleId, check_finance_sys_transfer_out_add],
        [this.roleName.role_second_supplier.roleId, check_finance_sys_transfer_out_add2]
      ])
      return validateCheckForm(rule, value, callback, actions.get(this.currentRole))
    }
    return {
      roleName: roleName.finance,
      current: 0,
      formData: {},
      rules: {
        key1: [{ required: true, validator: validateCheck, trigger: 'change' }],
        key2: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key3: [{ required: true, validator: validateCheck, trigger: 'change' }],
        key4: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['currentRole']),
    transferInfo() {
      let obj = {}
      if (this.currentRole === roleName.finance.role_first_supplier.roleId) {
        obj = {
          key1: 'BW00002',
          key2: 'SD00001',
          key3: '四川海洋科技有限公司',
          key4: '22000000',
          key5: '64c0853b98242d6e3eca9225b6ff12af4335e25337e1b5bde2b5603e04ba9f9f'
        }
      } else if (this.currentRole === roleName.finance.role_second_supplier.roleId) {
        obj = {
          key1: 'HY00003',
          key2: 'BW00002',
          key3: '深圳锐光科技有限公司',
          key4: '8500000',
          key5: '209339770eada6106ff47c2eb1f81001c3589925a9acaf93283ee1e862c4d439'
        }
      }
      return obj
    }
  },
  methods: {
    // 确认弹窗
    handleSubmit() {
      let _valid = false
      this.$refs['formData'].validate(async valid => {
        _valid = valid
      })
      if (!_valid) return
      Modal.confirm({
        title: '确认提示',
        content:
          this.currentRole === roleName.finance.role_first_supplier.roleId
            ? `由于转让的金额小于原账款金额，转让成功后原账款将被拆分为2个账款：转出账款金额：22000000元，将转让给四川海洋科技有限公司；保留账款金额76000000，将继续持有。是否继续？`
            : `由于转让的金额小于原账款金额，转让成功后原账款将被拆分为2个账款：转出账款金额：8500000元，将转让给四川海洋科技有限公司；保留账款金额13500000，将继续持有。是否继续？`,
        onOk: () => {
          this.handleCreate()
        }
      })
    },
    async handleCreate() {
      let actionid = ''
      switch (this.currentRole) {
        case roleName.finance.role_first_supplier.roleId:
          actionid = actionCode.finance.a_finance_1_2_account_1_create
          break
        case roleName.finance.role_second_supplier.roleId:
          actionid = actionCode.finance.a_finance_2_3_account_2_create
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
  padding: 0 20px;
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
