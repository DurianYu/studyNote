<template>
  <div class="core-business">
    <h3 class="font2-b">供应商管理</h3>
    <br />
    <Table :columns="columns" :data="list">
      <template slot="action" slot-scope="{ row }">
        <router-link
          v-if="row.status === 1"
          :to="{ name: 'supply-chain-sys-review', query: { id: row.id, data: row.id == '1' ? supplyData1 : row.id == '2' ? supplyData2 : supplyData3 } }"
          >审核</router-link
        >
      </template>
    </Table>
  </div>
</template>

<script>
import { Table } from 'view-design'
import { roleStatus } from '@/config/index'
import { mapState } from 'vuex'
export default {
  components: {
    Table
  },
  data() {
    return {
      columns: [
        {
          title: '企业名称',
          key: 'key1',
          align: 'center'
        },
        {
          title: '联系人',
          key: 'key5',
          align: 'center'
        },
        {
          title: '联系方式',
          key: 'key6',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'key4',
          align: 'center'
        },
        {
          title: '当前状态',
          key: 'statusText',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      originObj1: {
        id: '1',
        key1: '',
        key2: '',
        key3: '',
        key4: '2019-09-10',
        key5: ''
      },
      originObj2: {
        id: '2',
        key1: '二级企业名称',
        key2: '联系人姓名',
        key3: '联系人联系方式',
        key4: '创建时间',
        key5: ''
      },
      originObj3: {
        id: '3',
        key1: '三级企业名称',
        key2: '联系人姓名',
        key3: '联系人联系方式',
        key4: '创建时间',
        key5: ''
      }
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    supplyData1() {
      return JSON.stringify(this.filterData('1'))
    },
    supplyData2() {
      return JSON.stringify(this.filterData('2'))
    },
    supplyData3() {
      return JSON.stringify(this.filterData('3'))
    },
    list() {
      let arr = []
      // 一级
      const dataItem1 = this.filterData('1')
      let listObj1 = { ...this.originObj1, ...dataItem1.formData }
      const statusList1 = this.teamStatus.entity_finance_p_form_1
      if (statusList1.find(item => item.status_id === roleStatus.finance.entity_finance_p_form_1.s_finance_p_form_1_review_pass.status)) {
        listObj1.status = 2
        listObj1.statusText = '已审核'
        arr.push(listObj1)
      } else if (statusList1.find(item => item.status_id === roleStatus.finance.entity_finance_p_form_1.s_finance_p_form_1_has_apply.status)) {
        listObj1.status = 1
        listObj1.statusText = '待审核'
        arr.push(listObj1)
      }

      // 二级
      const dataItem2 = this.filterData('2')
      let listObj2 = { ...this.originObj2, ...dataItem2.formData }
      const statusList2 = this.teamStatus.entity_finance_p_form_2
      if (statusList2.find(item => item.status_id === roleStatus.finance.entity_finance_p_form_2.s_finance_p_form_2_review_pass.status)) {
        listObj2.status = 2
        listObj2.statusText = '已审核'
        arr.push(listObj2)
      } else if (statusList2.find(item => item.status_id === roleStatus.finance.entity_finance_p_form_2.s_finance_p_form_2_has_apply.status)) {
        listObj2.status = 1
        listObj2.statusText = '待审核'
        arr.push(listObj2)
      }

      // 三级
      const dataItem3 = this.filterData('3')
      let listObj3 = { ...this.originObj3, ...dataItem3.formData }
      const statusList3 = this.teamStatus.entity_finance_p_form_3
      if (statusList3.find(item => item.status_id === roleStatus.finance.entity_finance_p_form_3.s_finance_p_form_3_review_pass.status)) {
        listObj3.status = 2
        listObj3.statusText = '已审核'
        arr.push(listObj3)
      } else if (statusList3.find(item => item.status_id === roleStatus.finance.entity_finance_p_form_3.s_finance_p_form_3_has_apply.status)) {
        listObj3.status = 1
        listObj3.statusText = '待审核'
        arr.push(listObj3)
      }
      return arr
    }
  },
  methods: {
    filterData(typeNumber) {
      const dataStatus = this.teamStatus[`entity_finance_p_form_${typeNumber}`].find(
        item => item.status_id === roleStatus.finance[`entity_finance_p_form_${typeNumber}`][`s_finance_p_form_${typeNumber}_has_apply`].status
      )
      const dataItem = dataStatus ? JSON.parse(dataStatus.data) : {}
      return dataItem
    }
  }
}
</script>

<style lang="scss" scoped></style>
