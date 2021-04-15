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
            <Input type="text" disabled v-model="formData.contract" />
          </FormItem>
          <FormItem label="日期" prop="date">
            <Input type="text" disabled v-model="formData.date" />
          </FormItem>
          <br />

          <FormItem label="买方" prop="buyer">
            <Input type="text" v-model="formData.buyer" />
          </FormItem>
          <FormItem label="卖方" prop="seller">
            <Input type="text" v-model="formData.seller" />
          </FormItem>
          <br />

          <FormItem label="地址" prop="buyer_addr">
            <Input type="text" v-model="formData.buyer_addr" />
          </FormItem>
          <FormItem label="地址" prop="seller_addr">
            <Input type="text" v-model="formData.seller_addr" />
          </FormItem>
          <br />

          <p>买卖双方同意就成交下列商品订立条款如下：</p>
          <br />
          <br />

          <FormItem class="w-short" label="货物名称及规格" prop="goods_name">
            <Input type="text" v-model="formData.goods_name" />
          </FormItem>
          <FormItem class="w-short" label="数量(个)" prop="amount">
            <Input type="text" v-model="formData.amount" />
          </FormItem>
          <FormItem class="w-short" label="单价(USD)" prop="price">
            <Input type="text" v-model="formData.price" />
          </FormItem>
          <FormItem class="w-short" label="金额(USD)" prop="amount_price">
            <Input type="text" v-model="formData.amount_price" />
          </FormItem>
          <br />
          <FormItem class="w-short" label="总值(USD)" prop="total_value">
            <Input type="text" v-model="formData.total_value" />
          </FormItem>
          <br />

          <FormItem label="装运港" prop="port_start">
            <Input type="text" v-model="formData.port_start" />
          </FormItem>
          <FormItem label="目的港" prop="port_end">
            <Input type="text" v-model="formData.port_end" />
          </FormItem>

          <p>装运期限</p>
          <br />
          <br />

          <p>收到可以转船及分批装运之信用证<Input style="width: 60px" disabled type="text" v-model="formData.term" />天内装出。</p>
          <br />
          <br />

          <FormItem label="包装" prop="pack">
            <Input type="text" v-model="formData.pack" />
          </FormItem>
          <FormItem label="支付方式" prop="pay_type">
            <Select v-model="formData.pay_type" style="width:200px">
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
            <Input type="text" v-model="formData.sign_seller" />
          </FormItem>
        </Form>
      </div>
      <div class="next">
        <Button type="primary" size="large" @click="next">提交</Button>
      </div>
    </section>
  </div>
</template>

<script>
import { Form, FormItem, Button, Input, Select, Option } from 'view-design'
import { validateCheckForm } from '@/utils/index'
import { actionCode } from '@/config/index'
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
      current: 0,
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
        contract: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        seller: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        seller_addr: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        buyer: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        buyer_addr: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        goods_name: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        amount: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        price: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        amount_price: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        total_value: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        pay_type: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        pack: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        port_start: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        port_end: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        term: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        sign_seller: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
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
      await this.$store.dispatch('changeStatus', { actionid: actionCode.lc.a_lc_tongyu_created_contract, data: JSON.stringify(this.formData) })
      this.$router.push({ name: 'lc-overview' })
    }
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
