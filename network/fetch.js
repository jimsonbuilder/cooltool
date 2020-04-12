let fetch = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url || '',
      method: options.method || 'GET',
      data: options.data || '',
      header: options.header || {
        'content-type': 'application/json' // 默认为json
      },
      dataType:options.dataType || 'json',
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  fetch: fetch
}