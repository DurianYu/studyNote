<template>
  <div class="menu">
    <img src="@/assets/images/insurance/u136.png" alt="" class="" />
    <div class="info">
      <p>{{ isChain === 'chain' ? '地址：0x50e00de2c5cc4e456cf234fcb1a0efa367ed016e' : '银行账户：384如8364856486848' }}</p>
      <p>余额：10000</p>
    </div>
    <h2>{{ isChain === 'chain' ? '区块链' : '互联网' }}飞机延误险</h2>
    <ul>
      <li v-for="(item, index) in appList" :key="index" @click="goPage(item)" v-show="item.show" :class="{ ban: !item.can_clk }">
        <img :src="item.img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { Message } from 'view-design'
import { roleStatus } from '@/config/index'

export default {
  components: {},
  computed: {
    ...mapState(['teamStatus']),
    ...mapGetters(['isChain']),
    appList() {
      let list = [
        {
          name: '立即投保',
          status: [roleStatus.insurance.s_insurance_old_init.status, roleStatus.insurance.s_insurance_new_init.status],
          show: true,
          img: require('@/assets/images/insurance/home-app-4.png'),
          linkName: this.isChain === 'chain' ? 'insurance-cochain-buy-delay-insurance' : 'insurance-traditional-buy-insurance'
        },
        {
          name: '保单查询',
          status: [roleStatus.insurance.s_insurance_old_has_report.status, roleStatus.insurance.s_insurance_new_has_effect.status],
          show: true,
          img: require('@/assets/images/insurance/home-app-1.png'),
          linkName: 'insurance-traditional-search-insurance'
        },
        {
          name: '理赔申请',
          status: [roleStatus.insurance.s_insurance_old_got_delay_prove.status],
          show: true,
          img: require('@/assets/images/insurance/home-app-5.png'),
          linkName: 'insurance-traditional-apply-claim'
        },
        {
          name: '区块链查询',
          status: true,
          show: this.isChain === 'chain',
          img: require('@/assets/images/insurance/home-app-11.png'),
          linkName: 'insurance-cochain-info'
        },
        {
          name: '客服咨询',
          status: [roleStatus.insurance.s_insurance_old_plane_has_delay.status, roleStatus.insurance.s_insurance_new_init.status],
          show: this.isChain !== 'chain',
          img: require('@/assets/images/insurance/home-app-3.png'),
          linkName: 'insurance-traditional-customer-service'
        }
      ]
      const currentStatus = this.teamStatus['entity_insurance'] && this.$getEntityNewStatus('entity_insurance')
      if (!currentStatus) return
      // 设置当前状态的页面为可点击
      let result_list = list.map(item => {
        return {
          ...item,
          can_clk: item.status === true || item.status.some(v => currentStatus.status_id == v)
        }
      })
      // console.log('--- currentStatus.status_id ---', currentStatus.status_id)
      // console.log('--- result_list ---', result_list)
      return result_list
    }
  },
  methods: {
    goPage(item) {
      if (!item.can_clk) {
        return item.ban_msg && Message.error(item.ban_msg)
      }
      this.$router.push({ name: item.linkName })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  .header {
    width: 100%;
  }
  .info {
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
  }
  h2 {
    font-size: 20px;
    text-align: center;
    margin: 50px 0 30px;
  }
  ul {
    display: flex;
    margin: 0 auto;
    justify-content: left;
    li {
      width: 260px;
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
  }
  .ban {
    color: rgba(217, 217, 217, 0.5);
  }
}
</style>
