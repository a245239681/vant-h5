import http from '@/utils/http'

/**获取参保地 */
export async function getAddress() {
  return await http.postRequest('/api/gxrswx/Personal/addrList', {})
}
/**手机号验证 */
export function isMobileNumber(mobile) {
  let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return !reg.test(mobile)
}
