import {
  OverTime,
  getIndex
} from '@/utils/util.js';

/**
 * @method
 * @param {Object} $this 指定的this值
 * @param {Object, Array} $nodeData 包含要清空数据项的数据
 */
export function emptyData(volunteer_data, childNodes) {
  // 原版
  // if ({}.toString.call(nodeData) === '[object Object]') {
  //   if (nodeData.type ? nodeData.type == 'input' : true) {
  //     if (nodeData.hasOwnProperty('value')) {
  //       nodeData['value'] = null;
  //     } else {
  //       $this.$set(nodeData, 'value', null);
  //     }
  //   } else if (nodeData.type != 'button') {
  //     if (nodeData.hasOwnProperty('checked')) {
  //       nodeData['checked'] = false;
  //     } else {
  //       $this.$set(nodeData, 'checked', false);
  //     }
  //   }
  //   if (nodeData.hasOwnProperty('children')) {
  //     emptyData($this, nodeData.children);
  //   } else {
  //     return;
  //   }
  // }
  // if ({}.toString.call(nodeData) === '[object Array]') {
  //   nodeData.forEach(function(currentValue) {
  //     emptyData($this, currentValue);
  //   })
  // }

  // 新版
  let sch_index = getSchIndex(volunteer_data, childNodes.batch_index, childNodes.college_index);
  let sch = volunteer_data[childNodes.batch_index - 1]['children'][sch_index];
  // 模板
  let volunteer_struct = handleStruct(JSON.parse(sessionStorage.getItem('volunteer_struct')));
  // 批次
  if (childNodes.lvl == 1) {
    this.$set(volunteer_data, childNodes.batch_index - 1, volunteer_struct[childNodes.batch_index - 1]);
  }
  // 学校
  if (childNodes.lvl == 2) {
    this.$set(volunteer_data[childNodes.batch_index - 1]['children'], sch_index, volunteer_struct[childNodes.batch_index - 1]['children'][sch_index]);
  }
  // 专业
  if (childNodes.lvl == 3) {
    this.$set(volunteer_data[childNodes.batch_index - 1]['children'][sch_index]['children'], childNodes.pos, volunteer_struct[childNodes.batch_index - 1]['children'][sch_index]['children'][childNodes.pos]);
  }
}
/**
 * @method
 * @param {Array} data 要移动位置的数据
 * @param {Array} index 包含要移动数据的id，注:如果要移动的数据在深层，
 * 如： {a: 'cc',
 *       id: 1,
 *       children: [
 *         {c: 'c',
 *         id: 3},
 *         {d: 'd',
 *         id: 4},
 *       ]
 *     }
 * 当把这个数据传递给函数时，想要移动的数据为{c: 'c', id: 3}，传递的id 要为[1, 3]，
 * 当把children传递给函数时，想要移动的数据为{c: 'c', id: 3}，传递的id 要为[3]，
 *
 * @param {number} direction 移动方向：上（1），下（default or any value）
 */

export function volunMove(data, index, direction, childNodes) {
  console.log(data, index, direction, childNodes);
  let parent;
  let dataChild = data;
  let position;
  // 原版
  // index.forEach(function(currentValue) {
  //   for (let i = 0, len = dataChild.length; i < len; i++) {
  //     if (dataChild[i].id == currentValue) {
  //       parent = dataChild;
  //       dataChild = dataChild[i].children;
  //       position = i;
  //       break;
  //     }
  //   }
  // })

  // 新版
  let sch_index = getSchIndex(data, childNodes.batch_index, childNodes.college_index);
  parent = childNodes.lvl == 2 ? data[childNodes.batch_index - 1].children : data[childNodes.batch_index - 1].children[sch_index].children;

  // parent = childNodes.lvl == 2 ? data[childNodes.batch_index - 1].children : data[childNodes.batch_index - 1].children[childNodes.college_index - 1].children;
  dataChild = childNodes.children || '';
  position = childNodes.pos;

  if (direction == 1) {
    let start = dataChild ? parent.length - 1 : parent.length - 2;
    exchangeValue(parent, position, position == 0 ? start : position - 1);
    if (dataChild) {
      exchangeChild(parent, position, position == 0 ? parent.length - 1 : position - 1)
    }
  } else {
    let last = dataChild ? parent.length : parent.length - 1;
    console.log('parent', parent);
    console.log('position', position);
    console.log('dataChild', dataChild);
    console.log('last', last);
    // 原版
    // exchangeValue(parent, position, position == 5 ? 0 : position + 1);
    // dataChild ? exchangeChild(parent, position, position == 5 ? 0 : position + 1) : false;

    // 新版
    exchangeValue(parent, position, position + 1 == last ? 0 : position + 1);
    if (dataChild) {
      exchangeChild(parent, position, position + 1 == last ? 0 : position + 1)
    }
  }
}
/**
 * @method
 * @param {Array} data 要移动位置的数据
 * @param {number} pos_1 移动位置索引
 * @param {number} pos_2 移动位置索引
 */
