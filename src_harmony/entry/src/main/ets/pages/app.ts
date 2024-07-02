import { IEventCenter } from '../cocktail/@compile/@types/event';
import { IAppBaseLifeCycleQuery, IAppBaseLifeCycleVoid } from '../cocktail/@compile/@types/framework';

import CktlV3 from '../cocktail/platform_harmony/core/cktlv3';
import AppBase, { CAppBase } from "../cocktail/platform_harmony/framework/app_base"

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
  (params: IAppParamsDemo) => new AppParamsDemo(params),
  {
    globalData: {},
    abc: 111,

    onShow(res) {
      // debugger
    },

    onLaunch() {
      console.log("IAppParamsDemo onLaunch");
    },
  }
);

export default CktlV3.getApp();