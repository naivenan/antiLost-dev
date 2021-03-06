//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
    var that = this;
    qcloud.setLoginUrl(config.service.loginUrl)
    wx.getSystemInfo({
      success: function(res) {
        console.log('wx.getSystemInfo:');
        console.log(res);
        that.globalData.system = res.system.split(' ')[0];
      },
    })
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: config.service.code2session,
    //         data: {
    //           code: res.code
    //         },
    //         success: res => {
    //           var data = res.data.data;
    //           var result = JSON.parse(data);
    //           console.log('openid: '+result.openid);
    //           that.globalData.openid = result.openid;
    //           wx.setStorage({
    //             key: 'session',
    //             data: result.session_key,
    //           })
    //         }
    //       })
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // })

  },
  globalData: {
    userinfo: {},
    olderList: [],
    alertList: [],
  }
})