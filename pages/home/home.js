// pages/home/home.js
const app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guesscity:"",
    cities:null,
    hotcities:[]
  },
  getCity(type){
    return app.request.get("http://ele.kassing.cn/v1/cities",{type})
  },
  changecities(data){
    const arr=[]
    for(let key in data){
      arr.push([key,data[key]])
    }
    return arr.sort((a,b)=>{
      if(a[0]<b[0]){
        return -1
      }
      if(a[0]>b[0]){
        return 1
      }
    })
  },
  getData(){
    Promise.all([this.getCity('guess'), this.getCity('hot'), this.getCity('group')]).then(res => {
      this.setData({
        guesscity: res[0].data,
        hotcities: res[1].data,
        cities: this.changecities(res[2].data)
      }, () => {
        wx.hideLoading()
      })
    }).catch(err=>{
      wx.hideLoading();
      wx.showModal({
        title:'请求超时',
        content:"是否再次发起请求？",
        success:(res)=>{
          if(res.confirm){
            this.getData();
          }
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const geo=wx.getStorageSync('geohash')
    if(geo){
      wx.switchTab({
        url: '/pages/main/main',
      })
    }else{
      wx.showLoading({})
      this.getData();    
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

  },
  onPullDownRefresh(){

  }
})