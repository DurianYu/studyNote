import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const pub = 'public'; // 公共页面文件夹
const gs = 'gs';  // 甘肃页面文件夹
const sc = 'sc';  // 四川页面文件夹
const jg = 'jg';  // 机构页面文件夹

// 公共页面

const signPage = () => import(/* webpackChunkName: "zs-sign" */ `@/${pub}/zs-sign`)
const writeInfoPage = () => import(/* webpackChunkName: 'write-info' */`@/${pub}/write-info`)

// 帮助文档左导航栏
const helpLeftPanel = () => import(/* webpackChunkName: 'help-left-panel' */`@/${pub}/help/help-left-panel`)
// 帮助文档右面板
const helpRightPanel = () => import(/* webpackChunkName: 'help-right-panel' */`@/${pub}/help/help-right-panel`)




// 四川页面

// 四川首页
const sc_Index = () => import(/* webpackChunkName: 'sc_index' */`@/${sc}/index.vue`)

// 四川首页左搜索栏
const sc_IndexLeftpanel = () => import(/* webpackChunkName: 'sc_index-left-panel' */ `@/${sc}/index-left-panel.vue`)
// 四川首页右显示面板
const sc_IndexRightpanel = () => import(/* webpackChunkName: 'sc_index-right-panel' */ `@/${sc}/index-right-panel.vue`)


// 甘肃页面

// 甘肃首页
const gs_Index = () => import(/* webpackChunkName: 'gs_index' */ `@/${gs}/index.vue`)

// 甘肃首页左搜索栏
const gs_IndexLeftpanel = () => import(/* webpackChunkName: 'gs_index-left-panel' */ `@/${gs}/index-left-panel.vue`)
// 甘肃首页右显示面板
const gs_IndexRightpanel = () => import(/* webpackChunkName: 'gs_index-right-panel' */ `@/${gs}/index-right-panel.vue`)


// 机构页面

// 机构页面
const jg_Index = () => import(/* webpackChunkName: 'jg_index' */`@/${jg}/index.vue`)

// 机构首页左搜索栏
const jg_IndexLeftpanel = () => import(/* webpackChunkName: 'jg_index-left-panel' */ `@/${jg}/index-left-panel.vue`);
// 机构首页右显示面板
const jg_IndexRightpanel = () => import(/* webpackChunkName: 'jg_index-right-panel' */ `@/${jg}/index-right-panel.vue`)

// 测评左导航栏
const evaluationLeftPanel = () => import(/* webpackChunkName: 'evaluation-left-panel' */`@/${jg}/evaluation/evaluation-left-panel`)
// 霍兰德测评
const hollandEvaluation = () => import(/* webpackChunkName: 'holland-evaluation' */`@/${jg}/evaluation/holland-evaluation`)
// 性格测评
const mbtiEvaluation = () => import(/* webpackChunkName: 'mbti-evaluationn' */`@/${jg}/evaluation/mbti-evaluation`)
// 能力测评
const midasEvaluation = () => import(/* webpackChunkName: 'midas-evaluation' */`@/${jg}/evaluation/midas-evaluation`)
// 测评结果
const evaluationRes = () => import(/* webpackChunkName: 'evaluation-result' */`@/${jg}/evaluation/evaluation-result`)

// 机构管理中心左导航栏
const jg_ManageCenterLeft = () => import(/* webpackChunkName: 'jg_user-info-left' */ `@/${jg}/manage/user-info-left.vue`)
// 机构管理中心学校组件配置页面
const jg_SchConfig = () => import(/* webpackChunkName: 'jg_sch-config' */ `@/${jg}/manage/sch-config.vue`)
// 课堂管理
const mgrClassroom = () => import(/* webpackChunkName: 'manage-classroom' */`@/${jg}/manage/classroom`);
// 课堂管理-创建课堂-创建语音课堂
const mgrClassroomCreateRecord = () => import(/* webpackChunkName: 'manage-classroom-create-record' */`@/${jg}/manage/classroom-create-record`);
// 课堂管理-创建课堂-创建视频课堂
const mgrClassroomCreateVideo = () => import(/* webpackChunkName: 'manage-classroom-create-video' */`@/${jg}/manage/classroom-create-video`);
// 人员管理
const mgrPeople = () => import(/* webpackChunkName: 'manage-people' */`@/${jg}/manage/people`);
// 添加人员
const createPeople = () => import(/* webpackChunkName: 'create-people' */`@/${jg}/manage/create-people`);
// 机构管理
const mgrJg = () => import(/* webpackChunkName: 'manage-jg' */`@/${jg}/manage/jg`);
// 群二维码管理
const mgrQRCode = () => import(/* webpackChunkName: 'manage-qr-code' */`@/${jg}/manage/qr-code`);


