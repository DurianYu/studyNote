// 集中管理请求地址，所有的接口地址：
// 1.整个应用用到了哪些接口一目了然
// 2.接口地址可能变化，方便管理

/**
 * title: 接口描述
 * uri: 请求地址
 * method: 请求方式
 * const params = {
    uriCode: 'TEST01',
    // restful
    bindVars: [{
        key: "id",
        value: 'xxx',
    }, {
        key: "type",
        value: 'xxx'
    }]
  }
 */

const Api = {
  API001: { title: '获取当前个人信息及状态', uri: '/student/course/:courseid/user_info' },
  API002: { title: '发送动作', uri: '/student/course/:courseid/status/', method: 'put' },
  API003: { title: '切换角色', uri: '/student/course/:courseid/role/:roleid', method: 'put' },
  API004: { title: '登录', uri: '/student/platform/login', method: 'post' },
  API005: { title: '获取team状态', uri: '/student/course/:courseid/class/:classid/team/:teamid/' },
  API006: { title: '分配角色', uri: '/student/course/:courseid/class/:classid/team/:teamid/role', method: 'post' },
  API007: { title: '获取班级信息', uri: '/teacher/p_class/:p_classid/course/:courseid' },
  API008: { title: '删除某个team的岗位分配信息(初始化团队的角色)', uri: '/teacher/p_class/:p_classid/team/:teamid', method: 'delete' },
  API1001: { title: '邮件、短信获取', uri: '/student/course/:courseid/msg' },
  API1002: { title: '修改某个人的短信信息', uri: '/student/course/:courseid/msg', method: 'put' },
  API1003: { title: '获取team所有实体的状态列表', uri: '/student/course/:courseid/class/:classid/team/:teamid/status' },
  API009: { title: '设置邮件已读', uri: '/student/course/:courseid/msg/:msgid', method: 'put' },
  API010: { title: '获取区块链浏览器的列表', uri: '/student/course/:courseid/class/:classid/team/:teamid/bc_browser_status' }
}

export default Api
