// pages/user/edit/name.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: ''
  },
  input: function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  back: function(){
    var that = this;
    var pages = getCurrentPages();
    console.log('pages: ' + pages);
    var parent = pages[0];
    var userinfo = parent.data.userinfo;
    userinfo.name = that.data.inputValue;
    parent.setData({
      userinfo: userinfo
    })
    wx.navigateBack({
      delta: 1
    })
  },
  done: function () {
    var that = this;
    var pages = getCurrentPages();
    console.log('pages: ' + pages);
    var parent = pages[0];
    var userinfo = parent.data.userinfo;
    userinfo.name = that.data.inputValue;
    parent.setData({
      userinfo: userinfo
    })
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      inputValue: options.name
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