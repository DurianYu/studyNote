<template lang="html">
  <div class="page-lc-overview">
    <header>
      <Row class="fn-box page-space-l-t font2-b" type="flex" justify="space-around" align="middle">
        <Col span="18">
          <!-- <img class="logo" :src="logo_src" alt="" /> -->
          <span>上链状态: {{ currentHash }}</span>
        </Col>
        <Col span="6">
          <span>余额: 0</span>
        </Col>
      </Row>
    </header>

    <Divider></Divider>

    <section class="main">
      <div style="display: flex; justify-content: flex-end;" v-if="showCreateContractBtn">
        <Button type="primary" @click="creContract">创建合同</Button>
      </div>

      <div class="lc-box">
        <Divider class="title" orientation="left">信用证</Divider>
        <Table border :data="data_lc" :columns="columns_lc">
          <!-- <template slot-scope="{ row, index }" slot="bill">
            <Button type="primary" size="small" style="margin-right: 5px" @click="getBill(index)">获取</Button>
          </template> -->
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" v-if="isShow('getbill')" @click="getBill(index)">获取提单</Button>
            <Button type="primary" size="small" style="margin-right: 5px" v-if="isShow('pay')" @click="pay(index)">付款</Button>
            <Button type="primary" size="small" style="margin-right: 5px" v-if="isShow('ship')" @click="sendGoods(index)">确认发货</Button>
          </template>
        </Table>
      </div>
      <div class="contract-box" v-if="showContract">
        <Divider class="title" orientation="left">合同</Divider>
        <Table border :data="data_contract" :columns="columns_contract">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
            <Button type="primary" size="small" style="margin-right: 5px" v-if="isShow('applyLc')" @click="applyLc(index)">申请信用证</Button>
          </template>
        </Table>
      </div>
      <div class="lc-apply-box" v-if="showLcApply">
        <Divider class="title" orientation="left">信用证申请</Divider>
        <Table border :data="data_lc_apply" :columns="columns_lc_apply">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" v-if="isShow('reviewLc')" @click="inspect(index)">审核</Button>
            <Button type="primary" size="small" style="margin-right: 5px" v-if="isShow('openLc')" @click="register(index)">开立</Button>
          </template>
        </Table>
      </div>
      <div class="transaction-box">
        <Divider class="title" orientation="left">交易</Divider>
        <Table border :data="data_transaction" :columns="columns_transaction">
          <!-- <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
            <Button type="error" size="small" @click="remove(index)">Delete</Button>
          </template> -->
        </Table>
      </div>
    </section>

    <Modalcustom title="题目" :visible="modal.question" :footerHide="true">
      <h3 class="title">如果取消签约，以下交易输入输出显示正确的为？</h3>
      <br />
      <CheckboxGroup v-model="answer">
        <Checkbox label="A"> A 输入：合同（卖方签署）</Checkbox>
        <br />
        <br />
        <Checkbox label="B"> B 输出：合同（签约成功）</Checkbox>
        <br />
        <br />
        <Checkbox label="C"> C 输入：合同（买方签署）</Checkbox>
        <br />
        <br />
        <Checkbox label="D"> D.输出：合同 （取消签约）</Checkbox>
      </CheckboxGroup>
      <Button style="margin-top: 2rem" type="primary" @click="submitAanwer" class="btn-center">确 定</Button>
    </Modalcustom>
  </div>
</template>

<script>
import { Row, Col, Divider, Table, Button, CheckboxGroup, Checkbox, Message, Modal } from 'view-design'
import Modalcustom from '@/components/Modal'
import { mapState, mapGetters } from 'vuex'
import { roleName, roleStatus, actionCode } from '@/config/index'
import { transactionList, btnList } from './index'

