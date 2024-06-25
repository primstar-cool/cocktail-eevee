
// import AppBase from "./cocktail/@union/framework/app_base";
const AppBase: CktlV3.IAppCreator = require("./cocktail/@union/framework/app_base");


// const EventTriggerOnce = require("./cocktail/@union/event/event_trigger_once");
// const EventTriggerHolder = require("./cocktail/@union/event/event_trigger_holder");

AppBase({
  globalData: {},
  onLaunch() {

    require("./cocktail/@union/debug/life_circle_printer_service").setApp(this);
    // const EventTriggerHolder = require("./cocktail/@union/event/EventTriggerHolder");

    // var a = new EventTriggerOnce(123, ()=>{}, 1, this.ec);
    // var b = new EventTriggerHolder(343, ()=>{}, 1, this.ec);

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})