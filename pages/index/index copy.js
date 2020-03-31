// pages/cart/cart.js
const StorageUtil = require('../../utils/StorageUtil.js')
const NetUtils = require('../../utils/NetUtils.js')
const urlList = require('../../utils/config.js')
const CarUtils = require('../../utils/carUtils.js')
const paramConst = require('../../utils/ParamConst.js')
const app = getApp()
let videoRect = null
var startPoint;
/**
 * 首页
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // nvabarData: {
    //   showCapsule: 0, //是否显示左上角图标   1表示显示    0不显示
    //   title: '优链社', //导航栏 中间的标题
    // },
    // navBarHeight: app.globalData.navBarHeight,
    adList: null, //广告列表
    todayHotSaleList: null, //每日热销
    hotSingleList: null, //爆款单品列表
    middleAdList: null, //中部广告
    activityAdList: null, //活动图标
    guessYouLikeList: null, //猜你喜欢
    imageUrl: urlList.imageUrl,
    pageNum: 1, //分页数，默认为1
    isCanLoadMore: true, //是否可以加载更多
    isRefresh: true,
    playState: false,
    animationShow: false,
    userVideoPause: false, //用户点击视频暂停
    searchBackgroundColor: "rgba(84, 152, 253,0)",
    buttonTop: 360,
    buttonLeft: 240,
    windowHeight: '',
    windowWidth: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.onPullDownRefresh()
    this.getFirstKindList()
    this.loginUser()
    this.checkUpVersion()
    this.getSysInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.newPeopleVoucherPop = this.selectComponent("#newPeopleVoucherPop");
    this.scanPop = this.selectComponent("#scanPop");
    this.loginPop = this.selectComponent("#loginPop")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    CarUtils.setTabBarBadge();
  },

  buttonStart: function (e) {
    startPoint = e.touches[0]
  },
  buttonMove: function (e) {
    var endPoint = e.touches[e.touches.length - 1]
    var translateX = endPoint.clientX - startPoint.clientX
    var translateY = endPoint.clientY - startPoint.clientY
    startPoint = endPoint
    var buttonTop = this.data.buttonTop + translateY
    var buttonLeft = this.data.buttonLeft + translateX
    //判断是移动否超出屏幕
    if (buttonLeft + 50 >= this.data.windowWidth) {
      buttonLeft = this.data.windowWidth - 50;
    }
    if (buttonLeft <= 0) {
      buttonLeft = 0;
    }
    if (buttonTop <= 0) {
      buttonTop = 0
    }
    if (buttonTop + 50 >= this.data.windowHeight) {
      buttonTop = this.data.windowHeight - 50;
    }
    this.setData({
      buttonTop: buttonTop,
      buttonLeft: buttonLeft
    })
  },

  buttonEnd: function (e) {

  },
  //用户登录
  loginUser() {
    let that = this
    NetUtils.getWxJsCode().then(res => {
      if (!res) {
        that.getNewUserTicket()
      }
    })
  },

  //点击首页轮播图
  onBannerImageClick:function(e){
    let index = e.currentTarget.dataset.index;
    let ad = this.data.adList[index];
    let good={}
   // ad.forward_url ='4327'
    if (!ad.forward_url){
      return
    }
    good.good_id = ad.forward_url
    let data = JSON.stringify(good)
    wx.navigateTo({
      url: '/pages/goodDetail/goodDetail?data=' + encodeURIComponent(data),
    })
  },

  //获取新人送券
  getNewUserTicket() {
    let that = this
    let token = StorageUtil.getToken()
    // 有token说明是老用户
    if (token) {
      return
    }
    NetUtils.post(urlList.getNewUserTicket, null, function(res) {
      if (res && res.rows && res.rows.length > 0) {
        let faceValueDic = res.rows[0]
        wx.hideTabBar({
          success(res) {
            that.newPeopleVoucherPop.showPopup(faceValueDic)
          }
        })
      }
    })
  },

  //获取首页广告轮播图
  getAdList(fn) {
    
    let that = this
    NetUtils.post(urlList.adList, {
      fn: fn
    }, function(res) {
      if (res.rows && res.rows.length > 0) {
        if (fn == 1) {
          that.setData({
            adList: res.rows
          })
        } else if (fn == 2) {
          that.setData({
            middleAdList: res.rows
          })
          setTimeout(function() {
            that.getVideoRect()
          }, 1000)
        }

      }
    })
  },




  getVideoRect() {
    this.vvideo = wx.createVideoContext("kdvideo", this)
    let query = wx.createSelectorQuery();
    query.select('#kdvideo').boundingClientRect()
    query.exec(function(res) {
      videoRect = res
    })
  },



  //获取首页活动图片
  getAdActivity() {
    let that = this;
    NetUtils.post(urlList.getAdActivity, {
      fn: 5
    }, function(res) {
      if (res) {
        if (res.rows && res.rows.length > 0) {
          that.setData({
            activityAdList: res.rows[0]
          })
        }
      }
    })
  },

  //获取一级商品分类列表
  getFirstKindList() {
    let that = this;
    NetUtils.post(urlList.goodsKindList, {
      category_id: ''
    }, function(res) {
      if (res) {
        let firstKindList = res.rows;
        that.setData({
          firstKindList
        })
      }
      setTimeout(function () {
        that.getVideoRect()
      }, 1000)
    })
  },

  //获取每日热销商品
  getTodayHotSaleList() {
    let that = this
    NetUtils.post(urlList.todayHotSaleList, {
      pageNum: 1
    }, function(res) {
      wx.stopPullDownRefresh()
      if (res.rows && res.rows.length > 0) {
        that.setData({
          todayHotSaleList: res.rows
        })
      }
      setTimeout(function () {
        that.getVideoRect()
      }, 1000)
    })
  },

  //获取爆款单品
  getHotSingleList() {
    let that = this
    NetUtils.post(urlList.hotSingleList, {
      pageNum: 1
    }, function(res) {
      if (res.rows && res.rows.length > 0) {
        that.setData({
          hotSingleList: res.rows
        })
      }
    })
  },



  //获取爆款单品列表
  getGuessYouLikeList() {
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    NetUtils.post(urlList.getGuessYouLike, {
      pageNum: that.data.pageNum
    }, function(res) {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      let canLoadMore = true
      let pageNum = that.data.pageNum;
      //判断是否可以加载更多
      if (!res.rows || res.rows.length < paramConst.pageSize) {
        canLoadMore = false
      } else {
        pageNum++
        canLoadMore = true
      }
      let list = that.data.guessYouLikeList;
      if (res.rows) {
        //判断是否是刷新，是刷新的话先清空数据，在添加数据
        if ((that.data.isRefresh) || pageNum == 1) {
          list = []
        }
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            list.push(res.rows[i])
          }
        }
      }
      that.setData({
        isCanLoadMore: canLoadMore,
        guessYouLikeList: list,
        pageNum: pageNum
      })
    })
  },



  //点击扫一扫
  onScanClick: function() {
    if (!app.chackLogin(this.loginPop)) {
      return
    }
    let that = this
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: function(res) {
        if (res.result == null) {
          wx.showToast({
            title: '扫码失败',
            icon: 'none',
          });
          return
        }
        that.scanValidate(res.result)
      },
      fail: function(res) {},
      complete: function(res) {},
    })


  },

  //扫码后服务器识别
  scanValidate(code) {
    let that = this;
    let userInfo = StorageUtil.getUserInfo()
    if (!userInfo) {
      wx.showToast({
        title: '请登录后重试',
        icon: "none"
      })
      return
    }
    NetUtils.post(urlList.scanValidate, {
      str: code
    }, function(data) {
      //如果是代金券弹出代金券弹窗
      if (data && data.rows && data.rows.length > 0) {
        let faceValueDic = data.rows[0]
        wx.hideTabBar({
          success(res) {
            that.scanPop.showPopup(faceValueDic);
          }
        })
      }

    })
  },

  changePlayStatus: function() {
    let playState = !this.data.playState
    if (playState) {
      this.vvideo.play()
    } else {
      this.vvideo.pause()
    }
    this.setData({
      playState: playState,
      userVideoPause: !playState
    })
  },

  //关闭扫码领取代金券
  closeScanPop: function() {
    wx.showTabBar() //显示底部tabbar
  },

  //去搜索
  gotoSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  //关闭弹出的新人送券
  closeNewPeopleVoucherPop: function(e) {
    wx.showTabBar() //显示底部tabbar

  },
  //劲爆品牌商品
  gotoDiscountGoods: function() {
    wx.navigateTo({
      url: '/pages/discountGoods/discountGoods',
    })
  },

  //去拼团
  gotoGroupBuy() {
    wx.navigateTo({
      url: '/pages/groupBuy/groupBuy',
    })
  },
  //限时抢购
  gotoTimeLimitPurchase() {
    wx.navigateTo({
      url: '/pages/timeLimitPurchase/timeLimitPurchase',
    })
  },

  //柜机自提
  gotoCabinetAddr() {
    wx.navigateTo({
      url: '/pages/cabinet/cabinet',
    })
  },

  //滑动距离
  onPageScroll: function(res) {
    let searchBackgroundColor = this.data.searchBackgroundColor
    if (res.scrollTop < 100) {
      searchBackgroundColor = "rgba(67, 136, 238, " + res.scrollTop / 100 + ")"
    } else {
      searchBackgroundColor = "rgba(67, 136, 238, 1.0)"
    }
    this.setData({
      searchBackgroundColor: searchBackgroundColor,
    })

    //判断视频组件是否在屏幕中间
    if (videoRect) {
      //判断是否是用户点击暂停的
      if (this.data.userVideoPause) {
        return
      }
      var top
      if (this.data.middleAdList){//存在视频
       top = videoRect[0].top
        let height = top + videoRect[0].height
        if (res.scrollTop > top - 500 && res.scrollTop < height) {
          console.log("播放")
          this.vvideo.play()
          this.setData({
            playState: true
          })
        } else {
          this.vvideo.pause()
          this.setData({
            playState: false
          })
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // this.vvideo.pause()
    // this.setData({
    //   playState: false
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let that = this;
    //下拉刷新为第一页
    that.setData({
      isRefresh: true,
      pageNum: 1
    })
    that.getAdList(1);
    that.getAdList(2);
    that.getAdActivity();
    that.getTodayHotSaleList();
    that.getHotSingleList();
    that.getFirstKindList()
    this.getGuessYouLikeList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.isCanLoadMore) {
      this.setData({
        isRefresh: false
      })
      this.getGuessYouLikeList()
    }
  },
  getSysInfo:function(){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 屏幕宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 高度,宽度 单位为px
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  //检测版本更新
  checkUpVersion: function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function(res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function() {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

  },


})