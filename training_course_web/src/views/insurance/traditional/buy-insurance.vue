<template>
  <div class="buy-insurance all-padding">
    <h2 class="font2-b page-space-l-t">互联网航班延误险</h2>
    <h3 class="font3 page-space-l-t">保障内容</h3>
    <div class="info">
      <p>延误30-60分钟 100元</p>
      <p>
        在保单生效日当天，被保险人实际搭乘的某一航段，非因本人原因或责任免除约定的情形发生延误30分钟（含）至60分钟（不含），总计赔付100元。
      </p>
      <p>延误60-120分钟 200元</p>
      <p>
        在保单生效日当天，被保险人实际搭乘的某一航段，非因本人原因或责任免除约定的情形发生延误60分钟（含）至120分钟（不含），总计赔付200元
      </p>
      <p>延误120分钟以上 300元</p>
      <p>
        在保单生效日当天，被保险人实际搭乘的某一航段，非因本人原因或责任免除约定的情形发生延误120分钟（含）以上，总计赔付300元
      </p>
    </div>
    <Form ref="formData" :model="formData" :rules="rules" :label-width="140">
      <FormItem label="被投保人姓名：" prop="buyer_name">
        <Input type="text" v-model="formData.buyer_name" />
      </FormItem>
      <FormItem label="身份证号码：" prop="buyer_id_card">
        <Input type="text" v-model="formData.buyer_id_card" />
      </FormItem>
      <FormItem label="生效日期：" prop="start_date">
        <DatePicker v-model="formData.start_date" type="date" placement="bottom-end" placeholder="Select date" style="width: 100%"></DatePicker>
      </FormItem>
      <FormItem label="保障期限" prop="start_date">
        <Input value="1天" />
      </FormItem>
      <FormItem label="保费总额：">
        <b class="red">50.00元</b>
      </FormItem>
      <FormItem label="">
        <p>保险受益人为法定受益人</p>
        <p>查看<a>《投保须知》</a><a>《保险条款》</a><a>《平台服务协议》</a></p>
      </FormItem>
      <FormItem label="">
        <Button type="primary" size="large" @click="handleBuy">我要投保</Button>
      </FormItem>
    </Form>
    <Modal_ :visible.sync="payVisible" title="付款详情" okText="立即付款" @ok="handlePay">
      <h3 class="red">¥50.00</h3>
      <p>订单信息：国内航班延误险</p>
    </Modal_>
  </div>
</template>
<script>
import { Form, FormItem, Input, DatePicker, Button, Modal } from 'view-design'
import Modal_ from '@/components/Modal'
import { actionCode } from '@/config/index'
import { check_insurance_tradition_buy_insurance } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'
export default {
  components: {
    Form,
    FormItem,
    Input,
    DatePicker,
    Button,
    Modal_
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_insurance_tradition_buy_insurance)
    }
    return {
      formData: {
        buyer_name: '',
        buyer_id_card: '',
        start_date: ''
      },
      rules: {
        buyer_name: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        buyer_id_card: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        start_date: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      },
      payVisible: false // 付款的确认框
    }
  },
  methods: {
    handleBuy() {
      Modal.confirm({
        title: '提示',
        content: '请认真阅读协议，特别是责任免除、争议解决条款等条款。',
        okText: '同意并投保',
        onOk: () => {
          this.payVisible = true
        }
      })
    },
    async handlePay() {
      await this.$store.dispatch('changeStatus', { actionid: actionCode.insurance.a_insurance_old_insure })
      this.payVisible = false
      this.$router.push({ name: 'insurance-home' })
    }
  }
}
</script>

<style lang="scss" scoped>
.info,
form {
  width: 600px;
  margin: 0px auto;
}
.info {
  p {
    line-height: 23px;
    margin: 10px 0;
  }
}
</style>
