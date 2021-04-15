<template>
  <div class="home">
    <!-- <p class="home-back">
      应用列表
    </p> -->
    <ul class="page-space-l-t">
      <li v-for="(item, index) in appList" :key="index" @click="enterApp(item)">
        <img :src="item.img" alt="" />
        <Button v-if="item.btn" class="translate-x-center" style="bottom: 4rem" type="default" ghost>查看详情</Button>
      </li>
    </ul>
  </div>
</template>

<script>
import { roleStatus, roleName } from '@/config/index'
import { mapGetters } from 'vuex'
import { Button } from 'view-design'

export default {
  components: {
    Button
  },
  computed: {
    ...mapGetters(['currentRole', 'isChain']),
    // 经理是否购买机票
    // isBuyTicke() {
    //   // 判断是否是经理
    //   if (this.currentRole === roleName.insurance.role_checker.roleId) return false
    //   const currentStatus = this.$getEntityNewStatus('entity_insurance')
    //   // 判断是否还未购买机票
    //   if (currentStatus.status_id === roleStatus.insurance.s_insurance_old_init.status) {
    //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //     this.$router.push({ name: 'insurance-buy-ticket' })
    //     return true
    //   }
    //   return false
    // },
    appList() {
      const list = [
        {
          name: '中银保险',
          id: 1,
          icon: 'home-icon1.png',
          img: require('@/assets/images/insurance/home-app-8.png'),
          role: [roleName.insurance.role_buy_manager.roleId],
          status: true,
          linkName: 'insurance-type'
        },
        {
          name: '机场大厅',
          id: 2,
          icon: 'home-icon1.png',
          img: require('@/assets/images/insurance/home-app-9.png'),
          role: [roleName.insurance.role_buy_manager.roleId],
          status: [roleStatus.insurance.s_insurance_old_has_insure.status, roleStatus.insurance.s_insurance_new_has_effect.status],
          linkName: 'insurance-delay'
        },
        {
          name: '国航服务办理',
          id: 3,
          icon: 'home-icon1.png',
          img: require('@/assets/images/insurance/home-app-2.png'),
          role: [roleName.insurance.role_buy_manager.roleId],
          status: [roleStatus.insurance.s_insurance_old_customer_has_call.status],
          linkName: 'insurance-traditional-proof-application'
        },
        {
          name: '保单管理中心',
          id: 4,
          icon: 'home-icon1.png',
          img: require('@/assets/images/insurance/home-app-12.png'),
          btn: true,
          role: [roleName.insurance.role_checker.roleId],
          status: this.isChain !== 'chain' ? true : [],
          linkName: 'insurance-traditional-insurance-inspect'
        },
        {
          name: '合约监控台',
          id: 5,
          icon: 'home-icon1.png',
          img: require('@/assets/images/insurance/home-app-14.png'),
          btn: true,
          role: [roleName.insurance.role_checker.roleId],
          status: this.isChain === 'chain' ? true : [],
          linkName: 'insurance-cochain-contract-monitor'
        }
      ]
      const currentStatus = this.$getEntityNewStatus('entity_insurance')
      const newList = list.filter(item => {
        return item.role.includes(this.currentRole) && (item.status === true || item.status.includes(currentStatus.status_id))
      })
      // let result_list = newList.map(item => {
      //   return {
      //     ...item,
      //     can_clk: item.status.some(v => currentStatus.status_id == v)
      //   }
      // })
      // 添加当前链接应该进哪一个页面
      // const newListIdArr = newList.map(item => item.id) // 已有应用的ID数组
      // const newList2 = newList.map(item => {
      //   const allStatus = { ...roleStatus.invoice.manager, ...roleStatus.invoice.accounting, ...roleStatus.invoice.buyer }
      //   item.linkName = allStatus[currentStatus]?.linkName
      //   // 判断如果互斥的应用存在的时候这里面的链接为空
      //   if (newListIdArr.includes(item.contraryAppId)) item.linkName = ''
      //   return item
      // })
      return newList
    }
  },
  methods: {
    enterApp(item) {
      this.$router.push({ name: item.linkName })
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  padding: 40px 0 0 85px;
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
}
</style>
