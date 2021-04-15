<template>
  <div class="page">
    <header>
      <div class="title font2-b">保单管理中心</div>
    </header>

    <section class="main">
      <Table :data="dataList" :columns="columns">
        <template slot="action" slot-scope="{}">
          <Button v-if="!reviewDone" type="primary" size="small" style="margin-right: 5px" @click="inspect">审核</Button>
          <Button v-if="!payDone && reviewDone" type="primary" size="small" style="margin-right: 5px" @click="payfor">赔付</Button>
        </template>
      </Table>
    </section>
  </div>
</template>
<script>
import { roleStatus } from '@/config/index'
import {
  // Form,
  // FormItem,
  Button,
  // Input,
  // Steps,
  // Step,
  Table,
  Message
  // RadioGroup,
  // Radio,
  // CheckboxGroup,
  // Checkbox,
  // Select,
  // Option
} from 'view-design'

export default {
  components: {
    // Form,
    // FormItem,
    Button,
    // Input,
    // Steps,
    // Step,
    Table
  },
  data() {
    return {
      current: 0,
      list: [
        {
          col1: '张晓明',
          col2: '6217 0000 1010 1800 600',
          col3: '航空延误险',
          status: ''
        }
      ],
      columns: [
        {
          title: '账户姓名',
          key: 'col1'
        },
        {
          title: '银行账户',
          key: 'col2'
        },
        {
          title: '理赔申请',
          key: 'col3'
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
      is_search: false,
      formData: {},
      rules: []
    }
  },
  computed: {
    reviewDone() {
      const currentStatus = this.$getEntityNewStatus('entity_insurance')
      const doneList = [
        roleStatus.insurance.s_insurance_old_has_review.status,
        roleStatus.insurance.s_insurance_old_has_pay.status,
        roleStatus.insurance.s_insurance_new_init.status,
        roleStatus.insurance.s_insurance_new_has_pay.status,
        roleStatus.insurance.s_insurance_new_has_effect.status
      ]
      return doneList.includes(currentStatus.status_id)
    },
    payDone() {
      const currentStatus = this.$getEntityNewStatus('entity_insurance')
      const doneList = [
        roleStatus.insurance.s_insurance_old_has_pay.status,
        roleStatus.insurance.s_insurance_new_init.status,
        roleStatus.insurance.s_insurance_new_has_pay.status,
        roleStatus.insurance.s_insurance_new_has_effect.status
      ]
      return doneList.includes(currentStatus.status_id)
    },
    dataList() {
      const currentStatus = this.$getEntityNewStatus('entity_insurance')
      const showStatusList = [
        roleStatus.insurance.s_insurance_old_has_report.status,
        roleStatus.insurance.s_insurance_old_has_review.status,
        roleStatus.insurance.s_insurance_old_has_pay.status,
        roleStatus.insurance.s_insurance_new_init.status,
        roleStatus.insurance.s_insurance_new_has_pay.status,
        roleStatus.insurance.s_insurance_new_has_effect.status
      ]
      const show = showStatusList.includes(currentStatus.status_id)
      if (!show) return []
      return [
        {
          col1: '张晓明',
          col2: '6217 0000 1010 1800 600',
          col3: '航空延误险',
          status: this.payDone ? '已赔付' : this.reviewDone ? '已审核' : '未审核',
          action: 1
        }
      ]
    }
  },
  methods: {
    inspect() {
      this.$router.push({ name: 'insurance-traditional-apply-claim' })
    },
    payfor() {
      const currentStatus = this.$getEntityNewStatus('entity_insurance')
      if (roleStatus.insurance.s_insurance_old_has_review.status != currentStatus.status_id) return Message.error('请先审核')
      this.$router.push({ name: 'insurance-traditional-insurance-payfor' })
    }
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
