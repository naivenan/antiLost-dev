// pages/service/search/search.js
var QQMapWX = require('../../../resources/map/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    suggestion: []
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      suggestion: []
    });
    this.back();
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      suggestion: []
    });
  },
  inputTyping: function (e) {
    var that = this;
    var input = e.detail.value
    this.setData({
      inputVal: input
    });
    qqmapsdk.getSuggestion({
      keyword: input,
      region: this.data.city,
      success: function (res) {
        console.log('success: ' + res);
        that.setData({
          suggestion: res.data
        })
      },
      fail: function (res) {
        console.log('fail: ' + res);
      }
    })
  },
  back: function(){
    wx.navigateBack({
      delta: 1
    })
  },
  search: function(){
    var that = this;
    qqmapsdk.search({
      keyword: that.data.inputVal,
      location: {
        latitude: that.data.latitude,
        longitude: that.data.longitude
      },
      address_format: 'short',
      success: function (res) {
        console.log(res);
        that.setData({
          list: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
    
  },
  accept: function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var place = {};
    var list = that.data.suggestion;
    //查询数据信息
    for (var i = 0; i < list.length; i++) {
      if (id === list[i].id) {
        place = list[i];
        break;
      }
    }
    var param = {
      list: [place],
      //基本的信息
      latitude: that.data.latitude,
      longitude: that.data.longitude,
      //目的地点 基本的信息
      destination: place.location.lng + "," + place.location.lat,
      address: place.address,
      title: place.title
    }
    wx.navigateTo({
      url: '../location/location?param=' + JSON.stringify(param)
    })
  },
  tapItem: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var place = that.findMarkerById(id);
    //跳转传输的值
    var param = {
      list: that.data.list,
      //基本的信息
      latitude: that.data.latitude,
      longitude: that.data.longitude,
      //目的地点 基本的信息
      destination: place.location.lng + "," + place.location.lat,
      address: place.address,
      title: place.title
    }
    wx.navigateTo({
      url: '../location/location?param=' + JSON.stringify(param)
    })

  },
  //根据marker唯一id查询信息
  findMarkerById: function (id) {
    var that = this,
      result = {};
    var list = that.data.list;
    //查询数据信息
    for (var i = 0; i < list.length; i++) {
      if (id === list[i].id) {
        result = list[i];
        break;
      }
    }
    return result;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('page search onLoad...');
    var that = this;
    if(!qqmapsdk){
      qqmapsdk = new QQMapWX({
        key: '3KEBZ-JPSWK-YBMJ2-APKZH-TRNN3-F5BSB'
      });
    }
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        if (options.input) {
          that.setData({
            inputVal: options.input
          })
          that.search();
        }
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