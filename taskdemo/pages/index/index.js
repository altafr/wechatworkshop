//index.js
//Get application instance
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    todos: [],
  },
  loadTasks: function () {
    let todos = wx.getStorageSync('todos') || "[]";
    todos = JSON.parse(todos);
    this.setData({ todos });
  },
  clearTasks: function() {
    let todos = [];
    this.setData({ todos });
    wx.setStorageSync('todos', JSON.stringify(todos))
  },
  askClearConfirmation: function(){
    wx.showModal({
      title: "Confirmation",
      content: "Do you want to clear all tasks?",
      confirmText: "Confirm",
      cancelText: "Cancel",
      success: res =>{
        if (res.confirm) {
          this.clearTasks()
        }
      }
    });
  },
  addTask: function () {
    wx.navigateTo({
      url: '../addtask/addtask'
    })
  },
  onShow: function(){
    this.loadTasks();
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // Since getUserInfo is network request, it return after Page.onLoad
      // use callback to handle response
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // compatible with versions that don't support open-type=getUserInfo
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
