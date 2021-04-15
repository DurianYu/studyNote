<template>
  <div class="core-business">
    <h3 class="font2-b">核心企业管理</h3>
    <br />
    <Table :columns="columns" :data="list">
      <template slot="action" slot-scope="{ row }">
        <router-link v-if="row.status === 1" :to="{ name: 'supply-chain-sys-review', query: { id: '0', data: dataItem } }">审核</router-link>
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
          title: '核心企业名称',
          key: 'key1',
          align: 'center'
        },
        {
          title: '联系人',
          key: 'key2',
          align: 'center'
        },
        {
          title: '联系方式',
          key: 'key3',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'key4',
          align: 'center'
        },
        {
          title: '当前状态',
          key: 'key5',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      originObj: {
        key1: '',
        key2: '',
        key3: '',
        key4: '2019-09-10',
        key5: ''
      }
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    dataItem() {
      const dataStatus = this.teamStatus.entity_finance_p_form_0.find(
        item => item.status_id === roleStatus.finance.entity_finance_p_form_0.s_finance_p_form_0_has_apply.status
      )
      return dataStatus?.data || ''
    },
    list() {
      if (this.dataItem) {
        const dataItem = JSON.parse(this.dataItem)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.originObj = { ...this.originObj, key1: dataItem.formData.key1, key2: dataItem.formData.key5, key3: dataItem.formData.key6 }
      }
      let listObj = { ...this.originObj }
      const statusList = this.teamStatus.entity_finance_p_form_0
      if (statusList.find(item => item.status_id === roleStatus.finance.entity_finance_p_form_0.s_finance_p_form_0_review_pass.status)) {
        listObj.key5 = '已审核'
        listObj.status = 2
      } else if (statusList.find(item => item.status_id === roleStatus.finance.entity_finance_p_form_0.s_finance_p_form_0_has_apply.status)) {
        listObj.key5 = '待审核'
        listObj.status = 1
      } else {
        return []
      }
      return [listObj]
    }
  }
}
</script>

<style lang="scss" scoped></style>
