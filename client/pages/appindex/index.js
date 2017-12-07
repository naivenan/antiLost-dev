//index.js
//获取应用实例
var app = getApp();
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

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
    this.openTunnel();
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

  openTunnel: function () {
    util.showBusy('信道连接中...')
    // 创建信道，需要给定后台服务地址
    var tunnel = this.tunnel = new qcloud.Tunnel(config.service.alertTunnelUrl)

    // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
    tunnel.on('connect', () => {
      util.showSuccess('警报信道已连接')
      console.log('WebSocket 警报信道已连接')
      this.setData({ tunnelStatus: 'connected' })
    })

    tunnel.on('close', () => {
      util.showSuccess('警报信道已断开')
      console.log('WebSocket 警报信道已断开')
      this.setData({ tunnelStatus: 'closed' })
    })

    tunnel.on('reconnecting', () => {
      console.log('WebSocket 警报信道正在重连...')
      util.showBusy('警报信道正在重连')
    })

    tunnel.on('reconnect', () => {
      console.log('WebSocket 警报信道重连成功')
      util.showSuccess('警报信道重连成功')
    })

    tunnel.on('error', error => {
      util.showModel('警报信道发生错误', error)
      console.error('警报信道发生错误：', error)
    })

    // 监听自定义消息（服务器进行推送）
    tunnel.on('alert', alert => {
      util.showModel('信道消息', alert)
      console.log('收到说话消息：', alert)
      wx.setStorage({
        key: 'alert',
        data: alert,
      })
    })

    // 打开信道
    tunnel.open()

    this.setData({ tunnelStatus: 'connecting' })
  },

  /**
   * 点击「发送消息」按钮，测试使用信道发送消息
   */
  sendMessage() {
    if (!this.data.tunnelStatus || !this.data.tunnelStatus === 'connected') return
    // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
    if (this.tunnel && this.tunnel.isActive()) {
      // 使用信道给服务器推送「speak」消息
      this.tunnel.emit('speak', {
        'word': 'I say something at ' + new Date(),
      });
    }
  },

  /**
   * 点击「关闭信道」按钮，关闭已经打开的信道
   */
  closeTunnel() {
    if (this.tunnel) {
      this.tunnel.close();
    }
    util.showBusy('警报信道关闭中...')
    this.setData({ tunnelStatus: 'closed' })
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
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload...');
    this.closeTunnel();
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
