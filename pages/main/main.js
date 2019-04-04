// pages/main/main.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:[],
    geohash:"",
    list:[],
    flag:true,
    page:1
    // incode:null,
    // location:null,
    // code:"",
    // codenum:null
  },



  // changecode(){
  //   app.request.post('http://ele.kassing.cn/v1/captchas').then(res => {
  //     this.setData({
  //       'code': res.data.code,
  //       'codenum':res.cookies[0].value
  //     })
  //   })
  // },
  // changeincode(val){
  //   this.setData({
  //     'incode': val.detail.value
  //   })
  // },
  // subcode(){
  //   console.log(this.data.incode,this.data.codenum)
  //   if (Number(this.data.incode)==this.data.codenum){
  //     console.log('验证码正确')
  //   }else{
  //     console.log('验证码错误')
  //   }
  // },

  // 拆分数组
  resetTypes(data){
    const arr=[];
    for(let i=0;i<data.length;i+=8){
      arr.push(data.slice(i,i+8))
    }
    this.setData({
      'types':arr
    })
  },
  tolocation(){
    wx.showNavigationBarLoading();
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success:(res)=> {
        const latitude = res.latitude
        const longitude = res.longitude
        app.request.get('http://ele.kassing.cn/v2/pois/' + latitude + "," + longitude).then(res => {
          this.setData({
            geohash:res.data.geohash
          })
          wx.setNavigationBarTitle({
            title: res.data.name
          })
          wx.setStorage({
            key: 'geohash',
            data: 'res.data.geohash',
          })
          this.getlist();
          wx.hideNavigationBarLoading();
        })
      }
    })
  },
  delgeohash(){
    wx.removeStorage({
      key: 'geohash',
      success:(res)=> {
        
      },
    })
  },
  getlist(){
    const geohashs = this.data.geohash.split(',');
    app.request.get('http://elm.cangdu.org/shopping/restaurants', {
      latitude: geohashs[0],
      longitude: geohashs[1]
    }).then(res => {
      this.setData({
        list:res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({});
    app.request.get('http://ele.kassing.cn/v2/index_entry').then(res=>{
      this.resetTypes(res.data);
      wx.hideLoading();
    })    

    wx.getStorage({
      key: 'geohash',
      success:(res)=> {
        this.setData({
          geohash: res.data
        })
        if (this.data.geohash) {
          wx.showNavigationBarLoading();
          app.request.get('http://ele.kassing.cn/v2/pois/' + this.data.geohash).then(res => {
            wx.setNavigationBarTitle({
              title: res.data.name
            })
            this.setData({
              geohash: res.data.geohash
            })
            this.getlist();
            wx.hideNavigationBarLoading();
          })
        }
      },
    })
    

    // http://elm.cangdu.org/shopping/restaurants  
   

    // app.request.get('http://ele.kassing.cn/v1/cities/32').then(res=>{
    //  this.setData({
    //    'location':res.data
    //  })
    // })

    // app.request.post('http://ele.kassing.cn/v1/captchas').then(res=>{
    //   this.setData({
    //     'code': res.data.code,
    //     'codenum': res.cookies[0].value
    //   })
    // })
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
    if(this.data.flag){
      let page=this.data.page;
      page++;
      this.setData({
        flag:false,
        page
      })
      let geo=this.data.geohash.split(',')
      app.request.get('http://elm.cangdu.org/shopping/restaurants',{
        latitude:geo[0],
        longitude:geo[1],
        offset:(page-1)*20
      }).then(res=>{
        let arr=[...this.data.list,...res.data]
        this.setData({
            list:arr,
            flag:true
        })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})