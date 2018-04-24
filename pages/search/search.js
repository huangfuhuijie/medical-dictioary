// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    basic_explain:[""],
    phonetic:"",
    web_explain:[""],
    success:0,
  },

  finish_input: function (e) {
    var that = this;
    var quary = this.data.inputValue;
    var appKey = '5918635af2f93979';
    var key = 'kfdoFIC8mEoNL0lMZkgsfElCify3yXhM';
    var date = (new Date).getTime;
    var sign = appKey+quary+date+key;
    var md5 = require('../../utils/md5.js');
    var realsign = md5(sign);
    wx.request({
      url: 'http://openapi.youdao.com/api',
      type:'post',
      dataType:'jsonp',
      data:{
        q:quary,
        appKey:appKey,
        key:key,
        from:'auto',
        to:'auto',  
        salt:date,
        sign:realsign,
      },
      success:function(data){
        console.log(data);
        var my = JSON.parse(data.data);
        if(my.errorCode==0)
        {
          that.setData({
            success:1,
            basic_explain: my.basic.explains,
            phonetic: my.basic.phonetic,
            web_explain: my.web,
          })
        }
      }
    })
  },


  bindinput:function(e){
    this.setData({
      success:0,
      inputValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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