import CktlV3 from '../cocktail/@union/core/cktlv3';
import AppBase, { CAppBase } from "../cocktail/@union/framework/app_base"

// const EventTriggerOnce = require("./cocktail/@union/event/event_trigger_once");
// const EventTriggerHolder = require("./cocktail/@union/event/event_trigger_holder");

interface IAppDefineDemo extends CktlV3.IAppDefine {
  globalData: object;
  abc: number;
};

class AppParamsDemo extends CAppBase implements IAppDefineDemo {
  globalData: {};
  abc: number;

  constructor(appParams: IAppDefineDemo) {
    super(appParams);
    this.globalData = appParams.globalData;
    this.abc = appParams.abc;
  }
}

AppBase<IAppDefineDemo>(
  AppParamsDemo,
  {
    globalData: {},
    abc: 111,

    onShow(res) {
      // debugger
      console.log("AppBase onShow")
    },

    onLaunch() {
      console.log("IAppDefineDemo onLaunch");
    },
  }
);

export default CktlV3.getApp();