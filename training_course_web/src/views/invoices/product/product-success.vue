<template>
  <div class="product-list all-height">
    <!-- <Head>通宇商城</Head> -->
    <img src="@/assets/images/invoice/product-success.png" alt="" />
    <!-- <dl>
      <dt>购买成功</dt>
      <dd>订单编号：AH1263296224</dd>
      <dd>实付金额：15000元</dd>
    </dl> -->
    <div class="btn-next-a">
      <Button size="large" type="primary" :to="{ name: 'invoices-invoice-apply' }" v-if="received">申请开票</Button>
      <Button size="large" type="primary" v-if="!received" @click="handleReceive">确认收货</Button>
    </div>
  </div>
</template>

<script>
import { Button, Message } from 'view-design'
// import Head from '@/components/common-layout/head'

export default {
  components: {
    // Head,
    Button
  },
  data() {
    return {
      received: false
    }
  },
  methods: {
    // 确认收货
    handleReceive() {
      this.received = true
      Message.success('收货成功！')
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  img {
    width: 100%;
  }
  dl {
    padding: 140px 60px;
    float: left;
    border-left: 1px solid #ddd;
    dt {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
    }
    dd {
      line-height: 30px;
    }
  }
  .action {
    text-align: right;
    clear: both;
    padding: 30px 0;
    border-top: 1px solid #ddd;
    button {
      margin: 0 30px;
    }
  }
  // position: relative;
  // a {
  //   display: block;
  //   width: 109px;
  //   height: 34px;
  //   position: absolute;
  //   left: 441px;
  //   top: 209px;
  // }
}
</style>
