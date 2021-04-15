<template>
  <div class="home">
    <!-- <p class="home-back">
      <Icon type="ios-arrow-back" :size="14" />
      应用列表
    </p> -->
    <ul class="page-space-l-t">
      <li v-for="(item, index) in appList" :key="index" @click="enterApp(item)">
        <!-- <img src="@/assets/images/home-icon1.png" alt="" />
        {{ item.name }} -->
        <img :src="item.img" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
// import { Icon } from 'view-design'
import { mapGetters } from 'vuex'
import { roleName, roleStatus } from '@/config/index'
import { applyStatusList } from './index'
export default {
  name: 'invoices-home',
  components: {
    // Icon
  },
  computed: {
    ...mapGetters(['currentRole', 'currentStatus']),
    appList() {
      const listObj = {
        name: '供应链金融平台',
        id: 1,
        icon: 'home-icon1.png',
        img: require(`@/assets/images/sc/${this.getEnterImg()}`),
        role: [roleName.invoice.manager.roleId],
        status: true,
        linkName: ''
      }
      // 获取合同最新状态
      const currentStatus = this.$getEntityNewStatus('entity_finance_contract_account')
      let linkName = '' // 应用的跳转
      switch (this.currentRole) {
        // 保理商
        case roleName.finance.role_factoring_company.roleId:
          linkName = 'supply-chain-sys-core-business'
          break
        // 招商银行
        case roleName.finance.role_cmb_checker.roleId:
          linkName = 'supply-chain-sys-funder-review-financing'
          break
      }
      if (this.currentRole === roleName.finance.role_factoring_company.roleId) {
        // 保理商
        linkName = 'supply-chain-sys-core-business'
      } else if (this.currentRole === roleName.finance.role_cmb_checker.roleId) {
        // 招商银行
        linkName = 'supply-chain-sys-funder-review-financing'
      } else {
        // 核心企业和供应商
        // 判断合同是否还在初始化
        if (currentStatus.status_id === roleStatus.finance.entity_finance_contract_account.s_finance_0_1_contract_init.status) {
          // 申请单最新状态
          let applyEntity = 'entity_finance_p_form_0'
          switch (this.currentRole) {
            case roleName.finance.role_core.roleId:
              applyEntity = 'entity_finance_p_form_0'
              break
            case roleName.finance.role_first_supplier.roleId:
              applyEntity = 'entity_finance_p_form_1'
              break
            case roleName.finance.role_second_supplier.roleId:
              applyEntity = 'entity_finance_p_form_2'
              break
            case roleName.finance.role_third_supplier.roleId:
              applyEntity = 'entity_finance_p_form_3'
              break
          }
          const currentApplyStatus = this.$getEntityNewStatus(applyEntity)
          const currentObj = applyStatusList.find(item => item.status_id === currentApplyStatus.status_id)
          linkName = currentObj.linkName
        } else {
          // 核心企业
          if (this.currentRole === roleName.finance.role_core.roleId) {
            linkName = 'supply-chain-sys-accounts-payable'
          } else {
            // 供应商
            linkName = 'supply-chain-sys-transfer-in'
          }
        }
      }
      listObj.linkName = linkName
      return [listObj]
    }
  },
  methods: {
    getEnterImg() {
      const actions = new Map([
        [roleName.finance.role_core.roleId, 'core.png'],
        [roleName.finance.role_first_supplier.roleId, 'supply.png'],
        [roleName.finance.role_second_supplier.roleId, 'supply.png'],
        [roleName.finance.role_third_supplier.roleId, 'supply.png'],
        [roleName.finance.role_factoring_company.roleId, 'baoli.png'],
        [roleName.finance.role_cmb_checker.roleId, 'zhaoshang.png']
      ])
      return actions.get(this.currentRole)
    },
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
</style>
