//index.js

const app = getApp()

Page({
  data: {
    userName: "",
    mobileNumber: "",
    email: "",
    birthdate: "",
    isEmailCorrect: true,
    emailErrorMessage: "",
    isMobileNumberCorrect: true,
    mobileNumberErrorMessage: "",
    isDataCorrect: false,
    timestamp: ""
  },
  
  onLoad: function () {
    
  }, 
  bindUserNameChange: function (e) {
    this.setData({
      userName: e.detail.value
    })
    this.checkData()
  },
  bindEmailChange: function (e) {
    let email = e.detail.value
    let checkResult = this.checkEmail(email)
    this.showEmailErrorBanner(checkResult == "success", checkResult)
    this.checkData();      
  }, 
  bindMobileNumberChange: function (e) {
    let mobileNumber = e.detail.value
    let checkResult = this.checkMobileNumber(mobileNumber)
    this.showMobileNumberErrorBanner(checkResult == "success", checkResult)
    this.checkData()
  },
  bindBirthdateChange: function (e) {
    console.log('picker', e.detail.value)
    this.setData({
      birthdate: e.detail.value
    })
    this.checkData();
  },
  formSubmit: function(e) {
    console.log('form Submit', e.detail.value)
    var currentUser = e.detail.value
    
    app.globalData.currentUser = currentUser
    app.globalData.userList.push(currentUser)
    this.dataReset()
    wx.showToast({
      title: 'success!',
      icon: 'loading',
      duration: 5000
    
    })
  },
  formReset: function() {
    this.dataReset()
  },
  checkMobileNumber: function(mobileNumber) {
    if (mobileNumber.length != 11) {
      return "Mobile number is invalid"
    }
   
    return "success"
  },
  checkEmail: function(email) {
    let rgx = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!rgx.test(email)) {
      return "Email is invalid"
    }
    
    return "success"
  },
  checkMobileNumberRepeat: function (mobileNumber) {
    for (var i = 0; i < app.globalData.userList.length; i++) {
      if (app.globalData.userList[i].mobileNumber == mobileNumber) {
        return false
      }
    }
    return true
  },
  checkEmailRepeat: function (email) {
    for (var i = 0; i < app.globalData.userList.length; i++) {
      if (app.globalData.userList[i].email == email) {
        return false
      }
    }
    return true
  },
  checkData: function() {
    let isDataCorrect = (
      this.data.isMobileNumberCorrect &&
      this.data.isEmailCorrect &&
      this.data.userName.length != 0 &&
      this.data.birthdate.length != 0
    );
    if (isDataCorrect) {
      let timestamp = Math.round(new Date().getTime());
      this.setData({
        timestamp: timestamp
      })
    }
    this.setData({
      isDataCorrect: isDataCorrect
    })
  },
  showEmailErrorBanner: function(isShow, errorMessage) {
    if (isShow) {
      this.setData({
        isEmailCorrect: true,
      })
    } else {
      this.setData({
        isEmailCorrect: false,
        emailErrorMessage: errorMessage,
      })
    }
  },
  showMobileNumberErrorBanner: function (isShow, errorMessage) {
    if (isShow) {
      this.setData({
        isMobileNumberCorrect: true,
      })
    } else {
      this.setData({
        isMobileNumberCorrect: false,
        mobileNumberErrorMessage: errorMessage,
      })
    }
  },
  dataReset: function() {
    this.setData({
      userName: "",
      mobileNumber: "",
      email: "",
      birthdate: "",
      isEmailCorrect: true,
      emailErrorMessage: "",
      isMobileNumberCorrect: true,
      mobileNumberErrorMessage: "",
      isDataCorrect: false,
      timestamp: ""
    })
  },
  randomCode: function() {
    var result = [];
    for (var i = 0; i < 7; i++) {
      var ranNum = Math.ceil(Math.random() * 25); 
      result.push(String.fromCharCode(65 + ranNum));
    }
    return result.join(''); 
  }
})
