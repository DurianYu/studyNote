import store from '@/store/index';

export function calcData(columns, line1, line2, enroll_year) {
  let maxLen;
  let lineData = modifyMinValue(line1, line2);
  // console.log(lineData)
  let chartData = {
    columns: ['日期', columns[0], columns[1]],
    rows: []
  };
  if (line1 && line2) {
    maxLen = Math.max(lineData.line1.data.length, lineData.line2.data.length)
  } else {
    maxLen = lineData.line1.data.length;
  }

  for (let i = 0; i < maxLen; i++) {
    let year = (enroll_year - 2 + i) + '';
    let line_1 = lineData.line1.data[i] == 0 ? isFinite(lineData.line1.minVal) ? (parseInt(lineData.line1.minVal) - 4) + '' : 0 : parseInt(lineData.line1.data[i]);
    if (line2) {
      let line_2 = lineData.line2.data[i] == 0 ? isFinite(lineData.line2.minVal) ? (parseInt(lineData.line2.minVal) - 4) + '' : 0 + '' : parseInt(lineData.line2.data[i]);
      chartData.rows.push({
        '日期': year,
        [columns[0]]: line_1,
        [columns[1]]: line_2
      })
    } else {
      chartData.rows.push({
        '日期': year,
        [columns[0]]: line_1
      })
    }
  }

  return chartData;
}

export function modifyMinValue(line1, line2) {
  function getZero(line) {
    let lineData = {
      mixArr: line ? line.filter((v, i) => {
        return v > 0;
      }) : [],
      zero: '', // 填 无 的那个刻度值
      minVal: '', // 除零外的最小值
      maxVal: '', // 除零外的最大值
      data: '' // 处理后的直线数据
    };
    // 隐式将值转成了number
    lineData.minVal = Math.min.apply(this, lineData.mixArr);
    lineData.maxVal = Math.max.apply(this, lineData.mixArr);

    // 包含两个值且互不相等
    if (lineData.mixArr.length === 2 && lineData.mixArr[0] !== lineData.mixArr[1]) {
      // 计算 （无） 值
      let temp_zero = lineData.minVal - (lineData.maxVal - lineData.minVal);
      // 若计算后的 (无) 值小于0,则设置为0
      lineData.zero = temp_zero > 0 ? temp_zero : 0;
    }

    // 包含两个值且相等
    if (lineData.mixArr.length === 2 && lineData.mixArr[0] === lineData.mixArr[1]) {
      // 计算 （无） 值
      let temp_zero = Math.abs(lineData.minVal - 1);
      // 若计算后的 (无) 值小于0,则设置为0
      lineData.zero = temp_zero > 0 ? temp_zero : 0;
    }

    return lineData;
  }


  let temp_line1 = line1 ? getZero(line1) : '';
  let temp_line2 = line2 ? getZero(line2) : '';

  // 获取最小zero值
  let all_min_zero = '';
  if (temp_line1 && temp_line2) {
    all_min_zero = Math.min(temp_line1.zero, temp_line2.zero);
    temp_line1.zero = all_min_zero;
    temp_line2.zero = all_min_zero;
    // 替换0值
    temp_line1.data = line1.map((v, i) => {
      if (v === 0) {
        v = all_min_zero;
      }
      return v;
    });
    temp_line2.data = line2.map((v, i) => {
      if (v === 0) {
        v = all_min_zero;
      }
      return v;
    });
  } else if (temp_line1) {
    all_min_zero = temp_line1.zero;
    // 替换0值
    temp_line1.data = line1.map((v, i) => {
      if (v === 0) {
        v = all_min_zero;
      }
      return v;
    });
  } else if (temp_line2) {
    all_min_zero = temp_line2.zero;
    // 替换0值
    temp_line2.data = line2.map((v, i) => {
      if (v === 0) {
        v = all_min_zero;
      }
      return v;
    });
  }

  return {
    line1: temp_line1,
    line2: temp_line2,
  };
}


/**
 * [OverTime 超时提示]
 * @param       {[String]} msg [提示的消息]
 */
export function OverTime($this, msg) {
  let user_info = {
    category: 1,
    enroll_year: 2018,
    login: 1,
    pre_score: 0,
    province: "sc",
    score: 0,
    score_triger: 0,
    vip_type: 2,
    year: new Date().getFullYear(),
    logined: false
  }
  console.log('fresh');
  store.setUserInfoAction(user_info);
  if (msg) {
    $this.$alert(msg, '注意', {
      confirmButtonText: '确定',
      callback: () => {
        window.location.reload();
      }
    })
  } else {
    window.location.reload();
  }
}

/**
 * [readImgSrc 读取图片文件的地址]
 * @param  {[file]} file [本地上传的图片文件]
 * @return {[Object]}      [返回: {local_src: 图片地址, local_file: 图片文件}]
 */
