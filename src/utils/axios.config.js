import axios from 'axios'
import router from '../permission'
import { Message } from 'element-ui'
import jsonBig from 'json-bigint'
// import { format } from 'path'
axios.defaults.transformResponse = [function (data) {
  if (data !== '') {
    return jsonBig.parse(data)
  }
}]

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')

  config.headers['Authorization'] = `Bearer ${token}`

  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear()
      router.push('/login')
      break
    case 404:
      message = '手机号不正确'
      break

    default:
      break
  }
  Message(message)
  return new Promise(function () {})// 终止当前错误,不进入catch
})

export default {
  install (Vue) {
    Vue.prototype.$axios = axios
  }

}
