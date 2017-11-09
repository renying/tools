/**
 * @file
 * @author: gaocangjian@nd.com
 * @date: 2017/11/3.
 */
import axios from 'axios'
var gateinfo = {
  get: function (params) {
    return axios({
      method: 'get',
      url: '/PageRequest.ashx',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'charset': 'UTF-8'
      },
      params: params
    })
  },
  post: function (params) {
    return axios({
      method: 'post',
      url: '/PageRequest.ashx',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'charset': 'UTF-8'
      },
      params: params
    })
  },
  checkCode: function (Code) {
    if (Code === 2) {
      alert('参数错误，请检查')
      return false
    } else if (Code === 7) {
      alert('用户未登录')
      return false
    }
  }
}
export default gateinfo
