<template>
  <div class="core-business">
    <h3 class="font2-b">应付账款管理-转出账款</h3>
    <br />
    <Tabs v-model="tabName">
      <TabPane label="有效账款" name="name1"></TabPane>
      <TabPane label="转让中" name="name2"></TabPane>
      <TabPane label="已转让" name="name3"></TabPane>
      <TabPane label="已失效" name="name3"></TabPane>
    </Tabs>
    <Table :columns="columns" :data="tabName === 'name1' ? list1 : tabName === 'name2' ? list2 : list3">
      <template slot="action" class="action" slot-scope="{}">
        <div class="table-action" v-if="list2.length === 0 && list3.length === 0">
          <router-link :to="{ name: 'supply-chain-sys-transfer-out-add' }">创建信条转让单</router-link>
        </div>
      </template>
    </Table>
  </div>
</template>

<script>
import { Table, Tabs, TabPane, Modal, Message } from 'view-design'
import { roleName, roleStatus } from '@/config/index'
import { mapGetters } from 'vuex'
import { accountData } from '../data'
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
          title: '发单企业',
          key: 'key5',
          align: 'center'
        },
        {
          title: '转让企业',
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
      list2: [], // 转让中
      list3: [] // 已转让
    }
  },
  computed: {
    ...mapGetters(['currentRole', 'accountApply', 'financeOrder', 'roleTypeKey']),
    dataObj() {
      let obj = {}
      switch (this.currentRole) {
        case roleName.finance.role_first_supplier.roleId:
          obj = { ...accountData.supplier1 }
          break
        case roleName.finance.role_second_supplier.roleId:
          obj = { ...accountData.supplier2 }
          break
        case roleName.finance.role_third_supplier.roleId:
          obj = { ...accountData.supplier3 }
          break
      }
      return obj
    },
    list1() {
      let arr = []
      switch (this.currentRole) {
        // 一级供应商
        case roleName.finance.role_first_supplier.roleId:
          // 二级已签收
          if (this.accountApply.entityStatusList.includes(roleStatus.finance.entity_finance_contract_account.s_finance_2_3_contract_can_sign.status)) {
            arr = [{ ...this.dataObj }]
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.list3 = [{ ...this.dataObj, key1: 'BW00002', key9: '22000000' }]
          } else if (this.accountApply.entityStatusList.includes(roleStatus.finance.entity_finance_contract_account.s_finance_1_2_account_1_signed.status)) {
            // 二级待签收
            arr = [{ ...this.dataObj }]
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.list2 = [{ ...this.dataObj, key1: 'BW00002', key9: '22000000' }]
          } else if (this.accountApply.entityStatusList.includes(roleStatus.finance.entity_finance_contract_account.s_finance_1_2_account_can_create.status)) {
            // 一级待创建
            arr = [{ ...this.dataObj }]
          }
          break
        // 二级供应商
        case roleName.finance.role_second_supplier.roleId:
          // 三级已签收
          // 这个比较特殊，需要通过判断三级融资单是否可创建来判断三级是否已签收
          if (
            this.financeOrder.entityStatusList.includes(roleStatus.finance[this.financeOrder.entityKey][`s_finance_order_${this.roleTypeKey}_can_write`].status)
          ) {
            arr = [{ ...this.dataObj }]
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.list3 = [{ ...this.dataObj, key1: 'HY00003', key9: '8500000' }]
          } else if (this.accountApply.entityStatusList.includes(roleStatus.finance.entity_finance_contract_account.s_finance_2_3_account_2_signed.status)) {
            // 三级待签收
            arr = [{ ...this.dataObj }]
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.list2 = [{ ...this.dataObj, key1: 'HY00003', key9: '8500000' }]
          } else if (this.accountApply.entityStatusList.includes(roleStatus.finance.entity_finance_contract_account.s_finance_2_3_account_can_create.status)) {
            // 二级待创建
            arr = [{ ...this.dataObj }]
          }
          break
      }
      return arr
    }
  },
  methods: {
    // 确认弹窗
    signFor() {
      Modal.confirm({
        title: '确认提示',
        content: '您确认签收当前应收账款吗？',
        onOk: () => {
          Message.success('签收成功！')
        }
      })
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
