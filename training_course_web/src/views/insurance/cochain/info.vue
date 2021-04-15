<template>
  <div class="page">
    <header>
      <!-- <div class="title">保单管理中心</div> -->
    </header>

    <section class="main">
      <div style="display: flex; align-item: center; justify-content: space-between;">
        <span> 飞机延误险合约: 0xdc3d8fc2C41781B0259175BdC19516f7Da11cBA7</span>
        <span> 资金池总额：¥ 9,800,000</span>
      </div>
      <br />
      <Table :data="list" :columns="columns"></Table>
    </section>
    <Modal title="题目" :visible="modal.question1" :footerHide="true">
      <h3 class="title">以下哪一个交易哈希反应了投保？</h3>
      <br />
      <RadioGroup>
        <Radio label="A">A.0xd33e2f0f17c0cf6…</Radio>
        <br />
        <br />
        <Radio label="B">B.0x1166965e5cf0ffc9…</Radio>
        <br />
        <br />
        <Radio label="C">C.0x0e6b2b1882ff25e…</Radio>
        <br />
        <br />
        <Radio label="D">D.0x24762ed3924797……</Radio>
      </RadioGroup>
      <Button style="margin-top: 2rem" type="primary" @click="submitAanwer" class="btn-center">确 定</Button>
    </Modal>

    <Modal title="题目" :visible="modal.question2" :footerHide="true">
      <h3 class="title">以下哪一个交易哈希反应了自动理赔？</h3>
      <br />
      <CheckboxGroup v-model="answer">
        <Checkbox label="A">A.0xd33e2f0f17c0cf6…</Checkbox>
        <br />
        <br />
        <Checkbox label="B">B.0x1166965e5cf0ffc9…</Checkbox>
        <br />
        <br />
        <Checkbox label="C">C.0x0e6b2b1882ff25e…</Checkbox>
        <br />
        <br />
        <Checkbox label="D">D.0x24762ed3924797……</Checkbox>
      </CheckboxGroup>
      <Button style="margin-top: 2rem" type="primary" @click="submitAanwer" class="btn-center">确 定</Button>
    </Modal>
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
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  // Select,
  // Option
  Modal
} from 'view-design'

export default {
  components: {
    // Form,
    // FormItem,
    Button,
    // Input,
    // Steps,
    // Step,
    Table,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox,
    Modal
  },
  data() {
    return {
      answer: [],
      modal: {
        question1: false,
        question2: true
      },
      current: 0,
      originList: [
        {
          col1: '0x24762ed3924797…',
          col2: '9600107',
          col3: '09-01-2020 17:02:30 PM',
          col4: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
          col5: '转入',
          col6: '0xdc3d8fc2C41781B0259175BdC19516f7Da11cBA7',
          col7: '¥ 230'
        },
        {
          col1: '0xd33e2f0f17c0cf6…',
          col2: '9408133',
          col3: '09-01-2020 16:42:30 PM',
          col4: '0xdc3d8fc2C41781B0259175BdC19516f7Da11cBA7',
          col5: '转入',
          col6: '0x50e00de2c5cc4e456cf234fcb1a0efa367ed016e',
          col7: '¥ 90'
        },
        {
          col1: '0x1166965e5cf0ffc9…',
          col2: '9407440',
          col3: '08-30-2020 18:10:20 PM',
          col4: '0x50e00de2c5cc4e456cf234fcb1a0efa367ed016e',
          col5: '转入',
          col6: '0xdc3d8fc2C41781B0259175BdC19516f7Da11cBA7',
          col7: '¥ 50'
        },
        {
          col1: '0x0e6b2b1882ff25e…',
          col2: '9165648',
          col3: '09-01-2020 17:02:30 PM',
          col4: '0xdc3d8fc2C41781B0259175BdC19516f7Da11cBA7',
          col5: '转入',
          col6: '0xbf06789ee859698ed737d6c9eb404791a85f5e9e',
          col7: '¥ 200'
        },
        {
          col1: '0xa7688e21d713a2…',
          col2: '9010248',
          col3: '08-28-2020 18:10:20 PM',
          col4: '0xbf06789ee859698ed737d6c9eb404791a85f5e9e',
          col5: '转入',
          col6: '0xdc3d8fc2C41781B0259175BdC19516f7Da11cBA7',
          col7: '¥ 100'
        },
        {
          col1: '0xf33e575e1179d80…',
          col2: '9010248',
          col3: '08-27-2020 09:15:20 AM',
          col4: '0x21e479e62603a3ea0b6dc687cb86b9938d39a3dd',
          col5: '转入',
          col6: '0xdc3d8fc2C41781B0259175BdC19516f7Da11cBA7',
          col7: '¥ 200'
        }
      ],
      columns: [
        {
          title: '交易哈希',
          key: 'col1'
        },
        {
          title: '区块高度',
          key: 'col2'
        },
        {
          title: '时间',
          key: 'col3'
        },
        {
          title: '发送方',
          key: 'col4'
        },
        {
          title: '状态',
          key: 'col5'
        },
        {
          title: '接收方',
          key: 'col6'
        },
        {
          title: '交易费',
          key: 'col7'
        }
      ],
      formData: {},
      rules: []
    }
  },
  computed: {
    list() {
      let arr = []
      const currentStatus = this.$getEntityNewStatus('entity_insurance')
      const statusListType1 = [roleStatus.insurance.s_insurance_new_init.status]
      const statusListType2 = [roleStatus.insurance.s_insurance_new_has_effect.status]
      const statusListType3 = [roleStatus.insurance.s_insurance_new_has_pay.status]
      if (statusListType1.includes(currentStatus.status_id)) {
        arr = [this.originList[3], this.originList[4], this.originList[5]]
      } else if (statusListType2.includes(currentStatus.status_id)) {
        arr = [this.originList[2], this.originList[3], this.originList[4], this.originList[5]]
      } else if (statusListType3.includes(currentStatus.status_id)) {
        arr = [...this.originList]
      }
      return arr
    }
  },
  methods: {
    inspect() {
      this.$router.push({ name: 'insurance-traditional-apply-claim' })
    },
    payfor() {
      this.$router.push({ name: 'insurance-traditional-insurance-payfor' })
    },
    submitAanwer() {}
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
