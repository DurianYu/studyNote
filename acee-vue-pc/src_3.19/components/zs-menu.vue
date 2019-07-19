  <!-- 
   /*
    * @file .vue 文件。 利用element的NavMenu组件和用户传递的数据构成一个自定义导航菜单, 可以使用element原生的Menu属性， 
    * 而菜单项和子菜单属性则通过menuData的 prop 数据传递
    * @author ltt
    * @param {Array} menuData 向此组件传递的组件的配置和内容
    * @param {String} backgroundColor 背景颜色
    * @param {String} textColor 字体颜色
    * @example： 
    *  [
    *    {
    *      type: 'sub/item/brand' // navbar-brand 、 子菜单  或菜单项    
    *      title: , // 菜单项： 标题， 子菜单：分组标题
    *      props: {
    *        index: , // 必需
    *        disabled: , 
    *        route: , // 菜单项特有属性
    *        popperClass:, // 子菜单特有属性
    *        showTimeout:, // 子菜单特有属性
    *        hideTimeout:, // 子菜单特有属性
    *        popperAppendToBody:, // 子菜单特有属性
    *      },
    *      subMenu: [ // 子菜单的菜单项, 子菜单特有属性
    *         {
    *          type: 'sub/item' // 子菜单 或菜单项      
    *          title: , // 菜单项： 标题， 子菜单：分组标题
    *          props: {
    *            index: , // 必需
    *            disabled: , 
    *            route: , // 菜单项特有属性
    *            popperClass:, // 子菜单特有属性
    *            showTimeout:, // 子菜单特有属性
    *            hideTimeout:, // 子菜单特有属性
    *            popperAppendToBody:, // 子菜单特有属性
    *          },
    *          subMenu: [....] 
    *        }
    *      ]
    *    },
    *  ]
    *
    * @param {String} menuData[].title 标题
    * @param {String} menuData[].index 唯一标志 与element 原生的index 属性相同的作用
    * @param {Object | String} menuData[].props.route 菜单项特有属性, Vue Router 路径对象。在不使用element的route导航时，
    *        当子组件具有该属性，就会进行导航，如果使用element的route导航时，就根据element的进行导航
    * @param {string} menuData[].props.popper-class  弹出菜单的自定义类名
    * @param {number} menuData[].props.show-timeout  展开 sub-menu 的延时   默认 300 只有mode为horizontal 
    *         并且menu-trigger为click时有用。
    * @param {number} menuData[].props.hide-timeout  收起 sub-menu 的延时 默认 300 只有mode为horizontal     
    *        并且menu-trigger为click时有用。
    * @param {boolean} menuData[].props.popper-append-to-body 是否将弹出菜单插入至 body 元素。在菜单的定位出现问题时，
    *        可尝试修改该属性  一级子菜单：true / 非一级子菜单：false
    *
    */
   -->

