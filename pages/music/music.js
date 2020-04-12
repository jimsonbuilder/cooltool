// pages/music.js
// 导入网络请求封装
const httpService = require('../../network/service')
// 播放器创建
const audioPlayer = wx.createInnerAudioContext()
// timer
let timer = null

Page({
  /**
   * 页面的初始数据
   */
  data: {
    songInfo: {},
    selectedSongInfo: {},
    tokenInfo: {},
    isPlay: false,
    url: '',
    currentValue: 0,
    currentTime: '',
    allTime: '',
    allValue: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  // 歌曲、歌手搜索
  onBindBlur: function (event) {
    this.getSongInfo(event.detail.value)
  },
  // 搜索歌曲
  getSongInfo: function (songName) {
    httpService.getSongInfo(songName).then(res => {
      let tempStr = res.data.split('callback(')[1]
      tempStr = tempStr.substring(0, tempStr.length - 1)
      // console.log(JSON.parse(tempStr).data)
      this.setData({
        songInfo: JSON.parse(tempStr).data
      })
    }).catch(err => {
      wx.showToast({
        title: '搜索歌曲失败！',
        icon: 'none',
        duration: 3000
      })
    })
  },
  // 点击听歌
  onClickToListen: function (event) {
    this.setData({
      selectedSongInfo: event.currentTarget.dataset.song,
      isPlay: true
    })
    this.getToken(event.currentTarget.dataset.song.songmid)
  },
  // 获取token
  getToken: function (songmid) {
    httpService.getToken(songmid).then(res => {
      this.setData({
        tokenInfo: res.data.data.items[0]
      })
      // 获取到token再执行获取地址的函数
      this.getSongPlayAddress(this.data.tokenInfo)
      this.playSong(this.data.url)
    }).catch(err => {
      wx.showToast({
        title: '获取token出错！',
        icon: 'none',
        duration: 3000
      })
    })
  },
  // 获取音乐播放地址
  getSongPlayAddress: function (options) {
    this.setData({
      url: httpService.getSongPlayAddress(options)
    })
  },
  // 播放歌曲
  playSong: function (url) {
    clearInterval(timer)
    this.setData({
      isPlay: true
    })
    if (url && this.data.tokenInfo.vkey) {
      // 播放
      audioPlayer.src = this.data.url
      audioPlayer.volume = 0.4
      audioPlayer.loop = true
      audioPlayer.play()
      timer = setInterval(() => {
        this.setData({
          currentValue: Math.floor(audioPlayer.currentTime),
          currentTime: this.format(audioPlayer.currentTime),
          allTime: this.format(audioPlayer.duration),
          allValue: Math.floor(audioPlayer.duration)
        })
        if (Math.floor(audioPlayer.currentTime) > 0 && Math.floor(audioPlayer.currentTarget) >= Math.floor(audioPlayer.duration)) {
          clearInterval(timer)
        }
      }, 1000);
    } else {
      // 停止
      audioPlayer.stop()
      this.setData({
        isPlay: false
      })
      wx.showToast({
        title: '音源出错！',
        icon: 'none',
        duration: 3000
      })
    }
    // 音乐播放失败监听方法
    audioPlayer.onError(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 3000
      })
    })
  },
  // 暂停播放
  pauseSong: function () {
    clearInterval(timer)
    this.setData({
      isPlay: false,
      currentValue: Math.floor(audioPlayer.currentTime)
    })
    audioPlayer.pause()
    // 音乐播放失败监听方法
    audioPlayer.onError(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 3000
      })
    })
  },
  // 滑动选择器滑动
  onBindSliderChange: function (e) {
    // console.log(e)
  },

  // 时间格式化
  format: function (t) {
    let time = Math.floor(t / 60) >= 10 ? Math.floor(t / 60) : '0' + Math.floor(t / 60);
    t = time + ':' + ((t % 60) / 100).toFixed(2).slice(-2);
    return t;
  }
})