<template>
  <div class="invoice-application all-height">
    <h2 class="page-space-t font2">查验结果</h2>
    <div class="result font3" v-if="valid == 'true'">
      <p>发票代码：162234888770</p>
      <p>发票号码： 00000013</p>
      <p>开票方识别号：91410100749214393L</p>
      <p>开票方名称：北京通宇集团有限公司</p>
      <p>客户名称：北京市海淀区汽车租赁有限公司</p>
      <p>开票日期：2019-09-01</p>
      <p>校验码：888888</p>
      <p>合计金额：16950.00</p>
      <p>发票状态：已开票</p>
    </div>
    <div v-else class="miss">
      <img :src="require('@/assets/images/miss.png')" alt="" />
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valiad: true,
      visible: true,
      single: false,
      formData: {
        key1: '',
        key2: '',
        key3: '',
        key4: ''
      }
    }
  },
  created() {
    this.valid = this.$route.query.valid
  }
}
</script>

<style lang="scss" scoped>
.invoice-application {
  h2 {
    font-weight: bold;
    text-align: center;
  }
  .result {
    width: 500px;
    margin: 30px auto;
  }
  .miss {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    margin: 2.5rem 0 0 0;

    span {
      margin: -120px 0 0 0;
    }
  }
}
</style>
