<template>
  <div class="page">
    <header>
      <div class="title">
        跨境支付业务处理
      </div>
    </header>

    <section class="main">
      <Table :data="data" :columns="columns">
        <template slot-scope="{ row, index }" slot="action">
          <Button v-if="row.act == 1" type="primary" size="small" style="margin-right: 5px" @click="inspect(index)">审核</Button>
          <Button v-if="row.act == 2" type="primary" size="small" style="margin-right: 5px" @click="send(index)">发送报文</Button>
          <div v-if="row.act == 0">已完成</div>
        </template>
      </Table>
      <div class="next">
        <Button type="primary" size="large" @click="next">返回</Button>
      </div>
    </section>
  </div>
</template>

<script>
import { Button, Table, Modal as IModal } from 'view-design'
import { parseTime } from '@/utils/index'
import {
  mapState
  // mapGetters
} from 'vuex'
import { actionCode, roleStatus } from '@/config/index'
// import { getFormData } from '@/views/pay/index'

export default {
  components: {
    Button,
    Table
  },
  data() {
    return {
      data_template: [
        {
          col1: 'HFHT202007300012',
          col2: '个人汇款',
          col002: '000123',
          col3: '跨境汇款',
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
          title: '汇款种类',
          key: 'col3'
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
      formData: {}
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    data() {
      let pay_local_status = sessionStorage.getItem('pay_local_status') ? JSON.parse(sessionStorage.getItem('pay_local_status')) : {}
      let replace_list = [
        { ...this.data_template[0], status: '未审核', act: 1, belongStatus: [roleStatus.pay['old'][`s_pay_old_zhigu_has_out_money`].status] },
        { ...this.data_template[0], status: '报文待发送', act: 2, belongStatus: [roleStatus.pay['old'][`s_pay_old_zhigu_has_out_money`].status] }
      ]
      const currentStatus = this.teamStatus['entity_payment'] && this.$getEntityNewStatus('entity_payment')
      let arr = replace_list.filter(item => {
        if (!item.belongStatus.length) return item
        return item.belongStatus.some(v => v == currentStatus.status_id)
      })
      if (arr.length && pay_local_status['has_zhigu_tradition_inspect']) arr = [replace_list[1]]
      let result_arr = JSON.parse(JSON.stringify(this.data_template))
      arr.length && result_arr.splice(0, 1, arr[0])
      return result_arr
    }
  },
  methods: {
    async send() {
      let _this = this
      await this.$store.dispatch('changeStatus', { actionid: actionCode.pay[`old`][`a_pay_old_zhigu_send_msg`] })
      IModal.info({
        content: '报文已发送，等待对方银行处理',
        onOk() {
          _this.$router.push({ name: 'pay-task' })
        }
      })
    },
    inspect() {
      this.$router.push({ name: 'pay-zhigu-tradition-inspect' })
    },
    next() {
      this.$router.push({ name: 'pay-task' })
    }
  },
  created() {
    this.pay_info = sessionStorage.getItem('pay_info') ? JSON.parse(sessionStorage.getItem('pay_info')) : {}
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
