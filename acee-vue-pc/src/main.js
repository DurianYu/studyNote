import Vue from 'vue'
import router from './router/index.js'
import App from './App'
import'element-ui/lib/theme-chalk/index.css';

import store from './store/index.js'

import qs from "qs"

import{
  Scrollbar,
  Loading,
  Notification,
  Dialog,
  Menu,
  MenuItem,
  // Input,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Checkbox,
  // CheckboxButton,
  // CheckboxGroup,
  Select,
  Option,
  OptionGroup,
  Button,
  // ButtonGroup,
  Table,
  TableColumn,
  // Tree,
  Alert,
  // Icon,
  // Row,
  // Col,
  // Collapse,
  // CollapseItem,
  // Cascader,
  // Footer,
  MessageBox,
  Message,
  Pagination,
  Steps,
  Step,
  Tag,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'element-ui'

// 异步组件
// Vue.component('ElButton', () => import('element-ui/packages/button/index.js'));   // ??ť
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
Vue.component('ElRadioGroup', () => import('element-ui/packages/radio-group/index.js'));
Vue.component('ElCheckbox', () => import('element-ui/packages/checkbox/index.js'));
Vue.component('ElCascader', () => import('element-ui/packages/cascader/index.js'));
// Vue.component('ElSteps', () => import('element-ui/packages/steps/index.js'));
// Vue.component('ElStep', () => import('element-ui/packages/step/index.js'));
Vue.component('ElMenuItemGroup', () => import('element-ui/packages/menu-item-group/index.js'));
Vue.component('ElCheckboxGroup', () => import('element-ui/packages/checkbox-group/index.js'));
Vue.component('ElForm', () => import('element-ui/packages/form/index.js'));
Vue.component('ElFormItem', () => import('element-ui/packages/form-item/index.js'));
Vue.component('ElUpload', () => import('element-ui/packages/upload/index.js'));
Vue.component('ElDropdown', () => import('element-ui/packages/dropdown/index.js'));
Vue.component('ElDropdownMenu', () => import('element-ui/packages/dropdown-menu/index.js'));
Vue.component('ElDropdownItem', () => import('element-ui/packages/dropdown-item/index.js'));
Vue.component('ElContainer', () => import ('element-ui/packages/container/index.js'));
Vue.component('ElFooter', () => import ('element-ui/packages/footer/index.js'));








// 画图组件
Vue.component('VeLine', () => import('v-charts/lib/line.common')); // 折线图
Vue.component('VeBar', () => import('v-charts/lib/bar.common')); // 条形图
Vue.component('VeRadar', () => import('v-charts/lib/radar.common')); // 雷达图
Vue.component('VeHistogram', () => import('v-charts/lib/histogram.common')); // 柱状图



// 自定义组件

Vue.component('zsSelect', () => import('@/components/zs-select.vue'));
Vue.component('zsVolunteer', () => import('@/components/volunteer/index'));
Vue.component('zsSchoolInfo', () => import('@/components/school-info.vue'));
Vue.component('zsTable', () => import('@/components/zs-table.vue'));
Vue.component('schCmp', () => import('@/components/sch-compare.vue'));
Vue.component('prfsSearch', () => import('@/components/profession-search.vue'));
Vue.component('zsMenu', () => import('@/components/zs-menu.vue')); // 菜单
Vue.component('zsBaseGroup', () => import('@/components/base-com-group.vue')); // 渲染基本的input select 按钮的组件
// Vue.component('zsEvaluationRes', () => import('@/public/evaluation/evaluation-result.vue')); // 测评结果


// 一加载就导入的组件Vue.component('ElScrollbar', Scrollbar);
Vue.component('ElButton', Button);
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
Vue.component('ElDropdown', Dropdown);
Vue.component('ElDropdownMenu', DropdownMenu);
Vue.component('ElDropdownItem', DropdownItem);






Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.config.productionTip = false


// 请求超时处理
axios.defaults.retry = 2; // 重试次数
axios.defaults.retryDelay = 2000; // 每次超时请求的间隔

// 跨域配置
axios.defaults.withCredentials  = true;
axios.defaults.baseURL = `${store.state.AJAX_DOMAIN}/asypc`;
// axios.defaults.baseURL = `${store.state.AJAX_DOMAIN}`;



// 请求拦截
axios.interceptors.request.use(config => {
  config.data = qs.stringify(config.data);
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return config;
}, err => {
  return Promise.reject(err);
});

// 响应拦截
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});


// 公共资源请求用
window.axiosPublicRes = axios.create({
  baseURL: store.state.PUBLIC_CDN_DOMAIN,
  withCredentials: false,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
