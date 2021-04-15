<template>
  <div class="invoice-mode all-height">
    <div class="flex-con">
      <div class="menu">
        <Menu active-name="1" @on-select="onSelect">
          <MenuItem name="1"><Icon type="md-document" />企业用户管理</MenuItem>
          <MenuItem name="2"><Icon type="md-document" />发票工具</MenuItem>
          <MenuItem name="3"><Icon type="md-document" />发票查询</MenuItem>
          <MenuItem name="4"><Icon type="md-document" />受票查询</MenuItem>
          <MenuItem name="5"><Icon type="md-document" />消息管理</MenuItem>
        </Menu>
      </div>
      <div class="invoice-mode-content" style="margin: 1.5rem 0 0 0">
        <Button type="primary" @click="visible = true" v-if="list.length === 0">新增开票员</Button>
        <Divider v-if="list.length === 0" />
        <Table :columns="columns" :data="list" />
        <div v-if="list.length == 0" style="display: flex; justify-content: center; margin-top: 5rem;">
          <img src="@/assets/images/invoice/no-data.png" alt="" />
        </div>
      </div>
    </div>
    <Modal title="新增开票员" v-model="visible" @on-ok="Ok">
      <Form ref="formData" :model="formData" :rules="rules" :label-width="100">
        <FormItem label="用户角色：">
          企业开票员
        </FormItem>
        <FormItem prop="name" label="姓名：">
          <Input v-model="formData.name" size="large" placeholder="请输入开票员的姓名" />
        </FormItem>
        <FormItem prop="phone" label="手机号：">
          <Input v-model="formData.phone" type="number" size="large" placeholder="请输入开票员的手机号码" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { Menu, MenuItem, Icon, Button, Table, Modal, Divider, Form, FormItem, Input, Message } from 'view-design'
import { actionCode, roleStatus } from '@/config/index'
import { mapGetters } from 'vuex'
import { check_invoice_platfotm_user } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'
export default {
  components: {
    Menu,
    MenuItem,
    Icon,
    Button,
    Table,
    Modal,
    Divider,
    Form,
    FormItem,
    Input
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_invoice_platfotm_user)
    }
    return {
      visible: false,
      formData: {
        name: '',
        phone: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      },
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
  computed: {
    ...mapGetters(['statusList']),
    list() {
      // 找到已创建成功的那条状态
      const obj = this.statusList.find(item => item.status_id === roleStatus.invoice.manager.s_manager_accounting_created.status)
      return obj?.data ? [JSON.parse(obj.data)] : []
    }
  },
  methods: {
    onSelect(name) {
      if (name != 1) {
        this.banTip()
      }
    },
    banTip() {
      Message.error('此功能尚未启用')
    },
    Ok() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          Message.success('新增成功')
          const params = {
            name: this.formData.name,
            phone: this.formData.phone,
            glName: '北京通宇集团有限公司',
            number: '91410100749214393L',
            status: '企业开票员',
            date: '2019年8月1日'
          }
          this.$store.dispatch('changeStatus', { actionid: actionCode.invoice.manager.a_manager_add_accounting, data: JSON.stringify(params) })
        } else {
          Message.error('填写错误')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-mode {
  .flex-con {
    height: calc(100% - 130px);
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
</style>
