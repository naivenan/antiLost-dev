// pages/login/login.js
var app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    pswd: null,
    formId: null,
  },
  reset: function () {
    app.globalData.olderList = [
      { name: '老大' }, { name: '老二' }, { name: '老三' }, { name: '老四' }, { name: '老五' },
      { name: '小六' }, { name: '小七' },
    ];
  },
  register: function () {
    wx.navigateTo({
      url: '../reg/reg'
    })
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
      url: 'https://cjt9xe52.qcloud.la/weapp/userlogin',
      data: {
        user: this.data.user,
        pswd: this.data.pswd
      },
      success: function (res) {
        var data = res.data.data;
        console.log(data);
        if(data.state == 'success'){
          app.globalData.userinfo = data.userinfo;
          wx.setStorageSync('userinfo', data.userinfo);
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