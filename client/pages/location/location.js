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
    includePoints: [],
    origin: null,
    destination: null,
    briefAddr: '',
    olderName: '',
    title: '',
    list: [],
    steps: [],    
    navigateImag: "../../images/ios7-navigate.png",
    viewclass: ['flex-item active', 'flex-item', 'flex-item'],
    active: 0
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
        that.init();
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
    var alertList = app.globalData.alertList;
    list.forEach(function (item, index) {
      result.push({
        width: 20,
        height: 20,
        iconPath: that.exist(alertList, item) ? "../../images/marker_alert.png" : "../../images/marker.png",
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
  exist: function (array, item) {
    var flag = false;
    array.forEach(function (o, i) {
      if (o.uid == item.id) {
        flag = true;
      }
    })
    return flag;
  },
  //点击marker事件
  doMarkertap: function (obj) {
    var that = this;
    //查询marker的详细信息
    var marker = that.getMarkerById(obj.markerId);
    that.doRoute(marker.longitude + "," + marker.latitude);
    that.setData({
      briefAddr: marker.briefAddr,
      olderName: marker.olderName
    });
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
  //进行路径规划
  doRoute: function (destination) {
    var that = this;
    //设置详细路径需要的值
    that.setData({
      destination: destination
    });
    //调用高德地图路径规划
    switch (that.data.active) {
      case 0: that.goToCar(); break;
      case 1: that.goToWalk(); break;
      case 2: that.goToRide(); break;
      default: that.goToCar(); break;
    }
  },
  goToCar: function () {
    var that = this;
    that.setData({
      viewclass: ['flex-item active', 'flex-item', 'flex-item'],
      active: 0
    })
    if (!that.data.destination) {
      return
    }
    amapInstance.getDrivingRoute({
      origin: that.data.origin,
      destination: that.data.destination,
      success: function (data) {
        callback(data, that);
      },
      fail: function (info) {
      }
    })
  },
  goToWalk: function () {
    var that = this;
    that.setData({
      viewclass: ['flex-item', 'flex-item active', 'flex-item'],
      active: 1
    })
    if (!that.data.destination) {
      return
    }
    amapInstance.getWalkingRoute({
      origin: that.data.origin,
      destination: that.data.destination,
      success: function (data) {
        callback(data, that);
      },
      fail: function (info) {
      }
    })
  },
  goToRide: function () {
    var that = this;
    that.setData({
      viewclass: ['flex-item', 'flex-item', 'flex-item active'],
      active: 2
    })
    if (!that.data.destination) {
      return
    }
    amapInstance.getRidingRoute({
      origin: that.data.origin,
      destination: that.data.destination,
      success: function (data) {
        callback(data, that);
      },
      fail: function (info) {
      }
    })
  },
  //详细的路径规划
  goDetail: function () {
    var that = this;
    //跳转传输的值
    var param = {
      origin: that.data.origin,
      destination: that.data.destination,
      steps: that.data.steps
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
          user: app.globalData.userinfo,
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
    this.setData({
      user: {},
      markers: [],
      longitude: 0,
      latitude: 0,
      distance: '',
      cost: '',
      polyline: [],
      includePoints: [],
      origin: null,
      destination: null,
      briefAddr: null,
      olderName: null,
      title: '',
      list: [],
      steps: [],
      navigateImag: "../../images/ios7-navigate.png",
      viewclass: ['flex-item active', 'flex-item', 'flex-item'],
      active: 0
    })
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

function callback(data, that) {
  var points = [];
  if (data.paths && data.paths[0] && (data.paths[0].steps || data.paths[0].rides)) {
    var steps = data.paths[0].steps || data.paths[0].rides;
    that.setData({
      steps: steps
    })
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
  var suf = '', active = that.data.active;
  if (data.paths[0] && data.paths[0].distance) {
    suf += ' ' + data.paths[0].distance + '米';
    that.setData({
      distance: data.paths[0].distance + '米'
    });
  }
  if (data.paths[0] && data.paths[0].duration) {
    suf += ' 花费' + parseInt(data.paths[0].duration / 60) + '分钟';
    that.setData({
      cost: parseInt(data.paths[0].duration / 60) + '分钟',
      title: suf
    });
  }
  if (data.taxi_cost) {
    suf += ' 打车约' + parseInt(data.taxi_cost) + '元'
    that.setData({
      cost: '打车约' + parseInt(data.taxi_cost) + '元',
      title: suf
    });
  }
}