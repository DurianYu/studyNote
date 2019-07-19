/**
 * @method
 * @param {Object} $this 指定的this值
 * @param {Object, Array} $nodeData 包含要清空数据项的数据
 */
export function emptyData ($this, nodeData) {
  if({}.toString.call(nodeData) === '[object Object]') {
    if(nodeData.type ? nodeData.type == 'input' : true) {
      if (nodeData.hasOwnProperty('value')) {
        nodeData['value'] = null;
      } else {
        $this.$set(nodeData, 'value', null);
      } 
    } else if(nodeData.type != 'button') {
      if (nodeData.hasOwnProperty('checked')) {
        nodeData['checked'] = false;
      } else {
        $this.$set(nodeData, 'checked', false);
      }
    }
    if (nodeData.hasOwnProperty('children')) {
      emptyData($this, nodeData.children);
    } else {
      return;
    }
  }
  if({}.toString.call(nodeData) === '[object Array]') {
    nodeData.forEach(function (currentValue) { 
      emptyData($this, currentValue);
    })
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

export function volunMove (data, index, direction) {
  let parent;
  let dataChild = data;
  let position;
  index.forEach( function (currentValue) { 
    for (let i = 0, len = dataChild.length; i < len; i++) {
      if (dataChild[i].id == currentValue) {
        parent = dataChild;
        dataChild = dataChild[i].children;
        position = i;
        break;
      }
    }
  })
  if (direction == 1) {
    exchangeValue(parent, position, position == 0 ? dataChild ? parent.length - 1 : parent.length - 2 : position - 1);
    if (dataChild) {
      exchangeChild(parent, position, position == 0 ? parent.length - 1 : position - 1)
    }
  } else {
    exchangeValue(parent, position, position == 5 ? 0 : position + 1);
    dataChild ? exchangeChild(parent, position, position == 5 ? 0 : position + 1) : false;
  }
}
/**
 * @method
 * @param {Array} data 要移动位置的数据
 * @param {number} pos_1 移动位置索引
 * @param {number} pos_2 移动位置索引
 */
function exchangeValue (parent, pos_1, pos_2) {
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
function exchangeChild (parent, pos_1, pos_2) {
  let exchange = parent[pos_1].children;
  parent[pos_1].children = parent[pos_2].children;
  parent[pos_2].children = exchange;
}
 

export function transformVolun (data, num) {
  // let cycles;
  let server_volunteer = {
    num: num,
    title: data.label,
    list: []
  };
  data[0].children.forEach(function (currentValue) {
    let list = {
      tag: '',
      sch_name: '',
      subj_1: '',
      subj_2: '',
      subj_3: '',
      subj_4: '',
      subj_5: '',
      subj_6: '',
      checkbox_1: '',
      checkbox_2: ''
    };
    list.tag = currentValue.id;
    list.sch_name = currentValue.value;
    currentValue.children.forEach(function (currValue) {
      if (!currValue.hasOwnProperty('children')) {
        list[currValue.id] = currValue.value
      } else {
        currValue.children.forEach(function (value, index) {
          if (value.hasOwnProperty('checked') && value.checked) {
            list['checkbox_' + (parseInt(index) + 1)] = 1;
          }
        })
      }
    })
  server_volunteer.list.push(list);
  })
  return server_volunteer;
}

export function getVolunteer(batch_num, province) {
  return new Promise((resolve, reject) => {
    axios({
      url: `/asypc/${province}/wish/get`,
      method: 'get',
      dataType: 'json',
      data: {
        index: parseInt(batch_num)
      },
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

export function postVolunteer(v_data, batch_num, province) {
  return new Promise((resolve, reject) => {
    axios({
      url: `/asypc/${province}/wish/set`,
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

export function emptyVolunteer(v_data, batch_num, province) {
  return new Promise((resolve, reject) => {
    axios({
      url: `/asypc/${province}/wish/empty`,
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