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
        <template slot-scope="{ row, index }" slot="col3">
          <a @click="toDetail(index)">{{ row.col3 }}</a>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button v-if="row.act == 1" type="primary" size="small" style="margin-right: 5px" @click="inspect(index)">通过</Button>
          <div v-if="row.act == 0">已通过</div>
        </template>
      </Table>
      <div class="next">
        <Button type="primary" size="large" :disabled="!is_past" @click="next">下一步</Button>
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
// import {
//   actionCode,
//   roleStatus
// } from '@/config/index'

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
          col1: '节点1',
          col2: '10.30.70.0 255.255.255.0',
          col3: '000000000000000000004d0c7c426910c55a77a0bdf05a9e967caa345903b38d',
          act: 1
        },
        {
          col1: '节点2',
          col2: '10.30.70.0 255.255.255.0',
          col3: '000000000000000000004d0c7c426910c55a77a0bdf05a9e967caa345903b38d',
          act: 1
        },
        {
          col1: '节点3',
          col2: '10.30.70.0 255.255.255.0',
          col3: '000000000000000000004d0c7c426910c55a77a0bdf05a9e967caa345903b38d',
          act: 1
        },
        {
          col1: '节点4',
          col2: '10.30.70.0 255.255.255.0',
          col3: '000000000000000000004d0c7c426910c55a77a0bdf05a9e967caa345903b38d',
          act: 1
        }
      ],
      columns: [
        {
          title: '节点',
          key: 'col1'
        },
        {
          title: '地址',
          key: 'col2'
        },
        {
          title: '验证交易',
          slot: 'col3'
        },
        // {
        //   title: '汇款种类',
        //   key: 'col3'
        // },
        {
          title: '是否通过',
          slot: 'action'
        }
        // {
        //   title: '汇款金额',
        //   key: 'col5'
        // },
        // {
        //   title: '申请日期',
        //   key: 'col5'
        // },
        // {
        //   title: '状态',
        //   slot: 'action'
        // }
        // {
        //   title: '操作',
        //   slot: 'action'
        // }
      ],
      node_status: ['middle_cochain_hash_node1', 'middle_cochain_hash_node2', 'middle_cochain_hash_node3', 'middle_cochain_hash_node4'],
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
    is_past() {
      return this.data.every(v => v.act == 0)
    }
    // data() {}
    //   let replace_list = [
    //     {
    //       ...this.data_template[0],
    //       status: 'none',
    //       act: 0,
    //       belongStatus: node_status[0]
    //     },
    //     {
    //       ...this.data_template[1],
    //       status: 'none',
    //       act: 0,
    //       belongStatus: node_status[1]
    //     },
    //     {
    //       ...this.data_template[2],
    //       status: 'none',
    //       act: 0,
    //       belongStatus: node_status[2]
    //     },
    //     {
    //       ...this.data_template[3],
    //       status: 'none',
    //       act: 0,
    //       belongStatus: node_status[3]
    //     }
    //   ]
    //   // const currentStatus = this.$getEntityNewStatus('entity_payment')
    //   // let arr = replace_list.filter(item => {
    //   //   if (!item.belongStatus.length) return item
    //   //   return item.belongStatus.some(v => v == currentStatus.status_id)
    //   // })
    //   let result_arr = JSON.parse(JSON.stringify(this.data_template))
    //   // let arr = replace_list
    //
    //   console.log('ddd', result_arr)
    //   return result_arr
    // }
  },
  methods: {
    validate() {
      let pay_local_status = sessionStorage.getItem('pay_local_status') ? JSON.parse(sessionStorage.getItem('pay_local_status')) : {}
      this.node_status.forEach((v, i) => {
        if (pay_local_status[v]) this.data[i].act = 0
      })
    },
    toDetail() {
      this.$router.push({ name: 'pay-middle-cochain-hash-detail' })
    },
    inspect(index) {
      let pay_local_status = sessionStorage.getItem('pay_local_status') ? JSON.parse(sessionStorage.getItem('pay_local_status')) : {}
      sessionStorage.setItem(
        'pay_local_status',
        JSON.stringify({
          ...pay_local_status,
          [`middle_cochain_hash_node${index + 1}`]: true
        })
      )
      this.data[index].act = 0
    },
    next() {
      this.$router.push({
        name: 'pay-middle-cochain-hash-detail',
        query: {
          freeze: true
        }
      })
    }
  },
  created() {
    this.validate()
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
