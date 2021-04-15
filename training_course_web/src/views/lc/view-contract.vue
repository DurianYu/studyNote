<template>
  <div class="page-cre-contract">
    <header class="page-space-l-t"></header>
    <section class="main">
      <div class="box">
        <div class="title font2-b">
          销售确认书（Sales Confirmation）
        </div>
        <Form ref="formData" :model="formData" :rules="rules" :label-width="130" inline>
          <FormItem label="合同号" prop="contract">
            <Input disabled type="text" v-model="formData.contract" />
          </FormItem>
          <FormItem label="日期" prop="date">
            <Input disabled type="text" v-model="formData.date" />
          </FormItem>
          <br />

          <FormItem label="买方" prop="buyer">
            <Input disabled type="text" v-model="formData.buyer" />
          </FormItem>
          <FormItem label="卖方" prop="seller">
            <Input disabled type="text" v-model="formData.seller" />
          </FormItem>
          <br />

          <FormItem label="地址" prop="buyer_addr">
            <Input disabled type="text" v-model="formData.buyer_addr" />
          </FormItem>
          <FormItem label="地址" prop="seller_addr">
            <Input disabled type="text" v-model="formData.seller_addr" />
          </FormItem>
          <br />

          <p>买卖双方同意就成交下列商品订立条款如下：</p>
          <br />
          <br />

          <FormItem class="w-short" label="货物名称及规格" prop="goods_name">
            <Input disabled type="text" v-model="formData.goods_name" />
          </FormItem>
          <FormItem class="w-short" label="数量(个)" prop="amount">
            <Input disabled type="text" v-model="formData.amount" />
          </FormItem>
          <FormItem class="w-short" label="单价(USD)" prop="price">
            <Input disabled type="text" v-model="formData.price" />
          </FormItem>
          <FormItem class="w-short" label="金额(USD)" prop="amount_price">
            <Input disabled type="text" v-model="formData.amount_price" />
          </FormItem>
          <br />
          <FormItem class="w-short" label="总值(USD)" prop="total_value">
            <Input disabled type="text" v-model="formData.total_value" />
          </FormItem>
          <br />

          <FormItem label="装运港" prop="port_start">
            <Input disabled type="text" v-model="formData.port_start" />
          </FormItem>
          <FormItem label="目的港" prop="port_end">
            <Input disabled type="text" v-model="formData.port_end" />
          </FormItem>

          <p>装运期限</p>
          <br />
          <br />

          <p>收到可以转船及分批装运之信用证<Input style="width: 60px" disabled type="text" v-model="formData.term" />天内装出。</p>
          <br />
          <br />

          <FormItem label="包装" prop="pack">
            <Input disabled type="text" v-model="formData.pack" />
          </FormItem>
          <FormItem label="支付方式" prop="pay_type">
            <Select disabled v-model="formData.pay_type" style="width:200px">
              <Option value="L/C">L/C</Option>
              <Option value="DA">DA</Option>
              <Option value="DP">DP</Option>
              <Option value="TT">TT</Option>
            </Select>
          </FormItem>
          <br />

          <FormItem label="保险" prop="insure">
            <Input disabled type="text" v-model="formData.insure" />
          </FormItem>
          <FormItem label="运输标志" prop="sign">
            <Input disabled type="text" v-model="formData.sign" />
          </FormItem>
          <br />

          <div class="font3">备注</div>
          <pre style="white-space: pre-wrap;" class="font3">
