<template>
  <div class="core-business">
    <h3 class="font2-b">融资管理</h3>
    <br />
    <Tabs v-model="tabName">
      <TabPane :label="`融资中(${list1.length})`" name="name1"></TabPane>
      <TabPane :label="`已融资(${list2.length})`" name="name2"></TabPane>
      <TabPane label="已失效" name="name3"></TabPane>
    </Tabs>
    <Table :columns="columns" :data="tabName === 'name1' ? list1 : tabName === 'name2' ? list2 : []">
      <template slot="action" slot-scope="{ row }">
        <div class="table-action">
          <router-link :to="{ name: 'supply-chain-sys-review-financing-detail', query: { data: JSON.stringify(row) } }">详情</router-link>
          <a
            v-if="row.status === 1"
            href="javascript:;"
            @click="
              currentSelect = row.id
              visible = true
            "
            >审核</a
          >
        </div>
      </template>
    </Table>
    <Modal title="融资审核" :visible.sync="visible" @ok="handleSubmit">
      <Form :label-width="120">
        <FormItem label="审核结果：">
          <RadioGroup v-model="pass">
            <Radio label="1">
              <span>通过</span>
            </Radio>
            <Radio label="2">
              <span>不通过</span>
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { Table, Tabs, TabPane, RadioGroup, Radio, Form, FormItem, Message } from 'view-design'
import Modal from '@/components/Modal'
import { roleStatus, actionCode } from '@/config/index'
import { mapState } from 'vuex'
import { financeData } from '../data'
export default {
  components: {
    Table,
    Tabs,
    TabPane,
    Modal,
    Radio,
    RadioGroup,
    Form,
    FormItem
  },
  data() {
    return {
      pass: '',
      currentSelect: '',
      tabName: 'name1',
      visible: false,
      columns: [
        {
          title: '融资编号',
          key: 'key1',
          align: 'center'
        },
        {
          title: '发单企业',
          key: 'key2',
          align: 'center'
        },
        {
          title: '融资企业',
          key: 'key3',
          align: 'center'
        },
        {
          title: '融资金额',
          key: 'key4',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'key5',
          align: 'center'
        },
        {
          title: '状态',
          key: 'statusText',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      list2: []
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    list1() {
      let arr = []
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.list2 = []
      // 一级
      const statusList1 = this.teamStatus.entity_finance_order_1
      if (statusList1.find(item => item.status_id === roleStatus.finance.entity_finance_order_1.s_finance_order_1_has_loan.status)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.list2.push({ ...financeData.supplier1, statusText: '已融资', status: 4, id: '1' })
      } else if (statusList1.find(item => item.status_id === roleStatus.finance.entity_finance_order_1.s_finance_order_1_second_review.status)) {
        arr.push({ ...financeData.supplier1, statusText: '待放款', status: 3, id: '1' })
      } else if (statusList1.find(item => item.status_id === roleStatus.finance.entity_finance_order_1.s_finance_order_1_has_review.status)) {
        arr.push({ ...financeData.supplier1, statusText: '待复核', status: 2, id: '1' })
      } else if (statusList1.find(item => item.status_id === roleStatus.finance.entity_finance_order_1.s_finance_order_1_can_review.status)) {
        arr.push({ ...financeData.supplier1, statusText: '待审核', status: 1, id: '1' })
      }

      // 二级
      const statusList2 = this.teamStatus.entity_finance_order_2
      if (statusList2.find(item => item.status_id === roleStatus.finance.entity_finance_order_2.s_finance_order_2_has_loan.status)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.list2.push({ ...financeData.supplier2, statusText: '已融资', status: 4, id: '2' })
      } else if (statusList2.find(item => item.status_id === roleStatus.finance.entity_finance_order_2.s_finance_order_2_second_review.status)) {
        arr.push({ ...financeData.supplier2, statusText: '待放款', status: 3, id: '2' })
      } else if (statusList2.find(item => item.status_id === roleStatus.finance.entity_finance_order_2.s_finance_order_2_has_review.status)) {
        arr.push({ ...financeData.supplier2, statusText: '待复核', status: 2, id: '2' })
      } else if (statusList2.find(item => item.status_id === roleStatus.finance.entity_finance_order_2.s_finance_order_2_can_review.status)) {
        arr.push({ ...financeData.supplier2, statusText: '待审核', status: 1, id: '2' })
      }

      // 三级
      const statusList3 = this.teamStatus.entity_finance_order_3
      if (statusList3.find(item => item.status_id === roleStatus.finance.entity_finance_order_3.s_finance_order_3_has_loan.status)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.list2.push({ ...financeData.supplier3, statusText: '已融资', status: 4, id: '3' })
      } else if (statusList3.find(item => item.status_id === roleStatus.finance.entity_finance_order_3.s_finance_order_3_second_review.status)) {
        arr.push({ ...financeData.supplier3, statusText: '待放款', status: 3, id: '3' })
      } else if (statusList3.find(item => item.status_id === roleStatus.finance.entity_finance_order_3.s_finance_order_3_has_review.status)) {
        arr.push({ ...financeData.supplier3, statusText: '待复核', status: 2, id: '3' })
      } else if (statusList3.find(item => item.status_id === roleStatus.finance.entity_finance_order_3.s_finance_order_3_can_review.status)) {
        arr.push({ ...financeData.supplier3, statusText: '待审核', status: 1, id: '3' })
      }
      return arr
    }
  },
  methods: {
    async handleSubmit() {
      if (this.pass !== '1') {
        Message.warning('请选择通过！')
        return
      }
      let actionid = ''
      switch (this.currentSelect) {
        case '1':
          actionid = actionCode.finance.a_finance_order_1_review
          break
        case '2':
          actionid = actionCode.finance.a_finance_order_2_review
          break
        case '3':
          actionid = actionCode.finance.a_finance_order_3_review
          break
      }
      await this.$store.dispatch('changeStatus', { actionid })
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  display: flex;
  justify-content: space-between;
}
</style>
