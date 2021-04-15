<template>
  <div class="product-list all-height">
    <!-- <Head>通宇商城</Head> -->
    <img src="@/assets/images/invoice/product-detail.png" alt="" />
    <router-link :to="{ name: 'invoices-product-success' }"> </router-link>
  </div>
</template>

<script>
// import Head from '@/components/common-layout/head'

export default {
  components: {
    // Head
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  position: relative;
  .main-box {
    margin: 80px 0 0 0;
  }
  img {
    width: 100%;
  }

  a {
    width: 40%;
    position: absolute;
    height: 336px;
    top: 32%;
    left: 23%;
  }
}
</style>
