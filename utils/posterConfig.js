const posterConfig = {
  goodDetailConfig: {
    width: 600,
    height: 955,
    backgroundColor: '#fff',
    debug: true,
    pixelRatio: 1,
    texts: [{
      x: 300,
      y: 56,
      textAlign: "center",
      width: 600,
      text: '开心盒子',
      fontSize: 28,
      color: '#4388ee'
    }, { //商品名
      x: 44,
      y: 652,
      textAlign: "left",
      width: 500,
      lineNum: 1,
      text: '',
      fontSize: 28,
      color: '#333'
    }, { //售价
      x: 44,
      y: 710,
      textAlign: "left",
      width: 600,
      text: '￥135.00',
      fontSize: 32,
      color: '#f23d3d'
    }, { //销量
      x: 556,
      y: 710,
      textAlign: "right",
      width: 600,
      text: '',
      fontSize: 20,
      color: '#666'
    }, { //姓名
      x: 130,
      y: 812,
      textAlign: "left",
      width: 200,
      text: '',
      fontSize: 26,
      lineNum: 1,
      color: '#666'
    }],
    images: [{ //商品图
      x: 24,
      y: 90,
      width: 552,
      height: 514,
      url: ""
    }, { //头像
      x: 44,
      y: 762,
      width: 74,
      height: 74,
      borderRadius: 74,
      url: ""
    }, { //长按
      x: 44,
      y: 860,
      width: 238,
      height: 54,
      url: "/images/long_click.png"
    }, { //二维码
      x: 410,
      y: 766,
      width: 160,
      height: 160,
      url: ""
    }],
    blocks: [{ //名称边框底纹
      x: 24,
      y: 604,
      width: 552,
      height: 136,
      borderWidth: 1,
      borderColor: "#f0f0f0"
    }]

  }
}

module.exports = posterConfig;