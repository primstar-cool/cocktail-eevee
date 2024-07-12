
// import AppBase from "./cocktail/@union/framework/app_base";
import AppBase from "./cocktail/@union/framework/app_base"

// const EventTriggerOnce = require("./cocktail/@union/event/event_trigger_once");
// const EventTriggerHolder = require("./cocktail/@union/event/event_trigger_holder");
interface AppParamsDemo extends CktlV3.IAppDefine {
  globalData: {};
  abc: number
}

AppBase<AppParamsDemo>({
  globalData: {},
  abc: 111,


  onShow(res) {
    // debugger
  },

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