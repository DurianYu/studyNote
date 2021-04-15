<template>
  <div class="apply-claim all-padding">
    <Form ref="formData" :model="formData" :rules="rules" class="page-space-l-t">
      <Row :gutter="46">
        <Col span="8">
          <FormItem label="乘机人姓名：" prop="buyer_name">
            <Input type="text" v-model="formData.buyer_name" />
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="身份证：" prop="buyer_id_card">
            <Input type="text" v-model="formData.buyer_id_card" />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="46">
        <Col span="8">
          <FormItem label="出发日期: " prop="staty_date">
            <Input type="text" v-model="formData.staty_date" />
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="航班号：" prop="flight_num">
            <Input type="text" v-model="formData.flight_num" />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="46">
        <Col span="8">
          <FormItem label="出发城市: " prop="start_city">
            <Input type="text" v-model="formData.start_city" />
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="到达城市: " prop="end_city">
            <Input type="text" v-model="formData.end_city" />
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="46">
        <Col span="8">
          <FormItem label="原定航班登机牌/行程单：">
            <Input style="visibility: hidden;" />
            <img src="@/assets/images/insurance/no-img.png" alt="" />
          </FormItem>
        </Col>
        <!-- <Col span="8">
          <FormItem label="航班延误证明材料：">
            <img src="@/assets/images/insurance/u246.png" alt="" />
          </FormItem>
        </Col> -->
      </Row>
    </Form>
    <Button class="btn-next-a" type="primary" size="large" @click="handleSubmit">下一步</Button>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button, Row, Col } from 'view-design'
import { check_insurance_tradition_payfor } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'
export default {
  components: {
    Form,
    FormItem,
    Input,
    Button,
    Row,
    Col
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_insurance_tradition_payfor)
    }
    return {
      formData: {},
      rules: {
        buyer_name: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        buyer_id_card: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        staty_date: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        flight_num: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        start_city: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        end_city: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$router.push({ name: 'insurance-cochain-buy-delay-insurance2' })
    }
  }
}
</script>
