//app.js
App({
  onLaunch: function () {
    // Login
    // wx.login({
    //   success: res => {
    //     // send res.code to backend and get back openId, sessionKey, unionId
    //   }
    // })
    // getUserInfo
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // is authorized to use getUserInfo
          wx.getUserInfo({
            success: res => {
              // can send res to backend and get back unionId
              this.globalData.userInfo = res.userInfo

              // Since getUserInfo is network request, it return after Page.onLoad
              // use callback to handle response
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})