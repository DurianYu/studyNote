<template>
  <div class="tax-bureau all-height">
    <!-- <Head>税务局</Head> -->
    <div class="main-box page-space-l-t">
      <img src="@/assets/images/invoice/shuiwuju.png" alt="" />
      <div class="btn-next-a">
        <Button type="primary" :to="{ name: 'invoices-tax-bureau-register' }">申请开通</Button>
      </div>
    </div>
  </div>
</template>

<script>
// import Head from '@/components/common-layout/head'
import { Button } from 'view-design'

export default {
  components: {
    // Head,
    Button
  }
}
</script>

<style lang="scss" scoped>
.tax-bureau {
  position: relative;
  .main-box {
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
