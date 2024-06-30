import { IEventCenter } from '../cocktail/@compile/@types/event';
import {
  IAppBaseLifeCycleOptions,
  IAppBaseLifeCycleVoid,
  IAppBaseLifeCycleAny,
  IAppBaseLifeCycleQuery,
  IAppBase
} from '../cocktail/@compile/@types/framework';
import CktlV3 from '../cocktail/platform_harmony/core/cktlv3';
import AppBase from "../cocktail/platform_harmony/framework/app_base"

// const EventTriggerOnce = require("./cocktail/@union/event/event_trigger_once");
// const EventTriggerHolder = require("./cocktail/@union/event/event_trigger_holder");
interface IAppParamsDemo extends CktlV3.IAppParams {
  globalData: {};
  abc: number
};
class AppParamsDemo implements CktlV3.IAppBase, IAppParamsDemo {
  globalData: {};
  abc: number;
  onShow = (options: CktlV3.AppLifeCycleParamOptions) => {
    if (this._params?.onShow) {

    }
  };

  private _params: IAppParamsDemo;
  constructor(params: IAppParamsDemo) {
    this._params = params;
    this.__service_block__ = {};
    // this.ec = new EventCenter
  }

  onLaunch() {

  };
  onHide () {

  };
  onError () {

  };
  onPageNotFound () {

  };

  __service_block__: Record<string, number>;
  ec: IEventCenter;
}

AppBase<IAppParamsDemo>({
  globalData: {},
  abc: 111,

  onShow(res) {
    // debugger
  },

  onLaunch() {

    // require("./cocktail/@union/debug/life_circle_printer_service").setApp(this);
    // const EventTriggerHolder = require("./cocktail/@union/event/EventTriggerHolder");

    // var a = new EventTriggerOnce(123, ()=>{}, 1, this.ec);
    // var b = new EventTriggerHolder(343, ()=>{}, 1, this.ec);

    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    //
    // // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res.code)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    // })
  },
});

export default {};//CktlV3.getApp();