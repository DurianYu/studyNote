<template>
  <div class="evaluation-left-panel">
    <zs-menu
    :menu-data="menu"
    :default-active="activeIndex.index">
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
        index: 'Holland',
        route: '/evaluation/holland'
      },
      menu: [
        {
          type: 'item',
          title: '霍兰德职业兴趣测评',
          props: {
            index: 'Holland',
            route: '/evaluation/holland'
          },
        },
        {
          type: 'item',
          title: '性格测评 MBTI',
          props: {
            index: 'MBTI',
            route: '/evaluation/mbti'
          },
        },
        {
          type: 'item',
          title: '能力测评 MIDAS',
          props: {
            index: 'MIDAS',
            route: '/evaluation/midas'
          },
        }
      ]
    }
  },

  watch: {
    '$route': {
      handler(val) {
        const {menu} = this;
        this.findRoute(menu)
      },
      deep: true,
    },    
  },


  mounted() {
    const {menu, activeIndex} = this; // 导出菜单数据、默认激活的菜单
    const vm = this;
    if (activeIndex.route != this.$route.path) { // 当默认激活的菜单路由与当前路由不匹配时
      vm.findRoute(menu) // 寻找匹配的路由
    }
  },

  methods: {
    findRoute(menu) {
      const vm = this;
      menu.forEach((value)=>{
        if (value.type == 'item' && value.props.route == this.$route.path) {
          vm.activeIndex = value.props;
          return true;
        }

        if (value.type == 'sub') {
          vm.findRoute(value.subMenu)
        }
      })
      return false;
    },
  }

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