export function readImgSrc(file) {
  return new Promise((resolve, reject) => {
    if (!file) return;
    // 本地转换后的img地址
    let local_src = '';
    // 文件
    let local_file = '';
    let vm = this;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    //判断浏览器是否支持FileReader
    if (!window.FileReader) {
      return vm.$alert(`not supported by your browser!`, '');
    } else {
      fileReader.onload = function() {
        //正则控制上传文件的类型
        if (/^image\/jpeg$/.test(file.type) && file.size < 1048576) {
          //输出图片预览 FileReader.result结果保存了文件base64的路径
          local_src = this.result;
          local_file = file;
          resolve(local_src);
        } else {
          vm.$alert(`请选择小于1Mb的jpg格式的图片`, '');
        }
      }
    }
  });
}


// 查找数据的位置
export function getIndex(target_ary, condition_name, condition_val) {
  let index = 'not find';
  for (let i = 0, len = target_ary.length; i < len; i++) {
    if (target_ary[i][condition_name] == condition_val) {
      index = i;
      break;
    }
  }
  return index;
}

/*
CDN://org-logo/20190412/id.jpg
CDN://lesson-cover/20190412/id.jpg
CDN://lesson-img/20190412/id.jpg
CDN://qr-contact/20190412/id.jpg
CDN://qr-group/20190412/id.jpg
*/
export function parseImgAddr(type, name) {
  switch (type) {
    case 'logo':
      return `${store.state.PUBLIC_CDN_DOMAIN}/org-logo/${name}`;
    case 'cover':
      return `${store.state.PUBLIC_CDN_DOMAIN}/lesson-cover/${name}`;
    case 'content':
      return `${store.state.PUBLIC_CDN_DOMAIN}/lesson-img/${name}`;
    case 'contact':
      return `${store.state.PUBLIC_CDN_DOMAIN}/qr-contact/${name}`;
    case 'group':
      return `${store.state.PUBLIC_CDN_DOMAIN}/qr-group/${name}`;
    default:
      return "not/find/path";
  }
}


// 图片上传路径
/*
  上传机构logo  /upload/org/logo
  上传课程封面  /upload/lesson/cover
  上传课程内容图片  /upload/lesson/img
  上传机构联系人二维码  /upload/qr/contact
  上传机构群二维码  "/upload/qr/group/{n}
  n：0主群，1-3备用群"
  */
export function getImgUpAddr(name) {
  switch (name) {
    case 'logo':
      return '/upload/org/logo';
    case 'cover':
      return '/upload/lesson/cover';
    case 'content':
      return '/upload/lesson/img';
    case 'contact':
      return '/upload/qr/contact';
    case 'group':
      return '/upload/qr/group';
    default:
      return "not find path";
  }
}

// 设置当前学生
export function setCurStudent(student_id, info) {
  return new Promise((resolve, reject) => {
    axios({
      url: `/student/set/current`,
      method: 'post',
      data: {
        student_id
      }
    }).then(res => {
      res = res.data;
      if (res.status === 1) {
        store.setCurStudentInfoAction(info);
        store.setUserInfoAction({
          score: info.score,
          category: info.art_science
        });
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


// 设置分数和文理科
export function setArtScience(score, category) {
  return new Promise((resolve, reject) => {
    // category：文理科，1文科，2理科
    console.log('category', category);
    axios({
      url: `/${store.state.userInfo.province}/score/set`,
      method: 'post',
      data: {
        score,
        category
      }
    }).then(res => {
      res = res.data;
      if (res.status === 1) {
        store.setUserInfoAction({
          category,
          score
        });
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

// 深度拷贝
export function deepClone(data) {
  return JSON.parse(JSON.stringify(data));
}

// 获取学生相关信息
export function getRelatedInfo(refresh) {
  return new Promise((resolve, reject) => {
    if (!refresh && store.state.cur_student_info) {
      resolve(store.state.cur_student_info);
    }
    axios({
      url: `${store.state.AJAX_DOMAIN}/com/user/info`,
      methoed: 'post',
      data: {

      }
    }).then(res => {
      res = res.data;
      if (res.status === 1) {
        store.setCurStudentInfoAction(Object.assign({}, store.state.user_info, {
          batch_code: res.data.batch_code,
          category: res.data.category,
          score_diff: res.data.diff,
          position_start: res.data.pos_s,
          position_end: res.data.pos_e,
          equal_score1: res.data.es1,
          equal_score2: res.data.es2,
          equal_score3: res.data.es3,
        }));
        resolve(res);
      }
      if (res.status === -2) {
        OverTime(this, res.msg);
      }
    }).catch(res => console.warn(res));
  });
}