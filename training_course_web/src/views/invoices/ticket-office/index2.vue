<template>
  <div class="ticket-office all-height">
    <Head class="thrid-head">国家税务总局北京市电子税务局</Head>
    <div class="main-box">
      <img src="@/assets/images/invoice/shuiwuju-bg4.png" class="shuiwuju-bg3" alt="" />
      <div class="btn-next-a">
        <Button type="primary" :to="{ name: 'invoices-invoice' }">下一步</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/common-layout/head'
import { Button } from 'view-design'

export default {
  components: {
    Head,
    Button
  }
}
</script>

<style lang="scss" scoped>
.ticket-office {
  .main-box {
    padding: 2rem 2rem 0 2rem;
  }
  img {
    width: 100%;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    margin: 2rem 0 0 0;
  }
}
</style>
