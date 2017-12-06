//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },
  globalData: {
    userInfo: null,
    olderList: [
      { id: 1, name: '老大' }, { id: 2, name: '老二' }, { id: 3, name: '老三' }, { id: 4, name: '老四' }, { id: 5, name: '老五' }, { id: 6, name: '小六' }, { id: 7, name: '小七' },
    ],
    alertList: [
      { id: 1, pic: '../../images/icon/user.png', name: '老大', desc: '摔倒了！' },
      { id: 2, pic: '../../images/icon/user.png', name: '老二', desc: '摔倒了！' },
    ],
  }
})