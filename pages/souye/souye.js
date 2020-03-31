// pages/souye/souye.js
var hasClick = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advices: null,
    adList:null
  },
  //获取页面广告
  getAdvices: function () {
    //防止重复点击
    if (hasClick) {
      return
    }
    hasClick = true
    wx.showLoading()

    let that = this
    wx.request({

      url: 'http://localhost:8081/getAdvice',
    
      success: function(res) {
       
        //console.log(res)// 服务器回包信息JSON.stringify( arr )
        
        //console.log(res.data)
        that.setData({
          advices: res.data,
          adList: res.data 
        })
        // console.log(that.data.adList)
        // console.log(typeof(that.data.adList))
      },
      fail: function(res){
        wx.showToast({ title: '系统错误' })
      },
      complete: function (res) {
        wx.hideLoading()
        hasClick = false
      }
    
    })
    
  },
  //点击首页轮播图 TODO adList是string 转换成array res.data
  onBannerImageClick:function(e){
    
    let index = e.currentTarget.dataset.index; 
    let ad = this.data.adList[index];
    
    let id = ad.aId
    let url = ad.url

    wx.navigateTo({ 
      url: '/pages/detail/detail?id='+id+'&url=' +url
    })
        
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdvices();
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