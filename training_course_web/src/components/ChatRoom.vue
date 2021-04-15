<template lang="html">
  <div class="chat-room" v-show="show">
    <section class="chat-box">
      <div class="chat-title">客服</div>
      <List class="chat-list" :split="false" ref="chat-list">
        <ListItem v-for="(v, i) of chat_data" :key="i">
          <ListItemMeta :class="{ 'meta-right': v.is_right }" :avatar="v.avatar" :title="v.name" :description="v.msg" />
        </ListItem>
      </List>
      <div class="send-box">
        <Input readonly placeholder="Enter text" v-model="send_msg" size="small" @keyup.enter="sendMsg" />
        <slot></slot>
        <span @click="sendMsg">发送</span>
      </div>
    </section>
  </div>
</template>

<script>
import { Message, List, Input } from 'view-design'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'chat-room',
  props: {
    show: {
      tyle: Boolean,
      required: true,
      default: false
    },
    computer_msg: {
      type: Array,
      required: true
    },
    customer_msg: {
      type: Array,
      required: true
    }
  },
  components: {
    List,
    ListItem: List.Item,
    ListItemMeta: List.Item.Meta,
    Input
  },
  data() {
    return {
      timer: '',
      chat_data: [],
      send_msg: '',
      computer_info: {
        avatar: require('@/assets/images/customer_service.png'),
        name: '客服',
        msg: '',
        is_right: false
      },

      // computer_msg: [
      //   '我是通宇商城客服，请问您有什么问题需要咨询？',
      //   '请问是订单编号：AH1263296224 这个订单吗？',
      //   '已收到，马上为您重开发票。开票后会以短信或邮件的形式通知您。'
      // ],
      // customer_msg: ['我的发票开错了，需要重开。', '是的，公司名称应该是“北京海淀区租赁有限公司”，上次开的名字写错了。'],
      can_clk_send: true
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['currentCourse', 'currentRole', 'cur_role_info']),
    customer_info() {
      return {
        avatar: this.cur_role_info.avatar,
        name: this.cur_role_info.roleName,
        msg: '',
        is_right: true
      }
    }
  },
  methods: {
    scrollBottom() {
      this.$nextTick(() => {
        let el_chat_list = this.$refs['chat-list'].$el
        el_chat_list.scrollTop = el_chat_list.scrollHeight
      })
    },
    sendMsg() {
      if (!this.computer_msg.length) return
      if (!this.send_msg) return Message.error('请输入消息')
      this.chat_data.push({
        ...this.customer_info,
        msg: this.send_msg
      })
      this.send_msg = ''
      this.scrollBottom()
      if (this.computer_msg.length >= 0) {
        this.replayMsg(2e3)
      }
    },
    replayMsg(delay) {
      this.timer = setTimeout(() => {
        if (this.computer_msg.length) {
          this.chat_data.push({
            ...this.computer_info,
            msg: this.computer_msg.splice(0, 1)[0]
          })
          this.scrollBottom()
          this.send_msg = this.customer_msg.splice(0, 1)[0]
          if (!this.computer_msg.length && !this.customer_msg.length) {
            this.$emit('onOver', 'talk over')
          }
        }
      }, delay)
    }
  },
  created() {
    this.replayMsg(0)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.timer)
    })
  }
}
</script>

<style lang="scss" scoped>
.chat-room {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 460px;
  height: 336px;
  padding: 1rem;
  background: #eee;

  .chat-box {
    height: 100%;
  }

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
</style>
