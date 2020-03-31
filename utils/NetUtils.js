/**
 * 网络连接处理工具类
 */
var util = require('./util.js');
const urlList = require('./config.js');
const StorageUtil = require('./StorageUtil.js');
//const NotificationHelper = require('./NotificationHelper.js');

function post(url, data, successCallback, failCallback){
  wx.request({
    url: url,
    data: data,
    method: 'post',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Auth-Token': StorageUtil.getToken()
    },
    success: function (res) {
      if(res.statusCode == 200){
        if(res.data.code == 1){
          return typeof successCallback == "function" && successCallback(res.data)
        }else if(res.data.code == 800 || res.data.code == 801){
          //token过期,登录成功后重新调用此接口
          let openid = StorageUtil.getOpenId()
          login(openid).then(result=>{
            if(result){
              post(url,data, successCallback, failCallback)
            }else{
              returnfailCallback(failCallback,res.data)
            }
          })
        }else {
          returnfailCallback(failCallback,res.data)
        }
      }else {
        let result = {
          code: res.status,
          msg: res.error + "错误"
        }
        returnfailCallback(failCallback,result)
      }
    },
    fail: function(error){
      let res = {
        code:404,
        msg: error.errMsg + "网络连接错误"
      }
      returnfailCallback(failCallback,res)
    }
  })
}

//构造网络请求错误返回
function returnfailCallback(failCallback, res) {
  let result = {}
  if (typeof res == "object") {
    result = res
  }
  if (failCallback) {
    return typeof failCallback == "function" && failCallback(res)
  } else {
    let msg = res.msg
    if (res.code==800){
      msg="请登录后重试"
    }
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  }

}

function gotoAuth() {
  let pages = getCurrentPages();
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].route == "pages/auth/auth") {
      return
    }
  }
  wx.navigateTo({
    url: '/pages/auth/auth',
  })
}

function getUrl(url, data, successCallback, failCallback) {
  wx.request({
    url: url,
    data: data,
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    success: function(res) {
      if (res.statusCode == 200) {
        if (res.data.code == 0) {
          return typeof successCallback == "function" && successCallback(res.data)
        } else {
          return typeof failCallback == "function" && failCallback(res.data.msg)
        }
      } else {
        return typeof failCallback == "function" && failCallback(res.statusCode + "服务器错误")
      }

    },
    fail: function(error) {
      return typeof failCallback == "function" && failCallback("网络连接错误")
    }
  })
}


//获取jsCode
function getWxJsCode() {
  let getWxJsCode = new Promise(function(resolve, reject) {
    wx.login({
      success: resLogin => {
        //resolve(resLogin.code)

        
        getOpenID(resLogin.code).then(res => {
          resolve(res)
        })

      },
      fail: failLogin => {
        resolve(false)
      }
    })
  })
  return getWxJsCode;
}

//获取用户openID
function getOpenID(js_code) {
  let getOpenID = new Promise(function(resolve, reject) {
    let data = {
      js_code: js_code
    }
    post(urlList.getOpenId, data, function(res) {
      StorageUtil.setOpenId(res.rows[0].oid)
      //StorageUtil.setSessionkey(res.rows[0].session_key)
      login(res.rows[0].oid).then(res => {
        resolve(res)
      })
    }, function(message) {

      resolve(false)
    })
  })
  return getOpenID;
}

//登录自己的后台
function login(openid) {
  if (openid == undefined || openid == "" || openid == null) {
    getWxJsCode()
    return
  }
  let login = new Promise(function(resolve, reject) {
    let data = {
      openid: openid, //resGetUnionid,
      type: 2, //第三方登录(int)类型：1为QQ，2为微信，3为微博
      // device: null //设备信息
    }
    post(urlList.thirdLogin, data, function(res) {

      if (res.rows != null) {
        StorageUtil.setUserInfo(res.rows[0])
        StorageUtil.setToken(res.rows[0].token.id)
       // WxNotificationCenter.postNotificationName(WxNotificationCenter.notificationKey.login, "")
        NotificationHelper.postLogin("")
        resolve(true)
      } else {
        //gotoAuth();
        resolve(false)
      }
    }, function(message) {
      resolve(false)
    })
  })
  return login;
}

//生成预支付订单
function prepay(orderId) {
  return new Promise(function(resolve, reject) {
    let openId = StorageUtil.getOpenId()
    let data = {
      openid: openId,
      orderId: orderId,
      payType: 3
    }
    post(urlList.prepay, data, function(res) {
      if (res && res.rows.length > 0) {
        pay(res.rows[0].prepay_info).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      } else {
        reject("支付失败")
      }
    }, function(error) {
      reject(error)
    })

  })
}

//拉起支付
function pay(payInfo) {
  let pay = new Promise(function(resolve, reject) {
    let info = JSON.parse(payInfo)

    wx.requestPayment({
      'timeStamp': info.timeStamp,
      'nonceStr': info.nonceStr,
      'package': info.package,
      'signType': 'MD5',
      'paySign': info.paySign,
      'success': function(rs) {
        resolve(rs)
      },
      'fail': function(rs) {
        reject(rs.err_desc)
      }
    })
  })
  return pay

}
/**
 * 判断响应码
 */
function isSuccess(resCheck) {
  if (resCheck.data && (resCheck.data.code === 1 || resCheck.data.code === 200)) {
    return true;
  } else {
    return false;
  }
}

//上传图片
function upCardImage(tempFilePath) {
  return new Promise(resolve => {
    let options = {
      filePath: tempFilePath,
      url: urlList.upCardImage,
      name: "imageUploadName",
    }
    options.header = {
        'X-Auth-Token': StorageUtil.getToken(), //token
      },
      options.success = res => {
        if (res.data) {
          res.data = JSON.parse(res.data)
        }
        if (isSuccess(res)) {
          resolve(res)
        } else if (res.data.code == 800) {
          //此处为token过期,登录成功后重新调用此接口
          getWxJsCode().then(result => {
            if (result) {
              upCardImage(tempFilePath)
            } else {
              wx.hideLoading()
              wx.showToast({
                title: "登录过期请稍后重试",
                icon: 'none',
                duration: 1000
              });
            }
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '图片上传失败，请重新上传',
            icon: 'none',
            duration: 1000
          });
        }
      }
    options.fail = error => {
      wx.hideLoading()
      wx.showToast({
        title: "图片上传失败，请重新上传",
        icon: 'none',
        duration: 3000,
        mask: true,
      })
    }
    wx.uploadFile(options);
  })
}


module.exports = {
  post: post,
  getWxJsCode: getWxJsCode,
  prepay: prepay,
  pay: pay,
  login: login,
  getUrl: getUrl,
  upCardImage: upCardImage,
  getOpenID: getOpenID,
}

