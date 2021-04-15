<template>
  <div class="core-business">
    <h2 class="font2-b">应付列表</h2>
    <Table :columns="columns" :data="list">
      <template slot="action">
        <a href="javascript:;" @click="visible = true">对账</a>
      </template>
    </Table>
    <Modal title="支付单审核" :visible.sync="visible" @ok="handleSubmit">
      <Form ref="formData" :model="formData" :rules="rules" :label-width="120" style="padding: 0 2rem 0 0 ;">
        <FormItem label="支付金额：" prop="key1">
          <Input v-model="formData.key1" type="text" />
        </FormItem>
        <FormItem label="支付状态：" prop="key2">
          <Select v-model="formData.key2">
            <Option value="已结清">已结清</Option>
          </Select>
        </FormItem>
        <FormItem label="批注：">
          <Input type="textarea" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { Table, Form, FormItem, Select, Option, Input, Message } from 'view-design'
import Modal from '@/components/Modal'
import { roleStatus, actionCode } from '@/config/index'
import { validateCheckForm } from '@/utils/index'
import { check_finance_sys_payment } from '@/config/form-check'
export default {
  components: {
    Table,
    Modal,
    Form,
    FormItem,
    Select,
    Option,
    Input
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_finance_sys_payment)
    }
    return {
      formData: {},
      rules: {
        key1: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key2: [{ required: true, validator: validateCheck, trigger: 'change' }]
      },
      pass: '',
      tabName: 'name1',
      visible: false,
      columns: [
        {
          title: '账款编号',
          key: 'key1',
          align: 'center'
        },
        {
          title: '收单企业',
          key: 'key2',
          align: 'center'
        },
        {
          title: '账款金额',
          key: 'key3',
          align: 'center'
        },
        {
          title: '待支付金额',
          key: 'key4',
          align: 'center'
        },
        {
          title: '到期日',
          key: 'key5',
          align: 'center'
        },
        {
          title: '状态',
          key: 'key6',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ]
    }
  },
  computed: {
    list() {
      const currentEntity = this.$getEntityNewStatus('entity_finance_contract_account')
      if (currentEntity.status_id === roleStatus.finance.entity_finance_contract_account.s_finance_core_can_pay_account.status) {
        return [
          {
            key1: 'SD00001',
            key2: '浙江百维科技有限公司',
            key3: '98000000元',
            key4: '98000000元',
            key5: '2020-07-26',
            key6: '正常'
          }
        ]
      }
      return []
    }
  },
  methods: {
    async handleSubmit() {
      if (this.formData.key2 !== '已结清') {
        Message.warning('请选择支付状态！')
        return
      }
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          await this.$store.dispatch('changeStatus', { actionid: actionCode.finance.a_finance_core_pay_money })
          this.visible = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
