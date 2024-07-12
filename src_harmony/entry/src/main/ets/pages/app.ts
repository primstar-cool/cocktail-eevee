import CktlV3 from '../cocktail/@union/core/cktlv3';
import AppBase, { CAppBase } from "../cocktail/@union/framework/app_base"

// const EventTriggerOnce = require("./cocktail/@union/event/event_trigger_once");
// const EventTriggerHolder = require("./cocktail/@union/event/event_trigger_holder");

interface IAppParamsDemo extends CktlV3.IAppParams {
  globalData: object;
  abc: number;
};

class AppParamsDemo extends CAppBase implements IAppParamsDemo {
  globalData: {};
  abc: number;

  constructor(appParams: IAppParamsDemo) {
    super(appParams);
    this.globalData = appParams.globalData;
    this.abc = appParams.abc;
  }
}

AppBase<IAppParamsDemo>(
  AppParamsDemo,
  {
    globalData: {},
    abc: 111,

    onShow(res) {
      // debugger
      console.log("AppBase onShow")
    },

    onLaunch() {
      console.log("IAppParamsDemo onLaunch");
    },
  }
);

export default CktlV3.getApp();