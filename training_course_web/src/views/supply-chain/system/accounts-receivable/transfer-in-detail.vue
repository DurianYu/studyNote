<template>
  <div class="detail">
    <h2 class="font2-b">应收账款管理-转入账款</h2>
    <div class="detail-content">
      <p>
        <label>账款编号：</label>
        <span>{{ dataObj.key1 }}</span>
      </p>
      <p>
        <label>账款hash：</label>
        <span>{{ dataObj.key2 }}</span>
      </p>
      <p>
        <label>关联账款编号：</label>
        <span>{{ dataObj.key3 }}</span>
      </p>
      <p>
        <label>关联账款hash：</label>
        <span>{{ dataObj.key4 }}</span>
      </p>
      <p>
        <label>发单企业：</label>
        <span>{{ dataObj.key5 }}</span>
      </p>
      <p>
        <label>发单企业链上地址：</label>
        <span>{{ dataObj.key6 }}</span>
      </p>
      <p>
        <label>转让企业：</label>
        <span>{{ dataObj.key7 }}</span>
      </p>
      <p>
        <label>转让企业链上地址：</label>
        <span>{{ dataObj.key8 }}</span>
      </p>
      <p>
        <label>账款金额：</label>
        <span>{{ dataObj.key9 }}</span>
      </p>
      <p>
        <label>创建时间：</label>
        <span>{{ dataObj.key10 }}</span>
      </p>
      <p>
        <label>时间戳：</label>
        <span>{{ dataObj.key11 }}</span>
      </p>
      <p>
        <label>账款状态：</label>
        <span>{{ dataObj.key12 }}</span>
      </p>
      <p>
        <label>链上状态：</label>
        <span>{{ dataObj.key13 }}</span>
      </p>
    </div>
    <Button type="primary" size="large" class="btn-center" @click="$router.back(-1)">返 回</Button>
  </div>
</template>

<script>
import { Button } from 'view-design'
export default {
  components: {
    Button
  },
  computed: {
    dataObj() {
      return JSON.parse(this.$route.query.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  h2 {
    // font-size: 18px;
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
