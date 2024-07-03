import {SystemEvent as FID} from '../../@compile/@enum/system_event'
import CktlV3 from "../../@compile/@types/framework"

export = function createMPPage<TPP extends CktlV3.IPageParams<TPP>>(pageParam: TPP) {

  console.ASSERT(pageParam && pageParam.pageName, 'every cocktail page should has a pageName for identity');

  getApp().ec.notify(FID.ON_PAGE_DATA_PREPARING, pageParam);

  if (!pageParam.onShow) {
    pageParam.onShow = basePageOnShow;
  } else {
    pageParam.onShow = (function(oldFunc) {
      return function(this: CktlV3.IPageBase<TPP>) {
        basePageOnShow.call(this);
        oldFunc.call(this);
      };
    })(pageParam.onShow);
  }

  if (!pageParam.onHide) {
    pageParam.onHide = basePageOnHide;
  } else {
    pageParam.onHide = (function(oldFunc) {
      return function(this: CktlV3.IPageBase<TPP>) {
        basePageOnHide.call(this);
        oldFunc.call(this);
      };
    })(pageParam.onHide);
  }

  if (!pageParam.onReady) {
    pageParam.onReady = basePageOnReady;
  } else {
    pageParam.onReady = (function(oldFunc) {
      return function(this: CktlV3.IPageBase<TPP>) {
        basePageOnReady.call(this);
        oldFunc.call(this);
      };
    })(pageParam.onReady);
  }

  

  pageParam.onLoad = (function(oldFunc) {
    return function(this: CktlV3.IPageBase<TPP>, options: CktlV3.PageLifeCycleParamQuery) {
      var app = getApp();
      app.ec.notify(FID.ON_PAGE_LOADING, { pageName: this.pageName, options, page: this });

      // const storage = require("../../platform_mp/utils/storage.js")
      // let _SWTICHTAB_QUERY = storage.getSessionStorageSync("_SWTICHTAB_QUERY");
      // if (_SWTICHTAB_QUERY) {
      //   storage.setSessionStorageSync("_SWTICHTAB_QUERY", undefined);
      //   if (_SWTICHTAB_QUERY.route === "/" + this.__route__ && Date.now() < _SWTICHTAB_QUERY.ts + 1000) {
      //     console.log("append switchtab session storage;: %O", options);
      //     Object.assign(options, _SWTICHTAB_QUERY.query);
      //   }
      // }

      if (typeof oldFunc === 'function') {
        oldFunc.call(this, options);
      }
      app.ec.notify(FID.ON_PAGE_LOADED, { pageName: this.pageName, options, page: this });
    };
  })(pageParam.onLoad);

  pageParam.onUnload = (function(oldFunc) {
    return function(this: CktlV3.IPageBase<TPP>) {
      var app = getApp();
      app.ec.notify(FID.ON_PAGE_UNLOADING, { pageName: this.pageName, page: this });
      if (typeof oldFunc === 'function') {
        oldFunc.call(this);
      }
      app.ec.notify(FID.ON_PAGE_UNLOADED, { pageName: this.pageName, page: this });
    };
  })(pageParam.onUnload);

  // if (!pageParam.onPullDownRefresh) {
  //   pageParam.onPullDownRefresh = basePageOnPullDownRefresh;
  // } else {
  //   pageParam.onPullDownRefresh = (function(oldFunc) {
  //     return function(options) {
  //       basePageOnPullDownRefresh.call(this, options);
  //       oldFunc.call(this, options);
  //     };
  //   })(pageParam.onPullDownRefresh);
  // }

  (pageParam as any).setTitle = function (title: string) {
    wx.setNavigationBarTitle({title});
  };

  function basePageOnShow(this: CktlV3.IPageBase<TPP>) {
    getApp().ec.notify(FID.ON_PAGE_SHOW, { pageName: this.pageName, page: this });
  }

  function basePageOnHide(this: CktlV3.IPageBase<TPP>) {
    getApp().ec.notify(FID.ON_PAGE_HIDE, { pageName: this.pageName, page: this });
  }

  function basePageOnReady(this: CktlV3.IPageBase<TPP>) {
    getApp().ec.notify(FID.ON_PAGE_READY, { pageName: this.pageName, page: this });
  }

  // function basePageOnPullDownRefresh() {
  //   getApp().ec.notify(FID.ON_PAGE_PULL_DOWN_REFRESH, { pageName: this.pageName, page: this });
  // }
  
  /*DEBUG_START*/
  const {IS_WXMP, IS_TTMA, IS_SWAN, IS_KSMP, IS_ALIMP} = require("../../@compile/target_compile_platform.js");
  IS_WXMP && (pageParam.data && (pageParam.data["IS_" + "WXMP"] = 1));
  IS_TTMA && (pageParam.data && (pageParam.data["IS_" + "TTMA"] = 1));
  IS_SWAN && (pageParam.data && (pageParam.data["IS_" + "SWAN"] = 1));
  IS_KSMP && (pageParam.data && (pageParam.data["IS_" + "KSMP"] = 1));
  IS_ALIMP && (pageParam.data && (pageParam.data["IS_" + "ALIMP"] = 1));
  /*DEBUG_END*/
  
  Page(pageParam as any);
}


