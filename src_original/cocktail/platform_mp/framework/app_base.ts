import {SystemEvent as FID} from '../../@compile/@enum/system_event'
import CktlV3 from "../../@compile/@types/framework"

export = function createMPApp<TAPP extends CktlV3.IAppDefine>(appParam: TAPP) {
  
  /*DEBUG_START*/
  require("../../@union/debug/console_extends");
  /*DEBUG_END*/

  //阿里小程序 APP是个闭包, my在require里也拿不到, 非常麻烦
  const MPAppCreator = App;
  
  const {IS_WXMP} = require('../../@compile/target_compile_platform.js');
           
  if (!appParam.onShow) {
    appParam.onShow = baseAppOnShow;
  } else {
    appParam.onShow = (function(oldFunc) {
      return function(this: CktlV3.IAppBase, options: CktlV3.AppLifeCycleParamOptions):void {
        baseAppOnShow.call(this, options);
        oldFunc.call(this, options);
      };
    })(appParam.onShow);
  }

  if (!appParam.onHide) {
    appParam.onHide = baseAppOnHide;
  } else {
    appParam.onHide = (function(oldFunc) {
      return function(this: CktlV3.IAppBase):void {
        baseAppOnHide.call(this);
        oldFunc.call(this);
      };
    })(appParam.onHide);
  }

  appParam.onLaunch = (function(oldFunc) {
    return function(this: CktlV3.IAppBase, options: CktlV3.AppLifeCycleParamOptions) {
      this.__service_block__ = {};

      //nc的阿里小程序先Page init, 再page_base在此抹平
      if (!this.ec) {
        let EventCenter = require('../../@union/event/event_center').default;
        // debugger
        this.ec = new EventCenter('APP_EVENT_CENTER');
      }

      if (options) {
        if (typeof oldFunc === 'function') {
          oldFunc.call(this, options);
        }

        this.ec.notify(FID.ON_APP_LAUNCH, { options });
        
        //百度小程序已对齐
        // if (typeof swan !== 'undefined') {
        //   this.onShow(options); //nc的百度小程序先onShow 再 onLaunch 在此抹平
        // }
      }
    };
  })(appParam.onLaunch);

  if (!appParam.onError) {
    appParam.onError = baseAppOnError;
  } else {
    appParam.onError = (function(oldFunc) {
      return function(this: CktlV3.IAppBase, error: CktlV3.AppLifeCycleParamAny): void {
        baseAppOnError.call(this, error);
        oldFunc.call(this, error);
      };
    })(appParam.onError);
  }


  if (!appParam.onPageNotFound) {
    appParam.onPageNotFound = baseAppOnPageNotFound;
  } else {
    appParam.onPageNotFound = (function (oldFunc) {
      return function (this: CktlV3.IAppBase, err: CktlV3.AppLifeCycleParamQuery): void {
        baseAppOnPageNotFound.call(this, err);
        oldFunc.call(this, err);
      };
    })(appParam.onPageNotFound);
  }

  function baseAppOnPageNotFound(this: CktlV3.IAppBase, res: CktlV3.AppLifeCycleParamQuery) {
    // debugger
    if (IS_WXMP) {
      if (res.query) {
        delete (res as any).query[""];
      }
    }
    this.ec.notify(FID.ON_PAGE_NOT_FOUND, res);
  }

  function baseAppOnShow(this: CktlV3.IAppBase, options: CktlV3.AppLifeCycleParamOptions):void {
    if (this.ec) // nc的百度小程序先onShow 再 onLaunch 在此抹平
    {
      if (!options.query) {
        console.ASSERT(typeof tt !== 'undefined');
        options.query = {};
      }
      this.ec.notify(FID.ON_APP_SHOW, { options });
    } 
  }

  function baseAppOnHide(this: CktlV3.IAppBase) {
    this.ec.notify(FID.ON_APP_HIDE);
  }

  function baseAppOnError(this: CktlV3.IAppBase, error: CktlV3.AppLifeCycleParamAny): void {
    console.error(error);
    if (this.ec) {
      this.ec.notify(FID.ON_APP_ERROR, { error });
    }
  }
  MPAppCreator(appParam as any);

};
