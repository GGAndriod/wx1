/**
 * 广播发送帮助类
 */

const WxNotificationCenter = require('./WxNotificationCenter.js')


//注册登录广播监听
function registerLogin(selector, observer) {
  WxNotificationCenter.addNotification("login", selector, observer)
}

//发送登录广播
function postLogin(data) {
  WxNotificationCenter.postNotificationName("login", data)
}

//移除登录广播监听
function removeLogin(observer) {
  WxNotificationCenter.removeNotification('login', observer)
}

//注册改变订单广播监听
function registerChangeOrder(selector, observer) {
  WxNotificationCenter.addNotification("ChangeOrder", selector, observer)
}

//发送改变订单广播
function postChangeOrder(data) {
  WxNotificationCenter.postNotificationName("ChangeOrder", data)
}

//移除改变订单广播监听
function removeChangeOrder(observer) {
  WxNotificationCenter.removeNotification('ChangeOrder', observer)
}

module.exports = {
  registerLogin: registerLogin,
  postLogin: postLogin,
  removeLogin: removeLogin,
  registerChangeOrder: registerChangeOrder,
  postChangeOrder: postChangeOrder,
  removeChangeOrder: removeChangeOrder

}