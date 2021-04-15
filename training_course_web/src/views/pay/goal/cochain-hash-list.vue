<template>
  <div class="page">
    <header>
      <div class="title">
        账本信息
      </div>
    </header>

    <section class="main">
      <div>交易已成功上链！</div>
      <br />
      <Table :data="data" :columns="columns">
        <template slot-scope="{ row, index }" slot="action">
          <Button v-if="row.act == 1" type="primary" size="small" style="margin-right: 5px" @click="inspect(index)">回执</Button>
          <div v-if="row.act == 0">资金已到账</div>
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
// import { parseTime } from '@/utils/index'
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
          col1: '000000000000000000004d0c7c426910c55a77a0bdf05a9e967caa345903b38d',
          col2: '641,738',
          col3: '智谷银行',
          col4: '1966.00',
          col5: 'USD',
          status: '已处理',
          act: 0
        },
        {
          col1: '0000000000000000000175b317e1e772aacf9379fd9bec81727e509e66783df1',
          col2: '641,737',
          col3: '智谷银行',
          col4: '800.00',
          col5: 'USD',
          status: '已处理',
          act: 0
        },
        {
          col1: '000000000000000000107d4166db51d66d73a946b7dce4f7939c8f63360ac2aa',
          col2: '641,737',
          col3: '智谷银行',
          col4: '100,0000.00',
          col5: 'USD',
          status: '已处理',
          act: 0
        }
      ],
      columns: [
        {
          title: '哈希',
          key: 'col1'
        },
        {
          title: '高度',
          key: 'col2'
        },
        {
          title: '汇出银行',
          key: 'col3'
        },
        // {
        //   title: '汇款种类',
        //   key: 'col3'
        // },
        // {
        //   title: '汇入银行',
        //   key: 'col4'
        // },
        {
          title: '汇款金额',
          key: 'col4'
        },
        {
          title: '汇款币种',
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
      let replace_list = [
        {
          ...this.data_template[0],
          status: '待处理',
          act: 1,
          belongStatus: [roleStatus.pay['new'][`s_pay_new_zhigu_has_online`].status, roleStatus.pay['new'][`s_pay_new_mid_has_frozen`].status]
        }
        // { ...this.data_template[0], status: '已处理', act: 0, belongStatus: [roleStatus.pay['new'][`s_pay_new_usa_has_sent_receipt`].status] }
      ]
      const currentStatus = this.teamStatus['entity_payment'] && this.$getEntityNewStatus('entity_payment')
      let arr = replace_list.filter(item => {
        if (!item.belongStatus.length) return item
        return item.belongStatus.some(v => v == currentStatus.status_id)
      })
      let result_arr = JSON.parse(JSON.stringify(this.data_template))
      arr.length && result_arr.splice(0, 1, arr[0])
      return result_arr
    }
  },
  methods: {
    toDetail() {
      this.$router.push({ name: 'pay-goal-cochain-hash-detail' })
    },
    inspect() {
      this.$router.push({ name: 'pay-goal-cochain-hash-detail' })
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
