<template>
  <div class="evaluation-left-panel">
    <zs-menu
    :menu-data="menu"
    :default-active="activeIndex">
    </zs-menu>
  </div>
</template>

<script type="text/javascript">
import store from '@/store/index.js'
export default {
  name: 'evaluationLeftPanel',

  data() {
    return {
      activeIndex: {
        index: 'chartFractionSeg',
        route: '/jg/applySituation/chartFractionSeg'
      },
      menu: [
        {
          type: 'item',
          title: '考生分数正态分布图',
          props: {
            index: 'chartFractionSeg',
            route: '/jg/applySituation/chartFractionSeg'
          },
        },
        {
          type: 'item',
          title: '同分竞争形势',
          props: {
            index: 'chartCompete',
            route: '/jg/applySituation/chartCompete'
          },
        },
        {
          type: 'item',
          title: '考生去向图',
          props: {
            index: 'chartExamineeGo',
            route: '/jg/applySituation/chartExamineeGo'
          },
        }
      ]
    }
  },
}
</script>

<style type="text/css">
  .evaluation-left-panel {
    padding-top: 10px;
    width: 100%;
  }
  .evaluation-left-panel .zs-nav {
    border: 0px;
    width: 100%;
  }
  .evaluation-left-panel .zs-nav .el-menu {
    width: 100%;
  }

  @media screen and (max-width: 668px) {
    .el-submenu__title {
      padding-left: 10px;
    }
    .el-submenu__icon-arrow {
      right: 14px;
    }
  }


  @media screen and (max-width: 512px) {
    .el-submenu__title {
      padding-left: 0px;
    }
  }

</style>