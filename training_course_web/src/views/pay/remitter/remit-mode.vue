<template>
  <div class="home">
    <!-- <p class="home-back">
      <Icon type="ios-arrow-back" :size="14" />
      选择汇款方式
    </p> -->
    <ul>
      <li v-for="(item, index) in appList" :key="index" @click="enterApp(item)">
        <div class="clk-name" :class="{ ban: !item.can_clk }">
          {{ item.name }}
          <!-- <Button class="detail" type="default" ghost>查看详情</Button> -->
          <img :src="item.img" alt="" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Message } from 'view-design'
import { mapState, mapGetters } from 'vuex'
import { roleName, roleStatus } from '@/config/index'
export default {
  name: 'invoices-home',
  components: {
    // Icon
  },
  computed: {
    ...mapState(['teamStatus']),
    ...mapGetters(['currentRole', 'currentStatus']),
    appList() {
      const list = [
        {
          name: '传统跨境支付',
          id: 1,
          icon: 'home-icon1.png',
          img: require('@/assets/images/pay/btn5.png'),
          role: [roleName.pay.role_remitter.roleId],
          status: [roleStatus.pay.old.s_pay_old_remitter_buy_success.status],
          linkName: 'pay-cre-remit'
        },
        {
          name: '区块链跨境支付',
          id: 2,
          icon: 'home-icon1.png',
          img: require('@/assets/images/pay/btn16.png'),
          role: [roleName.pay.role_remitter.roleId],
          status: [roleStatus.pay.new.s_pay_new_remitter_buy_success.status],
          linkName: 'pay-cre-remit'
        }
      ]
      const currentStatus = this.teamStatus['entity_payment'] && this.$getEntityNewStatus('entity_payment')
      let cur_list = list.filter(item => item.role.includes(this.currentRole))
      let result_list = cur_list.map(item => {
        return {
          ...item,
          can_clk: item.status.some(v => currentStatus.status_id == v)
        }
      })
      return result_list
    }
  },
  methods: {
    enterApp(item) {
      if (!item.can_clk) {
        return Message.error(item.ban_msg || '此功能未启用')
      }
      if (item.linkName) {
        item.linkName.includes('/') ? this.$router.push({ path: item.linkName }) : this.$router.push({ name: item.linkName })
      }
    }
  }
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
    justify-content: space-around;
    width: 70%;
    margin: 4rem auto 0 auto;
  }
  li {
    width: 360px;
    border-radius: 10px;
    overflow: hidden;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    margin: 20px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      display: block;
      // margin: 48px auto 33px;
    }
  }
  .clk-name {
    color: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    // background: linear-gradient(135deg, #bddaff 0%, #015fff 100%);
    background: transparent;
  }

  .ban {
    // background: linear-gradient(135deg, #dadee3 0%, #5f5f5f 100%);
    // box-shadow: 0px 16px 36px -10px rgba(145, 152, 196, 0.62);
    border-radius: 2px;
  }
  .detail {
    margin: 6rem 0 0 0;
  }
}
</style>
