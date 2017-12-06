//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },
  globalData: {
    userInfo: null,
    olderList: [],
    alertList: [
      { id: 1, pic: '../../images/icon/user.png', name: '老大', desc: '摔倒了！' },
      { id: 2, pic: '../../images/icon/user.png', name: '老二', desc: '摔倒了！' },
    ],
  }
})