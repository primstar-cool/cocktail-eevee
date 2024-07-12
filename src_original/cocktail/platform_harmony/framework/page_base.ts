import CktlV3Framework from "../../@compile/@types/framework"
import CktlV3 from "../core/cktlv3"
import {SystemEvent as FID} from '../../@compile/@enum/system_event'



export class CPageBase implements CktlV3.IPageBase {

  pageName: string;
  data: any;
  setData(_newData: object, renderCallback?: () => void) {

  }

  onLoad(options: CktlV3Framework.PageLifeCycleParamQuery): void {
    console.log("onLsssoad");

    if (this.pageDefine.onLoad)
      this.pageDefine.onLoad.call(this, options)
    // console.log(JSON.stringify(options))
  }

  public onReady(): void {

  }
  public onHide(): void {
  
  }
  public onUnload(): void {
  
  }
  public setTitle(_title: string): void {

  }
  // protected readonly pageDefine: CktlV3Framework.IPageDefine;

  constructor(protected readonly pageDefine: CktlV3Framework.IPageDefine, public readonly route: string ) {
    console.log("CPageBase constructor")
    // this.pageDefine = pageDefine;
    this.pageName = pageDefine.pageName;
    this.data = Object.assign({}, pageDefine.data);
    
    // this.onLoad({query: {"asd": '2323'}})

  }
}

type PageBaseClass<TPP extends CktlV3Framework.IPageDefine> = new (param: TPP) => (CktlV3Framework.IPageBase & TPP);


export default function createHarmonyPage<TPP extends CktlV3Framework.IPageDefine>(pageClass: PageBaseClass<TPP> , pageDefineParam: TPP) {

  // CktlV3.ASSERT(pageDefineParam && pageDefineParam.pageName, 'every cocktail page should has a pageName for identity');
  //
  //
  // CktlV3.getApp().ec.notify(FID.ON_PAGE_DATA_PREPARING, pageDefineParam);
  //
  // if (!pageDefineParam.onShow) {
  //   pageDefineParam.onShow = basePageOnShow;
  // } else {
  //   pageDefineParam.onShow = (function(oldFunc) {
  //     return function(this: CktlV3.IPageBase<TPP>) {
  //       basePageOnShow.call(this);
  //       oldFunc.call(this);
  //     };
  //   })(pageDefineParam.onShow);
  // }
  //
  // if (!pageDefineParam.onHide) {
  //   pageDefineParam.onHide = basePageOnHide;
  // } else {
  //   pageDefineParam.onHide = (function(oldFunc) {
  //     return function(this: CktlV3.IPageBase<TPP>) {
  //       basePageOnHide.call(this);
  //       oldFunc.call(this);
  //     };
  //   })(pageDefineParam.onHide);
  // }
  //
  // if (!pageDefineParam.onReady) {
  //   pageDefineParam.onReady = basePageOnReady;
  // } else {
  //   pageDefineParam.onReady = (function(oldFunc) {
  //     return function(this: CktlV3.IPageBase<TPP>) {
  //       basePageOnReady.call(this);
  //       oldFunc.call(this);
  //     };
  //   })(pageDefineParam.onReady);
  // }
  //
  //
  //
  // pageDefineParam.onLoad = (function(oldFunc) {
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
  // })(pageDefineParam.onLoad);
  //
  // pageDefineParam.onUnload = (function(oldFunc) {
  //   return function(this: CktlV3.IPageBase<TPP>) {
  //     const app = CktlV3.getApp();
  //     app.ec.notify(FID.ON_PAGE_UNLOADING, { pageName: this.pageName, page: this });
  //     if (typeof oldFunc === 'function') {
  //       oldFunc.call(this);
  //     }
  //     app.ec.notify(FID.ON_PAGE_UNLOADED, { pageName: this.pageName, page: this });
  //   };
  // })(pageDefineParam.onUnload);
  //
  // // if (!pageDefineParam.onPullDownRefresh) {
  // //   pageDefineParam.onPullDownRefresh = basePageOnPullDownRefresh;
  // // } else {
  // //   pageDefineParam.onPullDownRefresh = (function(oldFunc) {
  // //     return function(options) {
  // //       basePageOnPullDownRefresh.call(this, options);
  // //       oldFunc.call(this, options);
  // //     };
  // //   })(pageDefineParam.onPullDownRefresh);
  // // }
  //
  // // (pageDefineParam as any).setTitle = function (title: string) {
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
  // if (pageDefineParam.data) {
  //   pageDefineParam.data["IS_" + "WXMP"] = 0;
  //   pageDefineParam.data["IS_" + "TTMA"] = 0;
  //   pageDefineParam.data["IS_" + "SWAN"] = 0;
  //   pageDefineParam.data["IS_" + "KSMP"] = 0;
  //   pageDefineParam.data["IS_" + "ALIMP"] = 0;
  //   pageDefineParam.data["IS_" + "HARMONY"] = 1;
  // }
  // /*DEBUG_END*/
  
  return (): (CktlV3Framework.IPageBase & TPP) => {

    let newPage: (CktlV3Framework.IPageBase & TPP) = new pageClass(pageDefineParam);

    return newPage; //clone
  };
}
