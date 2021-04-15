<template>
  <div class="page">
    <header>
      <div class="title">
        跨境支付业务审核
      </div>
    </header>

    <section class="main">
      <Table :data="data" :columns="columns">
        <template slot-scope="{ row, index }" slot="action">
          <Button v-if="row.act == 1" type="primary" size="small" style="margin-right: 5px" @click="inspect(index)">审核</Button>
          <Button v-if="row.act == 2" type="primary" size="small" style="margin-right: 5px" @click="toTransfer(index)">划转资金</Button>
          <div v-if="row.act == 0">已签发</div>
        </template>
      </Table>
      <div class="next">
        <Button type="primary" size="large" @click="next">返回</Button>
      </div>
    </section>
  </div>
</template>

<script>
import { Button, Table } from 'view-design'
import { parseTime } from '@/utils/index'
import {
  // actionCode,
  roleStatus
} from '@/config/index'
import { mapState, mapGetters } from 'vuex'
// import { getFormData } from '@/views/pay/index'

export default {
  components: {
    Button,
    Table
  },
  data() {
    const validateSuerPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('两次输入密码保持一致'))
      } else if (this.formData.password !== value) {
        callback(new Error('两次输入密码保持一致'))
      } else {
        callback()
      }
    }
    return {
      data_template: [
        {
          col1: 'HFHT202007300012',
          col2: '智谷银行',
          col3: '中国工商银行纽约分行',
          col4: 'Kai',
          col5: 'USD',
          col6: '1966.00',
          col7: parseTime(new Date(), '{y}-{m}-{d}'),
          status: '已审核',
          act: 0
        },
        {
          col1: 'HFHT202007300012',
          col2: '智谷银行',
          col3: '中国工商银行纽约分行',
          col4: 'Bob',
          col5: 'USD',
          col6: '4990.00',
          col7: '2020-07-31',
          status: '已审核',
          act: 0
        },
        {
          col1: 'HFHT202007300012',
          col2: '智谷银行',
          col3: '中国工商银行纽约分行',
          col4: 'Amy',
          col5: 'USD',
          col6: '4990.00',
          col7: '2020-07-31',
          status: '已审核',
          act: 0
        }
      ],
      columns: [
        {
          title: '报文',
          key: 'col1'
        },
        {
          title: '汇款银行',
          key: 'col2'
        },
        {
          title: '中间行',
          key: 'col3'
        },
        {
          title: '收款人',
          key: 'col4'
        },
        {
          title: '汇款币种',
          key: 'col5'
        },
        {
          title: '汇款金额',
          key: 'col6'
        },
        {
          title: '操作日期',
          key: 'col7'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      formData: {
        userName: '',
        id: '',
        password: '',
        surePassword: '',
        email: '',
        phone: '',
        codepic: '',
        code: ''
      },
      rules: {
        // userName: [{ required: true, type: 'string', min: 2, max: 15, message: '请输入您的真实姓名', trigger: 'blur' }],
        id: [{ required: true, pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份号码', trigger: 'blur' }],
        password: [{ required: true, max: 8, message: '密码规则为不多于8位的字母、数字或者特殊字符', trigger: 'blur' }],
        surePassword: [{ required: true, validator: validateSuerPassword, trigger: 'blur' }],
        email: [{ required: true, type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }],
        phone: [{ required: true, len: 11, message: '请填写您常用的手机号，它将成为以后的登录账号', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    ...mapGetters(['isCochain']),
    data() {
      // let pay_local_status = sessionStorage.getItem('pay_local_status') ? JSON.parse(sessionStorage.getItem('pay_local_status')) : {}
      let replace_list = [
        {
          ...this.data_template[0],
          status: '未审核',
          act: 1,
          belongStatus: [roleStatus.pay['old'][`s_pay_old_zhigu_has_send_msg`].status, roleStatus.pay['old'][`s_pay_old_mid_has_frozen`].status]
        },
        { ...this.data_template[0], status: '待解付', act: 'no', belongStatus: [roleStatus.pay['old'][`s_pay_old_usa_has_review`].status] },
        { ...this.data_template[0], status: '待解付', act: 2, belongStatus: [roleStatus.pay['old'][`s_pay_old_mid_has_out_money`].status] }
      ]
      const currentStatus = this.teamStatus['entity_payment'] && this.$getEntityNewStatus('entity_payment')
      let arr = replace_list.filter(item => {
        if (!item.belongStatus.length) return item
        return item.belongStatus.some(v => v == currentStatus.status_id)
      })
      // if (arr.length && pay_local_status['has_zhigu_tradition_inspect']) arr = [replace_list[1]]
      let result_arr = JSON.parse(JSON.stringify(this.data_template))
      arr.length && result_arr.splice(0, 1, arr[0])
      return result_arr
    }
  },
  methods: {
    toTransfer() {
      this.$router.push({ name: 'pay-goal-tradition-transfer' })
    },
    inspect() {
      this.$router.push({ name: 'pay-goal-tradition-inspect' })
    },
    next() {
      this.$router.push({ name: 'pay-task' })
    }
  },
  created() {
    // let mode = this.isCochain ? 'new' : 'old'
    // this.formData = getFormData()
    // let result_form
    // if (!this.formData) {
    //   mode = 'old'
    //   result_form = this.teamStatus['entity_payment']?.find(item => item.status_id === roleStatus.pay[mode][`s_pay_${mode}_has_write_form`].status)
    // }
    // this.formData = Object.assign(this.formData, result_form?.data ? JSON.parse(result_form.data) : {})
    // this.data_template[0].col6 = Number(this.formData.rest_money).toFixed(2)
  }
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
      width: 95%;
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
