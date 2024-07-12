import CktlV3Framework from "../../@compile/@types/framework"
import CktlV3Event from "../../@compile/@types/event"
import CktlV3 from "../core/cktlv3"
import {SystemEvent as FID} from '../../@compile/@enum/system_event'



export class CPageBase implements CktlV3.IPageBase {

  pageName: string;
  data: object;
  setData(newData: object, renderCallback?: () => void): void {

  }

  onLoad(options:  CktlV3Framework.PageLifeCycleParamQuery): void {
    console.log("onLsssoad");

    if (this.pageParams.onLoad)
      this.pageParams.onLoad.call(this, options)
    // console.log(JSON.stringify(options))
  };
  public onReady: CktlV3Framework.IPageBaseLifeCycleVoid;
  public onHide: CktlV3Framework.IPageBaseLifeCycleVoid;
  public onUnload: CktlV3Framework.IPageBaseLifeCycleVoid;
  public setTitle: (title: string) => void;
  // protected readonly pageParams: CktlV3Framework.IPageDefine;

  constructor(protected readonly pageParams: CktlV3Framework.IPageDefine, public readonly route: string ) {
  console.log("CPageBase constructor")
    // this.pageParams = pageParams;
    this.pageName = pageParams.pageName;
    this.data = Object.assign({}, pageParams.data);

    console.log(typeof this.onLoad + " " + this.data.text);
    console.log(this.onLoad.toString());

    this.onLoad({query: {"asd": '2323'}})

    console.log("onLoad end" + " " + this.data.text);

  }
}

type PageBaseClass<TPP extends CktlV3Framework.IPageDefine> = new (param: TPP) => (CktlV3Framework.IPageBase & TPP);


export default function createHarmonyPage<TPP extends CktlV3Framework.IPageDefine>(pageClass: PageBaseClass<TPP>, route: string , pageParam: TPP) {

  // CktlV3.ASSERT(pageParam && pageParam.pageName, 'every cocktail page should has a pageName for identity');
  //
  //
  // CktlV3.getApp().ec.notify(FID.ON_PAGE_DATA_PREPARING, pageParam);
  //
  // if (!pageParam.onShow) {
  //   pageParam.onShow = basePageOnShow;
  // } else {
  //   pageParam.onShow = (function(oldFunc) {
  //     return function(this: CktlV3.IPageBase<TPP>) {
  //       basePageOnShow.call(this);
  //       oldFunc.call(this);
  //     };
  //   })(pageParam.onShow);
  // }
  //
  // if (!pageParam.onHide) {
  //   pageParam.onHide = basePageOnHide;
  // } else {
  //   pageParam.onHide = (function(oldFunc) {
  //     return function(this: CktlV3.IPageBase<TPP>) {
  //       basePageOnHide.call(this);
  //       oldFunc.call(this);
  //     };
  //   })(pageParam.onHide);
  // }
  //
  // if (!pageParam.onReady) {
  //   pageParam.onReady = basePageOnReady;
  // } else {
  //   pageParam.onReady = (function(oldFunc) {
  //     return function(this: CktlV3.IPageBase<TPP>) {
  //       basePageOnReady.call(this);
  //       oldFunc.call(this);
  //     };
  //   })(pageParam.onReady);
  // }
  //
  //
  //
  // pageParam.onLoad = (function(oldFunc) {
  //   return function(this: CktlV3.IPageBase<TPP>, options: CktlV3.PageLifeCycleParamQuery) {
  //     const app = CktlV3.getApp();
  //     app.ec.notify(FID.ON_PAGE_LOADING, { pageName: this.pageName, options, page: this });
  //
  //     // const storage = require("../../platform_mp/utils/storage.js")
  //     // let _SWTICHTAB_QUERY = storage.getSessionStorageSync("_SWTICHTAB_QUERY");
  //     // if (_SWTICHTAB_QUERY) {
  //     //   storage.setSessionStorageSync("_SWTICHTAB_QUERY", undefined);
  //     //   if (_SWTICHTAB_QUERY.route === "/" + this.__route__ && Date.now() < _SWTICHTAB_QUERY.ts + 1000) {
  //     //     console.log("append switchtab session storage;: %O", options);
  //     //     Object.assign(options, _SWTICHTAB_QUERY.query);
  //     //   }
  //     // }
  //
  //     if (typeof oldFunc === 'function') {
  //       oldFunc.call(this, options);
  //     }
  //     app.ec.notify(FID.ON_PAGE_LOADED, { pageName: this.pageName, options, page: this });
  //   };
  // })(pageParam.onLoad);
  //
  // pageParam.onUnload = (function(oldFunc) {
  //   return function(this: CktlV3.IPageBase<TPP>) {
  //     const app = CktlV3.getApp();
  //     app.ec.notify(FID.ON_PAGE_UNLOADING, { pageName: this.pageName, page: this });
  //     if (typeof oldFunc === 'function') {
  //       oldFunc.call(this);
  //     }
  //     app.ec.notify(FID.ON_PAGE_UNLOADED, { pageName: this.pageName, page: this });
  //   };
  // })(pageParam.onUnload);
  //
  // // if (!pageParam.onPullDownRefresh) {
  // //   pageParam.onPullDownRefresh = basePageOnPullDownRefresh;
  // // } else {
  // //   pageParam.onPullDownRefresh = (function(oldFunc) {
  // //     return function(options) {
  // //       basePageOnPullDownRefresh.call(this, options);
  // //       oldFunc.call(this, options);
  // //     };
  // //   })(pageParam.onPullDownRefresh);
  // // }
  //
  // // (pageParam as any).setTitle = function (title: string) {
  // //   // TODO
  // // };
  //
  // function basePageOnShow(this: CktlV3.IPageBase<TPP>) {
  //   CktlV3.getApp().ec.notify(FID.ON_PAGE_SHOW, { pageName: this.pageName, page: this });
  // }
  //
  // function basePageOnHide(this: CktlV3.IPageBase<TPP>) {
  //   CktlV3.getApp().ec.notify(FID.ON_PAGE_HIDE, { pageName: this.pageName, page: this });
  // }
  //
  // function basePageOnReady(this: CktlV3.IPageBase<TPP>) {
  //   CktlV3.getApp().ec.notify(FID.ON_PAGE_READY, { pageName: this.pageName, page: this });
  // }
  //
  // // function basePageOnPullDownRefresh() {
  // //   getApp().ec.notify(FID.ON_PAGE_PULL_DOWN_REFRESH, { pageName: this.pageName, page: this });
  // // }
  //
  // /*DEBUG_START*/
  // if (pageParam.data) {
  //   pageParam.data["IS_" + "WXMP"] = 0;
  //   pageParam.data["IS_" + "TTMA"] = 0;
  //   pageParam.data["IS_" + "SWAN"] = 0;
  //   pageParam.data["IS_" + "KSMP"] = 0;
  //   pageParam.data["IS_" + "ALIMP"] = 0;
  //   pageParam.data["IS_" + "HARMONY"] = 1;
  // }
  // /*DEBUG_END*/
  
  return (): (CktlV3Framework.IPageBase & TPP) => {

    let newPage: (CktlV3Framework.IPageBase & TPP) = new pageClass(pageParam);

    console.log("this.data 110");
    console.log(Object.keys(newPage.data).join(", "));


    return newPage; //clone
  };
}
