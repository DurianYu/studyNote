<template>
  <div class="invoice-mode all-height">
    <div class="flex-con">
      <div class="menu">
        <Menu active-name="2">
          <MenuItem name="2"><Icon type="md-document" />发票开具</MenuItem>
          <MenuItem name="3" :to="{ name: 'invoices-platform-list' }"><Icon type="md-document" />发票查询</MenuItem>
          <MenuItem name="4"><Icon type="md-document" />受票查询</MenuItem>
          <MenuItem name="5"><Icon type="md-document" />消息管理</MenuItem>
        </Menu>
      </div>
      <div class="invoice-mode-content">
        <div class="invoice-buyerinfo">
          <p>
            <label>接收手机号：</label>
            <span>{{ buyerInfo.phone }}</span>
          </p>
          <p>
            <label>接收邮箱：</label>
            <span>{{ buyerInfo.email }}</span>
          </p>
          <Button v-if="applyStatus" type="primary" @click="visible = true">开票</Button>
        </div>
        <Divider />
        <img :src="invoiceType" alt="" />
      </div>
    </div>
    <Modal v-model="visible" title="开票信息" :loading="loading" @on-ok="handleSubmit">
      <Form ref="formData" :model="formData" :rules="rules" :label-width="140" class="invoice-form">
        <FormItem label="项目名称:" prop="project_name">
          <Input type="text" v-model="formData.project_name" />
        </FormItem>
        <FormItem label="规格型号:" prop="model">
          <Input type="text" v-model="formData.model" />
        </FormItem>
        <FormItem label="单位:" prop="unit">
          <Input type="text" v-model="formData.unit" />
        </FormItem>
        <FormItem label="数量:" prop="amount">
          <Input type="text" v-model="formData.amount" />
        </FormItem>
        <FormItem label="单价:" prop="unit_price">
          <Input type="text" v-model="formData.unit_price" />
        </FormItem>
        <FormItem label="金额:" prop="amount_price">
          <Input type="text" v-model="formData.amount_price" />
        </FormItem>
        <FormItem label="税率:" prop="tax_rate">
          <Input type="text" v-model="formData.tax_rate" />
        </FormItem>
        <FormItem label="税额:" prop="tax_amount">
          <Input type="text" v-model="formData.tax_amount" />
        </FormItem>
        <FormItem label="合计:" prop="total">
          <Input type="text" v-model="formData.total" />
        </FormItem>
        <FormItem label="价税合计（大写）:" prop="price_tax_capitalize">
          <Input type="text" v-model="formData.price_tax_capitalize" />
        </FormItem>
        <FormItem label="价税合计（小写）:" prop="price_tax_lowercase">
          <Input type="text" v-model="formData.price_tax_lowercase" />
        </FormItem>
        <FormItem label="名称:" prop="company_name">
          <Input type="text" v-model="formData.company_name" />
        </FormItem>
        <FormItem label="纳税人识别号:" prop="taxpayer_number">
          <Input type="text" v-model="formData.taxpayer_number" />
        </FormItem>
        <FormItem label="地址:" prop="address">
          <Input type="text" v-model="formData.address" />
        </FormItem>
        <FormItem label="电话:" prop="phone">
          <Input type="number" v-model="formData.phone" />
        </FormItem>
        <FormItem label="开户行:" prop="bank_name">
          <Input type="text" v-model="formData.bank_name" />
        </FormItem>
        <FormItem label="开户账号:" prop="bank_number">
          <Input type="text" v-model="formData.bank_number" />
        </FormItem>
        <FormItem label="收款人:" prop="payee">
          <Input type="text" v-model="formData.payee" />
        </FormItem>
        <FormItem label="复核人:" prop="reviewer">
          <Input type="text" v-model="formData.reviewer" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { Menu, MenuItem, Icon, Button, Divider, Form, FormItem, Input, Modal, Message } from 'view-design'
