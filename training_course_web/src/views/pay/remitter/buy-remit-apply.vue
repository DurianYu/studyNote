<template>
  <div class="page-buy-remit-apply">
    <header>
      <div class="title font2-b text-center">
        购汇申请
      </div>
    </header>

    <section class="main page-space-l-t">
      <Form ref="formData" :model="formData" :rules="rules" :label-width="140">
        <FormItem label="购汇账户卡号" prop="one_card">
          <Input type="text" v-model="formData.one_card" />
        </FormItem>
        <FormItem label="年度购汇总额度">
          <div>$50,000.00</div>
        </FormItem>
        <FormItem label="年度购汇剩余额度">
          <div>$50,000.00</div>
        </FormItem>
        <FormItem label="人民币账户余额">
          <div>￥23,000.00</div>
        </FormItem>
        <FormItem label="购汇币种">
          <div>美元</div>
        </FormItem>
        <FormItem label="进现汇/现钞户" prop="paymnet">
          <RadioGroup v-model="formData.paymnet">
            <Radio label="进现汇">进现汇</Radio>
            <Radio label="现钞户">现钞户</Radio>
          </RadioGroup>
          <Poptip trigger="hover" title="说明" max-width="200">
            <div slot="content">
              <pre style="width: 250px" class="wrap font3">
 1、如您后续需要进行境外汇款，请选择现汇户；如您后续需要提取外币现金，请选择现钞户。
2、外币现钞和现汇间相互转换，我行将会收取转换手续费。为避免给您带来不必要的损失，请根据实际用途选择钞汇类型。
              </pre>
            </div>
            <Icon type="ios-help-circle-outline" />
          </Poptip>
        </FormItem>
        <FormItem label="汇率">
          <div>699.34</div>
        </FormItem>
        <FormItem label="购汇金额" prop="rest_money">
          <Input type="text" v-model="formData.rest_money" />
        </FormItem>
        <FormItem label="预计所需资金">
          <div>￥{{ pre_amount }}</div>
        </FormItem>
      </Form>
    </section>
    <div class="btn-next-a">
      <Button type="primary" size="large" @click="next">提交</Button>
    </div>
  </div>
</template>

<script>
import { Form, FormItem, Button, Input, RadioGroup, Radio, Icon, Poptip, Modal as IModal } from 'view-design'
import { actionCode, roleStatus } from '@/config/index'
import { mapState, mapGetters } from 'vuex'
import { check_pay_remiter_apply } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'
export default {
  components: {
    Form,
    FormItem,
    Button,
    Input,
    RadioGroup,
    Radio,
    Icon,
    Poptip
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_pay_remiter_apply)
    }
    return {
      current: 0,
      formData: {
        rest_money: ''
      },
      rules: {
        one_card: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        paymnet: [{ required: true, validator: validateCheck, trigger: 'change' }],
        rest_money: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    ...mapGetters(['isCochain']),
    pre_amount: function() {
      return (this.formData.rest_money * 699.34 * 1) / 100 || ''
    }
  },
  methods: {
    next() {
      let _this = this
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          let mode = _this.isCochain ? 'new' : 'old'
          await _this.$store.dispatch('changeStatus', {
            actionid: actionCode.pay[mode][`a_pay_${mode}_buy_money`],
            data: JSON.stringify({ ...this.formData, rest_money: 2000 })
          })
          IModal.success({
            content: '购汇成功',
            onOk() {
              _this.$router.push({ name: 'pay-task' })
            }
          })
        }
      })
    }
  },
  created() {
    console.log('roleStatus', roleStatus)
  }
}
</script>

<style lang="scss" scoped>
.page-buy-remit-apply {
  ::v-deep {
    header {
      margin: 2rem 0 0 0;
      .title {
        // text-align: center;
        margin: 0 0 0 2.5rem;
      }
    }
    .main {
      width: 50%;
      margin: 0 auto;

      .next {
        clear: both;
        margin: 2rem 0 4rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
