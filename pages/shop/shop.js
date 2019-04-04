// pages/shop/shop.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopid:1,
    shop:[],  
    active:0,
    scroll_id:"type-2307",
    topinfo:{}
  },
  changeactive(e){
    this.setData({
      active:e.currentTarget.dataset.index,
      scroll_id: e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 该页面全写完打开此注释------此获取首页传入shopid

    this.setData({
      shopid:options.shopid
    })

    const geo=wx.getStorageSync('geohash').split(',');
    app.request.get('http://elm.cangdu.org/shopping/restaurant/'+this.data.shopid,{
      latitude:geo[0],
      longitude:geo[1]
    }).then(res=>{
      this.setData({
        topinfo: res.data
      })
    })
    app.request.get('http://elm.cangdu.org/shopping/v2/menu?restaurant_id=' + this.data.shopid).then(res=>{
      this.setData({
        shop:res.data
      })
    })

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