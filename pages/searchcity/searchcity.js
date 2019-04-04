// pages/searchcity/searchcity.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:{
      city_id:1,
      keyword:""
    },
    addr:[]
  },
  changecity(val){
    this.setData({
      'city.keyword':val.detail.value
    })
  },
  changesub(){
    wx.showLoading({})
    app.request.get('http://ele.kassing.cn/v1/pois',this.data.city).then(res=>{
      this.setData({
        addr:res.data 
      })
      wx.hideLoading()
    })
  },
  goMain(e){
    wx.setStorage({
      key: 'geohash',
      data: e.currentTarget.dataset.geohash,
      success:(res)=>{
      wx.switchTab({
        url: `/pages/main/main`,
      })
      }
    })    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'city.city_id':options.city_id
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