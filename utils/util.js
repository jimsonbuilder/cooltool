const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 热门城市
const hotCitys = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '成都',
  '南京',
  '天津',
  '武汉',
  '佛山',
  '大连',
  '青岛',
  '重庆',
  '香港',
  '澳门',
  '台北',
  '苏州',
  '青岛',
  '西安',
  '南宁',
  '桂林',
  '长沙',
  '沈阳',
  '郑州',
  '三亚',
  '海口',
  '合肥',
  '长春',
  '济南',
  '厦门'
]

module.exports = {
  formatTime: formatTime,
  hotCitys: hotCitys
}