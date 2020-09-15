import Vue from 'vue'
import axios from 'axios'
import indexjs from '@/config/index.js'
import qs from 'qs'
import { Toast } from 'vant'
Vue.use(Toast)
const apiurl = indexjs.apiurl
function ajaxPost(url, params, callfunc, async) {
  let userToken = getToken() || ''
  const loadings = Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  })
  axios({
    method: 'POST',
    url: apiurl + url,
    data: qs.stringify(params),
    withCredentials: async,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'XX-Token': userToken,
    },
  })
    .then(function(result) {
      if (callfunc) {
        callfunc(result)
        loadings.clear()
      }
    })
    .catch(function() {
      loadings.clear()
      Toast('系统异常,请重试!')
    })
}

function getToken() {
  return localStorage.getItem('XX-Token')
}

export default {
  postJson: function(url, params) {
    let call = arguments[2] || null
    let asyncAjax = arguments[3] || false
    ajaxPost(url, params, call, asyncAjax)
  },
}
