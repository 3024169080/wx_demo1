// components/firstcom/firstcom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    a:{
      type:String,
      observer(val){
        console.log(val)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeevent(){
      this.triggerEvent('myevent',)
    }
  }
})
