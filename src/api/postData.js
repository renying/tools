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
  }
}
export default gateinfo
