/**
 * 缓存工具类
 */

/**
 * 根据key值设置缓存内容
 */
function setStorageByKey(key, info) {
  let res = wx.setStorageSync(key, info)
  return res;
}

/**
 * 根据key值获取缓存内容
 */
function getStorageByKey(key) {
  let res = wx.getStorageSync(key)
  return res;
}

/**
 * 根据key值移除缓存内容
 */
function removeStorageByKey(key) {
  wx.clearStorageSync()
}

/**
 * 移除所有缓存
 */
function removeAllStorage(key) {
  wx.clearStorageSync()
}

/**
 * 获取用户openid
 */
function getOpenId() {
  let openId = wx.getStorageSync("openId")
  return openId
}

/**
 * 设置用户openid缓存
 */
function setOpenId(openId) {
  wx.setStorageSync("openId", openId)
}

/**
 * 移除用户缓存openid
 */
function removeOpenId() {
  wx.removeStorageSync("openId")
}

/**
 * 获取用户token
 */
function getToken() {
  let token = wx.getStorageSync("token")
  return token
}

/**
 * 设置用户token缓存
 */
function setToken(token) {
  wx.setStorageSync("token", token)
}

/**
 * 移除用户缓存token
 */
function removeToken() {
  wx.removeStorageSync("token")
}



/**
 * 获取用户信息
 */
function getUserInfo() {
  let userInfo = wx.getStorageSync("userInfo")
  return userInfo
}

/**
 * 设置用户信息缓存
 */
function setUserInfo(userInfo) {
  wx.setStorageSync("userInfo", userInfo)
}

/**
 * 移除用户缓存信息
 */
function removeUserInfo() {
  wx.removeStorageSync("userInfo")
}

/**
 * 获取用户购物车信息
 */
function getCar() {
  let car = wx.getStorageSync("car")
  return car
}

/**
 * 设置用户购物车信息
 */
function setCar(car) {
  wx.setStorageSync("car", car)
}

/**
 * 移除用户购物车信息
 */
function removeCar() {
  wx.removeStorageSync("car")
}

/**
 * 获取用户信息
 */
function getSearchInfo() {
  let searchInfo = wx.getStorageSync("searchInfo")
  return searchInfo
}

/**
 * 设置用户信息缓存
 */
function setSearchInfo(searchInfo) {
  wx.setStorageSync("searchInfo", searchInfo)
}

/**
 * 移除用户缓存信息
 */
function removeSearchInfo() {
  wx.removeStorageSync("searchInfo")
}

/**
 * 获取当前默认地址信息
 */
function getDefaultAddressInfo() {
  let defaultAddressInfo = wx.getStorageSync("defaultAddressInfo")
  return defaultAddressInfo
}

/**
 * 设置当前默认地址信息缓存
 */
function setDefaultAddressInfo(defaultAddressInfo) {
  wx.setStorageSync("defaultAddressInfo", defaultAddressInfo)
}

/**
 * 移除当前默认地址缓存信息
 */
function removeDefaultAddressInfo() {
  wx.removeStorageSync("defaultAddressInfo")
}
/**
 * 获取当前积分信息
 */
function getRemaindPointInfo() {
  let remaindPointInfo = wx.getStorageSync("remaindPointInfo")
  return remaindPointInfo
}

/**
 * 设置当前积分信息缓存
 */
function setRemaindPointInfo(remaindPointInfo) {
  wx.setStorageSync("remaindPointInfo", remaindPointInfo)
}

/**
 * 移除当前积分缓存信息
 */
function removeRemaindPointInfo() {
  wx.removeStorageSync("remaindPointInfo")
}

/**
 * 获取当前积分信息
 */
function getDelivery() {
  let delivery = wx.getStorageSync("delivery")
  return delivery
}

/**
 * 设置当前积分信息缓存
 */
function setDelivery(delivery) {
  wx.setStorageSync("delivery", delivery)
}

/**
 * 移除当前积分缓存信息
 */
function removeDelivery() {
  wx.removeStorageSync("delivery")
}

module.exports = {
  getDelivery: getDelivery,
  setDelivery: setDelivery,
  removeDelivery: removeDelivery,
  setStorageByKey: setStorageByKey,
  getStorageByKey: getStorageByKey,
  removeStorageByKey: removeStorageByKey,
  removeAllStorage: removeAllStorage,
  getUserInfo: getUserInfo,
  setUserInfo: setUserInfo,
  removeUserInfo: removeUserInfo,
  setSearchInfo: setSearchInfo,
  getSearchInfo: getSearchInfo,
  removeSearchInfo: removeSearchInfo,
  setOpenId: setOpenId,
  getOpenId: getOpenId,
  removeOpenId: removeOpenId,
  setToken: setToken,
  getToken: getToken,
  removeToken: removeToken,
  getCar:getCar,
  setCar:setCar,
  removeCar: removeCar,
  getDefaultAddressInfo: getDefaultAddressInfo,
  setDefaultAddressInfo: setDefaultAddressInfo,
  removeDefaultAddressInfo: removeDefaultAddressInfo,
  getRemaindPointInfo: getRemaindPointInfo,
  setRemaindPointInfo: setRemaindPointInfo,
  removeRemaindPointInfo: removeRemaindPointInfo
}