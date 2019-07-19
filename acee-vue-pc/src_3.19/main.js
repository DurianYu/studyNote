import Vue from 'vue'
import router from './router/index.js'
import App from './App'
import'element-ui/lib/theme-chalk/index.css';

import{
  Scrollbar,
  Loading,
  Notification,
  Dialog,
  Menu,
  MenuItem,
  Input,
  // Radio,
  RadioGroup,
  RadioButton,
  // Checkbox,
  CheckboxButton,
  // CheckboxGroup,
  Select,
  Option,
  OptionGroup,
  // Button,
  ButtonGroup,
  Table,
  TableColumn,
  Tree,
  Alert,
  Icon,
  Row,
  Col,
  Collapse,
  CollapseItem,
  Cascader,
  Footer,
  MessageBox,
  Message,
  Pagination,
  Steps,
  Step,
  Tag
} from 'element-ui'

// 异步组件
Vue.component('ElButton', () => import('element-ui/packages/button/index.js'));   // ??ť
Vue.component('ElHeader', () => import('element-ui/packages/header/index.js'));
Vue.component('ElMenu', () => import('element-ui/packages/menu/index.js'));       // ?˵?
Vue.component('ElSubmenu', () => import('element-ui/packages/submenu/index.js')); // ??˵?
Vue.component('ElRow', () => import('element-ui/packages/row/index.js'));         // row
Vue.component('ElCol', () => import('element-ui/packages/col/index.js'));         // col
Vue.component('ElMain', () => import('element-ui/packages/main/index.js'));
Vue.component('ElDialog', () => import('element-ui/packages/dialog/index.js'));
Vue.component('ElInput', () => import('element-ui/packages/input/index.js'));
Vue.component('ElPopover', () => import('element-ui/packages/popover/index.js'));
Vue.component('ElTabs', () => import('element-ui/packages/tabs/index.js'));
Vue.component('ElTabPane', () => import('element-ui/packages/tab-pane/index.js'));
Vue.component('ElCard', () => import('element-ui/packages/card/index.js'));
Vue.component('ElCheckbox', () => import('element-ui/packages/checkbox/index.js'));
Vue.component('ElCheckboxButton', () => import('element-ui/packages/checkbox-button/index.js'));
Vue.component('ElTree', () => import('element-ui/packages/tree/index.js'));
Vue.component('ElIcon', () => import('element-ui/packages/icon/index.js'));
// Vue.component('ElPagination', () => import('element-ui/packages/pagination/index.js'));
Vue.component('ElRadio', () => import('element-ui/packages/radio/index.js'));
Vue.component('ElCheckbox', () => import('element-ui/packages/checkbox/index.js'));
Vue.component('ElCascader', () => import('element-ui/packages/cascader/index.js'));
// Vue.component('ElSteps', () => import('element-ui/packages/steps/index.js'));
// Vue.component('ElStep', () => import('element-ui/packages/step/index.js'));
Vue.component('ElMenuItemGroup', () => import('element-ui/packages/menu-item-group/index.js'));
Vue.component('ElCheckboxGroup', () => import('element-ui/packages/checkbox-group/index.js'));
Vue.component('ElForm', () => import('element-ui/packages/form/index.js'));
Vue.component('ElFormItem', () => import('element-ui/packages/form-item/index.js'));
Vue.component('ElUpload', () => import('element-ui/packages/upload/index.js'));






// 画图组件
Vue.component('VeLine', () => import('v-charts/lib/line.common'));
Vue.component('VeBar', () => import('v-charts/lib/bar.common'));
Vue.component('VeRadar', () => import('v-charts/lib/radar.common'));
Vue.component('VeHistogram', () => import('v-charts/lib/histogram.common'));



// 自定义组件

Vue.component('zsSelect', () => import('@/components/zs-select.vue'));
Vue.component('zsVolunteer', () => import('@/components/volunteer/'));
Vue.component('zsSchoolInfo', () => import('@/components/school-info.vue'));
Vue.component('zsTable', () => import('@/components/zs-table.vue'));
Vue.component('schCmp', () => import('@/components/sch-compare.vue'));
Vue.component('prfsSearch', () => import('@/components/profession-search.vue'));
Vue.component('zsMenu', () => import('@/components/zs-menu.vue')); // 菜单
Vue.component('zsBaseGroup', () => import('@/components/base-com-group.vue')); // 渲染基本的input select 按钮的组件
// Vue.component('zsEvaluationRes', () => import('@/public/evaluation/evaluation-result.vue')); // 测评结果


// 一加载就导入的组件Vue.component('ElCascader', Cascader);
Vue.component('ElScrollbar', Scrollbar);
Vue.component('ElLoading', Loading);
Vue.component('ElMenuItem', MenuItem);
Vue.component('ElNotification', Notification);
Vue.component('ElMessageBox', MessageBox);
Vue.component('ElMessage', Message);
Vue.component('ElTable', Table);
Vue.component('ElTableColumn', TableColumn);
Vue.component('ElSelect', Select);
Vue.component('ElOption', Option);
Vue.component('ElOptionGroup', OptionGroup);
// Vue.component('ElRadio', Radio);
// Vue.component('ElCheckbox', Checkbox);
Vue.component('ElPagination', Pagination);

Vue.component('ElSteps', Steps);
Vue.component('ElStep', Step);
Vue.component('ElTag', Tag);



Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
