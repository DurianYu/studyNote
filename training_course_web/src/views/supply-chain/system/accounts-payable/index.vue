<template>
  <div class="core-business">
    <h3 class="font2-b">应付账款管理 <Button v-if="list.length === 0" type="primary" :to="{ name: 'supply-chain-sys-accounts-payable-add' }">新 建</Button></h3>
    <br />
    <Table :columns="columns" :data="list"></Table>
  </div>
</template>

<script>
import { Table, Button } from 'view-design'
import { mapGetters } from 'vuex'
import { roleName, roleStatus } from '@/config/index'
export default {
  components: {
    Table,
    Button
  },
  data() {
    return {
      columns: [
        {
          title: '应付账款编号',
          key: 'key1',
          align: 'center'
        },
        {
          title: '收单企业',
          key: 'key2',
          align: 'center'
        },
        {
          title: '账款金额',
          key: 'key3',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'key4',
          align: 'center'
        },
        {
          title: '状态',
          key: 'key5',
          align: 'center'
        }
      ],
      originObj: {
        key1: 'ksndvnbverbverbo',
        key2: '企业名称',
        key3: '230.00',
        key4: '2019-07-25',
        key5: ''
      }
    }
  },
  computed: {
    ...mapGetters(['currentRole', 'accountApply']),
    list() {
      let arr = []
      switch (this.currentRole) {
        // 核心
        case roleName.finance.role_core.roleId:
          if (this.accountApply.entityStatusList.includes(roleStatus.finance.entity_finance_contract_account.s_finance_1_2_contract_can_sign.status)) {
            arr = [{ ...this.originObj, key5: '已签收' }]
          } else if (this.accountApply.entityStatusList.includes(roleStatus.finance.entity_finance_contract_account.s_finance_0_1_account_0_signed.status)) {
            arr = [{ ...this.originObj, key5: '待签收' }]
          }
          break
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
