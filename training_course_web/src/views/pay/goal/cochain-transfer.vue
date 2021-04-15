<template lang="html">
  <div class="page">
    <header>
      <div class="title">
        划转账户
      </div>
    </header>
    <section class="main">
      <br />
      <Form ref="formData" :model="formData" :rules="rules" :label-width="120">
        <p>美国银行账户</p>
        <br />
        <FormItem label="操作" prop="up_operate">
          <RadioGroup v-model="formData.up_operate">
            <Radio label="增计">增计</Radio>
            <Radio label="减计">减计</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="数值" prop="up_num">
          <Input type="text" v-model="formData.up_num">
            <span slot="append">美元</span>
          </Input>
        </FormItem>
        <FormItem label="手续费(美元)" prop="input3">
          <div>{{ this.formData.up_num && Math.round(this.formData.up_num * 0.001).toFixed(2) }}</div>
        </FormItem>

        <br />

        <p>Kai 账户：4367 9999 0000 6666</p>
        <br />
        <FormItem label="操作" prop="down_operator">
          <RadioGroup v-model="formData.down_operator">
            <Radio label="增计">增计</Radio>
            <Radio label="减计">减计</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="数值" prop="down_num">
          <Input type="text" v-model="formData.down_num">
            <span slot="append">美元</span>
          </Input>
        </FormItem>
      </Form>
      <div class="next">
        <Button type="primary" size="large" @click="next">确认提交</Button>
      </div>
    </section>
  </div>
</template>

<script>
import {
  Form,
  FormItem,
  RadioGroup,
  Radio,
  Button,
  // Modal,
  Input,
  // Message,
  Modal as IModal
} from 'view-design'
import {
  mapState
  // mapGetters
} from 'vuex'
import {
  actionCode
  //  roleStatus
} from '@/config/index'
import { check_pay_goal_cochain_transfer } from '@/config/form-check'
import { validateCheckForm } from '@/utils/index'
export default {
  name: 'AccountTransfer',
  components: {
    RadioGroup,
    Radio,
    Button,
    Form,
    FormItem,
    Input
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_pay_goal_cochain_transfer)
    }
    return {
      formData: {},
      rules: {
        up_operate: [{ required: true, validator: validateCheck, trigger: 'change' }],
        up_num: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        down_operator: [{ required: true, validator: validateCheck, trigger: 'change' }],
        down_num: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['teamStatus'])
  },
  methods: {
    next() {
      let _this = this
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          await this.$store.dispatch('changeStatus', { actionid: actionCode.pay[`new`][`a_pay_new_usa_bank_out_money`] })
          IModal.info({
            content: '账户划转成功',
            onOk() {
              _this.$router.push({ name: 'pay-task' })
            }
          })
        }
      })
    },
    setRead() {
      this.$fetch({
        uriCode: 'API1002',
        msg_type: 'sms',
        status: true
      })
        .then(() => {
          this.$store.dispatch('getUserInfo')
          this.$store.dispatch('getMsg')
        })
        .catch(() => {})
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.page {
  ::v-deep {
    header {
      margin: 2rem 0 0 0;
      .title {
        text-align: center;
      }
    }
    .main {
      padding: 2.5rem 0 0 0;
      width: 50%;
      margin: 0 auto;

      .box {
        .ivu-table-row:nth-of-type(1) {
          cursor: pointer;
        }
      }

      .next {
        margin: 2rem 0 4rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
