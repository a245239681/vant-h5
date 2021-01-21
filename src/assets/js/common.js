function getAnalysisIdCard(card, num) {
  if (num == 1) {
    //获取出生日期
    let birth =
      card.substring(6, 10) +
      '-' +
      card.substring(10, 12) +
      '-' +
      card.substring(12, 14)
    return birth
  }
  if (num == 2) {
    //获取性别
    if (parseInt(card.substr(16, 1)) % 2 == 1) {
      //男
      return '男'
    } else {
      //女
      return '女'
    }
  }
  if (num == 3) {
    //获取年龄

    var myDate = new Date()

    var month = myDate.getMonth() + 1

    var day = myDate.getDate()

    var age = myDate.getFullYear() - card.substring(6, 10) - 1

    if (
      card.substring(10, 12) < month ||
      (card.substring(10, 12) == month && card.substring(12, 14) <= day)
    ) {
      age++
    }

    return age
  }
}
/**
 * 比较日期 参数为string或者date类型
 * return number >0 则是大于0 等于0等于0 -1小于0
 */
function comopareDate(date1, date2) {
  /**
   * 如果是date类型就直接比较，如果不是就转成string
   */
  console.log(date1, date2)
  const comparedate1 =
    typeof date1 === 'string' ? dateParse(date1.toString()) : date1

  const comparedate2 =
    typeof date2 === 'string' ? dateParse(date2.toString()) : date2

  if (comparedate1.getTime() > comparedate2.getTime()) {
    return 1
  } else if (comparedate1.getTime() === comparedate2.getTime()) {
    return 0
  } else {
    return -1
  }
}

/**
 * 日期解析，字符串转日期
 * @param dateString 可以为2020-02-16，2020/02/16，2020.02.16
 */
function dateParse(dateString) {
  const SEPARATOR_BAR = '-'
  const SEPARATOR_SLASH = '/'
  const SEPARATOR_DOT = '.'
  let dateArray
  if (dateString.indexOf(SEPARATOR_BAR) > -1) {
    dateArray = dateString.split(SEPARATOR_BAR)
  } else if (dateString.indexOf(SEPARATOR_SLASH) > -1) {
    dateArray = dateString.split(SEPARATOR_SLASH)
  } else {
    dateArray = dateString.split(SEPARATOR_DOT)
  }
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
}
export default {
  getAnalysisIdCard: getAnalysisIdCard,
  comopareDate: comopareDate,
}
