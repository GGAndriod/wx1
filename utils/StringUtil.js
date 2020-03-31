/**
 * 检测手机号码是否正确
 */
function checkPhone(phone) {
  if (!(/^1[3456789]\d{9}$/.test(phone))) {
    return false;
  }else{
    return true
  }
}

/**
 * 价格格式格式化
 */
function chkPrice(obj) { //方法1
  obj = obj.replace(/[^\d.]/g, "");
  //必须保证第一位为数字而不是.
  obj = obj.replace(/^\./g, "");
  //保证只有出现一个.而没有多个.
  obj = obj.replace(/\.{2,}/g, ".");
  //保证.只出现一次，而不能出现两次以上
  obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
  return obj;
}

//隐藏手机号或者姓名
function plusXing (str, frontLen, endLen) {
  var len = str.length - frontLen - endLen;
  var xing = '';
  for (var i = 0; i < len; i++) {
    xing += '*';

  }
  if (str.length == 1) {
    return str.substring(0, frontLen) 
  }
  if (str.length==2){
    return str.substring(0, frontLen)+"*"
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}

module.exports = {
  chkPrice: chkPrice,
  plusXing: plusXing,
  checkPhone: checkPhone
}