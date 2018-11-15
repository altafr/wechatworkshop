//addtask.js
Page({
  data: {
    taskName: "Task Name"
  },
  keydown: function (e) {
    this.setData({
      taskName: e.detail.value
    })
  },
  addTask: function() {
    let todos = wx.getStorageSync('todos') || "[]";
    todos = JSON.parse(todos);
    todos.push(this.data.taskName);
    wx.setStorageSync('todos', JSON.stringify(todos))
    wx.navigateBack();
  },
  cancelForm: function() {
    wx.navigateBack();
  }
})
