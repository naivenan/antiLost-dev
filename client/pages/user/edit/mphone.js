// pages/user/edit/wx.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    token: ''
  },
  input: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  inputToken: function (e) {
    this.setData({
      token: e.detail.value
    })
  },
  getToken: function () {
    var tk = Math.round(Math.random() * 1000000);
    this.setData({
      token: tk
    })
  },
  back: function () {
    this.done();
  },
  done: function () {
    var that = this;
    var pages = getCurrentPages();
    console.log('pages: ' + pages);
    var parent = pages[0];
    var user = parent.data.user;
    user.mphone = that.data.inputValue;
    app.globalData.userinfo = user;
    parent.update(user);
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      inputValue: options.mphone
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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