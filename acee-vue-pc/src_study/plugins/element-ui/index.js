import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import {
  Scrollbar,
  MenuItem,
  Cascader,
  Loading,
  Notification,
  MessageBox,
  Message,
  Table,
  TableColumn,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Select
} from 'element-ui'

Vue.component('ElButton', () => import ('element-ui/packages/button/index.js'));
Vue.component('ElHeader', () => import ('element-ui/packages/header/index.js'));
Vue.component('ElMenu', () => import ('element-ui/packages/menu/index.js'));
Vue.component('ElSubmenu', () => import ('element-ui/packages/submenu/index.js'));
Vue.component('ElRow', () => import ('element-ui/packages/row/index.js'));
Vue.component('ElCol', () => import ('element-ui/packages/col/index.js'));
Vue.component('ElMain', () => import ('element-ui/packages/main/index.js'));
Vue.component('ElDialog', () => import ('element-ui/packages/dialog/index.js'));
Vue.component('ElInput', () => import ('element-ui/packages/input/index.js'));
Vue.component('ElPopover', () => import ('element-ui/packages/popover/index.js'));
Vue.component('ElTabs', () => import ('element-ui/packages/tabs/index.js'));
Vue.component('ElTabPane', () => import ('element-ui/packages/tab-pane/index.js'));
Vue.component('ElCard', () => import ('element-ui/packages/card/index.js'));
// Vue.component('ElDropdown', () => import ('element-ui/packages/dropdown/index.js'));
// Vue.component('ElDropdownMenu', () => import ('element-ui/packages/dropdown-menu/index.js'));
// Vue.component('ElDropdownItem', () => import ('element-ui/packages/dropdown-item/index.js'));
// Vue.component('ElSelect', () => import ('element-ui/packages/select/index.js'));
Vue.component('ElOption', () => import ('element-ui/packages/option/index.js'));
Vue.component('ElContainer', () => import ('element-ui/packages/container/index.js'));
Vue.component('ElFooter', () => import ('element-ui/packages/footer/index.js'));






// 由于后面需要及时获取元素，此处的cascader组件不采用异步加载
Vue.component('ElCascader', Cascader);
Vue.component('ElScrollbar', Scrollbar);
Vue.component('ElLoading', Loading);
Vue.component('ElMenuItem', MenuItem);
Vue.component('ElNotification', Notification);
Vue.component('ElMessageBox', MessageBox);
Vue.component('ElMessage', Message);
Vue.component('ElTable', Table);
Vue.component('ElTableColumn', TableColumn);
Vue.component('ElDropdown', Dropdown);
Vue.component('ElDropdownMenu', DropdownMenu);
Vue.component('ElDropdownItem', DropdownItem);
Vue.component('ElSelect', Select);





Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
