//index.js
const app = getApp()

Page({
  data: {
    radioItems: [
      { name: 'first item', value: '0' },
      { name: 'second item', value: '1', checked: true },
      { name: 'third item', value: '2' }
    ],
    date: "2016-09-01",
    time: "12:01",
    countries: ["China", "USA", "UK"],
    isChecked: false
  },
  onLoad: function () {

  },
  clicked: function() {
    wx.showToast({
      title: 'You clicked me',
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  radioChange: function (e) {
    console.log('radio changed: ', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  bindCountryChange: function (e) {
    console.log('picker country', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isChecked: !!e.detail.value.length
    });
  }
})
