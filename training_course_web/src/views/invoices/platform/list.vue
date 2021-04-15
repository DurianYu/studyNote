<template>
  <div class="invoice-mode all-height">
    <div class="flex-con w-100">
      <div class="menu">
        <Menu active-name="3" @on-select="onSelect">
          <!-- <MenuItem name="1"><Icon type="md-document" />企业用户管理</MenuItem> -->
          <MenuItem name="2" :to="{ name: 'invoices-platform-invoicing' }"><Icon type="md-document" />发票开具</MenuItem>
          <MenuItem name="3"><Icon type="md-document" />发票查询</MenuItem>
          <MenuItem name="4"><Icon type="md-document" />受票查询</MenuItem>
          <MenuItem name="5"><Icon type="md-document" />消息管理</MenuItem>
        </Menu>
      </div>
      <div class="invoice-mode-content" style="margin: 2.5rem 0 0 0; width: calc(100% - 240px);">
        <Table :columns="columns" :data="list">
          <template slot="action">
            <Button type="text" size="small" @click="picVisible = true">查看</Button>
            <Button type="text" size="small" @click="banTip">下载</Button>
            <Button type="text" size="small" @click="banTip">邮件</Button>
            <Button type="text" size="small" v-if="applyRedInk" @click="$router.push({ name: 'invoices-platform-red-punch' })">红冲</Button>
          </template>
        </Table>
        <br />
        <p class="center" v-if="list.length === 1">已累计开票金额：16950， 税额合计：1950</p>
      </div>
    </div>
    <Modal title="题目" :visible="visible" :footerHide="true">
      <h3 class="title">此时，已累计开票金额为多少元，税额合计为多少元？</h3>
      <br />
      <CheckboxGroup v-model="checkbox">
        <Checkbox label="A"> A: 0元，0元</Checkbox>
        <br />
        <br />
        <Checkbox label="B"> B: 33900元，3900元</Checkbox>
        <br />
        <br />
        <Checkbox label="C"> C: 16950元，1950元</Checkbox>
      </CheckboxGroup>
      <Button type="primary" @click="Ok" class="btn-center">确 定</Button>
    </Modal>
    <Modal title="发票" :visible.sync="picVisible" :footerHide="true" :width="1000" :closable="true" @on-visible-change="onChange">
      <img src="@/assets/images/invoice/invoice2.png" style="width: 100%" alt="" />
    </Modal>
  </div>
</template>

<script>
import { Menu, MenuItem, Icon, Button, Table, Message, CheckboxGroup, Checkbox } from 'view-design'
import { mapGetters } from 'vuex'
import { roleStatus } from '@/config/index'
import Modal from '@/components/Modal'
export default {
  components: {
    Menu,
    MenuItem,
    Icon,
    Button,
    Table,
    Modal,
    CheckboxGroup,
    Checkbox
  },
  data() {
    return {
      checkbox: [],
      visible: false,
      picVisible: false,
      formData: {
        name: '',
        phone: ''
      },
      columns: [
        {
          title: '开票日期',
          key: 'key1',
          align: 'center',
          width: 140
        },
        {
          title: '发票代码',
          key: 'key2',
          align: 'center',
          width: 140
        },
        {
          title: '发票号码',
          key: 'key3',
          align: 'center',
          width: 140
        },
        {
          title: '购买方名称',
          key: 'key4',
          align: 'center',
          width: 200
        },
        {
          title: '购买方税号',
          key: 'key5',
          align: 'center',
          width: 200
        },
        {
          title: '价税合计',
          key: 'key6',
          align: 'center',
          width: 100
        },
        {
          title: '开票类型',
          key: 'key7',
          align: 'center',
          width: 100
        },
        {
          title: '发票状态',
          key: 'key8',
          align: 'center',
          width: 100
        },
        {
          title: '开具结果',
          key: 'key9',
          align: 'center',
          width: 100
        },
        {
          title: '操作',
          align: 'center',
          width: 230,
          slot: 'action'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentStatus']),
    applyRedInk() {
      return this.currentStatus === roleStatus.invoice.accounting.s_accounting_has_apply_red_ink.status
    },
    // 列表数据
    list() {
      const obj = {
        key1: '2019年9月1日',
        key2: '141011809110',
        key3: '00000012',
        key4: '北京海淀汽车租赁有限公司',
        key5: '91510100584963010R',
        key6: '16950',
        key7: '蓝字',
        key8: '正常',
        key9: '开具成功'
      }
      let arr = []
      switch (this.currentStatus) {
        case roleStatus.invoice.accounting.s_accounting_has_wrong_ticket.status:
          arr = [obj]
          break
        case roleStatus.invoice.accounting.s_accounting_has_apply_red_ink.status:
          arr = [obj]
          break
        case roleStatus.invoice.accounting.s_accounting_has_red_ink.status:
          arr = [
            { ...obj, key8: '已红冲' },
            { ...obj, key7: '红字', key2: '141011809111', key3: '00000013' }
          ]
          break
        case roleStatus.invoice.accounting.s_accounting_has_remake_ticket.status:
          arr = [
            { ...obj, key8: '已红冲' },
            { ...obj, key7: '红字', key2: '141011809111', key3: '00000013' },
            { ...obj, key4: '北京市海淀区汽车租赁有限公司', key2: '162234888770', key3: '00000014' }
          ]
          break
        default:
          arr = []
          break
      }
      return arr
    }
  },
  created() {
    const timer = setTimeout(() => {
      // 如果状态为已红冲就弹出题目
      if (this.currentStatus === roleStatus.invoice.accounting.s_accounting_has_red_ink.status) this.visible = true
    }, 5000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
    })
  },
  methods: {
    onChange(state) {
      console.log('dddd', state)
      this.picVisible = state
    },
    onSelect(name) {
      switch (name) {
        case '4':
        case '5':
          this.banTip()
          return
        default:
      }
    },
    banTip() {
      Message.error('此功能尚未启用')
    },
    Ok() {
      if (this.checkbox.length === 1 && this.checkbox[0] === 'A') {
        Message.success('回答正确')
      } else {
        Message.error('回答错误')
      }
      this.visible = false
      // this.$router.push({ name: 'invoices-platform-invoicing' })
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
