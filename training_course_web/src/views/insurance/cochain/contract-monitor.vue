<template>
  <div class="page">
    <header>
      <div class="title">区块链延误险监控</div>
    </header>

    <section class="main">
      <div class="sub-title">
        <span> 资金池总额：¥ 9,800,000</span>
        <span> 已赔付总额：¥ 212,000</span>
      </div>
      <br />
      <Table :data="list" :columns="columns"></Table>
    </section>
  </div>
</template>
<script>
import { roleStatus } from '@/config/index'
import {
  // Form,
  // FormItem,
  // Input,
  // Steps,
  // Step,
  Table
  // RadioGroup,
  // Radio,
  // CheckboxGroup,
  // Checkbox,
  // Select,
  // Option
  // Modal
} from 'view-design'

export default {
  components: {
    // Form,
    // FormItem,
    // Input,
    // Steps,
    // Step,
    Table
    // RadioGroup,
    // Radio,
    // CheckboxGroup,
    // Checkbox,
    // Modal
  },
  data() {
    return {
      modal: {
        question1: false,
        question2: true
      },
      current: 0,
      originList2: [
        {
          col1: '0x24762ed3924797…',
          col2: 'CA4102',
          col3: '¥ 50',
          col4: '¥ 90',
          col5: '已结束'
        },
        {
          col1: '0x1166965e5cf0ffc9…',
          col2: 'MU2302',
          col3: '¥ 50',
          col4: '¥ 90',
          col5: '已启动'
        },
        {
          col1: '0xf33e575e1179d80…',
          col2: 'U8885',
          col3: '¥ 200',
          col4: '¥ 440',
          col5: '已取消'
        },
        {
          col1: '0xa7688e21d713a2…',
          col2: 'CA3301',
          col3: '¥ 100',
          col4: '¥ 200',
          col5: '已赔付'
        }
      ],
      columns: [
        {
          type: 'index',
          width: 120,
          align: 'left'
        },
        {
          title: '保单号',
          key: 'col1'
        },
        {
          title: '航班号',
          key: 'col2'
        },
        {
          title: '保费',
          key: 'col3'
        },
        {
          title: '保额',
          key: 'col4'
        },
        {
          title: '合约调取状态',
          key: 'col5'
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
        arr = [
          {
            col1: '0xf33e575e1179d80…',
            col2: 'U8885',
            col3: '¥ 200',
            col4: '¥ 440',
            col5: '已取消'
          },
          {
            col1: '0xa7688e21d713a2…',
            col2: 'CA3301',
            col3: '¥ 100',
            col4: '¥ 200',
            col5: '已赔付'
          }
        ]
      } else if (statusListType2.includes(currentStatus.status_id)) {
        console.log([this.originList2[2]])
        arr = [
          {
            col1: '0x1166965e5cf0ffc9…',
            col2: 'MU2302',
            col3: '¥ 50',
            col4: '¥ 90',
            col5: '已启动'
          },
          {
            col1: '0xf33e575e1179d80…',
            col2: 'U8885',
            col3: '¥ 200',
            col4: '¥ 440',
            col5: '已取消'
          },
          {
            col1: '0xa7688e21d713a2…',
            col2: 'CA3301',
            col3: '¥ 100',
            col4: '¥ 200',
            col5: '已赔付'
          }
        ]
      } else if (statusListType3.includes(currentStatus.status_id)) {
        arr = [
          {
            col1: '0x24762ed3924797…',
            col2: 'CA4102',
            col3: '¥ 230',
            col4: '¥ 560',
            col5: '已结束'
          },
          {
            col1: '0x1166965e5cf0ffc9…',
            col2: 'MU2302',
            col3: '¥ 50',
            col4: '¥ 90',
            col5: '已赔付'
          },
          {
            col1: '0xf33e575e1179d80…',
            col2: 'U8885',
            col3: '¥ 200',
            col4: '¥ 440',
            col5: '已取消'
          },
          {
            col1: '0xa7688e21d713a2…',
            col2: 'CA3301',
            col3: '¥ 100',
            col4: '¥ 200',
            col5: '已赔付'
          }
        ]
      }
      return arr
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

      .sub-title {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 80%;
        margin: 0 auto;
      }

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
