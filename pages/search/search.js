// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    basic_explain:[""],//基本释义
    phonetic:"",//音标
    web_explain:[""],//网络释义
    success_1:0,//有道成功标志
    success_2:0,//维基百科成功标志
    extract:"",//专业释义
    img:"",//图片地址
  },

  finish_input: function (e) {
    var that = this;
    /*****************************分割线，以下是有道翻译的request*************/
    var quary = this.data.inputValue;
    var appKey = '5918635af2f93979';
    var key = 'kfdoFIC8mEoNL0lMZkgsfElCify3yXhM';
    var date = (new Date).getTime;
    var sign = appKey+quary+date+key;
    var md5 = require('../../utils/md5.js');
    var realsign = md5(sign);
    wx.request({
      url: 'https://openapi.youdao.com/api',
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
            success_1:1,
            basic_explain: my.basic.explains,
            web_explain: my.web,
          })
        }
        if(my.basic.phonetic!= null)
        {
          that.setData({
            phonetic: my.basic.phonetic,
          })
        }
        if (that.data.success_1 == 1 && that.data.success_2 == 1) {//停止转圈
          wx.hideNavigationBarLoading();
        }
      },
    })

    /*****************************分割线，以下是维基百科的request*************/
    var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=1&prop=description|pageimages&pithumbsize=300&origin=*&gsrsearch='
    wx.request({
      url: url+this.data.inputValue,
      success: function (data) {
        if (that.data.success_1 == 1 && that.data.success_2 == 1) {
          wx.hideNavigationBarLoading();
        }
        console.log(data);
        var pageid;
        for(var page_id in data.data.query.pages){
          pageid=page_id;
        }
        var page = data.data.query.pages[pageid];
        var extract = page.description;
        var img = page.thumbnail.source;
        that.setData({
          success_2:1,
          extract:extract,
          img:img,
        });
        if (that.data.success_1 == 1 && that.data.success_2 == 1) {
          wx.hideNavigationBarLoading();
        }
      }
    })
    wx.showNavigationBarLoading()
  },


  bindinput:function(e){
    this.setData({
      success_1:0,
      success_2:0,
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