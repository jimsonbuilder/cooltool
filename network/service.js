const fetch = require('./fetch').fetch;
const API = require('./api');

// 获取天气信息
const getTemperature = (city) => {
  return fetch({
    url: API.TEMPERATURE,
    data: {
      key: '4r9bergjetiv1tsd',
      location: city || 'shenzhen',
      // ts:'1584861674',
      unit: 'c'
    }
  })
}

// 获取歌曲
const getSongInfo = (songName) => {
  return fetch({
    url: API.MUSIC_GET_SONG,
    data: {
      aggr: 1,
      cr: 1,
      flag_qc: 0,
      p: 1, //页数
      n: 30, //每一页条数
      w: songName //搜索关键字
    }
  })
}
// 获取封面
const getCover = (albumid) => {
  return API.MUSIC_GET_COVER + albumid + '_0.jpg'
}
// 获取token
const getToken = (songmid) => {
  return fetch({
    url: API.MUSIC_GET_TOKEN,
    data: {
      format: 'json205361747',
      platform: 'yqq',
      cid: 205361747,
      songmid: songmid,
      filename: 'C400' + songmid + '.m4a',
      guid: 126548448
    }
  })
}
// 获取音乐播放地址
const getSongPlayAddress = (options) => {
  return API.MUSIC_GET_PLAY_ADDRESS + options.filename + '?fromtag=0&guid=126548448&vkey=' + options.vkey
}

module.exports = {
  getTemperature: getTemperature,
  getSongInfo: getSongInfo,
  getCover: getCover,
  getToken: getToken,
  getSongPlayAddress: getSongPlayAddress
}