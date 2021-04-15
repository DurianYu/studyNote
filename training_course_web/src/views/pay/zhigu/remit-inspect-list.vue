<template>
  <div class="page-remit-inspect-list">
    <header>
      <div class="title font2-b">
        汇款申请审核
      </div>
    </header>

    <section class="main page-space-l-t">
      <Table :data="data" :columns="columns">
        <template slot-scope="{ row, index }" slot="action">
          <Button v-if="row.act == 1" type="primary" size="small" style="margin-right: 5px" @click="inspect(index)">审核</Button>
          <div v-if="row.act == 0">已审核</div>
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
  // actionCode
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
    return {
      data_template: [
        {
          col1: 'HFHT202007300012',
          col2: '个人汇款',
          col3: '跨境汇款',
          col4: '2,000.00',
          col5: parseTime(new Date(), '{y}-{m}-{d}'),
          status: '交易已完成',
          act: 0
        },
        {
          col1: 'HFHT202007300012',
          col2: '个人汇款',
          col3: '跨境汇款',
          col4: '10,000.00',
          col5: '2020-07-31',
          status: '交易已完成',
          act: 0
        },
        {
          col1: 'HFHT202007300012',
          col2: '杭州进出口公司',
          col3: '跨境汇款',
          col4: '100,0000.00',
          col5: '2020-07-31',
          status: '交易已完成',
          act: 0
        }
      ],
      columns: [
        {
          title: '业务编号',
          key: 'col1'
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
    ...mapGetters(['isCochain']),
    data() {
      let mode = this.isCochain ? 'new' : 'old'
      let replace_list = [{ ...this.data_template[0], status: '未审核', act: 1, belongStatus: roleStatus.pay[mode][`s_pay_${mode}_has_write_form`].status }]
      const currentStatus = this.teamStatus['entity_payment'] && this.$getEntityNewStatus('entity_payment')
      let arr = replace_list.filter(item => {
        return item.belongStatus === currentStatus.status_id
      })
      let result_arr = JSON.parse(JSON.stringify(this.data_template))
      arr.length && result_arr.splice(0, 1, arr[0])
      return result_arr
    }
  },
  methods: {
    inspect() {
      this.$router.push({ name: 'pay-zhigu-remit-inspect' })
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
.page-remit-inspect-list {
  ::v-deep {
    header {
      margin: 2rem 0 0 0;
      .title {
        text-align: center;
      }
    }
    .main {
      // padding: 2.5rem 0 0 0;
      // width: 95%;
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
