<template>
  <div class="invoice all-height">
    <Head class="thrid-head">国家税务总局北京市电子税务局</Head>
    <div class="invoice-content">
      <div class="left">
        <h2 class="font2-b">我的企业</h2>
        <dl>
          <dt class="font3">企业名称：</dt>
          <dd class="font3">北京通宇集团有限公司</dd>
          <dt class="font3">纳税人识别号:</dt>
          <dd class="font3">91410100749214393L</dd>
          <dt class="font3">注册地址:</dt>
          <dd class="font3">北京中关村金融大道8号</dd>
        </dl>
      </div>
      <div class="right">
        <img src="@/assets/images/invoice/banner.png" alt="" />
        <div class="text-box">
          <p class="font3">
            区块链电子发票对降低纳税人经营成本、节约社会资源、方便消费者保存使用发票、营造健康公平的税收环境有着重要作用。
          </p>
          <p class="font3">
            如需纸质发票的区块链电子发票开票方/受票方，可以自行打印电子普通发票的版式文件。
            其法律效力、基本用途、基本使用规定等与税务机关监制的增值税普通发票相同。
          </p>
        </div>
        <div class="btn-next-a">
          <Button v-if="invoiceSign" type="primary" :to="{ name: 'invoices-invoice-application' }">申请开通</Button>
        </div>
        <div class="funNav" v-if="!invoiceSign">
          <!-- <h2>功能导航</h2> -->
          <ul>
            <li @click="$router.push({ name: 'invoices-invoice-mode' })">
              <img :src="require('@/assets/images/invoice/fn-1.png')" alt="" />
              <span>开票模式</span>
            </li>
            <li>
              <img :src="require('@/assets/images/invoice/fn-2.png')" alt="" />
              <span>密钥管理</span>
            </li>
            <li>
              <img :src="require('@/assets/images/invoice/fn-3.png')" alt="" />
              <span>开票统计</span>
            </li>
            <li>
              <img :src="require('@/assets/images/invoice/fn-4.png')" alt="" />
              <span>发票查验</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from 'view-design'
import { mapGetters } from 'vuex'
import { roleStatus } from '@/config/index'
import Head from '@/components/common-layout/head'

export default {
  components: {
    Head,
    Button
  },
  computed: {
    ...mapGetters(['currentStatus']),
    invoiceSign() {
      return this.currentStatus === roleStatus.invoice.manager.s_manager_init.status
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice {
  width: 100%;
  &-content {
    display: flex;
    width: 100%;
    height: calc(100% - 80px);
  }
  .left {
    width: 280px;
    padding: 20px;
    background: #f6f6f6;
    height: 100%;
    h2 {
      font-weight: bold;
      color: #000;
      margin-bottom: 2rem;
    }
    dt {
    }
    dd {
      margin: 0.5rem 0 1rem;
    }
  }
  .right {
    height: 100%;
    position: relative;
    flex: 1;
    img {
      width: 100%;
      width: 100%;
      object-fit: cover;
      height: 185px;
    }
    .text-box {
      padding: 3rem 0 0 3rem;
    }
    p {
    }
    .btn-box {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2rem;
    }
    .funNav {
      width: 100%;
      height: 85px;
      position: absolute;
      bottom: 0;

      h2 {
        font-weight: bold;
        margin-bottom: 30px;
      }
      ul {
        width: 100%;
        display: flex;
        justify-content: space-around;
        height: 100%;
        align-items: center;
        background: #f6f6f6;
      }
      li {
        width: 200px;
        height: 50px;
        color: #fff;
        text-align: center;
        line-height: 50px;
        border-radius: 10px;
        font-weight: 500;
        color: #606571;
        &:first-child {
          cursor: pointer;
        }
        img {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }
        span {
          padding: 0 0 0 1.5rem;
        }
      }
    }
  }
}
</style>