function exchangeValue(parent, pos_1, pos_2) {
  console.log('parent: pos_1', pos_1, 'pos_2', pos_2);
  let exchange = parent[pos_1].value;
  parent[pos_1].value = parent[pos_2].value;
  parent[pos_2].value = exchange;
}
/**
 * @method
 * @param {Array} data 要移动位置的数据
 * @param {number} pos_1 移动位置索引
 * @param {number} pos_2 移动位置索引
 */
function exchangeChild(parent, pos_1, pos_2) {
  console.log('children: pos_1', pos_1, 'pos_2', pos_2);
  let exchange = parent[pos_1].children;
  parent[pos_1].children = parent[pos_2].children;
  parent[pos_2].children = exchange;
}


export function transformVolun(data, num) {
  // let cycles;
  // let server_volunteer = {
  //   num: num,
  //   title: data.label,
  //   list: []
  // };
  // data[0].children.forEach(function(currentValue) {
  //   let list = {
  //     tag: '',
  //     sch_name: '',
  //     subj_1: '',
  //     subj_2: '',
  //     subj_3: '',
  //     subj_4: '',
  //     subj_5: '',
  //     subj_6: '',
  //     checkbox_1: '',
  //     checkbox_2: ''
  //   };
  //   list.tag = currentValue.id;
  //   list.sch_name = currentValue.value;
  //   currentValue.children.forEach(function(currValue) {
  //     if (!currValue.hasOwnProperty('children')) {
  //       list[currValue.id] = currValue.value
  //     } else {
  //       currValue.children.forEach(function(value, index) {
  //         if (value.hasOwnProperty('checked') && value.checked) {
  //           list['checkbox_' + (parseInt(index) + 1)] = 1;
  //         }
  //       })
  //     }
  //   })
  //   server_volunteer.list.push(list);
  // })
  // return server_volunteer;
}


export function postVolunteer(v_data, batch_num, province) {
  return new Promise((resolve, reject) => {
    axios({
        url: `/${province}/wish/set`,
        method: 'POST',
        dataType: 'json',
        data: {
          wish_list: JSON.stringify(v_data),
          index: parseInt(batch_num)
        }
      })
      .then(function(response) {

        if (typeof resolve === 'function') {
          resolve(response);
        } else {
          console.error('error: 请传入函数')
        }

      })
      .catch(function(error) {

        if (typeof reject === 'function') {
          reject(error);
        } else {
          console.error('error: 请传入函数')
        }

      });
  });
}


// 获取志愿表结构
export function getStruct(refresh) {
  return new Promise((resolve, reject) => {
    let volunteer_struct = JSON.parse(sessionStorage.getItem('volunteer_struct'));
    if (volunteer_struct && !refresh) return resolve(volunteer_struct);

    axios({
      url: `/form/struct`,
      method: 'get',
      data: {}
    }).then(res => {
      res = res.data;
      if (res.status === 1) {
        sessionStorage.setItem('volunteer_struct', JSON.stringify(res));
        resolve(res);
      }
      if (res.status === -1) {
        this.$alert(`${res.msg}`, '');
      }
      if (res.status === -2) {
        OverTime(this, res.msg);
      }
    }).catch(error => console.error(error));
  });
}