// 报考形势页面
const applyIndexLeft = () => import(/* webpackChunkName: 'manage-qr-code' */`@/${jg}/apply-situation/apply-index-left`);
// 分段表
const chartFractionSeg = () => import(/* webpackChunkName: 'chart-fraction-seg' */`@/${jg}/apply-situation/chart-fraction-seg`);
// 竞争力分析图
const chartCompete = () => import(/* webpackChunkName: 'chart-compete' */`@/${jg}/apply-situation/chart-compete`);
// 去向图
const chartExamineeGo = () => import(/* webpackChunkName: 'chart-examinee-go' */`@/${jg}/apply-situation/chart-examinee-go`);



const nestedViews = {
  template: `
    <div class="nested-views">
     <router-view></router-view>
    </div>
  `
}


// 四川、甘肃、机构等里公共的组件路由
// 帮助路由
var publicHelpRoute = {
  path: 'help',
  components:  {
    'zs-left-panel': helpLeftPanel,
    'zs-right-panel': helpRightPanel,
  },
};

 // 拆分的路由
 // 机构测评路由
var publicEvaRoute =  {
  path: 'evaluation',
  components:  {
    'zs-left-panel': evaluationLeftPanel, // 左导航栏
    'zs-right-panel': nestedViews,
  },
  children: [
    {
      path: 'holland', // 霍兰德测评
      name: 'holland',
      component: hollandEvaluation 
    },
    {
      path: 'mbti', // mbti测评
      name: 'mbti',
      component: mbtiEvaluation
    },
    {
      path: 'midas', // midas测评
      name: 'midas',
      component: midasEvaluation
    },
    {
      path: 'result/:eva', // 测评结果
      name: 'evaReault',
      component: evaluationRes,
      props: true,
    }
  ]
};

// 机构报考形势
var applySituation =  {
  path: 'applySituation',
  components:  {
    'zs-left-panel': applyIndexLeft, // 左导航栏
    'zs-right-panel': nestedViews,
  },
  children: [
    {
      path: 'chartFractionSeg', // 分段表
      name: 'chartFractionSeg',
      component: chartFractionSeg
    },
    {
      path: 'chartExamineeGo', // 去向图
      name: 'chartExamineeGo',
      component: chartExamineeGo
    },
    {
      path: 'chartCompete', // 同分竞争图
      name: 'chartCompete',
      component: chartCompete
    },
  ]
};


// 四川路由
var scRoute = {
  path: '/sc',
  component: sc_Index,
  children: [
    {
      path: 'index', // 四川主页 默认路由
      name: 'scIndex',
      components:  {
        'index-left-panel': sc_IndexLeftpanel,
        'index-right-panel': sc_IndexRightpanel,
      }
    },
    publicHelpRoute, // 帮助
    // publicEvaRoute, // 测评
  ]
};

// 甘肃路由
var gsRoute = {
  path: '/gs',
  component: gs_Index,
  children: [
    {
      path: 'index', // 甘肃主页
      name: 'gsIndex',
      components:  {
        'index-left-panel': gs_IndexLeftpanel,
        'index-right-panel': gs_IndexRightpanel,
      }
    },
    publicHelpRoute, // 帮助
    // publicEvaRoute, // 测评
  ]
};

// 机构路由
var jgRoute =  {
  path: '/jg',
  component: jg_Index,
  name: 'jg_index',
  children: [
    {
      path: 'index', // 机构主页
      name: 'jgIndex',
      components:  {
        'index-left-panel': jg_IndexLeftpanel,
        'index-right-panel': jg_IndexRightpanel,
      }
    },
    {
      path: 'manageCenter',  // 管理中心页
      components:  {
        'zs-left-panel': jg_ManageCenterLeft,
        'zs-right-panel': nestedViews,
      },
      children: [
        {
          path: 'jgSchConfig',
          name: 'jgSchConfig',
          component: jg_SchConfig
        },
        {
          path: 'mgrClassroom',
          name: 'mgrClassroom',
          component: mgrClassroom
        },
        {
          path: 'mgrClassroomCreateRecord',
          name: 'mgrClassroomCreateRecord',
          component: mgrClassroomCreateRecord
        },
        {
          path: 'mgrClassroomCreateVideo',
          name: 'mgrClassroomCreateVideo',
          component: mgrClassroomCreateVideo
        },
        {
          path: 'mgrPeople',
          name: 'mgrPeople',
          component: mgrPeople
        },
        {
          path: 'createPeople',
          name: 'createPeople',
          component: createPeople
        },
        {
          path: 'mgrJg',
          name: 'mgrJg',
          component: mgrJg
        },
        {
          path: 'mgrQRCode',
          name: 'mgrQRCode',
          component: mgrQRCode
        },
      ]
    },
    publicHelpRoute, // 帮助
    publicEvaRoute, // 测评
    applySituation, // 报考形势
  ]
};


export default new VueRouter({
  // mode: 'history',
  routes: [
    /*公共页面*/

    /*登陆页面*/
    {
      // path: '/',
      path: '/signPage',
      component: signPage
    },

    /*个人信息填写页面*/
    {
      path: '/writeInfo',
      component: writeInfoPage
    },


    /*四川*/
    scRoute,

    /*甘肃*/
    gsRoute,

    /*机构*/
    jgRoute
  ]
})
