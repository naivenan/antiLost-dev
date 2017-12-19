// 引入SDK核心类
var amapFile = require('../../resources/map/amap-wx.js');
var amapInstance;
var config = require('../../config.js')
//获取应用实例
var app = getApp()
Page({
  //数据信息
  data: {
    user: {},
    markers: [],
    longitude: 0,
    latitude: 0,
    distance: '',
    cost: '',
    polyline: [],
    includePoints:[],
    origin: null,
    destination: null,
    briefAddr: null,
    olderName: null,
    navigateImag: "../../images/ios7-navigate.png"
  },
  getOlderLocation: function () {
    var that = this;
    wx.request({
      url: config.service.location,
      data: {
        uid: that.data.user.id
      },
      success: res => {
        that.setData({
          list: res.data.data
        })
        if (res.data.data.length>0){
          that.init()
        }
      }
    })
  },
  init: function () {
    var that = this;
    var list = this.data.list,
      //中心点位置
      latitude = this.data.latitude,
      longitude = this.data.longitude;
    var result = [], include = [];
    include.push({
      latitude: latitude,
      longitude: longitude,
    })
    //数据组装
    list.forEach(function (item, index) {
      result.push({
        width: 40,
        height: 40,
        iconPath: "../../images/marker.png",
        id: item.id,
        latitude: item.lat,
        longitude: item.lng,
        briefAddr: item.addr,
        olderName: item.name,
        label: {
          content: item.name
        }
      })
      include.push({
        latitude: item.lat,
        longitude: item.lng
      })
    });
    //赋值
    that.setData({
      markers: result,
      includePoints: include
    });
  },
  //点击marker事件
  doMarkertap: function (obj) {
    var that = this;
    //查询marker的详细信息
    var marker = that.getMarkerById(obj.markerId);
    that.doWalkingRoute(marker.longitude + "," + marker.latitude);
    that.setData({
      briefAddr: marker.briefAddr,
      olderName: marker.olderName
    });
  },
  //进行路径规划
  doWalkingRoute: function (destination) {
    var that = this;
    //设置详细路径需要的值
    that.setData({
      destination: destination
    });
    //调用高德地图路径规划
    amapInstance.getWalkingRoute({
      origin: that.data.origin,
      destination: destination,
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + ' 米'
          });
        }
        if (data.paths[0] && data.paths[0].duration) {
          that.setData({
            cost: parseInt(data.paths[0].duration / 60) + ' 分钟'
          });
        }
      },
      fail: function (info) {
      }
    })

  },
  //根据marker的id获取详情信息
  getMarkerById: function (id) {
    var that = this;
    var markers = that.data.markers;
    var len = markers.length;
    var result;
    for (var i = 0; i < len; i++) {
      if (markers[i]["id"] === id) {
        result = markers[i];
        break;
      }
    }
    return result;
  },
  //详细的路径规划
  goDetail: function () {
    var that = this;
    //跳转传输的值
    var param = {
      origin: that.data.origin,
      destination: that.data.destination,
    }
    //设置点击图片效果
    that.setData({
      navigateImag: "../../images/ios7-navigate-click.png"
    });
    //修改点击状态
    setTimeout(function () {
      that.setData({
        navigateImag: "../../images/ios7-navigate.png"
      });
      wx.navigateTo({
        url: '../location-detail/location?param=' + JSON.stringify(param)
      })
    }, 200);
  },

  //页面加载事件
  onLoad: function (option) {
    var that = this;
    that.setData({
      user: app.globalData.userinfo,
      briefAddr: '请点击目标位置查询路线',
      olderName: '提示',
    })
    //初始化地图接口实例
    amapInstance = new amapFile.AMapWX({ key: 'cd17f895f7d70ef688f4bf600e067a8e' });
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log('latitude: ' + latitude);
        console.log('longitude: ' + longitude);
        console.log(res.accuracy);
        //设置经纬度值
        that.setData({
          latitude: latitude,
          longitude: longitude,
          origin: longitude + ',' + latitude
        });
        that.getOlderLocation();
      }
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
