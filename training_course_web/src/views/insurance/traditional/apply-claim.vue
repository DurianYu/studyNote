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
          <FormItem label="航班号：" prop="flight_num">
            <Input type="text" v-model="formData.flight_num" />
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
        <Col span="8">
          <FormItem label="航班延误证明材料：">
            <Input style="visibility: hidden;" />
            <img src="@/assets/images/insurance/no-img.png" alt="" />
          </FormItem>
        </Col>
      </Row>
      <FormItem label="" class="btn-next-a">
        <Button type="primary" size="large" @click="handleSubmit">{{ ischeck ? '审核通过' : '申请提交' }}</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button, Row, Col } from 'view-design'
import { actionCode, roleStatus } from '@/config/index'
import { check_insurance_tradition_apply_claim } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'
import {
  mapState
  // mapGetters
} from 'vuex'
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
      return validateCheckForm(rule, value, callback, check_insurance_tradition_apply_claim)
    }
    return {
      formData: {
        buyer_name: '',
        buyer_id_card: '',
        flight_num: ''
      },
      rules: {
        buyer_name: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        buyer_id_card: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        flight_num: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    currentStatus() {
      return this.$getEntityNewStatus('entity_insurance')
    },
    ischeck() {
      return this.currentStatus.status_id === roleStatus.insurance.s_insurance_old_has_report.status
    }
  },
  methods: {
    async handleSubmit() {
      let actionid = ''
      if (this.currentStatus.status_id === roleStatus.insurance.s_insurance_old_has_report.status) {
        actionid = actionCode.insurance.a_insurance_old_checker_review
        await this.$store.dispatch('changeStatus', { actionid })
        this.$router.push({ name: 'insurance-traditional-insurance-inspect' })
      } else if (this.currentStatus.status_id === roleStatus.insurance.s_insurance_old_got_delay_prove.status) {
        actionid = actionCode.insurance.a_insurance_old_apply_report
        await this.$store.dispatch('changeStatus', { actionid, data: JSON.stringify(this.formData) })
        this.$router.push({ name: 'insurance-menu' })
      }
    }
  },
  created() {
    const result_form = this.teamStatus['entity_insurance']?.find(item => item.status_id === roleStatus.insurance.s_insurance_old_has_report.status)
    this.formData = Object.assign(this.formData, result_form?.data ? JSON.parse(result_form.data) : {})
  }
}
</script>
