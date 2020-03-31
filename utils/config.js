/**
 * 网络接口配置类
 */
//const baseUrlMini = 'https://mini.healthpet.cn:18009/';//线上
//const baseImageUrl = 'https://manage.healthpet.cn:18008/';//线上

const baseUrlMini = 'http://127.0.0.1:8081/';//本地
const baseImageUrl = 'https://cgw-pic1.oss-cn-shenzhen.aliyuncs.com/images/';//本地
//https://cgw-pic1.oss-cn-shenzhen.aliyuncs.com/images/2019/11/13/15736428161294778.png

// const baseUrlMini = 'http://172.16.16.26:16000/' //测试
// const baseImageUrl = 'http://172.16.16.26/'; //测试


const urlList = {
 imageUrl: baseImageUrl, //图片域名
 upCardImage: baseUrlMini + "upload/apply", //上传图片
 getOpenId: baseUrlMini + "mini/get", //获取openid
 thirdLogin: baseUrlMini + "third/login", //登录
 saveUserInfo: baseUrlMini + "third/save", //绑定用户信息
 reviewsAdd: baseUrlMini + "reviews/add", //发表评价  
 adList: baseUrlMini + "ad/list", //广告轮播图列表
 hotSingleList: baseUrlMini + "home/hot/single", //首页爆款单品
 todayHotSaleList: baseUrlMini + "home/saling", //每日热销
 scanValidate: baseUrlMini + "qr/validate", //扫码
 tadayBuyAndHotSaleList: baseUrlMini + "goods/market/group", //今日必拼、热销榜列表
 getGoodDetail: baseUrlMini + "goods/group/detail", //获取商品详情
 addRoRemoveCollection: baseUrlMini + "collection/toggle", //添加 移除收藏
 isCollection: baseUrlMini + "collection/find", //查询是否被收藏  
 saveAddress: baseUrlMini + "address/save", //新增地址
 addressList: baseUrlMini + "address/list", //地址列表
 updateAddress: baseUrlMini + "address/update", //修改地址
 voucherCardsList: baseUrlMini + "cards/listofvendor", //我的代金券列表
 reviewsAdd: baseUrlMini + "reviews/add", //发表评价
 collectionList: baseUrlMini + 'collection/collectionList', //收藏列表
 goodsMarketTime: baseUrlMini + 'goods/group/time', //超级团购时间列表
 goodsGroupTop: baseUrlMini + 'goods/group/top', //限时抢购为你推荐列表
 goodsGroupList: baseUrlMini + 'goods/group/list', //限时抢购列表
 goodsKindList: baseUrlMini + 'goods/category/level', //商品分类列表
 goodsList: baseUrlMini + 'goods/category/good', //普通商品列表
 hotSearchRecord: baseUrlMini + 'history/hot', //热门搜索记录
 goodsSearch: baseUrlMini + 'goods/search', //搜索商品
 discountGoodsList: baseUrlMini + 'activity/good/discount', //劲爆品牌特卖
 addGoodsOrder: baseUrlMini + "order/addGoodsOrder", //下单,
 prepay: baseUrlMini + "order/prepay", //生成预支付订单
 orderStatusList: baseUrlMini + "order/status", //订单列表
 orderDetail: baseUrlMini + "order/orderDetail", //获取订单详情
 orderCancel: baseUrlMini + "order/cancel", //取消订单
 refundapply: baseUrlMini + "aftersales/refundapply", //申请退款
 aftersalesDetail: baseUrlMini + "aftersales/detail/list", //查询退款进度

 confirmReceip: baseUrlMini + "order/confirm", //确认收货
 goodsExchangeGood: baseUrlMini + "goods/exchange/good",//积分兑换商品列表
 pointTotal: baseUrlMini + "point/total",//用户总积分概况
 pointdetails: baseUrlMini + "point/details",//用户总积分兑换明细、积分兑换记录
 pointGoodExchange: baseUrlMini + "point/good/exchange",//积分兑换商品
 orderMyGroup: baseUrlMini + "order/my/group",//我的团购
 addReview: baseUrlMini + "reviews/add",//添加评论
 reviewsMineList: baseUrlMini + "reviews/obj/list",//我的评价列表
 reviewList: baseUrlMini + 'reviews/group', //评论列表 
 ticketListofVendor: baseUrlMini +"cards/listofvendor",//可用代金券
 getGoodCode: baseUrlMini +"goods/qrcode",//获取商品分享码
 getNewUserTicket: baseUrlMini +"cards/show/new",//获取新人送券
 getMessageTips: baseUrlMini +"message/tips",//获取消息广播
 getDelivery: baseUrlMini +"config/delivery",//获取快递费  
 orderCount: baseUrlMini + "order/order/counts", //订单数量
 getGuessYouLike: baseUrlMini +"home/guess",//猜你喜欢
 getAdActivity: baseUrlMini +"ad/activity",//获取首页活动图片
 getVoucherDetail: baseUrlMini + "/cards/buy/join",//支付成功获取用户是否买单送券资格
}

//模块暴露出去
module.exports = urlList;
//使用方式:
/**
 * const urlList = require('../../utils/config.js'); //导入
 * var imageUrl = urlList.imageUrl
 */