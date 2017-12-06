// pages/bindUser/bindUser.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
  },

  userInput: function (e) {
    this.setData({
      user: e.detail.value
    })
  },

  sendApply: function () {
    var that = this;
    var user = this.data.user
    console.log('user: ' + user);
    if (user != null && user != '') {
      wx.showToast({
        title: '申请成功',
      })
      wx.request({
        url: 'https://cjt9xe52.qcloud.la/weapp/addolder',
        data: {
          uid: that.data.uid,
          name: user
        },
        success: function (res) {
          console.log(res.data);
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请输入用户名或手机号',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      uid: app.globalData.userinfo.id
    })
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