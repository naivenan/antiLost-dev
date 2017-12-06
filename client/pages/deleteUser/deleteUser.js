// pages/deleteUser/deleteUser.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    olderList: [],
  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.olderList, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      olderList: checkboxItems
    });
  },

  deleteUser: function () {
    var that = this;
    var deletelist = [];
    this.data.olderList.forEach(function(o,i){
      if(o.checked){
        deletelist.push(o);
      }
    })
    wx.showModal({
      title: '提示',
      content: '确定要解除绑定吗？解除后将无法再查看老人位置等信息',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://cjt9xe52.qcloud.la/weapp/deleteolder',
            data: {
              uid: that.data.uid,
              list: deletelist
            },
            success: function (res) {
              console.log(res.data);
            }
          })
          that.getOlderList();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  getOlderList: function (param) {
    var that = this;
    wx.request({
      url: 'https://cjt9xe52.qcloud.la/weapp/olderlist',
      data: {
        uid: that.data.uid
      },
      success: function (res) {
        console.log(res.data);
        var list = res.data.data;
        app.globalData.olderList = list;
        wx.setStorageSync('olderlist', res.data.data);
        for (let i = 0; i < list.length; i++) {
          list[i].value = i;
          list[i].checked = false;
        }
        that.setData({
          olderList: list
        })
      }
    })

  },

  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  refresh: function () {
    var that = this;
    wx.getStorage({
      key: 'olderlist',
      success: function(res) {
        var list = res.data;
        for (let i = 0; i < list.length; i++) {
          list[i].value = i;
          list[i].checked = false;
        }
        that.setData({
          olderList: list
        })
      },
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
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          uid: res.data.id
        })
        that.refresh();
      },
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