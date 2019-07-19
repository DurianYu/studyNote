var store = {
  debug: true,
  state: {
    userInfo: {
      category:2,
      enroll_year:2017,
      login:1,
      pre_score:645,
      province:"sc",
      score:0,
      score_triger: 0,
      vip_type:2,
      year:"2018"
    },
    domain: 'http://www.ieac-edu.com',
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
  setUserInfoAction (newValue) {
    if (this.debug) console.log('setUserInfoAction triggered with', newValue)
    this.state.userInfo = Object.assign({}, this.state.userInfo, newValue);
    if (this.debug) console.log('setUserInfoAction triggered result', this.state.userInfo)
  },
  setDomainAction (newValue) {
    if (this.debug) console.log('setDomainAction triggered')
    this.state.domain = newValue;
    if (this.debug) console.log('setDomainAction triggered result', this.state.domain)
  },
  setCompareSchListAction (newValue) {
    if (this.debug) console.log('setCompareSchListAction triggered')
    this.state.compareSchList = Object.assign({}, this.state.compareSchList, newValue);
    if (this.debug) console.log('setCompareSchListAction triggered result', this.state.compareSchList)
  },
  setShowComAction (newValue) {
    if (this.debug) console.log('setShowComAction triggered', newValue)
    this.state.showCom = Object.assign({}, this.state.showCom, newValue);
    if (this.debug) console.log('setShowComAction triggered result', this.state.showCom)
  },
  setComOrderAction (newValue) {
    if (this.debug) console.log('setComOrderAction triggered', newValue)
    this.state.comOrder = Object.assign({}, this.state.comOrder, newValue);
    if (this.debug) console.log('setComOrderAction triggered result', this.state.comOrder)
  },
  setClassroomInfoAction(newValue) {
    if (this.debug) console.log('setClassroomInfo triggered', newValue)
    this.state.classroom_info = newValue;
  }
}

export default store;
