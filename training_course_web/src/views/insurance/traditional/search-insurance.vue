<template>
  <div class="menu">
    <img src="@/assets/images/insurance/u136.png" alt="" class="" />
    <div class="info">
      <p>{{ isChain === 'chain' ? '地址：0x50e00de2c5cc4e456cf234fcb1a0efa367ed016e' : '银行账户：384如8364856486848' }}</p>
      <p>余额：10000</p>
    </div>

    <div v-if="!is_search" class="search-box">
      <h2>{{ isChain === 'chain' ? '区块链' : '互联网' }}航空延误险</h2>
      <Form ref="formData" :model="formData" label-position="top" inline>
        <FormItem prop="请输入您的保单号">
          <Input type="text" v-model="formData.user" placeholder="Username" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="search()">查询</Button>
        </FormItem>
      </Form>
    </div>

    <div v-if="is_search && isChain !== 'chain'" class="result-box">
      <h2>理赔进度查询</h2>
      <div>基本信息：</div>
      <br />
      <Table :data="list" :columns="columns">
        <!-- <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" v-if="isShow('ship')" @click="sendGoods(index)">确认发货</Button>
        </template> -->
      </Table>
      <br />
      <br />
      <div>状态：</div>
      <Steps :current="current">
        <Step title="已报案"></Step>
        <Step title="已审核"></Step>
        <Step title="已支付"></Step>
      </Steps>
    </div>
    <div v-if="is_search && isChain === 'chain'" class="result-box">
      <h2>查看保单信息</h2>
      <br />
      <Table :data="chainList" :columns="chainColumns">
        <template slot-scope="{}" slot="action">
          <a @click="cancel">取消</a>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { Message } from 'view-design'
import { roleStatus } from '@/config/index'
import { mapGetters } from 'vuex'
import {
  Form,
  FormItem,
  Button,
  Input,
  Steps,
  Step,
  Table
  // RadioGroup,
  // Radio,
  // CheckboxGroup,
  // Checkbox,
  // Select,
  // Option
} from 'view-design'

export default {
  components: {
    Form,
    FormItem,
    Button,
    Input,
    Steps,
    Step,
    Table
  },
  data() {
    return {
      list: [
        {
          col1: 'CA4102',
          col2: '2020-09-01',
          col3: '2020-09-01'
        }
      ],
      columns: [
        {
          title: '航班号',
          key: 'col1'
        },
        {
          title: '报案日期',
          key: 'col2'
        },
        {
          title: '乘机日期',
          key: 'col3'
        }
      ],
      chainList: [
        {
          col1: 'CA4102',
          col2: '¥50.00',
          col3: '¥90.00',
          col4: '已上链'
        }
      ],
      chainColumns: [
        {
          title: '#',
          type: 'col1'
        },
        {
          title: '保费',
          key: 'col2'
        },
        {
          title: '保额',
          key: 'col3'
        },
        {
          title: '状态',
          key: 'col4'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      is_search: false,
      formData: {}
    }
  },
  computed: {
    ...mapGetters(['isChain']),
    current() {
      const currentStatus = this.$getEntityNewStatus('entity_insurance')
      // 已报案
      const type1 = [roleStatus.insurance.s_insurance_old_has_report.status]
      // 已审核
      const type2 = [roleStatus.insurance.s_insurance_old_has_review.status]
      // 已赔付
      const type3 = [
        roleStatus.insurance.s_insurance_old_has_pay.status,
        roleStatus.insurance.s_insurance_new_init.status,
        roleStatus.insurance.s_insurance_new_has_pay.status,
        roleStatus.insurance.s_insurance_new_has_effect.status
      ]
      if (type1.includes(currentStatus.status_id)) return 0
      if (type2.includes(currentStatus.status_id)) return 1
      if (type3.includes(currentStatus.status_id)) return 2
      return -1
    }
  },
  methods: {
    search() {
      this.is_search = true
    },
    cancel() {
      Message.warning('航班将在12小时内起飞，已无法取消。')
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  .header {
    width: 100%;
  }
  .info {
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
  }
  h2 {
    font-size: 20px;
    text-align: center;
    margin: 50px 0 30px;
  }
  ul {
    display: flex;
    width: 800px;
    margin: 0 auto;
    justify-content: space-around;
    li {
      width: 150px;
      height: 150px;
      border: 1px solid #eee;
      text-align: center;
      line-height: 150px;
      cursor: pointer;
    }
  }
}

::v-deep {
  .result-box,
  .search-box {
    padding: 0 2rem;
    width: 50%;
  }
}
</style>
