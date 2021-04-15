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
        <template slot-scope="{ row, index }" slot="col1">
          <a v-if="index == 0" @click="toDetail">{{ row.col1 }}</a>
          <span v-else>{{ row.col1 }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button v-if="row.col7" type="primary" size="small" style="margin-right: 5px" @click="inspect(index)">上链</Button>
          <div v-if="!row.col7">已上链</div>
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
      data: [
        {
          col1: '000000000000000000004d0c7c426910c55a77a0bdf05a9e967caa345903b38d',
          col2: '641,738',
          col3: '智谷银行',
          col4: 'Bank of America',
          col5: '4990.00'
        },
        {
          col1: '0000000000000000000175b317e1e772aacf9379fd9bec81727e509e66783df1',
          col2: '641,737',
          col3: '智谷银行',
          col4: 'Bank of America',
          col5: '800.00'
        },
        {
          col1: '000000000000000000107d4166db51d66d73a946b7dce4f7939c8f63360ac2aa',
          col2: '641,737',
          col3: '智谷银行',
          col4: 'Bank of America',
          col5: '100,0000.00'
        }
      ],
      columns: [
        {
          title: '哈希',
          slot: 'col1'
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
        {
          title: '汇入银行',
          key: 'col4'
        },
        {
          title: '汇款金额',
          key: 'col5'
        }
        // {
        //   title: '申请日期',
        //   key: 'col5'
        // },
        // {
        //   title: '状态',
        //   key: 'col6'
        // },
        // {
        //   title: '操作',
        //   slot: 'action'
        // }
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
  methods: {
    toDetail() {
      this.$router.push({ name: 'pay-zhigu-cochain-hash-detail' })
    },
    inspect() {
      this.$router.push({ name: 'pay-zhigu-cochain-inspect' })
    },
    next() {
      this.$router.push({ name: 'pay-task' })
    }
  },
  created() {
    // // this.formData = { ...this.formData, ...getFormData() }
    // this.data[0].col5 = Number(this.formData.rest_money).toFixed(2)
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
