<template>
  <div class="review">
    <div class="review-title">
      <h2>企业管理-企业信息审核</h2>
      <Button type="primary" @click="reviewVisible = true">开始审核</Button>
    </div>
    <div class="review-fk">
      <img src="@/assets/images/sc/review-1.png" alt="" />
      <dl>
        <dt>风控评级： <span>信用良好</span></dt>
        <dd>评测时间：2019-09-10</dd>
      </dl>
    </div>
    <Card>
      <p slot="title">基本信息</p>
      <ul class="review-info">
        <li>用户ID：KB6K94NJ3F</li>
        <li>所属企业：{{ dataItem.formData.key1 }}</li>
        <li>企业类型：{{ $route.query.id == '0' ? '核心企业' : '供应商' }}</li>
        <li>联系人手机：{{ dataItem.formData.key6 }}</li>
        <li>创建时间：2019-09-10</li>
        <li>最近更新时间：2019-09-10</li>
        <li>状态：待审核</li>
      </ul>
    </Card>
    <br />
    <Card>
      <p slot="title">个人信息</p>
      <ul class="review-info">
        <li>姓名：{{ dataItem.formData2.key1 }}</li>
        <li>手机号：{{ dataItem.formData2.key2 }}</li>
        <li>身份证号：{{ dataItem.formData2.key3 }}</li>
      </ul>
    </Card>
    <Modal title="企业审核" :visible.sync="reviewVisible" @ok="ok">
      <Form :label-width="120">
        <FormItem label="审核结果：">
          <Select>
            <Option value="beijing">通过</Option>
            <Option value="shanghai">退回修改</Option>
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
import { actionCode } from '@/config/index'
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
      reviewVisible: false
    }
  },
  computed: {
    dataItem() {
      console.log(JSON.parse(this.$route.query.data))
      return JSON.parse(this.$route.query.data)
    }
  },
  methods: {
    async ok() {
      this.reviewVisible = false
      let actionid = actionCode.finance.a_finance_p_form_0_review
      switch (this.$route.query.id) {
        case '1':
          actionid = actionCode.finance.a_finance_p_form_1_review
          break
        case '2':
          actionid = actionCode.finance.a_finance_p_form_2_review
          break
        case '3':
          actionid = actionCode.finance.a_finance_p_form_3_review
          break
      }
      await this.$store.dispatch('changeStatus', { actionid })
      this.reviewVisible = false
      Message.success('审核通过')
      this.$router.push({ name: 'supply-chain-sys-core-business' })
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
