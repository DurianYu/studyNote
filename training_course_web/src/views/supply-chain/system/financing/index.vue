<template>
  <div class="core-business">
    <h3 class="font2-b">融资管理</h3>
    <br />
    <Tabs v-model="tabName">
      <TabPane :label="`有效账款(${list1.length})`" name="name1"></TabPane>
      <TabPane :label="`融资中(${list2.length})`" name="name2"></TabPane>
      <TabPane :label="`已融资(${list3.length})`" name="name3"></TabPane>
      <TabPane label="已失效" name="name4"></TabPane>
    </Tabs>
    <Table :columns="columns" :data="tabName === 'name1' ? list1 : tabName === 'name2' ? list2 : tabName === 'name3' ? list3 : []">
      <template slot="action" slot-scope="{ row }">
        <router-link :to="{ name: 'supply-chain-financing-add' }" v-if="row.status === 1">创建信条融资单</router-link>
      </template>
    </Table>
  </div>
</template>

<script>
import { Table, Tabs, TabPane } from 'view-design'
import { roleStatus, roleName } from '@/config/index'
import { mapGetters } from 'vuex'
import { accountData, financeData } from '../data'
export default {
  components: {
    Table,
    Tabs,
    TabPane
  },
  data() {
    return {
      tabName: 'name1',
      columns: [
        {
          title: '账款编号',
          key: 'key1',
          align: 'center'
        },
        {
          title: '发单单位',
          key: 'key5',
          align: 'center'
        },
        {
          title: '转让单位',
          key: 'key7',
          align: 'center'
        },
        {
          title: '账款金额',
          key: 'key9',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'key10',
          align: 'center'
        },
        {
          title: '到期时间',
          key: 'key10_1',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      list2: [],
      list3: []
    }
  },
  computed: {
    ...mapGetters(['financeOrder', 'roleTypeKey', 'currentRole']),
    dataObj() {
      let obj = {}
      switch (this.currentRole) {
        case roleName.finance.role_first_supplier.roleId:
          obj = {
            ...accountData.supplier1,
            account: financeData.supplier1.key4,
            financeNumber: financeData.supplier1.key1,
            creTime: financeData.supplier1.key5
          }
          break
        case roleName.finance.role_second_supplier.roleId:
          obj = {
            ...accountData.supplier2,
            account: financeData.supplier2.key4,
            financeNumber: financeData.supplier2.key1,
            creTime: financeData.supplier1.key5
          }
          break
        case roleName.finance.role_third_supplier.roleId:
          obj = {
            ...accountData.supplier3,
            account: financeData.supplier3.key4,
            financeNumber: financeData.supplier2.key1,
            creTime: financeData.supplier1.key5
          }
          break
      }
      return obj
    },
    list1() {
      let arr = []
      if (this.financeOrder.entityStatusList.includes(roleStatus.finance[this.financeOrder.entityKey][`s_finance_order_${this.roleTypeKey}_has_loan`].status)) {
        arr = [{ ...this.dataObj, key9: this.dataObj.key9 - this.dataObj.account }]
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.list3 = [{ ...this.dataObj, key9: this.dataObj.account, key1: this.dataObj.financeNumber, key10: this.dataObj.creTime }]
      } else if (
        this.financeOrder.entityStatusList.includes(roleStatus.finance[this.financeOrder.entityKey][`s_finance_order_${this.roleTypeKey}_can_review`].status)
      ) {
        // 融资中
        arr = [{ ...this.dataObj, key9: this.dataObj.key9 - this.dataObj.account }]
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.list2 = [{ ...this.dataObj, key9: this.dataObj.account, key1: this.dataObj.financeNumber, key10: this.dataObj.creTime }]
      } else if (
        this.financeOrder.entityStatusList.includes(roleStatus.finance[this.financeOrder.entityKey][`s_finance_order_${this.roleTypeKey}_can_write`].status)
      ) {
        // 可融资
        arr = [{ ...this.dataObj, status: 1 }]
      }
      return arr
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
