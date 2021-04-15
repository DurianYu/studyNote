<template>
  <div class="sign-cr">
    <div class="sign-cr-content">
      <PdfView :path="pdf_path" :options="pdf_options" />
    </div>
    <br />
    <Form :label-width="170">
      <FormItem label="合同签署码：">
        <div class="sms-code">
          <Input type="text" />
          <Button type="primary">获取</Button>
        </div>
      </FormItem>
      <FormItem label="">
        <Button type="primary" size="large" @click="handleSignUp">执行签署</Button>
      </FormItem>
    </Form>
    <Modal :visible.sync="visible" title="提示" :footerHide="true">
      <p class="center">签署完成</p>
      <br />
      <Button type="primary" size="large" class="btn-center" :to="{ name: 'supply-chain-home' }">完成</Button>
    </Modal>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'view-design'
import Modal from '@/components/Modal'
import { roleStatus, actionCode } from '@/config/index'
import PdfView from '@/components/PdfView'

export default {
  components: {
    PdfView,

    Form,
    FormItem,
    Input,
    Button,
    Modal
  },
  data() {
    return {
      pdf_options: {
        pdfOpenParams: {
          toolbar: 0
        }
      },
      pdf_path: '/pdf/sc/contract2.pdf',
      visible: false
    }
  },
  methods: {
    async handleSignUp() {
      let actionid = ''
      const entity = this.$getEntityNewStatus('entity_finance_contract_account')
      switch (entity.status_id) {
        // 核一 可签署
        case roleStatus.finance.entity_finance_contract_account.s_finance_0_1_contract_can_sign.status:
          actionid = actionCode.finance.a_finance_0_1_contract_0_sign
          break
        // 核一 核已签署
        case roleStatus.finance.entity_finance_contract_account.s_finance_0_1_contract_0_signed.status:
          actionid = actionCode.finance.a_finance_0_1_contract_1_sign
          break
        // 一二 可签署
        case roleStatus.finance.entity_finance_contract_account.s_finance_1_2_contract_can_sign.status:
          actionid = actionCode.finance.a_finance_1_2_contract_1_sign
          break
        // 一二 一已签署
        case roleStatus.finance.entity_finance_contract_account.s_finance_1_2_contract_1_signed.status:
          actionid = actionCode.finance.a_finance_1_2_contract_2_sign
          break
        // 二三 可签署
        case roleStatus.finance.entity_finance_contract_account.s_finance_2_3_contract_can_sign.status:
          actionid = actionCode.finance.a_finance_2_3_contract_2_sign
          break
        // 二三 二已签署
        case roleStatus.finance.entity_finance_contract_account.s_finance_2_3_contract_2_signed.status:
          actionid = actionCode.finance.a_finance_2_3_contract_3_sign
          break
      }
      await this.$store.dispatch('changeStatus', { actionid })
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-cr {
  width: 600px;
  margin: 50px auto;
  &-content {
    width: 600px;
    height: 600px;
    border: 1px solid #eee;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
