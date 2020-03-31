//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    id: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({motto:'world'})
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickMe: function(){
    this.setData({motto:"我变了"})
  },
  addId: function(event){
    console.log(event)
    var nid = this.data.id+1
    this.setData({id:nid})
  },
  toNewPage: function(){
    let nid = this.data.id
    //console.log('-------------')
     
    wx.navigateTo({ 
      url: '/pages/detail/detail?id='+nid+'&other=abc' })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
 // 用户触发了下拉刷新操作

    // 拉取新数据重新渲染界面
  },
  onReachBottom: function() {

    // 当界面的下方距离页面底部距离小于100像素时触发回调

  }

})
