<template>
  <div class="home">
    <!-- <p class="home-back">
      <Icon type="ios-arrow-back" :size="14" />
      任务列表
    </p> -->
    <ul class="page-space-l-t">
      <li v-for="(item, index) in appList" :key="index" @click="enterApp(item)">
        <div class="clk-name" :class="{ ban: !item.can_clk }">
          <!-- {{ item.name }} -->
          <!-- <Button class="detail" type="default" ghost>查看详情</Button> -->
          <img :src="item.img" alt="" />
          <Button class="translate-x-center" style="bottom: 4rem" type="default" ghost>查看详情</Button>
        </div>
      </li>
    </ul>
    <div class="clock-box">
      <clock :time="time" v-if="show_colck"> </clock>
      <div v-if="show_colck" @click="time_delay = 100" class="speed-up">
        <a>加速</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Message, Button } from 'view-design'
import { mapState, mapGetters } from 'vuex'
import { roleName, roleStatus } from '@/config/index'
import Clock from 'vue-clock2'
export default {
  name: 'pay-task',
  components: {
    // Icon,
    Clock,
    Button
  },
  data() {
    return {
      time_delay: 1e3,
      time: '16:50:00',
      roleName
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    ...mapGetters(['currentRole', 'isCochain', 'currentRole']),
    show_colck() {
      const currentStatus = this.$getEntityNewStatus('entity_payment')
      const need_show =
        currentStatus.status_id == roleStatus.pay['old'][`s_pay_old_zhigu_has_out_money`].status && this.currentRole == roleName.pay.role_zhigu_bank.roleId
      if (need_show) {
        this.updateTime()
        this.$once('hook:beforeDestroy', () => {
          clearInterval(this.instance_update_time)
        })
      }
      return need_show
    },
    appList() {
      let list = [
        {
          name: '外汇购汇',
          img: require('@/assets/images/pay/btn11.png'),
          role: [roleName.pay.role_remitter.roleId],
          status: [roleStatus.pay.old.s_pay_old_init.status, roleStatus.pay.new.s_pay_new_init.status],
          linkName: 'pay-buy-remit'
        },
        {
          name: '申请汇款',
          img: require('@/assets/images/pay/btn10.png'),
          role: [roleName.pay.role_remitter.roleId],
          status: [roleStatus.pay.old.s_pay_old_remitter_buy_success.status, roleStatus.pay.new.s_pay_new_remitter_buy_success.status],
          linkName: 'pay-remit-mode'
        },
        {
          name: '跨境支付汇款审核',
          img: require('@/assets/images/pay/btn2.png'),
          role: [roleName.pay.role_zhigu_bank.roleId],
          status: [roleStatus.pay.old.s_pay_old_has_write_form.status, roleStatus.pay.new.s_pay_new_has_write_form.status],
          linkName: 'pay-zhigu-remit-inspect-list'
        },
        {
          name: '跨境支付业务处理',
          img: require('@/assets/images/pay/btn1.png'),
          role: [roleName.pay.role_zhigu_bank.roleId],
          status: [roleStatus.pay.old.s_pay_old_zhigu_has_out_money.status],
          linkName: 'pay-zhigu-tradition-list'
        },
        {
          name: '跨境支付交易上链',
          img: require('@/assets/images/pay/btn4.png'),
          role: [roleName.pay.role_zhigu_bank.roleId],
          status: [roleStatus.pay.new.s_pay_new_zhigu_has_out_money.status],
          linkName: 'pay-zhigu-cochain-list'
        },
        {
          name: '查看上链账本',
          img: require('@/assets/images/pay/btn3.png'),
          role: [roleName.pay.role_zhigu_bank.roleId],
          status: [roleStatus.pay.new.s_pay_new_zhigu_has_online.status],
          linkName: 'pay-zhigu-cochain-hash-list'
        },
        {
          name: '汇款审核',
          img: require('@/assets/images/pay/btn15.png'),
          role: [roleName.pay.role_mid_bank.roleId],
          status: [
            roleStatus.pay.old.s_pay_old_zhigu_has_send_msg.status,
            roleStatus.pay.old.s_pay_old_mid_has_frozen.status,
            roleStatus.pay.old.s_pay_old_usa_has_review.status
          ],
          linkName: 'pay-middle-tradition-list'
        },
        {
          name: '资金划转',
          img: require('@/assets/images/pay/btn14.png'),
          role: [roleName.pay.role_mid_bank.roleId],
          status: [roleStatus.pay.old.s_pay_old_mid_can_out_money.status],
          linkName: 'pay-middle-tradition-transfer'
        },
        {
          name: '账本信息',
          img: require('@/assets/images/pay/btn12.png'),
          role: [roleName.pay.role_mid_bank.roleId],
          status: [
            roleStatus.pay.new.s_pay_new_zhigu_has_online.status,
            roleStatus.pay.new.s_pay_new_mid_has_frozen.status,
            roleStatus.pay.new.s_pay_new_usa_has_sent_receipt.status
          ],
          linkName: 'pay-middle-cochain-hash-list'
        },
        {
          name: '账户划转',
          img: require('@/assets/images/pay/btn13.png'),
          role: [roleName.pay.role_mid_bank.roleId],
          status: [roleStatus.pay.new.s_pay_new_mid_can_out_money.status],
          linkName: '/pay/middle-cochain-hash-detail?transfer=true'
        },
        {
          name: '汇款审核',
          img: require('@/assets/images/pay/btn15.png'),
          role: [roleName.pay.role_bakelai_bank.roleId],
          status: [
            roleStatus.pay.old.s_pay_old_zhigu_has_send_msg.status,
            roleStatus.pay.old.s_pay_old_mid_has_frozen.status,
            roleStatus.pay.old.s_pay_old_usa_has_review.status,
            roleStatus.pay.old.s_pay_old_mid_has_out_money.status
          ],
          linkName: 'pay-goal-tradition-list'
        },
        {
          name: '跨境转账汇款审核',
          img: require('@/assets/images/pay/btn8.png'),
          role: [roleName.pay.role_bakelai_bank.roleId],
          status: [
            roleStatus.pay.new.s_pay_new_zhigu_has_online.status,
            roleStatus.pay.new.s_pay_new_mid_has_frozen.status,
            roleStatus.pay.new.s_pay_new_usa_has_sent_receipt.status
          ],
          linkName: 'pay-goal-cochain-hash-list'
        },
        {
          name: '账户划转',
          img: require('@/assets/images/pay/btn9.png'),
          role: [roleName.pay.role_bakelai_bank.roleId],
          status: [roleStatus.pay.new.s_pay_new_mid_has_out_money.status],
          linkName: 'pay-goal-cochain-transfer'
        }
      ]
      const currentStatus = this.teamStatus['entity_payment'] && this.$getEntityNewStatus('entity_payment')
      if (!currentStatus) return
      // 过滤出当前角色的所有页面
      let cur_list = list.filter(item => item.role.includes(this.currentRole))
      // 设置当前状态的页面为可点击
      let result_list = cur_list.map(item => {
        return {
          ...item,
          can_clk: item.status.some(v => currentStatus.status_id == v)
        }
      })
      // console.log('--- currentStatus.status_id ---', currentStatus.status_id)
      // console.log('--- result_list ---', result_list)
      return result_list
    }
  },
  methods: {
    timeStep(time) {
      time = time.split(':')
      let H = Number(time[0]),
        M = Number(time[1]),
        S = Number(time[time.length - 1])
      S += 1
      if (S == 60) {
        S = '00'
        M = (M + 1).toString().padStart(2, '0')
        if (M == 60) {
          M = '00'
          H = (H + 1).toString().padStart(2, '0')
          if (H == 24) {
            H == '00'
          }
        }
      }
      return `${String(H)}:${String(M)}:${String(S)}`
    },
    updateTime() {
      this.instance_update_time = setTimeout(() => {
        this.time = this.timeStep(this.time)
        if (this.time_pause) {
          this.updateTime = () => {}
        } else {
          this.updateTime()
        }
      }, this.time_delay)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.instance_update_time)
      })
    },

    enterApp(item) {
      if (!item.can_clk) {
        return Message.error(item.ban_msg || '此功能未启用')
      }
      if (item.linkName == 'pay-zhigu-tradition-list' && this.time.split(':')[0] <= 16) {
        return Message.error('还未到下午5点， 不能处理跨境支付业务')
      }
      if (item.linkName) {
        item.linkName.includes('/') ? this.$router.push({ path: item.linkName }) : this.$router.push({ name: item.linkName })
      }
    }
  },
  created() {},
  beforeDestroy() {}
}
</script>
<style lang="scss" scoped>
.home {
  padding: 40px 85px 0 85px;
  &-back {
    margin-bottom: 20px;
  }
  ul {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }
  li {
    position: relative;
    width: 360px;
    border-radius: 10px;
    overflow: hidden;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }
  }
  .clk-name {
    color: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    background: transparent;
  }

  .ban {
    border-radius: 2px;
  }
  .detail {
    margin: 6rem 0 0 0;
  }
  .clock-box {
    position: absolute;
    right: 20%;
    top: 66%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;

    .speed-up {
      position: relative;
      padding: 2rem 0 0 0;
    }
  }
}
</style>
