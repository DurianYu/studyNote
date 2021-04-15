/*
 * @Description: 请求封装
 * @Author: zhangping
 * @Date: 2019-07-19 17:40:49
 * @LastEditTime: 2019-09-24 17:37:29
 * @LastEditors: Please set LastEditors
 */
import Fly from 'flyio'
import ApiUri from './api'
import { Throttle } from '../utils/index'
import { Message } from 'view-design'
import reqCode from '../config/reqCode'
import { HOST } from '../config/index'
import router from '../router/index'
import store from '../store/index'

// 节流
const Throttle_ = Throttle()

//添加请求拦截器
Fly.interceptors.request.use(config => {
  config.baseURL = process.env.NODE_ENV === 'production' ? HOST + '/api' : '/api'
  // 处理参数,针对于绑定id的路由
  if (config.body && Array.isArray(config.body.bindVars)) {
    config.body.bindVars.forEach(item => {
      if (config.url) {
        config.url = config.url.replace(`:${item.key}`, `${item.value}`)
      }
    })
    delete config.body.bindVars
  }
  config.headers['Content-Type'] = 'application/json'
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
  config.headers['x-zg-token-id'] = sessionStorage.getItem('x-zg-token-id') || ''
  config.timeout = 30000
  return config
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
Fly.interceptors.response.use(
  response => {
    let { data, status, headers, request } = response
    if (request.url.indexOf('/student/platform/login') !== -1) {
      sessionStorage.setItem('x-zg-token-id', headers['x-zg-token-id'])
    }
    if (status >= 200 && status < 300 && data.error_code === reqCode.success) {
      return data.data
    } else {
      if (data.error_code == reqCode.noLogin) {
        // eslint-disable-next-line no-unused-vars
        const { training_courseid, ...query } = store.state.platformUserInfo
        router.push({
          name: 'scene',
          query: {
            ...query
          }
        })
      }
      new Throttle_(() => {
        Message.error(data.msg || '系统错误！')
      }, 300)
      return new Promise((response, reject) => {
        reject(response)
      })
    }
  },
  error => {
    let errDescription = '服务异常，请重试！'
    switch (error.status) {
      case 400:
        errDescription = error.data.detail || '参数错误！'
        break
      case 404:
        errDescription = '资源未找到！'
        break
      default:
        errDescription = '服务异常，请重试！'
    }
    new Throttle_(() => {
      Message.error(errDescription)
    }, 300)
    return new Promise((response, reject) => {
      reject(error)
    })
  }
)

let newApiUri = ApiUri
const fetch = params => {
  // 当前api对象
  const uriObj = newApiUri[params[`uriCode`]]
  // 请求的url
  let uri = uriObj.restful ? uriObj.uri + '/' + params['id'] : uriObj.uri
  // 请求的方法类型
  let method_
  if (!uriObj.method) {
    method_ = 'get'
  } else {
    method_ = uriObj.method
  }
  // 获取传给后端的参数
  let param = JSON.parse(JSON.stringify(params))
  delete param[`uriCode`]
  delete param.method
  if (uriObj.restful) {
    delete param.id
  }
  const _fly = Fly
  return _fly[method_](uri, param)
}

export default fetch