import { mapGetters } from 'vuex'
import { roleStatus } from '@/config/index'
import { actionCode } from '@/config/index'
import { check_platform_invoice } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'
export default {
  components: {
    Menu,
    MenuItem,
    Icon,
    Button,
    Divider,
    Form,
    FormItem,
    Input,
    Modal
  },
  computed: {
    ...mapGetters(['currentStatus', 'statusList']),
    invoiceType() {
      let type = require('@/assets/images/invoice/invoice1.png')
      switch (this.currentStatus) {
        case roleStatus.invoice.accounting.s_accounting_can_make_wrong_ticket.status || roleStatus.invoice.accounting.s_accounting_has_red_ink.status:
          type = require('@/assets/images/invoice/invoice1.png')
          break
        case roleStatus.invoice.accounting.s_accounting_has_wrong_ticket.status:
          type = require('@/assets/images/invoice/invoice2.png')
          break
        case roleStatus.invoice.accounting.s_accounting_has_remake_ticket.status:
          type = require('@/assets/images/invoice/invoice4.png')
          break
      }
      return type
    },
    applyStatus() {
      return [roleStatus.invoice.accounting.s_accounting_can_make_wrong_ticket.status, roleStatus.invoice.accounting.s_accounting_has_red_ink.status].includes(
        this.currentStatus
      )
    },
    buyerInfo() {
      // 对应的状态
      const obj = this.statusList.find(item => item.status_id === roleStatus.invoice.accounting.s_accounting_can_make_wrong_ticket.status)
      return obj?.data ? JSON.parse(obj.data) : {}
    }
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_platform_invoice)
    }
    return {
      loading: false,
      formData: {
        project_name: '',
        model: '',
        unit: '',
        amount: '',
        unit_price: '',
        amount_price: '',
        tax_rate: '',
        tax_amount: '',
        total: '',
        price_tax_capitalize: '',
        price_tax_lowercase: '',
        company_name: '',
        taxpayer_number: '',
        address: '',
        phone: '',
        bank_name: '',
        bank_number: '',
        payee: '',
        reviewer: ''
      },
      rules: {
        project_name: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        model: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        unit: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        amount: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        unit_price: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        amount_price: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        tax_rate: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        tax_amount: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        total: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        price_tax_capitalize: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        price_tax_lowercase: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        company_name: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        taxpayer_number: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        address: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        phone: [{ required: true, validator: validateCheck, len: 11, trigger: 'blur' }],
        bank_name: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        bank_number: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        payee: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        reviewer: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      },
      visible: false,
      columns: [
        {
          title: '开票员',
          key: 'name',
          align: 'center'
        },
        {
          title: '手机号码',
          key: 'phone',
          align: 'center'
        },
        {
          title: '关联企业名称',
          key: 'glName',
          align: 'center'
        },
        {
          title: '纳税人识别号',
          key: 'number',
          align: 'center'
        },
        {
          title: '用户状态',
          key: 'status',
          align: 'center'
        },
        {
          title: '录入时间',
          key: 'date',
          align: 'center'
        }
      ],
      data: []
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          Message.success('开票成功')
          Message.success('发票已上链，可点击查看发票浏览器')
          this.changeStatus()
        } else {
          Message.error('填写有误')
        }
      })
    },
    async changeStatus() {
      const actionid =
        this.currentStatus === roleStatus.invoice.accounting.s_accounting_can_make_wrong_ticket.status
          ? actionCode.invoice.accounting.a_accounting_make_wrong_ticket
          : actionCode.invoice.accounting.a_accounting_remake_ticket
      await this.$store.dispatch('changeStatus', { actionid })
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-mode {
  .flex-con {
    height: calc(100% - 130px);
    img {
      width: 80%;
    }
  }
  .menu {
    width: 240px;
    .ivu-menu {
      height: 100%;
    }
  }
  &-content {
    flex: 1;
    padding: 0 20px;
    .invoice-buyerinfo {
      display: flex;
      margin: 2.5rem 0 0 0;

      p {
        display: flex;
        margin-right: 50px;
      }
      label {
        display: block;
      }
      button {
        width: 120px;
      }
    }
    h2 {
      font-size: 16px;
      font-weight: bold;
    }
    p {
      margin: 10px 0;
    }
    h3 {
      margin: 20px 0 30px;
      font-weight: bold;
    }
    ul {
      display: flex;
      justify-content: left;
    }
    li {
      text-align: center;
      width: 250px;
      border: 1px solid #eee;
      padding: 30px;
      margin: 0 50px;
      cursor: pointer;
      dt {
        margin-bottom: 15px;
      }
      dd {
        font-size: 12px;
      }
    }
  }
}
.invoice-form {
  height: 400px;
  overflow: auto;
  padding: 0 2rem 0 0;
}
</style>
