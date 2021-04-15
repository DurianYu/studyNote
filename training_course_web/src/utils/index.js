// 函数节流
export const Throttle = () => {
  let flags = true // 是否首次调用
  let timeout = null
  return function(func, time) {
    let _fn = func // 保存需要被延迟的函数引用
    if (flags) {
      _fn()
      flags = false
      clearTimeout(timeout)
      timeout = setTimeout(function() {
        // 延迟执行
        flags = true
      }, time)
    }
  }
}

// 验证表单与规定填写的数据是否一致
export const validateCheckForm = (rule, value, callback, check_form) => {
  let key = rule.field
  // replace(/\s+/g, "")
  const pass_validate = sessionStorage.getItem('pass_validate')
  if (pass_validate !== '1') {
    callback()
  } else if (!value) {
    callback(new Error('请填写'))
  } else if (!check_form[key]) {
    callback()
  } else if (String(value) != String(check_form[key])) {
    callback(new Error('请仔细查看工具箱文档内的信息或者任务提示、短信'))
  } else {
    callback()
  }
}

export const domainURI = str => {
  // eslint-disable-next-line no-useless-escape
  const durl = /http:\/\/([^\/]+)\//i
  const domain = str.match(durl)
  const http_ = str.indexOf('https://') === 0 ? 'https://' : 'http://'
  return http_ + domain[1]
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

//生成从minNum到maxNum的随机数
export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return Math.floor(Math.random() * minNum + 1)
    case 2:
      return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
    default:
      return 0
  }
}

export class RandomUtil {
  static randomString(ranStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz', length) {
    var chars = ranStr.split('')
    var str = ''
    for (var i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)]
    }
    return str
  }

  static getPrivateKey() {
    var str = RandomUtil.randomString(`0123456789abcdef`, 64)
    return str
  }
  static getPublicKey() {
    var head = Math.random() > 0.5 ? `02` : `03`
    var str = head + RandomUtil.randomString(`0123456789abcdef`, 64)
    return str
  }
  //0000000000000000000000000000000000
  static getAddressKey() {
    var head = `1`
    var str = head + RandomUtil.randomString(`123456789ABCDEFGHJKLMNPQRSTUVWXTZabcdefghikmnopqrstuvwxyz`, 33)
    return str
  }
  //0000000000000000000000000000000000000000000000000000000000000000
  static getLastHash() {
    var str = ``
    var ran = 2 //2个0
    for (var i = 0; i < ran; i++) {
      str += `0`
    }
    while (str.length < 64) {
      str += RandomUtil.randomString(`123456789abcdef`, 1)
    }
    return str
  }
  static getMokeergen() {
    var str = RandomUtil.randomString(`0123456789abcdef`, 64)
    return str
  }
  static getHash(zeroNum) {
    var str = ``
    var ran = zeroNum //zeroNum个0
    for (var i = 0; i < ran; i++) {
      str += `0`
    }
    while (str.length < 64) {
      str += RandomUtil.randomString(`123456789abcdef`, 1)
    }
    return str
  }
  static getCurrentHash() {
    var str = ``
    var ran = 2 //2个0
    for (var i = 0; i < ran; i++) {
      str += `0`
    }
    while (str.length < 64) {
      str += RandomUtil.randomString(`123456789abcdef`, 1)
    }
    return str
  }
  static getTradeHash() {
    var str = ``
    // var ran = 8;//8个0
    // for (var i = 0; i < ran; i++) {
    //  str += `0`;
    // }
    while (str.length < 64) {
      str += RandomUtil.randomString(`0123456789abcdef`, 1)
    }
    return str
  }
  static getSignData() {
    var num = 0
    var ran = Math.random()
    if (ran < 0.3) {
      num = 142
    } else if (ran < 0.6) {
      num = 144
    } else {
      num = 146
    }
    var str = RandomUtil.randomString(`0123456789abcdef`, num)
    return str
  }
  static getRanByList(list) {
    return list[Math.floor(Math.random() * list.length)]
  }
}
