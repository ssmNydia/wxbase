/**
 * 日期的常用方法
 */

/**
 * 格式化日期
 * fmt 格式化要求
 * 默认格式 y/m/d h:i
 * y 年    yy 补零的年
 * m 月    mm 补零的月
 * d 日    dd 补零的日
 * h 小时  hh 补零的小时
 * i 分钟  ii 补零的分钟
 * s 秒    ss 补零的秒
 */
exports.format = (date, fmt = 'y/m/d h:i') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const [ yy, mm, dd, hh, ii, ss ] = [year, month, day, hour, minute, second].map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  })
  const obj = {
    y: year,
    m: month,
    d: day,
    h: hour,
    i: minute,
    s: second,
    yy,
    mm,
    dd,
    hh,
    ii,
    ss
  }
  return fmt.replace(/[ymdhis]/g, function (v) {
    return obj[v]
  })
}

/**
 * 距离date过去了多久
 * N[天、小时、分钟、秒]前
 */
exports.countdownDate = (date) => {
  const now = new Date()
  const diff = now - date
  const d = Math.floor(diff / 86400000)
  const leave1 = diff % 86400000
  const h = Math.floor(leave1 / 3600000)
  const leave2 = leave1 % 3600000
  const m = Math.floor(leave2 / 60000)
  const leave3 = leave2 % 60000
  const s = Math.floor(leave3 / 1000)
  const k = ['天', '小时', '分钟', '秒']
  // 返回规则 最大的单位有值则只返回最大单位
  let time = ''
  if (d !== 0 && d > 0) {
    time = d + k[0]
  } else if (h !== 0 && h > 0) {
    time = h + k[1]
  } else if (m !== 0 && m > 0) {
    time = m + k[2]
  } else if (s !== 0 && s > 0) {
    time = s + k[3]
  }
  return time
}