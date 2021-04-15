<template>
  <div class="invoice-mode all-height">
    <Head class="thrid-head">国家税务总局北京市电子税务局</Head>
    <div class="flex-con page-space-t">
      <div class="menu font2">
        <Menu active-name="2">
          <MenuItem name="1"><Icon type="md-document" />首页</MenuItem>
          <MenuItem name="2"><Icon type="md-document" />开票模式</MenuItem>
          <MenuItem name="3"><Icon type="md-document" />密钥管理</MenuItem>
          <MenuItem name="4"><Icon type="md-document" />开票统计</MenuItem>
          <MenuItem name="4"><Icon type="md-document" />发票查验</MenuItem>
          <MenuItem name="4"><Icon type="md-document" />收票服务</MenuItem>
        </Menu>
      </div>
      <div class="invoice-mode-content">
        <h2 class="font2">开票模式</h2>
        <p class="font3">
          开票模式分为服务商模式和自主开票模式，均为免费接入，请根据您的企业类型选择
        </p>
        <h3 class="font2">请选择开票模式</h3>
        <ul>
          <li>
            <!-- <dl>
              <dt>代理开票</dt>
              <dd>适合中小商户</dd>
              <dd>需要截图开票服务商进行代理开票</dd>
            </dl> -->
            <img src="@/assets/images/invoice/mode1.png" alt="" />
          </li>
          <li @click="$router.push({ name: 'invoices-invoice-check' })">
            <!-- <dl>
              <dt>自主开票</dt>
              <dd>适合有自主的开发能力的大型企业</dd>
              <dd>需要系统对接</dd>
            </dl> -->
            <img src="@/assets/images/invoice/mode2.png" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/common-layout/head'

import { Menu, MenuItem, Icon } from 'view-design'
export default {
  components: {
    Head,
    Menu,
    MenuItem,
    Icon
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
      border: 1px solid #eee;
      margin: 0 1rem;
      cursor: pointer;
      cursor: pointer;
      img {
        width: 180px;
      }
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
