/* ***** 初始化 域名 相关参数 ***** */
var domain = location.host;

switch (domain) {
  case 'www.gaokao-gov.cn': // 线上环境
    break;
  case 'www.qcg-gov.cn': // 调试环境
    break;
  default:
    domain = 'www.qcg-gov.cn'; // 本地、其它情况使用调试环境
}

let domain_data = {
  domain,
  DOMAIN: `http://${domain}`, // 域名
  PUBLIC_CDN_DOMAIN: `http://res.acee.${domain.split('.')[1]}.cn`, // 公共资源的cdn
  AJAX_DOMAIN: `http://bk.${domain}` // 异步请求的地址
}


var store = {
  debug: true,
  state: {
    // 当前 使用的学生信息
    cur_student_info: '',
    // 保存点击的 用户信息
    reported_user_info: {},
    // 批次中文名字
    batch_CHS: ['none', '提前批', '本一批', '本二批', '专科提前批', '专科批'],
    // 语 数 外..
    subject_CHS: [{
      name: '语文',
      alias: 'chinese'
    }, {
      name: '数学',
      alias: 'math'
    }, {
      name: '英语',
      alias: 'english'
    }, {
      name: '物理',
      alias: 'physics'
    }, {
      name: '化学',
      alias: 'chemistry'
    }, {
      name: '生物',
      alias: 'biology'
    }, {
      name: '政治',
      alias: 'politics'
    }, {
      name: '历史',
      alias: 'history'
    }, {
      name: '地理',
      alias: 'geography'
    }],
    // 风险等级
    risk: [{
      name: '冲刺',
      alias: 'sprint',
      risk: 1
    }, {
      name: '稳妥',
      alias: 'steady',
      risk: 2
    }, {
      name: '保底',
      alias: 'guatantee',
      risk: 3
    }],
    userInfo: {
      category: 1,
      enroll_year: 2018,
      login: 1,
      pre_score: 0,
      province: "sc",
      score: 0,
      score_triger: 0,
      vip_type: 2,
      year: "2018",
      logined: false // 登陆状态
    },
    ...domain_data,
    compareSchList: {
      one: {
        college_name: null,
      },
      two: {
        college_name: null,
      },
    },
    showCom: {
      zsSchoolInfo: true,
      zsTable: true,
      schLine__p: true,
      schLine__c0: true,
      schLine__c1: true,
      schLine__c2: true,
      schLine__c3: true,
      radio: false,
      elButton: false,
      elInput: false
    },
    comOrder: {
      zsSchoolInfo: {
        order: 0,
      },
      zsTable: {
        order: 0,
      },
      schLine__p: {
        order: 0,
      },
      schLine__c1: {
        order: 0,
      },
      schLine__c2: {
        order: 0,
      },
      schLine__c3: {
        order: 0,
      },
      radio: {
        order: 0,
      },
      elButton: {
        order: 0,
      },
      elInput: {
        order: 0
      }
    },
    classroom_info: '', // 保存点击的课堂信息
    jg_info: '' // 保存点击的机构信息
  },
  setUserInfoAction(newValue) {
    if (this.debug) console.log('setUserInfoAction triggered with', newValue)
    this.state.userInfo = Object.assign({}, this.state.userInfo, newValue);
    if (this.debug) console.log('setUserInfoAction triggered result', this.state.userInfo)
  },
  setDomainAction(newValue) {
    if (this.debug) console.log('setDomainAction triggered')
    this.state.PUBLIC_CDN_DOMAIN = newValue;
    if (this.debug) console.log('setDomainAction triggered result', this.state.PUBLIC_CDN_DOMAIN)
  },
  setCompareSchListAction(newValue) {
    if (this.debug) console.log('setCompareSchListAction triggered')
    this.state.compareSchList = Object.assign({}, this.state.compareSchList, newValue);
    if (this.debug) console.log('setCompareSchListAction triggered result', this.state.compareSchList)
  },
  setShowComAction(newValue) {
    if (this.debug) console.log('setShowComAction triggered', newValue)
    this.state.showCom = Object.assign({}, this.state.showCom, newValue);
    if (this.debug) console.log('setShowComAction triggered result', this.state.showCom)
  },
  setComOrderAction(newValue) {
    if (this.debug) console.log('setComOrderAction triggered', newValue)
    this.state.comOrder = Object.assign({}, this.state.comOrder, newValue);
    if (this.debug) console.log('setComOrderAction triggered result', this.state.comOrder)
  },
  setClassroomInfoAction(newValue) {
    if (this.debug) console.log('setClassroomInfo triggered', newValue)
    this.state.classroom_info = newValue;
  },
  setReportedUserInfoAction(newValue) {
    if (this.debug) console.log('setReportedUserInfoAction triggered', newValue)
    this.state.reported_user_info = newValue;
  },
  setCurStudentInfoAction(newValue) {
    if (this.debug) console.log('setCurStudentInfoAction triggered', newValue)
    this.state.cur_student_info = newValue;
  }
}

export default store;
