<template>
  <div class="invoice-mode all-height">
    <div class="flex-con">
      <div class="menu">
        <Menu active-name="3" @on-select="onSelect">
          <!-- <MenuItem name="1"><Icon type="md-document" />企业用户管理</MenuItem> -->
          <MenuItem name="2" :to="{ name: 'invoices-platform-invoicing' }"><Icon type="md-document" />发票工具</MenuItem>
          <MenuItem name="3"><Icon type="md-document" />发票查询</MenuItem>
          <MenuItem name="4"><Icon type="md-document" />受票查询</MenuItem>
          <MenuItem name="5"><Icon type="md-document" />消息管理</MenuItem>
        </Menu>
      </div>
      <div class="invoice-mode-content page-space-t">
        <img src="@/assets/images/invoice/red-punch.png" class="red-punch" alt="" />
        <br />
        <Button class="btn-next-a" type="primary" size="large" @click="handleSubmit">开 票</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Menu, MenuItem, Icon, Button, Message } from 'view-design'
import { actionCode } from '@/config/index'
export default {
  components: {
    Menu,
    MenuItem,
    Icon,
    Button
  },
  data() {
    return {
      visible: false,
      formData: {
        name: '',
        phone: ''
      }
    }
  },
  methods: {
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
    async handleSubmit() {
      await this.$store.dispatch('changeStatus', { actionid: actionCode.invoice.accounting.a_accounting_red_ink })
      Message.success('开票成功')
      Message.success('发票已上链，可点击查看发票浏览器')
      this.$router.push({ name: 'invoices-platform-list' })
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
  }
  .red-punch {
    width: 80%;
    display: block;
  }
}
</style>
