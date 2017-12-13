// pages/login/login.js
var app = getApp();
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: 'naive',
    pswd: '123',
    formId: null,
  },
  register: function () {
    wx.navigateTo({
      url: '../reg/reg'
    })
  },
  wxlogin: function() {
    util.showBusy('请求中...')
    var that = this,userinfo = null;
    var options = {
      url: config.service.requestUrl,
      login: true,
      success(result) {
        util.showSuccess('请求成功完成')
        console.log('request success', result)
        wx.request({
          url: config.service.wxlogin,
          data: {
            user: result.data.data.openId,
            name: result.data.data.nickName,
            sex: result.data.data.gender==1?'男':'女',
            imgUrl: result.data.data.avatarUrl
          },
          success: function (res) {
            var data = res.data.data;
            console.log(data);
            if (data.state == 'success') {
              userinfo = data.userinfo
              app.globalData.userinfo = userinfo;
              wx.switchTab({
                url: '../appindex/index',
              });
            } else {
              util.showModel('登录失败', data.errMessage);
            }
          }
        })

      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    // 使用 qcloud.request 带登录态登录，可以获取到openId作为用户名
    qcloud.request(options);
  },
  login: function (e) {
    console.log('login...');
    console.log('user: ' + this.data.user);
    console.log('pswd: ' + this.data.pswd);
    var valid = this.confirm(this.data.user,this.data.pswd);
    if(!valid){
      util.showModel('登录失败', '请输入账号密码');
      return
    }
    wx.request({
      url: config.service.userlogin,
      data: {
        user: this.data.user,
        pswd: this.data.pswd
      },
      success: function (res) {
        var data = res.data.data;
        console.log(data);
        if(data.state == 'success'){
          app.globalData.userinfo = data.userinfo;
          wx.switchTab({
            url: '../appindex/index',
          });
        }else{
          util.showModel('登录失败', data.errMessage);
        }
      }
    })
  },
  confirm: function (user, pswd) {
    if (user && pswd) {
      return true;
    } else {
      return false;
    }
  },
  userInput: function (e) {
    this.setData({
      user: e.detail.value
    })
  },
  pswdInput: function (e) {
    this.setData({
      pswd: e.detail.value
    })
  },
  formSubmit: function (e) {
    this.setData({
      formId: e.detail.formId
    })
    console.log(e);
    console.log('formId: '+e.detail.formId);
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
    wx.clearStorage();
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