1.品质数量异议：如买方提出索赔，凡属品质异议须于货到目的口岸之日起3个月内提出，凡属数量异议须于货到目的口岸之日起15在内提出，对所装运物所提任何异议属于保险公司、轮船公司及其他有关运输机构或邮递机构所负责者，售方不负任何责任。
2.本确认书所述全部或部分商品，如因人力不可抗拒的原因，以致不能履约或延迟交货，卖方概不负责。
3.仲裁：凡因本合同引起的或与本合同有关的争议，均应提交中国国际经济贸易仲裁委员会华南分会，按照申请仲裁时该会实施的仲裁规则进行仲裁，仲裁裁决是终局的，对双方均有约束力。
            </pre
          >
          <br />

          <FormItem label="卖方签署" prop="sign_seller">
            <Input disabled type="text" v-model="formData.sign_seller" />
          </FormItem>
          <FormItem v-if="showSubmitBtn" label="买方签署" prop="sign_buyer" style="float: right">
            <Input type="text" v-model="formData.sign_buyer" />
          </FormItem>
        </Form>
      </div>
      <div class="next">
        <Button v-if="showSubmitBtn" type="primary" size="large" @click="next">提交</Button>
      </div>
    </section>
  </div>
</template>

<script>
import { Form, FormItem, Button, Input, Select, Option } from 'view-design'
import { mapState, mapGetters } from 'vuex'
import { validateCheckForm } from '@/utils/index'
import { roleName, actionCode, roleStatus } from '@/config/index'
import { check_lc_cre_contract } from '@/config/form-check'

export default {
  components: {
    Form,
    FormItem,
    Button,
    Input,
    Select,
    Option
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_lc_cre_contract)
    }
    return {
      modal1: true,
      disabled: true,
      modal: {
        question: true
      },
      formData: {
        date: check_lc_cre_contract['date'],
        contract: check_lc_cre_contract['contract'],
        seller: '',
        seller_addr: '',
        buyer: '',
        buyer_addr: '',
        goods_name: '',
        amount: '',
        price: '',
        amount_price: '',
        total_value: '',
        pay_type: '',
        pack: '',
        port_start: '',
        port_end: '',
        term: check_lc_cre_contract['term'],
        sign_seller: '',
        insure: '买方承担',
        sign: 'CT206'
      },
      rules: {
        sign_buyer: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    ...mapGetters(['smsUnReadNumber', 'currentRole', 'statusList']),
    //判断只能维珍集团才能显示按钮
    showSubmitBtn() {
      const newCurrentStatus = this.$getEntityNewStatus('entity_contract')
      return this.currentRole === roleName.lc.role_weizhen.roleId && newCurrentStatus.status_id === roleStatus.lc.contract.s_lc_contract_seller_signed.status
    }
  },
  methods: {
    next() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.handleAction()
        }
      })
    },
    async handleAction() {
      await this.$store.dispatch('changeStatus', { actionid: actionCode.lc.a_lc_weizhen_signed_contract, data: JSON.stringify(this.formData) })
      this.$router.push({ name: 'lc-overview' })
    }
  },
  created() {
    const temp_form1 =
      this.teamStatus['entity_contract'] &&
      this.teamStatus['entity_contract'].find(item => item.status_id === roleStatus.lc.contract.s_lc_contract_seller_signed.status)
    const temp_form2 =
      this.teamStatus['entity_contract'] &&
      this.teamStatus['entity_contract'].find(item => item.status_id === roleStatus.lc.contract.s_lc_contract_signed_success.status)
    const result_form = temp_form2 ? temp_form2 : temp_form1
    this.formData = Object.assign(this.formData, result_form?.data ? JSON.parse(result_form.data) : {})
  }
}
</script>

<style lang="scss" scoped>
.page-cre-contract {
  ::v-deep {
    header {
      .title {
        text-align: left;
      }
    }
    .main {
      .box {
        padding: 3rem 0 0 4rem;
        width: 88%;
        margin: 0 auto;
        background-image: linear-gradient(to right, #f9f9f9, #f3f3f3);
      }

      form {
        padding: 5rem 4rem 4rem 2rem;

        .ivu-form-item-content {
          width: 250px;
        }
        .w-short {
          .ivu-form-item-content {
            width: 100px;
          }
        }
      }
    }
    .next {
      width: 100%;
      margin: 2rem 0 4rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
