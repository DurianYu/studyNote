<template>
  <div class="review">
    <h3>企业管理-企业信息审核</h3>
    <div class="review-title">
      <h2>企业审核</h2>
      <Button type="primary" @click="reviewVisible = true">开始审核</Button>
    </div>
    <div class="review-fk">
      <img src="@/assets/images/sc/review-1.png" alt="" />
      <dl>
        <dt>风控评级： <span>信用良好</span></dt>
        <dd>评测时间：2019-07-25</dd>
      </dl>
    </div>
    <Card>
      <p slot="title">基本信息</p>
      <ul class="review-info">
        <li>核心企业编号：BJ000001</li>
        <li>企业名称：{{ dataItem.formData.key1 }}</li>
        <li>统一社会信用代码：{{ dataItem.formData.key2 }}</li>
        <li>法人代表姓名：{{ dataItem.formData.key8 }}</li>
        <li>创建时间：2019-09-10</li>
        <li>最近更新时间：2019-09-10</li>
        <li>状态：待审核</li>
      </ul>
      <p class="review-info-other">电签持有者姓名：{{ dataItem.formData2.key1 }}</p>
      <p class="review-info-other">电签持有者身份证号：{{ dataItem.formData2.key3 }}</p>
      <p class="review-info-other">电签持有者手机号：{{ dataItem.formData2.key2 }}</p>
    </Card>
    <Modal title="企业审核" :visible.sync="reviewVisible" @ok="ok">
      <Form :label-width="120">
        <FormItem label="审核结果：">
          <Select v-model="pass">
            <Option value="1">通过</Option>
            <Option value="2">不通过</Option>
          </Select>
        </FormItem>
        <FormItem label="批注：">
          <Input type="textarea" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { Button, Card, Form, FormItem, Input, Select, Option, Message } from 'view-design'
import Modal from '@/components/Modal'
import { mapGetters } from 'vuex'
export default {
  components: {
    Button,
    Card,
    Modal,
    Form,
    FormItem,
    Input,
    Select,
    Option
  },
  data() {
    return {
      reviewVisible: false,
      pass: ''
    }
  },
  computed: {
    ...mapGetters(['currentRole']),
    dataItem() {
      console.log(JSON.parse(this.$route.query.data))
      return JSON.parse(this.$route.query.data)
    }
  },
  methods: {
    async ok() {
      if (this.pass != '1') {
        Message.warning('请选择通过！')
        return
      }
      this.$router.push({ name: 'supply-chain-sys-review-admin', query: { ...this.$route.query } })
    }
  }
}
</script>

<style lang="scss" scoped>
.review {
  &-title {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    h2 {
      font-size: 18px;
      font-weight: bold;
      margin-top: 12px;
    }
  }
  &-fk {
    margin: 20px 0 40px;
    display: flex;
    padding: 0 50px;
    align-items: center;
    img {
      height: 60px;
      margin-right: 60px;
    }
    dd {
      font-size: 12px;
      margin-top: 9px;
    }
    span {
      color: #86c553;
      font-size: 16px;
    }
  }
  &-info {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 33%;
      line-height: 30px;
    }
    p {
      line-height: 30px;
    }
  }
  &-info-other {
    line-height: 30px;
  }
}
</style>