<script type="text/javascript">
import {getParents} from '@/utils/dom.js';
export default {
  name: 'zsMenu',

  inheritAttrs: false,

  props: {
    menuData: Array,
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    textColor: {
      type: String,
      default: '#303133'
    },
    router: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Boolean,
      default: true,
    },
    mode: {
      type: String,
      default: 'vertical'
    },
    // defaultActive: [String | Object]
  },

  data() {
    return {
      isOpen: false,
    }
  },

  // watch: {
  //   '$route': {
  //     handler(val) {
  //       const {menu} = this;
  //       this.findRoute(menu)
  //     },
  //     deep: true,
  //   }, 
  //   defaultActive: {
  //     handler(val) {
  //       this.$emit('updata: default-active', val)
  //     },
  //     deep: true,
  //   }   
  // },

  // mounted() {
  //   const {menuData, defaultActive} = this; // 导出菜单数据、默认激活的菜单
  //   const vm = this;
  //   let type = Object.prototype.toString.call(defaultActive);
  //   if (type != '[object String]' && type != '[object Object]') {
  //     console.error('')
  //   }

  //   if (type == '[object String]' && defaultActive != this.$route.path) { // 当默认激活的菜单路由与当前路由不匹配时
  //     vm.findRoute(menuData) // 寻找匹配的路由
  //   }

  //   if (type == '[object Object]' && defaultActive.route != this.$route.path && defaultActive.index != this.$route.path) 
  //   { // 当默认激活的菜单路由与当前路由不匹配时
  //     vm.findRoute(menuData) // 寻找匹配的路由
  //   }
  // },

  render: function(createElement) { 
    const vm = this;
    const menuAttrs = this.$attrs;
    const {menuData, backgroundColor, textColor, router, mode} = this;


    return createElement('div', {
      class: {
        'zs-nav': true,
        'is-horizontal': mode == 'horizontal'
      },
      style: {
        color: textColor,
        'background-color': backgroundColor,
      },
    },
    [
      createMenu(),
      vm.toggle && mode == 'horizontal' ? createElement('div', {
        class: {'menu-toggle': true},
        on: {
          click: vm.menuOpen
        },
      },
      [
        '更多',
        createElement('i', {class: {'el-icon-arrow-down': true}})
      ]) : ''
      
    ])

    function createMenu() {
      // let menuProps = Object.assign({}, menuAttrs,  {'text-color': textColor, 'background-color': backgroundColor, router, mode, 'default-active': defaultActive})
      let menuProps = Object.assign({}, menuAttrs,  {'text-color': textColor, 'background-color': backgroundColor, router, mode})

      return createElement('el-menu', {
        props: menuProps,
        ref: 'elmenu',
      }, menuData.map(function(item) {
        return itemOrSub(item)
      }))
    }

    

    function itemOrSub(item) {
      if (!item.hasOwnProperty('props')) {
        return console.error('Cannot read property props of undefined');
      } 
      
      if (item.type == 'item' || item.type == 'brand' ) {
        return createItem(item)
      } else {
        return createSubMenu(item)
      }
    }

    function createItem(item) {
      let brandClass = item.type == 'brand' ? {'is-title': true}: {};
      return createElement('el-menu-item', {
        class: item.hasOwnProperty('class') ? Object.assign({}, brandClass, item.class) : brandClass,
        props: item.type == 'brand' ? Object.assign({}, item.props, {disabled: true}) : item.props,
        on: {
          click: vm.handleItemClick
        },
      }, item.title)
    }

    function createSubMenu(item) {
       return createElement('el-submenu', {
          class: item.hasOwnProperty('class') ? item.class : {},
          props: item.props
        }, item.hasOwnProperty('subMenu') ? [
          createElement('template', {slot: 'title'}, item.title),
          item.subMenu.map(function(value) {
            return itemOrSub(value)
          })
        ] : '')
    }
  },

  methods: {
    menuOpen: function() {
      console.log(11)
      let parent = getParents(this.$refs.elmenu.$el, 'zs-nav');
      let height = parent.scrollHeight + 30;

      if (this.isOpen) {
        this.isOpen = false;
        parent.style.transition = 'height 1s';
        parent.style.height = '4rem';
        parent.className = parent.className.replace('zs-menu-open', '');
       
        setTimeout(function() {
          parent.style.transition = '';
          parent.style.height = '';
        }, 1000)

      } else {
        this.isOpen = true;
        parent.className += ' zs-menu-open';
        parent.style.transition = 'height 1s';
        parent.style.height = height + 'px';
      }
    },

    handleItemClick: function(el) {
      const {router, mode, isOpen} = this;

      this.$emit('item-click', el)

      if (!router) {
        this.routeToItem(el)
      }

      if (isOpen) {
        this.isOpen = false;
        let parent = getParents(this.$refs.elmenu.$el, 'zs-nav');
        parent.style.transition = 'height 1s';
        parent.style.height = '4rem';
        parent.className = parent.className.replace('zs-menu-open', '');
        
        setTimeout(function() {
          parent.style.transition = '';
          parent.style.height = '';
        }, 1000)
      }
      
    },

    routeToItem: function(item) {
      if (!item.route){
        return;
      }

      let routeType = Object.prototype.toString.call(item.route);
      if (routeType !== '[object String]' && routeType !== '[object Object]') {
        let type = routeType.slice(8, -1);
        return console.error('Invalid data: type check failed for route. Expected String, Object, got ' + type)
      }

      try{
        this.$router.push(item.route, () => {}, (error)=>{ if (error) {console.error(error)} })
      } catch(e) {
        console.error(e)
      }
    },

    // findRoute: function(menu) {
    //   const vm = this;
    //   const {defaultActive} = this;
    //   menu.forEach((value)=>{
    //     if (value.type == 'item' && value.props.route == this.$route.path) {
    //       if (vm.router) {
    //         vm.defaultActive = value.props.index;
    //       } else if (typeof defaultActive == 'string'){
    //         vm.defaultActive = value.props.route;
    //       } else {
    //         vm.defaultActive = value.props;
    //       }
          
    //       return true;
    //     }

    //     if (value.type == 'sub') {
    //       vm.findRoute(value.subMenu)
    //     }
    //   })
    //   return false;
    // },
  }
}
</script>

<style type="text/css">
  .zs-nav {
    box-sizing: border-box;
    border: solid 1px #e6e6e6;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }
  .zs-nav.is-horizontal {
    height: 4rem;
  }
  .zs-nav .menu-toggle {
    display: none;
    height: calc(4rem - 1px);
    line-height: 4rem;
    color: #fff;
    font-size: 0.95rem;
    padding: 0px 20px;
    cursor: pointer;
  }
  .zs-nav .menu-toggle:hover {
    color: #000;
    background-color: #fff;
  }
  @media screen and (max-width: 768px) {
    .zs-nav .menu-toggle {
      display: block;
    }
    .zs-nav.is-horizontal .el-menu {
      display: flex;
      flex-direction: column;
    }
  }
  @media screen and (min-width: 768.98px) {
    .zs-nav.is-horizontal {
      height: 4rem !important;
    }
  }

  .zs-nav .el-menu {
    box-sizing: border-box;
    border: 0px;
    height: 100%;
  }
  .zs-nav .el-menu-item {
    font-size: 0.95rem;
    line-height: 4rem; 
  }
  .zs-nav .el-submenu .el-menu-item {
     min-width: 100px; 
  }
  .zs-nav .el-menu-item.is-title {
    background: 0 0!important;
    font-size: 1.1rem;
    opacity: 1;
    cursor: default;
  }
  .el-menu--popup {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .4);
  }

  @media screen and (max-width: 768px) {
    .el-submenu__title {
      font-size: 1rem;
    }
    .el-menu-item,
    .el-submenu__title {
      padding: 0 0px!important;
    }
  }
  @media screen and  (max-width: 991.98px) {
    .el-menu-item,
    .el-submenu__title {
      padding: 0 10px!important;
    }
  }

/*  @media screen and (max-width: 768px) {
    .el-submenu__title {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 500px) {
    .el-submenu__title {
      font-size: 13px;
    }
  }
  @media screen and (max-width: 400px) {
    .el-submenu__title {
      font-size: 12px;
    }
  }*/
  
</style>
