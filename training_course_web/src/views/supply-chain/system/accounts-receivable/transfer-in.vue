<template>
  <div class="core-business">
    <h3 class="font2-b">应付账款管理-转入账款</h3>
    <br />
    <Tabs v-model="tabName">
      <TabPane label="待签收" name="name1"></TabPane>
      <TabPane label="已生效" name="name2"></TabPane>
      <TabPane label="已失效" name="name3"></TabPane>
    </Tabs>
    <Table :columns="columns" :data="tabName === 'name1' ? list1 : tabName === 'name2' ? list2 : []">
      <template slot="action" class="action" slot-scope="{ row }">
        <div class="table-action">
          <router-link :to="{ name: 'supply-chain-sys-transfer-in-detail', query: { data: JSON.stringify(dataObj) } }">详情</router-link>
          <a href="javascript:;" @click="signFor" v-if="row.status === 0">签收</a>
          <a href="javascript:;" v-if="row.status === 0">拒绝签收</a>
        </div>
      </template>
    </Table>
  </div>
</template>

<script>
import { Table, Tabs, TabPane, Modal, Message } from 'view-design'
import { mapGetters } from 'vuex'
import { roleName, roleStatus, actionCode } from '@/config/index'
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
          title: '状态',
          key: 'key12',
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
          // 一级已签收
          if (this.accountApply.entityStatusList.includes(roleStatus.finance.entity_finance_contract_account.s_finance_1_2_contract_can_sign.status)) {
            arr = []
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.list2 = [{ ...this.dataObj, key12: '已签收', key13: 'success', status: 1 }]
          } else if (this.accountApply.entityStatusList.includes(roleStatus.finance.entity_finance_contract_account.s_finance_0_1_account_0_signed.status)) {
            // 一级待签收
            arr = [{ ...this.dataObj, key12: '待签收', key13: 'waiting', status: 0 }]
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.list2 = []
          }
          break
        // 二级供应商
        case roleName.finance.role_second_supplier.roleId:
          // 二级已签收
          if (this.accountApply.entityStatusList.includes(roleStatus.finance.entity_finance_contract_account.s_finance_2_3_contract_can_sign.status)) {
            arr = []
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.list2 = [{ ...this.dataObj, key12: '已签收', key13: 'success', status: 1 }]
          } else if (this.accountApply.entityStatusList.includes(roleStatus.finance.entity_finance_contract_account.s_finance_1_2_account_1_signed.status)) {
            // 二级待签收
            arr = [{ ...this.dataObj, key12: '待签收', key13: 'waiting', status: 0 }]
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.list2 = []
          }
          break
        // 三级供应商
        case roleName.finance.role_third_supplier.roleId:
          // 三级已签收
          // 这个比较特殊，需要通过判断三级融资单是否可创建来判断三级是否已签收
          if (
            this.financeOrder.entityStatusList.includes(roleStatus.finance[this.financeOrder.entityKey][`s_finance_order_${this.roleTypeKey}_can_write`].status)
          ) {
            arr = []
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.list2 = [{ ...this.dataObj, key12: '已签收', key13: 'success', status: 1 }]
          } else if (this.accountApply.entityStatusList.includes(roleStatus.finance.entity_finance_contract_account.s_finance_2_3_account_2_signed.status)) {
            // 三级待签收
            arr = [{ ...this.dataObj, key12: '待签收', key13: 'waiting', status: 0 }]
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.list2 = []
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
          this.changeStatus()
        }
      })
    },
    async changeStatus() {
      let actionid = ''
      switch (this.accountApply.newStatus.status_id) {
        case roleStatus.finance.entity_finance_contract_account.s_finance_0_1_account_0_signed.status:
          actionid = actionCode.finance.a_finance_0_1_account_1_sign
          break
        case roleStatus.finance.entity_finance_contract_account.s_finance_1_2_account_1_signed.status:
          actionid = actionCode.finance.a_finance_1_2_account_2_sign
          break
        case roleStatus.finance.entity_finance_contract_account.s_finance_2_3_account_2_signed.status:
          actionid = actionCode.finance.a_finance_2_3_account_3_sign
          break
      }
      await this.$store.dispatch('changeStatus', { actionid })
      Message.success('签收成功！')
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
