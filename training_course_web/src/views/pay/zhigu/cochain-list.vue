<template>
  <div class="page">
    <header>
      <div class="title">
        跨境支付交易上链
      </div>
    </header>

    <section class="main">
      <Table :data="data" :columns="columns">
        <template slot-scope="{ row, index }" slot="action">
          <Button v-if="row.act == 1" type="primary" size="small" style="margin-right: 5px" @click="inspect(index)">上链</Button>
          <div v-if="row.act == 0">已上链</div>
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
  mapState
  // mapGetters
} from 'vuex'
import {
  // actionCode,
  roleStatus
} from '@/config/index'
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
          col2: '个人汇款',
          col002: '000123',
          col3: '跨境汇款',
          col003: 'USD',
          col4: '1,998.00',
          col5: parseTime(new Date(), '{y}-{m}-{d}'),
          status: '已完成',
          act: 0
        },
        {
          col1: 'HFHT202007300034',
          col2: '个人汇款',
          col002: '000234',
          col3: '跨境汇款',
          col003: 'USD',
          col4: '10,000.00',
          col5: '2020-07-31',
          status: '已完成',
          act: 0
        },
        {
          col1: 'HFHT202007300057',
          col002: '000456',
          col2: '成都进出口公司',
          col3: '跨境汇款',
          col003: 'USD',
          col4: '100,0000.00',
          col5: '2020-07-31',
          status: '已完成',
          act: 0
        }
      ],
      columns: [
        {
          title: '业务编号',
          key: 'col1'
        },
        {
          title: '操作员',
          key: 'col002'
        },
        {
          title: '汇款人',
          key: 'col2'
        },
        {
          title: '汇款币种',
          key: 'col003'
        },
        {
          title: '汇款金额',
          key: 'col4'
        },
        {
          title: '申请日期',
          key: 'col5'
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
    data() {
      // let pay_local_status = sessionStorage.getItem('pay_local_status') ? JSON.parse(sessionStorage.getItem('pay_local_status')) : {}
      let replace_list = [{ ...this.data_template[0], status: '待处理', act: 1, belongStatus: [roleStatus.pay['new'][`s_pay_new_zhigu_has_out_money`].status] }]
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
    inspect() {
      this.$router.push({ name: 'pay-zhigu-cochain-inspect' })
    },
    next() {
      this.$router.push({ name: 'pay-task' })
    }
  },
  created() {
    // this.formData = { ...this.formData, ...getFormData() }
    // this.data_template[0].col4 = Number(this.formData.rest_money).toFixed(2)
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
