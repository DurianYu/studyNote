<template>
  <div class="core-business">
    <h3 class="font2-b">支付管理</h3>
    <br />
    <Tabs v-model="tabName">
      <TabPane :label="`待处理(${list1.length})`" name="name1"></TabPane>
      <TabPane :label="`已结清(${list2.length})`" name="name2"></TabPane>
    </Tabs>
    <Table :columns="columns" :data="tabName === 'name1' ? list1 : list2">
      <template slot="action" slot-scope="{ row }">
        <a href="javascript:;" v-if="row.status === 1" @click="visible = true">审核</a>
      </template>
    </Table>
    <Modal title="详情审核" :visible.sync="visible" @ok="handleSubmit">
      <Form :label-width="140">
        <FormItem label="账款编号：">
          <p>ververbebrberb</p>
        </FormItem>
        <FormItem label="账款金额：">
          <p>ververbebrberb</p>
        </FormItem>
        <FormItem label="本次支付金额：">
          <p>ververbebrberb</p>
        </FormItem>
        <FormItem label="剩余待支付金额：">
          <p>ververbebrberb</p>
        </FormItem>
        <FormItem label="账款流向：">
          <p>北京招商银行：100000元</p>
          <p>浙江百维科技有限公司：25365元</p>
          <p>四川海洋科技有限公司：213433元</p>
          <p>深圳锐光科技有限公司：32456元</p>
        </FormItem>
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
import {
  Table,
  Form,
  FormItem,
  // Button,
  // Select,
  // Option,
  // Input,
  Tabs,
  TabPane,
  RadioGroup,
  Radio,
  Message
} from 'view-design'
import Modal from '@/components/Modal'
import { roleStatus, actionCode } from '@/config/index'
export default {
  components: {
    Table,
    Modal,
    Form,
    FormItem,
    // Button,
    // Select,
    // Option,
    // Input,
    Tabs,
    TabPane,
    RadioGroup,
    Radio
  },
  data() {
    return {
      pass: '',
      tabName: 'name1',
      visible: false,
      columns: [
        {
          title: '账款编号',
          key: 'key1',
          align: 'center'
        },
        {
          title: '发单企业',
          key: 'key2',
          align: 'center'
        },
        {
          title: '收单企业',
          key: 'key3',
          align: 'center'
        },
        {
          title: '账款金额',
          key: 'key4',
          align: 'center'
        },
        {
          title: '本次支付',
          key: 'key5',
          align: 'center'
        },
        {
          title: '剩余待支付',
          key: 'key6',
          align: 'center'
        },
        {
          title: '逾期天数',
          key: 'key7',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      originObj: {
        key1: 'SD00001',
        key2: '北京神盾汽车集团有限公司',
        key3: '浙江百维科技有限公司',
        key4: '98000000元',
        key5: '98000000元',
        key6: '0',
        key7: '0'
      },
      list2: []
    }
  },
  computed: {
    list1() {
      let arr = []
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.list2 = []
      const currentEntity = this.$getEntityNewStatus('entity_finance_contract_account')
      if (currentEntity.status_id === roleStatus.finance.entity_finance_contract_account.s_finance_checker_can_verify.status) {
        arr = [{ ...this.originObj, status: 1 }]
      } else if (currentEntity.status_id === roleStatus.finance.entity_finance_contract_account.s_finance_checker_has_verify.status) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.list2 = [{ ...this.originObj, status: 2 }]
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
      await this.$store.dispatch('changeStatus', { actionid: actionCode.finance.a_finance_checker_verify_account })
      this.visible = false
      Message.success('操作成功！')
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
