// import Vue from 'vue'
import axios from 'axios'
// import router from '../router'
import qs from 'qs'

var code = ''
const userToken = 'XX-Token'
async function getToken() {
  let token = localStorage.getItem(userToken)
  if (token === 'undefined' || token === null || token === '') {
    return getCode('')
  }
  return token
}

function setItem(key, value) {
  localStorage.setItem(key, value)
}

/**
 * 非静默授权，第一次有弹框
 */
function getCode(o) {
  // 非静默授权，第一次有弹框
  code = ''
  let local = window.location.href // 获取页面url
  local = local.split('//')
  console.log(local[1])
  code = getUrlCode().code // 截取code
  if (o === '-1') {
    code = ''
    local[1] = window.location.host
  }
  if (code == null || code === '' || code === undefined) {
    // 如果没有code，则去请求
    window.location.href =
      'https://gxrswx.healthan.net/access/home/getGxrswxCode?code_redirect_uri=' +
      'https://' +
      local[1]
  } else {
    /**
     * 获取Token
     */
    return getTokens()
  }
}

/**
 * 截取url中的code方法
 */
function getUrlCode() {
  var url = location.search
  // this.winUrl = url
  var theRequest = {}
  if (url.indexOf('?') !== -1) {
    var str = url.substr(1)
    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
    }
  }
  return theRequest
}

async function getTokens() {
  // let token = localStorage.getItem('Zp-Token') || ''
  let data = qs.stringify({
    code: code,
  })
  let isSuccess = false
  await axios({
    method: 'POST',
    url: 'https://api-gxrswx.healthan.net/api/gxrswx/login/getToken',
    data: data,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Zp-Token': token,
    },
  })
    .then(res => {
      if (res.data.code === 0) {
        setItem('XX-Token', res.data.data.token)
        // console.log(res)
        isSuccess = true
      }
      if (res.data.code === 1005) {
        location.href = res.data.data.url
      }
    })
    .catch(res => {
      console.log(res)
    })
  return isSuccess
}
export default {
  getToken: getToken,
  setToken: setItem,
}
