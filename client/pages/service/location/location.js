// 引入SDK核心类
var amapFile = require('../../../resources/map/amap-wx.js');
var amapInstance;
//获取应用实例
var app = getApp()
Page({
  //数据信息
  data: {
    markers: [],
    controls: [{
      id: 1,
      iconPath: '../../../images/icon/back.png',
      position: {
        left: 0,
        top: 0,
        width: 30,
        height: 30
      },
      clickable: true
    }],
    longitude: 0,
    latitude: 0,
    distance: '',
    cost: '',
    polyline: [],
    origin: null,
    destination: null,
    address: null,
    title: null,
    navigateImag: "../../../images/ios7-navigate.png"
  },
  //页面加载事件
  onLoad: function (option) {
    var that = this;
    //初始化地图接口实例
    amapInstance = new amapFile.AMapWX({ key: 'cd17f895f7d70ef688f4bf600e067a8e' });
    console.log('高德地图实例创建完成...');
    var param = JSON.parse(option.param);
    console.log('param: ' + param);
    //中心点位置
    var list = param.list,
      latitude = param.latitude,
      longitude = param.longitude,
      destination = param.destination,
      address = param.address,
      title = param.title;
    var result = [];
    //数据组装
    list.forEach(function (item, index) {
      //为零时显示最近的气泡
      if (!index) {
        result.push({
          width: 40,
          height: 40,
          iconPath: "../../../images/marker.png",
          id: item.id,
          latitude: item.location.lat,
          longitude: item.location.lng,
          address: item.address,
          title: item.title,
          callout: {
            content: "离你最近",
            color: "#b5b1b1",
            fontSize: 12,
            borderRadius: 15,
            bgColor: "#262930",
            padding: 10,
            display: 'ALWAYS'
          }
        })
      } else {
        result.push({
          width: 40,
          height: 40,
          iconPath: "../../../images/marker.png",
          id: item.id,
          latitude: item.location.lat,
          longitude: item.location.lng,
          address: item.address,
          title: item.title,
        })
      }
    });
    console.log('result: ' + result);
    //赋值
    that.setData({
      markers: result,
      latitude: latitude,
      longitude: longitude,
      address: address,
      title: title
    });
    //初始化路径规划
    console.log('进入路径规划...');
    that.doWalkingRoute(destination);
    //TODO 设置控件定位或者复位控件，计算位置的时候需要使用系统方法，获取屏幕宽度来进行设置
  },
  //点击marker事件
  doMarkertap: function (obj) {
    var that = this;
    //查询marker的详细信息
    var marker = that.getMarkerById(obj.markerId);
    that.doWalkingRoute(marker.longitude + "," + marker.latitude);
    that.setData({
      address: marker.address,
      title: marker.title
    });
  },
  doControltap: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  //进行路径规划
  doWalkingRoute: function (destination) {
    var that = this;
    //设置详细路径需要的值
    that.setData({
      origin: that.data.longitude + "," + that.data.latitude,
      destination: destination
    });
    //调用高德地图路径规划
    console.log('开始路径规划...');
    amapInstance.getWalkingRoute({
      origin: that.data.origin,
      destination: destination,
      success: function (data) {
        console.log('路径规划成功...');
        console.log('data: ' + data);
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
        console.info('路径规划: ');
        console.info(points);
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
        console.info('路径规划失败...')
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
  }
})
