<template>
  <div class="credit">
    <h2 class="font2-b page-space-l-t">签署授信合同</h2>
    <div class="credit-content">
      <div class="credit-content-item">
        <PdfView :path="pdf.path_1" :options="pdf_options" />
        <img src="@/assets/images/chapter.png" class="chapter1" alt="" />
        <a href="javascript:;" class="chapter2" @click="changeStatus">签章位</a>
      </div>
      <div class="credit-content-item">
        <PdfView :path="pdf.path_2" :options="pdf_options" />
        <img src="@/assets/images/chapter.png" class="chapter1" alt="" />
        <a href="javascript:;" class="chapter2">签章位</a>
      </div>
    </div>
    <Modal title="提示" :visible="visible" :footerHide="true">
      <p class="credit-text">完成授信合同签署！</p>
      <Button type="primary" class="btn-center" :to="{ name: 'supply-chain-home' }">返回</Button>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import { Button } from 'view-design'
import { actionCode } from '@/config/index'
import PdfView from '@/components/PdfView'

export default {
  components: {
    PdfView,
    Modal,
    Button
  },
  data() {
    return {
      pdf_options: {
        pdfOpenParams: {
          toolbar: 0
        }
      },
      pdf: {
        path_1: '/pdf/sc/contract1.pdf',
        path_2: '/pdf/sc/contract1.pdf'
      },
      visible: false
    }
  },
  methods: {
    async changeStatus() {
      await this.$store.dispatch('changeStatus', { actionid: actionCode.finance.a_finance_sign_auth_contract })
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.credit {
  padding: 50px;
  h2 {
    // font-size: 18px;
    margin-bottom: 30px;
  }
  &-content {
    display: flex;
    justify-content: center;
    &-item {
      margin: 0 50px;
      width: 500px;
      height: 500px;
      border: 1px solid #eee;
      position: relative;
      .chapter1,
      .chapter2 {
        width: 60px;
        height: 60px;
        position: absolute;
        bottom: 10px;
        right: 90px;
      }
      img.chapter1 {
        right: 160px;
      }
      a {
        text-align: center;
        line-height: 60px;
        border-radius: 50%;
        border: 1px solid #cccccc;
        background: linear-gradient(135deg, #ffffff 0%, #f3f3f3 100%);
      }
    }
  }
  &-text {
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>
