<template>
  <div class="detail">
    <h2>融资管理-详情</h2>
    <div class="detail-content">
      <p>
        <label>融资编号：</label>
        <span>{{ dataDetail.key1 }}</span>
      </p>
      <p>
        <label>融资编号hash：</label>
        <span>{{ dataDetail.key7 }}</span>
      </p>
      <p>
        <label>账款编号：</label>
        <span>{{ dataDetail.key8 }}</span>
      </p>
      <p>
        <label>账款hash：</label>
        <span>{{ dataDetail.key9 }}</span>
      </p>
      <p>
        <label>关联账款编号：</label>
        <span>{{ dataDetail.key10 }}</span>
      </p>
      <p>
        <label>关联账款hash：</label>
        <span>{{ dataDetail.key11 }}</span>
      </p>
      <p>
        <label>发单企业：</label>
        <span>{{ dataDetail.key2 }}</span>
      </p>
      <p>
        <label>发单企业链上地址：</label>
        <span>{{ dataDetail.key12 }}</span>
      </p>
      <p>
        <label>转让企业：</label>
        <span>{{ dataDetail.key13 }}</span>
      </p>
      <p>
        <label>转让企业链上地址：</label>
        <span>{{ dataDetail.key14 }}</span>
      </p>
      <p>
        <label>账款金额：</label>
        <span>{{ dataDetail.key1 }}元</span>
      </p>
      <p>
        <label>创建时间：</label>
        <span>{{ dataDetail.key4 }}</span>
      </p>
      <p>
        <label>时间戳：</label>
        <span>{{ dataDetail.key15 }}</span>
      </p>
      <p>
        <label>账款状态：</label>
        <span>{{ dataDetail.key16 }}</span>
      </p>
      <p>
        <label>链上状态：</label>
        <span>{{ dataDetail.key17 }}</span>
      </p>
    </div>
    <Button type="primary" size="large" class="btn-center" :to="{ name: 'supply-chain-sys-review-financing' }">返 回</Button>
  </div>
</template>

<script>
import { Button } from 'view-design'
export default {
  components: {
    Button
  },
  computed: {
    dataDetail() {
      return JSON.parse(this.$route.query.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  h2 {
    font-size: 18px;
    margin-bottom: 20px;
  }
  &-content {
    p {
      display: flex;
      margin: 10px 0;
    }
    label {
      width: 200px;
      text-align: right;
    }
  }
}
</style>
