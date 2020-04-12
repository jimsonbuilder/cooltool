//index.js
// 导入工具类
const hotCitys = require('../../utils/util').hotCitys
//获取应用实例
const app = getApp()
// 导入网络请求封装
const httpService = require('../../network/service')
// 图片地址
const imgPath = [
  '../../images/sun.png',
  '../../images/cloud.png',
  '../../images/raining.png',
  '../../images/cloud_fog.png'
]

Page({
  data: {
    temperatureData: {},
    temperatureImg: '',
    userInfo: {},
    hotCitys: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  // 输入城市搜索
  onBindBlur:function(event){
    this.getTemperature(event.detail.value)
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 城市选择器选择改变触发
  onbindchange: function (event) {
    this.getTemperature(hotCitys[event.detail.value])
  },
  onLoad: function () {
    this.setData({
      hotCitys: hotCitys
    })

    this.getTemperature('深圳')

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 获取天气信息
  getTemperature:function(data){
    let _this = this
    httpService.getTemperature(data).then(res => {
      this.setData({
        temperatureData: res.data,
        temperatureImg: _this.pickTheImg(res.data['results'][0].now.text)
      })
    }).catch(err => {
      wx.showToast({
        title: '获取天气信息失败！',
        icon: 'none',
        duration: 3000
      })
    })
  },
  // 根据不同天气显示不同图片
  pickTheImg: function (temperature) {
    if (['晴'].indexOf(temperature) != -1) {
      this.setData({
        temperatureImg: imgPath[0]
      })
    }
    if (['多云', '阴'].indexOf(temperature) != -1) {
      this.setData({
        temperatureImg: imgPath[1]
      })
    }
    if (['小雨','大雨','中雨'].indexOf(temperature) != -1) {
      this.setData({
        temperatureImg: imgPath[2]
      })
    }
    if (['雾','大雾','中雾'].indexOf(temperature) != -1) {
      this.setData({
        temperatureImg: imgPath[3]
      })
    }
  }
})