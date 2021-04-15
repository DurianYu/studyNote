<template>
  <div class="product-list all-height">
    <!-- <Head>通宇商城</Head> -->
    <img style="width: 100%" src="@/assets/images/invoice/productlist.png" alt="" />

    <router-link v-if="isBuy" :to="{ name: 'invoices-product-detail' }"></router-link>
    <!-- <img src="@/assets/images/customer-service.jpg" class="customer-service" alt="" /> -->

    <section class="customer-service-box" v-if="show_chat_btn">
      <div class="prompt" @click="show_chat = !show_chat">
        <img :src="require('@/assets/images/customer_service.png')" alt="" />
        <p>客服</p>
      </div>
    </section>

    <ChatRoom :show.sync="show_chat" :computer_msg.sync="computer_msg" :customer_msg.sync="customer_msg">
      <span @click="applyRedlnk" v-if="!computer_msg.length">申请重开</span>
    </ChatRoom>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { actionCode, roleStatus } from '@/config/index'
import ChatRoom from '@/components/ChatRoom'
// import Head from '@/components/common-layout/head'

export default {
  components: {
    ChatRoom
    // Head
  },
  data() {
    return {
      show_chat: false,
      computer_msg: [
        '我是通宇商城客服，请问您有什么问题需要咨询？',
        '请问是订单编号：AH1263296224 这个订单吗？',
        '已收到，马上为您重开发票。开票后会以短信或邮件的形式通知您。'
      ],
      customer_msg: ['我的发票开错了，需要重开。', '是的，公司名称应该是“北京海淀区租赁有限公司”，上次开的名字写错了。']
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['currentRole', 'currentStatus']),
    // 是否可采购
    isBuy() {
      return this.currentStatus === roleStatus.invoice.buyer.s_buyer_can_buy.status
    },
    // 是否显示客服按钮
    show_chat_btn() {
      return this.currentStatus === roleStatus.invoice.buyer.s_buyer_has_check_wrong_ticket.status
    }
  },
  methods: {
    // 申请红冲
    async applyRedlnk() {
      await this.$store.dispatch('changeStatus', { actionid: actionCode.invoice.buyer.a_buyer_apply_red_ink })
      this.$router.push({ name: 'invoices-home' })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  position: relative;
  a {
    display: block;
    width: 22%;
    height: 58%;
    position: absolute;
    left: 62px;
    top: 209px;
  }

  .customer-service-box {
    width: 60px;
    border-radius: 10px;
    position: fixed;
    right: 10px;
    top: 190px;
    text-align: center;
    padding-top: 13px;
    cursor: pointer;
    p {
      color: #666;
      font-size: 14px;
    }
    img {
      margin-bottom: 7px;
    }
  }

  .customer-service {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 460px;
    height: 336px;
  }

  .chat-box {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    width: 460px;
    height: 336px;
    padding: 1rem;
    background: #eee;

    .chat-title {
      font-size: 18px;
      font-weight: bold;
      height: 20px;
      line-height: 20px;
    }
    .chat-list {
      margin: 0.5rem 0 0 0;
      padding: 1.5rem;
      background: #fff;
      height: calc(100% - 1rem - 60px);
      -webkit-overflow-scrolling: touch;
      overflow-x: hidden;
      overflow-y: auto;

      ::v-deep .ivu-list-item-meta-description {
        word-wrap: break-word;
        word-break: break-all;
      }
      .meta-right {
        flex-flow: row-reverse;
        text-align: right;

        ::v-deep .ivu-list-item-meta-avatar {
          margin: 0 0 0 16px;
        }
        ::v-deep .ivu-list-item-meta-description {
          text-align: left;
          float: right;
          width: auto;
          clear: both;
        }
      }
    }

    .send-box {
      margin: 0.5rem 0 0 0;
      height: 40px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      background: #fff;

      ::v-deep .ivu-input-small {
        border: none;
      }
      ::v-deep .ivu-input:focus {
        box-shadow: none;
      }
      input {
        width: 50%;
      }
      span {
        width: 25%;
        text-align: center;
        cursor: pointer;
        color: blue;
        text-decoration: underline;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>
