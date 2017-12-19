// pages/service/service.js
var QQMapWX = require('../../resources/map/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    services: [{ title: '美食', img: '../../images/icon/food.png' },
      { title: '酒店', img: '../../images/icon/hotel.png' },
      { title: '银行', img: '../../images/icon/bank.png' },
      { title: '公交站', img: '../../images/icon/bus.png' },
      { title: '地铁站', img: '../../images/icon/subway.png' },
      { title: '加油站', img: '../../images/icon/gas.png' },
      { title: '医院', img: '../../images/icon/hospital.png' },
      { title: '药店', img: '../../images/icon/drug.png' },
      { title: '超市', img: '../../images/icon/market.png' }]
  },
  search: function () {
    wx.navigateTo({
      url: './search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: '3KEBZ-JPSWK-YBMJ2-APKZH-TRNN3-F5BSB'
    });
    /*
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res);
            console.log('city: ' + res.result.ad_info.city);
            that.setData({
              city: res.result.ad_info.city
            })
          },
          fail: function (res) {
            console.log(res);
          }
        });

      }
    })
    */
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