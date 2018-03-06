// pages/user/user.js
var app = getApp();
var config = require('../../config');
var util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    today: util.formatTime(new Date()).substring(0, 11).replace(/\//g, '-'),
    sexArray: ['男','女']
  },

  logout: function () {
    wx.clearStorage();
    this.setData({
      user: null
    })
    console.log('logout... user: ' + this.data.user);
    wx.switchTab({
      url: '../location/location',
      success: function () {
        var page = getCurrentPages()[0];
        page.onUnload();
        wx.switchTab({
          url: '../appindex/index',
          success: function(){
            wx.redirectTo({
              url: '../login/login'
            })
          }
        })
      }
    })
  },

  bindDateChange: function(e){
    var user = this.data.user;
    user.birthday = e.detail.value;
    app.globalData.userinfo = user;
    this.setData({
      user: user
    })
    this.update(user);
  },

  bindSexChange: function (e) {
    var user = this.data.user;
    user.sex = this.data.sexArray[e.detail.value];
    app.globalData.userinfo = user;
    this.setData({
      user: user
    })
    this.update(user);
  },

  doUpload: function () {
    var that = this

    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]

        // 上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',

          success: function (res) {
            util.showSuccess('上传图片成功')
            console.log('doUpload:')
            console.log(res)
            var response = JSON.parse(res.data)
            console.log('response:');
            console.log(response)
            var user = that.data.user;
            user.imgUrl = response.data.imgUrl;
            app.globalData.userinfo = user;
            that.setData({
              user: user 
            })
            that.update(user);
          },

          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })

      },
      fail: function (e) {
        console.error(e)
      }
    })
  },

  update: function(user){
    wx.request({
      url: config.service.userUpdate,
      data: {
        id: user.id,
        mphone: user.mphone,
        birthday: user.birthday
      },
      success: res => {
        console.log(res);
      },
      fail: res => {
        util.showModel('设置失败','请重新设置');
      }
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
      user: app.globalData.userinfo
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