// 处理志愿结构
export function handleStruct(res) {
  let col_names = res.col_names;
  let rows = res.data;
  // 存储位置的对象
  let pos = {};
  for (let name of col_names) {
    pos[name] = res.col_names.indexOf(name);
  }
  let result_data = [];
  // 不同批次index的合集
  let batch_index_ary = [];
  let flag = true;

  // 收集所有批次的 类型
  for (let row of rows) {
    flag = true;
    for (let i = 0, len = batch_index_ary.length; i < len; i++) {
      // 同一批次
      if (batch_index_ary[i] == row[pos['batch_index']]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      // 确定 根级菜单
      result_data[batch_index_ary.length] = {
        id: row[pos['id']],
        label: row[pos['batch_name']],
        batch_index: row[pos['batch_index']],
        batch_code: row[pos['batch_code']],
        lvl: 1,
        children: []
      };
      // 批次起始
      batch_index_ary[batch_index_ary.length] = row[pos['batch_index']];
    }
  }
  console.log('batch_index_ary', batch_index_ary);

  // 按批次过滤，组装数据
  batch_index_ary.forEach((v, i) => {
    for (let row of rows) {
      // 同批次下
      if (v == row[pos['batch_index']]) {
        // // 专业
        let subject = [];
        for (let i = 0, len = row[pos['subject_cnt']]; i < len; i++) {
          subject[i] = {
            id: i,
            label: `专业-${i + 1}`,
            value: ``,
            batch_index: row[pos['batch_index']],
            college_index: row[pos['college_index']],
            subject_cnt: row[pos['subject_cnt']],
            disabled: true,
            pos: i,
            lvl: 3
          }
        }
        // 调配
        subject.push({
          type: 'button',
          children: [{
            college_index: row[pos['college_index']],
            checked: false,
            disabled: row[pos['subject_adjust']] == 1 ? false : true,
            label: '专业调配',
            type: 'checkbox',
            id: '01'
          }, {
            college_index: row[pos['college_index']],
            checked: false,
            disabled: row[pos['allow_adjust']] == 1 ? false : true,
            disabled: false,
            label: '定向调配',
            type: 'checkbox',
            id: '02'
          }]
        });
        // // 专业调配
        // if (row[pos['subject_adjust']]) {
        //   subject[subject.length - 1]['children'].push({
        //     college_index: row[pos['college_index']],
        //     checked: false,
        //     disabled: false,
        //     label: '专业调配',
        //     type: 'checkbox',
        //     id: '01'
        //   });
        // }
        // // 定向调配
        // if (row[pos['allow_adjust']]) {
        //   subject[subject.length - 1]['children'].push({
        //     college_index: row[pos['college_index']],
        //     checked: false,
        //     disabled: false,
        //     label: '定向调配',
        //     type: 'checkbox',
        //     id: '02'
        //   });
        // }
        // 学校
        result_data[i]['children'].push({
          id: row[pos['id']],
          label: `学校-${result_data[i]['children'].length + 1}`,
          value: ``,
          disabled: true,
          batch_index: row[pos['batch_index']],
          batch_code: row[pos['batch_code']],
          college_index: row[pos['college_index']],
          subject_cnt: row[pos['subject_cnt']],
          // allow_adjust: row[pos['allow_adjust']],
          pos: result_data[i]['children'].length,
          lvl: 2,
          children: subject // 专业
        });


      }
    }
  });

  console.log('result_data', result_data);
  return result_data;
}

// 志愿表上下移动
export function postMove(direction, data, target) {
  target = target || '';
  return new Promise((resolve, reject) => {
    axios({
      url: `/form${target}/move/${direction}`,
      method: 'post',
      data: {
        ...data
      }
    }).then(res => {
      res = res.data;
      if (res.status === 1) {
        resolve(res);
      }
      if (res.status === -1) {
        this.$alert(`${res.msg}`, '');
      }
      if (res.status === -2) {
        OverTime(this, res.msg);
      }
    }).catch(error => console.error(error));
  });
}

// 加入志愿表
export function postJoin(data) {
  return new Promise((resolve, reject) => {
    axios({
      url: `/form/set`,
      method: 'post',
      data: {
        ...data
      }
    }).then(res => {
      res = res.data;
      if (res.status === 1) {
        resolve(res);
      }
      if (res.status === -1) {
        this.$alert(`${res.msg}`, '');
      }
      if (res.status === -2) {
        OverTime(this, res.msg);
      }
    }).catch(error => console.error(error));
  });
}

// 删除志愿表
export function postDel(target, data) {
  return new Promise((resolve, reject) => {
    axios({
      url: `/form/delete/${target}`,
      method: 'post',
      data: {
        ...data
      }
    }).then(res => {
      res = res.data;
      if (res.status === 1) {
        resolve(res);
      }
      if (res.status === -1) {
        this.$alert(`${res.msg}`, '');
      }
      if (res.status === -2) {
        OverTime(this, res.msg);
      }
    }).catch(error => console.error(error));
  });
}

// 查询志愿
export function getVolunteer(batch_index) {
  // return new Promise((resolve, reject) => {
  return axios({
    url: `/form/get`,
    method: 'post',
    data: {
      batch_index
    }
  }).then(res => {
    res = res.data;
    return res;
    // if (res.status === 1) {
    //   resolve(res);
    // }
    // if (res.status === -1) {
    //   this.$alert(`${res.msg}`, '');
    // }
    // if (res.status === -2) {
    //   OverTime(this, res.msg);
    // }
  }).catch(error => console.error(error));
  // });
}

// 填充志愿表
// export function fillVolunteer(res) {
//     return data
// }

// 查询志愿
export function getAllVolunteer() {
  return new Promise((resolve, reject) => {
    axios.all([getVolunteer(1), getVolunteer(2), getVolunteer(3), getVolunteer(4), getVolunteer(5)]).then(axios.spread((res1, res2, res3, res4, res5) => {
      // 只有全部请求都完成才会成功，否则会被catch捕获
      let volunteer_data = handleStruct(JSON.parse(sessionStorage.getItem('volunteer_struct')));
      // 填充志愿表数据
      [res1,
        res2,
        res3,
        res4,
        res5
      ].forEach((v, i) => {
        if (v.status == 1) {
          let col_names = v.col_names;
          let rows = v.data;
          // 存储位置的对象
          let pos = {};
          for (let name of col_names) {
            pos[name] = v.col_names.indexOf(name);
          }
          for (let row of rows) {
            let sch_index = getSchIndex(volunteer_data, row[pos['batch_index']], row[pos['college_index']]);
            let sch = volunteer_data[row[pos['batch_index']] - 1]['children'][sch_index];
            console.log('row[college_name', row[pos['college_name']]);
            console.log('row[sch_index', sch_index);
            // 学校
            volunteer_data[row[pos['batch_index']] - 1]['children'][sch_index].value = row[pos['college_name']];
            volunteer_data[row[pos['batch_index']] - 1]['children'][sch_index].plan_id = row[pos['college_plan_id']];
            // 专业
            volunteer_data[row[pos['batch_index']] - 1]['children'][sch_index]['children'][row[pos['subject_index']] - 1].value = row[pos['subject_name']];
            // 调配
            if (row[pos['subject_adjust']]) {
              volunteer_data[row[pos['batch_index']] - 1]['children'][sch_index]['children'][sch.children.length - 1].children[0].checked = true;
            }
            if (row[pos['allow_adjust']]) {
              volunteer_data[row[pos['batch_index']] - 1]['children'][sch_index]['children'][sch.children.length - 1].children[1].checked = true;
            }


          }
        }
      });
      resolve(volunteer_data);
    }));
  });
}

// 找寻学校 在对象数组里的位置
export function getSchIndex(volunteer_data, batch_index, college_index) {
  let result = 'not find';
  for (let i = 0, len = volunteer_data[batch_index - 1]['children'].length; i < len; i++) {
    console.log(volunteer_data[batch_index - 1]['children'][i]);
    if (volunteer_data[batch_index - 1]['children'][i].college_index == college_index) {
      result = i;
      break;
    }
  }
  return result;
}

// 设置调配、取消调配
export function postAdjust(action, college_index, target) {
  target = target || '';
  return new Promise((resolve, reject) => {
    axios({
      url: `/form${target}/adjust/${action}`,
      method: 'post',
      data: {
        college_index
      }
    }).then(res => {
      res = res.data;
      if (res.status === 1) {
        resolve(res);
      }
      if (res.status === -1) {
        reject(res);
        this.$alert(`${res.msg}`, '');
      }
      if (res.status === -2) {
        reject(res);
        OverTime(this, res.msg);
      }
    }).catch(error => console.error(error));
  });
}
