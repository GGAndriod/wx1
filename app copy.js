//app.js
const StorageUtil = require('./utils/StorageUtil.js')
App({
  onLaunch: function(options) {
    wx.getSystemInfo({
      success: res => {
        this.globalData.systemInfo = res
        this.globalData.windowHeight = res.windowHeight / (res.windowWidth / 750)
        this.globalData.screenHeight = res.screenHeight / (res.screenWidth / 750)
        this.globalData.windowWidth = res.windowWidth
        this.globalData.statusBarHeight = res.statusBarHeight
        this.globalData.navBarHeight = 44 + res.statusBarHeight
        let model = res.model.substring(0, res.model.indexOf("X")) + "X";
        if (model == 'iPhone X') {
          this.globalData.isIpx = true;
        } else {
          this.globalData.isIpx = false;
        }
      }
    })

  },

  //去授权登录
  chackLogin: function(loginPop) {
    let that = this
    let userInfo = StorageUtil.getUserInfo()
    if (userInfo) {
      return true
    }
    if (loginPop) {
      loginPop.showPopup()
    }
    return false
  },


  globalData: {
    userInfo: null,
    systemInfo: null,
    windowHeight: null, // rpx换算px后的窗口高度
    screenHeight: null, // rpx换算px后的屏幕高度
    statusBarHeight: null,
    navBarHeight: null,
    isIpx: false, //是否是iphone X
    windowWidth: null //宽度
  }
})