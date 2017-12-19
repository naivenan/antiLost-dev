/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://cjt9xe52.qcloud.la';

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,

    wxlogin: `${host}/weapp/wxlogin`,

    userlogin: `${host}/weapp/userlogin`,

    register: `${host}/weapp/register`,

    olderlist: `${host}/weapp/olderlist`,

    alertlist: `${host}/weapp/alertlist`,

    alertTunnelUrl: `${host}/weapp/alertTunnel`,

    cancelAlert: `${host}/weapp/cancelAlert`,

    addolder: `${host}/weapp/addolder`,

    deleteolder: `${host}/weapp/deleteolder`,

    userUpdate: `${host}/weapp/userUpdate`,

    location: `${host}/weapp/location`
  },

};

module.exports = config;