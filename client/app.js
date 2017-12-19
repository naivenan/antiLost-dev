//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
    var that = this;
    qcloud.setLoginUrl(config.service.loginUrl)
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        that.globalData.system = res.system.split(' ')[0];
      },
    })
  },
  globalData: {
    userinfo: {},
    olderList: [],
    alertList: [],
  }
})