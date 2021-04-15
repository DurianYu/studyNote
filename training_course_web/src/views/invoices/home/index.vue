<template>
  <div class="home">
    <!-- <p class="home-back">
      <Icon type="ios-arrow-back" :size="14" />
      应用列表
    </p> -->
    <!-- <Head>应用列表</Head> -->
    <ul class="page-space-l-t">
      <li v-for="(item, index) in appList" :key="index" @click="enterApp(item)">
        <!-- <img src="@/assets/images/home-icon1.png" alt="" /> -->
        <span class="translate-x-y-center text-center">{{ item.name }}</span>
        <img :src="item.img" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
// import { Icon } from 'view-design'
import { mapGetters } from 'vuex'
import { roleName, roleStatus } from '@/config/index'
// import Head from '@/components/common-layout/head'

export default {
  name: 'invoices-home',
  components: {
    // Head
  },
  computed: {
    ...mapGetters(['currentRole', 'currentStatus']),
    appList() {
      const list = [
        {
          name: '税务局网页',
          id: 1,
          icon: 'home-icon1.png',
          img: require('@/assets/images/invoice/home-app-1.png'),
          role: [roleName.invoice.manager.roleId],
          status: true,
          linkName: '',
          contraryAppId: 2 // 当票链平台存在的时候，这里的链接要为空
        },
        {
          name: '票链平台',
          id: 2,
          icon: 'home-icon1.png',
          img: require('@/assets/images/invoice/home-app-2.png'),
          role: [roleName.invoice.manager.roleId],
          status: [roleStatus.invoice.manager.s_manager_registered.status, roleStatus.invoice.manager.s_manager_accounting_created.status],
          linkName: ''
        },
        {
          name: '票链平台',
          id: 3,
          icon: 'home-icon1.png',
          img: require('@/assets/images/invoice/home-app-2.png'),
          role: [roleName.invoice.accounting.roleId],
          // status: [roleStatus.invoice.accounting.s_accounting_can_login.status],
          status: true,
          linkName: ''
        },
        {
          name: '商城',
          id: 4,
          icon: 'home-icon1.png',
          img: require('@/assets/images/invoice/home-app-3.png'),
          role: [roleName.invoice.buyer.roleId],
          // status: [roleStatus.invoice.buyer.s_buyer_can_buy.status],
          status: true,
          linkName: '',
          contraryAppId: 5 // 当查询发票存在的时候，这里的链接要为空
        },
        {
          name: '区块链电子发票查验',
          id: 5,
          icon: 'home-icon1.png',
          img: require('@/assets/images/invoice/home-app-4.png'),
          role: [roleName.invoice.buyer.roleId],
          status: [roleStatus.invoice.buyer.s_buyer_has_remake_ticket.status],
          linkName: ''
        }
      ]
      const newList = list.filter(item => item.role.includes(this.currentRole) && (item.status === true || item.status.includes(this.currentStatus)))
      // 添加当前链接应该进哪一个页面
      const newListIdArr = newList.map(item => item.id) // 已有应用的ID数组
      const newList2 = newList.map(item => {
        const allStatus = { ...roleStatus.invoice.manager, ...roleStatus.invoice.accounting, ...roleStatus.invoice.buyer }
        item.linkName = allStatus[this.currentStatus]?.linkName
        // 判断如果互斥的应用存在的时候这里面的链接为空
        if (newListIdArr.includes(item.contraryAppId)) item.linkName = ''
        return item
      })
      return newList2
    }
  },
  methods: {
    // toApp(id) {
    //   switch (id) {
    //     case 2:
    //       if (sessionStorage.getItem('applyStatus') == '1') {
    //         this.$router.push({ name: 'invoices-platform-invoicing' })
    //       } else {
    //         this.$router.push({ name: 'invoices-platform-login' })
    //       }
    //       break
    //   }
    // },
    enterApp(item) {
      if (item.linkName) {
        this.$router.push({ name: item.linkName })
      }
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
  }
  li {
    position: relative;
    width: 260px;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    margin: 0 20px 20px 0px;
    cursor: pointer;
    img {
      width: 100%;
      display: block;
      // margin: 48px auto 33px;
    }
  }
}
</style>
