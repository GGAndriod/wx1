// pages/mine/mine.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据 canIUse: wx.canIUse('button.open-type.getUserInfo')
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: false
  },
  getUserInfo: function(e) {
    // console.log(app.globalData.userInfo)
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //微信登录到后台
  tapLogin: function() {

    wx.login({

      success: function(res) {
        console.log(res)

        if (res.code) {
          // wx.request({
          //   url: 'https://test.com/login',
          //   data: {
          //     username: 'zhangsan', // 用户输入的账号
          //     password: 'pwd123456', // 用户输入的密码
          //     code: res.code
          //   },
          //   success: function(res) {
          //     // 登录成功
          //     if (res.statusCode === 200) {
          //      console.log(res.data.sessionId)// 服务器回包内容
          //     }
          //   }
          // })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }

    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    if (app.globalData.userInfo) {       
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })        
      }
      
    } else {     
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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