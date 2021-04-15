<template>
  <div class="customer-service all-padding">
    <ChatRoom :show.sync="show_chat" :computer_msg.sync="computer_msg" :customer_msg.sync="customer_msg" @onOver="onOver"> </ChatRoom>
  </div>
</template>
<script>
import { roleStatus, actionCode } from '@/config/index'
import ChatRoom from '@/components/ChatRoom'

export default {
  components: {
    ChatRoom
  },
  data() {
    return {
      show_chat: true,
      computer_msg: [
        '您好',
        '请到国航服务进行办理航班延误证明后，再到银中平台上进行理赔申请。',
        '您需要在飞机着陆后的15日内在银中平台上进行理赔申请，确认无误后，我们最快在1-2个工作日内将赔款付至乘机人本人的银行账户'
      ],
      customer_msg: ['您好，我的飞机延误了，如何进行理赔？', '多久能获得赔付？']
    }
  },
  methods: {
    onOver() {
      const currentStatus = this.$getEntityNewStatus('entity_insurance')
      let actionid = ''
      if (currentStatus.status_id === roleStatus.insurance.s_insurance_old_plane_has_delay.status) {
        actionid = actionCode.insurance.a_insurance_old_customer_call
        this.$store.dispatch('changeStatus', { actionid })
      }
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.customer-service {
  padding: 100px 200px;
}
</style>
