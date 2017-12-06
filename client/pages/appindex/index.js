//index.js
//获取应用实例
const app = getApp();
var wsURL = 'wss://jd.yuandax.com/websocket',
    socketOpen = false;

Page({
  data: {
    user: null,
    olderList: [],
    alertList: [
      { id: 1, pic: '../../images/icon/user.png', name: '老大', desc: '摔倒了！' },
      { id: 2, pic: '../../images/icon/user.png', name: '老二', desc: '摔倒了！' },
    ],
  },
  //事件处理函数
  bindUser: function () {
    wx.navigateTo({
      url: '../bindUser/bindUser'
    })
  },
  deleteUser: function () {
    wx.navigateTo({
      url: '../deleteUser/deleteUser'
    })
  },
  refresh: function () {
    this.getOlderList();
    this.getAlertList();
  },

  onLoad: function () {
    console.log('pages/appindex/index onLoad...');
    /*
    //建立连接
    wx.connectSocket({
      url: wsURL
    })
    
    //连接成功
    wx.onSocketOpen(function () {
      console.log('websocket连接成功！');
    })

    //接收数据
    wx.onSocketMessage(function (data) {
      console.log(data);
      this.setData({
        alertList: data
      })
    })

    //连接失败 
    wx.onSocketError(function () {
      console.log('websocket连接失败！');
    })
    */
  },

  getOlderList: function (param) {
    var that = this;
    wx.request({
      url: 'https://cjt9xe52.qcloud.la/weapp/olderlist',
      data: {
        uid: that.data.user.id
      },
      success: function (res) {
        console.log(res.data);
        var list = res.data.data;
        app.globalData.olderList = list;
        wx.setStorageSync('olderlist', res.data.data);
        that.setData({
          olderList: list
        })
      }
    })
    
  },

  getAlertList: function (param) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady...');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow...');
    console.log('globalData.userinfo: ' + app.globalData.userinfo);
    this.setData({
      user: app.globalData.userinfo
    })
    this.getOlderList();
    this.getAlertList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide...');
    // wx.closeSocket();
    // wx.onSocketClose(function (res) {
    //   console.log('WebSocket 已关闭！')
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload...');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
