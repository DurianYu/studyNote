<template>
  <div class="invoice-check all-height">
    <Head class="thrid-head">国家税务总局北京市电子税务局</Head>
    <div class="flex-con page-space-t">
      <div class="menu">
        <Menu active-name="1">
          <MenuItem name="1"><Icon type="md-document" />发票模式</MenuItem>
        </Menu>
      </div>
      <div class="invoice-check-content">
        <div class="invoice-check-content-tip">
          <p>
            <label>模式介绍</label>
            <span>该模式业务自主性强，离开发团队与区块链业务底层进行直连，可在开票流程中进行深度业务扩展</span>
          </p>
          <p>
            <label>适合企业类型</label>
            <span>超大型企业/开票服务商/支付服务商</span>
          </p>
          <p>
            <label>模式优势</label>
            <span>使用业务范围：高频开票的场景智能化、行业通用开票解决方案</span>
          </p>
          <p>
            <label>联系电话</label>
            <span>123456</span>
          </p>
        </div>
        <Button class="btn-next-a" type="primary" size="large" @click="visible = true">确认接入</Button>
      </div>
    </div>
    <Modal title="提示" v-model="visible" :footer-hide="true">
      <p class="tip">接入成功</p>
      <Button type="primary" class="btn-center" :to="{ name: 'invoices-invoice-key' }">确 定</Button>
    </Modal>
  </div>
</template>

<script>
import { Menu, MenuItem, Icon, Button, Modal } from 'view-design'
import Head from '@/components/common-layout/head'

export default {
  components: {
    Head,
    Menu,
    MenuItem,
    Icon,
    Button,
    Modal
  },
  data() {
    return {
      visible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-check {
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
    &-tip {
      // border: 1px solid #eee;
      padding: 10px 20px;
      margin-bottom: 50px;
    }
    p {
      display: flex;
      justify-content: left;
      margin: 10px 0;
      label {
        display: block;
        width: 120px;
      }
    }
  }
}
.tip {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
