/**
 * Created by gaocnagjian on 2017/11/6 0006.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import GetInfo from '../api/postData.js'
import 'mint-ui/lib/style.css'

// 告诉 vue “使用” vuex
Vue.use(Vuex)
Vue.use(MintUI)

const state = {
  gateResult: {BusinessList: {}, NeedGet: true},
  userinfo: {},
  smsGateInfo: {},
  isreload: true
}
const getters = {
  getGateResult: function (state) {
    return state.gateResult
  },
  getUserInfo: function (state) {
    return state.userinfo
  },
  getGateInfo: function (state) {
    return state.smsGateInfo
  },
  getReload: function (state) {
    return state.isreload
  }
}
const mutations = {
  // 设置列表数据
  setResult: function (state, payload) {
    state.gateResult.BusinessList = payload.ResultObj.BusinessList
  },
  // 设置用户信息
  setUserInfo: function (state, payload) {
    state.userinfo = payload.ResultObj
    state.isreload = false
  },
  // 设置短信通道信息
  setGateInfo: function (state, payload) {
    state.smsGateInfo = payload.ResultObj
  },
  // 设置上拉加载数据信息
  setMoreResult: function (state, payload) {
    if (payload.ResultObj.BusinessList && payload.ResultObj.BusinessList.length > 0) {
      var loadLength = payload.ResultObj.BusinessList.length
      var currentLength = state.gateResult.BusinessList.length - 1
      if (state.gateResult.BusinessList[currentLength].AutoID < payload.ResultObj.BusinessList[0].AutoID) {
        for (var i = 0; i < loadLength; i++) {
          state.gateResult.BusinessList.push(payload.ResultObj.BusinessList[i])
        }
      }
    } else {
      state.gateResult.NeedGet = false
      return false
    }
  }
}
const action = {
  // 获取结果
  getResult (context, payload) {
    return GetInfo.get({
      actionid: payload.actionid,
      aid: payload.aid,
      bcode: payload.bcode,
      gateid: payload.gateid
    }).then(response => {
      let data = response.data
      // 设置结果
      if (data.Code === 1) {
        context.commit('setResult', data)
        return true
      } else {
        context.commit('setUserInfo', {})
        return false
      }
    })
  },
  getGateInfo (context, payload) {
    return GetInfo.get({
      actionid: payload.actionid
    }).then(response => {
      let data = response.data
      // 设置结果
      if (data.Code === 1) {
        context.commit('setGateInfo', data)
        return true
      } else {
        context.commit('setUserInfo', {})
        return false
      }
    })
  },
  loginUser (context, payload) {
    return GetInfo.post({
      actionid: payload.actionid,
      username: payload.uname,
      password: payload.upassword,
      mobileno: payload.uphone,
      checkno: payload.ucode
    }).then(response => {
      let data = response.data
      if (!GetInfo.checkCode(data.Code)) {
        // 设置结果
        if (data.Code === 1) {
          context.commit('setUserInfo', data)
          return true
        }
      }
    })
  },
  loadMoreResult (context, payload) {
    return GetInfo.get({
      actionid: payload.actionid,
      aid: payload.aid,
      bcode: payload.bcode,
      gateid: payload.gateid
    }).then(response => {
      let data = response.data
      // 设置结果
      if (data.Code === 1) {
        context.commit('setMoreResult', data)
        return true
      } else {
        context.commit('setUserInfo', {})
        return false
      }
    })
  }
}
const store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: action
})
export default store
