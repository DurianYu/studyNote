<template>
  <div class="detail">
    <p class="back"><Icon type="md-arrow-round-back" @click="$emit('back')" :size="20" /> 交易详情</p>
    <br />
    <div class="basic">
      <div class="item">
        <label>交易哈希：</label>
        <div class="con">{{ dataObj.deal_hash }}</div>
      </div>
      <div class="item">
        <label>状态：</label>
        <div class="con">成功</div>
      </div>
      <div class="item">
        <label>区块高度：</label>
        <div class="con">#{{ dataObj.bc_height }}</div>
      </div>
      <div class="item">
        <label>时间戳：</label>
        <div class="con">{{ dataObj.time }} （{{ dataObj.timeStr }}）</div>
      </div>
    </div>
    <div class="other">
      <div class="item">
        <label>From：</label>
        <div class="con">
          {{ dataObj.from }}
        </div>
      </div>
      <div class="item">
        <label>To：</label>
        <div class="con">
          {{ dataObj.to }}
        </div>
      </div>
      <div class="item">
        <label>Data：</label>
        <div class="con" v-if="currentCourse === 'bc_invoice'">
          <p>发票代码：{{ dataObj.invoice_no }}</p>
          <p>开票方名称：{{ dataObj.drawer_name }}</p>
          <p>开票方识名号：{{ dataObj.drawer_id }}</p>
          <p>客户名称：{{ dataObj.user_name }}</p>
          <p>开票日期：{{ dataObj.invoice_time }}</p>
          <p>校验码：{{ dataObj.token }}</p>
          <p>合计金额：{{ dataObj.money }}</p>
          <p>识别号：{{ dataObj.invoice_id }}</p>
          <p>发票状态：{{ dataObj.invoice_status }}</p>
          <p>开票方公钥：{{ dataObj.drawer_key }}</p>
        </div>
        <div class="con" v-else-if="currentCourse === 'bc_supply_chain_finance'">
          <p>账款金额 {{ dataObj.credit_money }}元</p>
          <p>账款期限 {{ dataObj.credit_time }}（{{ dataObj.creditTimeStr }}）</p>
          <p>账款属性 {{ dataObj.credit_property }}</p>
          <p>关联账款 {{ dataObj.relation_credit }}</p>
          <p>关联合同 {{ dataObj.relation_contract }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'view-design'
import { mapGetters } from 'vuex'
export default {
  props: {
    dataObj: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Icon
  },
  computed: {
    ...mapGetters(['currentCourse'])
  }
}
</script>

<style lang="scss" scoped>
.detail {
  .back {
    i {
      cursor: pointer;
    }
  }
  .header {
    border: 1px solid #eee;
  }
  .basic {
    border: 1px solid #eee;
    padding: 10px 20px;
  }
  .item {
    display: flex;
    line-height: 25px;
    margin: 10px 0;
    label {
      width: 120px;
      text-align: right;
    }
    .con {
      flex: 1;
    }
  }
}
</style>