export default {
  components: {
    Row,
    Col,
    Divider,
    Table,
    Button,
    Modalcustom,
    CheckboxGroup,
    Checkbox
  },
  data() {
    return {
      modal: {
        question: false
      },
      answer: [],
      logo_src: '',
      columns_lc: [
        {
          key: 'number',
          title: '编号'
        },
        {
          key: 'buyer',
          title: '买方'
        },
        {
          key: 'seller',
          title: '卖方'
        },
        {
          key: 'amount',
          title: '金额'
        },
        {
          key: 'des',
          title: '描述'
        },
        {
          key: 'status',
          title: '状态'
        },
        {
          key: 'bill',
          title: '提单'
        },
        {
          slot: 'action',
          title: '操作'
        }
      ],
      columns_contract: [
        {
          key: 'number',
          title: '编号'
        },
        {
          key: 'buyer',
          title: '买方'
        },
        {
          key: 'seller',
          title: '卖方'
        },
        {
          key: 'amount',
          title: '数量'
        },
        {
          key: 'price',
          title: '单价'
        },
        {
          key: 'des',
          title: '描述'
        },
        {
          key: 'status',
          title: '状态'
        },
        {
          slot: 'action',
          title: '操作'
        }
      ],
      columns_lc_apply: [
        {
          key: 'buyer',
          title: '买方'
        },
        {
          key: 'seller',
          title: '卖方'
        },
        {
          key: 'amount',
          title: '数量'
        },
        {
          key: 'des',
          title: '描述'
        },
        {
          key: 'status',
          title: '状态'
        },
        {
          slot: 'action',
          title: '操作'
        }
      ],
      columns_transaction: [
        {
          key: 'hash',
          title: '哈希'
        },
        {
          key: 'entry',
          title: '输入'
        },
        {
          key: 'output',
          title: '输出'
        },
        {
          key: 'signer',
          title: '签名者'
        }
      ],
      // 信用证基本数据
      dataLcObj: {
        number: 'CTIS002',
        buyer: '维珍集团',
        seller: '通宇集团',
        amount: '1,000,000USD',
        des: '安全锤ZS90',
        status: '',
        bill: ''
      },
      // 合同基本数据
      dataContractObj: {
        number: 'CTIS001',
        buyer: '维珍集团',
        seller: '通宇集团',
        amount: '10000个',
        price: '10USD',
        status: '',
        des: '安全锤ZS90'
      },
      dataLcApplyObj: {
        buyer: '维珍集团',
        seller: '通宇集团',
        amount: '100000USD',
        des: '安全锤ZS90',
        status: ''
      }
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    ...mapGetters(['smsUnReadNumber', 'currentRole']),
    // 是否显示创建合同按钮
    showCreateContractBtn() {
      const entityStatus = this.$getEntityNewStatus('entity_contract')
      return entityStatus.status_id === roleStatus.lc.contract.s_lc_contract_init.status && this.currentRole == roleName.lc.role_tongyu.roleId
    },
    // 是否显示合同
    showContract() {
      return [roleName.lc.role_tongyu.roleId, roleName.lc.role_weizhen.roleId].includes(this.currentRole)
    },
    // 是否显示信用证申请单
    showLcApply() {
      return [roleName.lc.role_bakelai_bank.roleId, roleName.lc.role_weizhen.roleId].includes(this.currentRole)
    },
    // 交易列表
    data_transaction() {
      let _index = -1 // 下标
      transactionList.forEach((item, index) => {
        // 前两个从合同里面判断，后面的从信用证里面判断
        if (index < 2) {
          this.teamStatus.entity_contract.forEach(cls => {
            if (cls.is_new === 1 && item.status.includes(cls.status_id)) {
              _index = index
            }
          })
        } else {
          this.teamStatus.entity_credit.forEach(cls => {
            if (cls.is_new === 1 && item.status.includes(cls.status_id)) {
              _index = index
            }
          })
        }
      })
      // 获取到最新状态的index,再获取当前index及之前的数据
      return transactionList.filter((item, index) => index <= _index)
    },
    currentHash() {
      if (this.data_transaction.length === 0) return ''
      return this.data_transaction[this.data_transaction.length - 1].hash
    },
    // 合同数据
    data_contract() {
      let allList = [
        { ...this.dataContractObj, status: '单方签署', belongStatus: roleStatus.lc.contract.s_lc_contract_seller_signed.status },
        { ...this.dataContractObj, status: '签约成功', belongStatus: roleStatus.lc.contract.s_lc_contract_signed_success.status }
      ]
      const currentStatus = this.$getEntityNewStatus('entity_contract')
      const arr = allList.filter(item => {
        return item.belongStatus === currentStatus.status_id
      })
      return arr
    },
    // 信用证数据
    data_lc() {
      let billStatus = ''
      const newStatus = this.$getEntityNewStatus('entity_bill')
      switch (newStatus.status_id) {
        case roleStatus.lc.bill.s_lc_bill_belong_tongyu.status:
          billStatus = '通宇集团'
          break
        case roleStatus.lc.bill.s_lc_bill_belong_jianshe.status:
          billStatus = '建设银行'
          break
        case roleStatus.lc.bill.s_lc_bill_belong_bakelai.status:
          billStatus = '巴克莱银行'
          break
        case roleStatus.lc.bill.s_lc_bill_belong_weizhen.status:
          billStatus = '维珍集团'
          break
        case roleStatus.lc.bill.s_lc_bill_surrender_pick_up.status:
          billStatus = '维珍集团'
          break
        default:
          billStatus = ''
          break
      }
      let allList = [
        { ...this.dataLcObj, status: '已开立', bill: billStatus, belongStatus: roleStatus.lc.credit.s_lc_credit_has_open.status },
        { ...this.dataLcObj, status: '已到岸', bill: billStatus, belongStatus: roleStatus.lc.credit.s_lc_credit_has_landing.status },
        { ...this.dataLcObj, status: '已发货', bill: billStatus, belongStatus: roleStatus.lc.credit.s_lc_credit_has_send_goods.status },
        { ...this.dataLcObj, status: '已受益人已收款', bill: billStatus, belongStatus: roleStatus.lc.credit.s_lc_credit_beneficiary_received.status },
        { ...this.dataLcObj, status: '仪付行已收款', bill: billStatus, belongStatus: roleStatus.lc.credit.s_lc_credit_negotiating_received.status },
        { ...this.dataLcObj, status: '已还款', bill: billStatus, belongStatus: roleStatus.lc.credit.s_lc_credit_has_pay_back_money.status }
      ]
      const currentStatus = this.$getEntityNewStatus('entity_credit')
      const arr = allList.filter(item => {
        return item.belongStatus === currentStatus.status_id
      })
      return arr
    },
    // 信用证申请单数据
    data_lc_apply() {
      let allList = [
        { ...this.dataLcApplyObj, status: '未审核', belongStatus: roleStatus.lc.credit.s_lc_credit_has_apply.status },
        { ...this.dataLcApplyObj, status: '已审核', belongStatus: roleStatus.lc.credit.s_lc_credit_has_verify.status },
        { ...this.dataLcApplyObj, status: '已开立', belongStatus: roleStatus.lc.credit.s_lc_credit_has_open.status },
        { ...this.dataLcApplyObj, status: '已开立', belongStatus: roleStatus.lc.credit.s_lc_credit_has_landing.status },
        { ...this.dataLcApplyObj, status: '已开立', belongStatus: roleStatus.lc.credit.s_lc_credit_has_send_goods.status },
        { ...this.dataLcApplyObj, status: '已开立', belongStatus: roleStatus.lc.credit.s_lc_credit_beneficiary_received.status },
        { ...this.dataLcApplyObj, status: '已开立', belongStatus: roleStatus.lc.credit.s_lc_credit_negotiating_received.status },
        { ...this.dataLcApplyObj, status: '已开立', belongStatus: roleStatus.lc.credit.s_lc_credit_has_pay_back_money.status }
      ]
      const currentStatus = this.$getEntityNewStatus('entity_credit')
      const arr = allList.filter(item => {
        return item.belongStatus === currentStatus.status_id
      })
      return arr
    }
  },
  methods: {
    isShow(id) {
      let currentBtn = btnList.find(item => id === item.id)
      let roleObj = currentBtn.meta.find(item => item.role.includes(this.currentRole))
      let flag = false
      if (!roleObj) return flag
      const newCurrentStatus = this.$getEntityNewStatus(roleObj.entity)
      flag = roleObj.status.includes(newCurrentStatus.status_id)
      if (roleObj.andStatus) {
        const newCurrentStatus2 = this.$getEntityNewStatus(roleObj.andEntity)
        flag = flag && roleObj.andStatus.includes(newCurrentStatus2.status_id)
      }
      return flag
    },
    sendGoods() {
      Modal.confirm({
        content: '确定要进行发货?',
        onOk: async () => {
          await this.$store.dispatch('changeStatus', { actionid: actionCode.lc.a_lc_tongyu_confirm_send_goods })
          Message.success('发货成功')
        }
      })
    },
    getBill() {
      this.$router.push({ name: 'lc-cre-bill' })
    },
    pay() {
      let actionid = ''
      switch (this.currentRole) {
        case roleName.lc.role_jianshe_bank.roleId:
          actionid = actionCode.lc.a_lc_jianshe_pay_money_tongyu
          break
        case roleName.lc.role_bakelai_bank.roleId:
          actionid = actionCode.lc.a_lc_bakelai_pay_money_jianshe
          break
        case roleName.lc.role_weizhen.roleId:
          actionid = actionCode.lc.a_lc_weizhen_pay_money_bakelai
          break
      }
      Modal.confirm({
        content: '确定要进行付款?',
        onOk: async () => {
          await this.$store.dispatch('changeStatus', { actionid })
          Message.success('付款成功')
        }
      })
    },
    register() {
      this.$router.push({ name: 'lc-register-lc' })
    },
    inspect() {
      this.$router.push({ name: 'lc-view-lc' })
    },
    applyLc() {
      this.$router.push({ name: 'lc-cre-lc' })
    },
    creContract() {
      this.$router.push({ name: 'lc-cre-contract' })
    },
    initColumns(map) {
      let result = []
      for (let key in map) {
        if (key == '操作') {
          result.push({
            title: key,
            slot: 'action',
            width: 150,
            align: 'center'
          })
        } else if (key == '提单') {
          result.push({
            title: key,
            slot: 'bill',
            width: 150,
            align: 'center'
          })
        } else {
          result.push({
            title: key,
            key: map[key]
          })
        }
      }
      return result
    },
    show() {
      this.$router.push({ name: 'lc-view-contract' })
    },
    remove() {},
    setRead() {
      this.$fetch({
        uriCode: 'API1002',
        msg_type: 'sms',
        status: true
      })
        .then(() => {
          this.$store.dispatch('getUserInfo')
          this.$store.dispatch('getMsg')
        })
        .catch(() => {})
    },
    submitAanwer() {
      if (this.answer.length == 2 && this.answer === 'A' && this.answer === 'D') {
        Message.success('回答正确')
      } else {
        Message.error('回答错误')
      }
      this.modal.question = false
    }
  },
  created() {
    this.logo_src = require(`@/assets/images/lc/${this.currentRole}.png`)
    // this.columns_lc = this.initColumns(this.map_lc)
    // this.columns_contract = this.initColumns(this.map_contract)
    // this.columns_lc_apply = this.initColumns(this.map_lc_apply)
    // this.columns_transaction = this.initColumns(this.map_transaction)
  }
}
</script>

<style lang="scss" scoped>
.page-lc-overview {
  ::v-deep {
    .logo {
      max-width: 124px;
      object-fit: contain;
    }

    header {
      .fn-box {
        height: 64px;
        > ivu-col {
          display: flex;
          align-items: center;
          justify-content: start;
        }
        .logo {
          object-fit: cover;
          min-width: 64px;
          margin: 0 1rem;
        }
      }
    }
    .main {
      width: 80%;
      margin: 0 auto;
      padding: 0 0 4rem 0;

      .title {
        font-size: 16px;
      }
      .lc-box {
      }
    }
  }
}
</style>
