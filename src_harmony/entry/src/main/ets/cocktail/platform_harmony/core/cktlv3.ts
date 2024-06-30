
import CktlV3Framework from "../../@compile/@types/framework"

export default CktlV3;
namespace CktlV3 {

  export type IAppBase = CktlV3Framework.IAppBase;
  export type IAppParams = CktlV3Framework.IAppParams;

  export type IPageParams<TPP extends IPageParams<TPP>> = CktlV3Framework.IPageParams<TPP>;
  export type IPageMixed<TPage extends IPageParams<TPage>> = CktlV3Framework.IPageMixed<TPage>;

  export type IPageBase<TPB extends IPageParams<TPB>> = CktlV3Framework.IPageBase<TPB>;
  export type PageBaseWithMixed<TPage extends PageBaseWithMixed<TPage>> = CktlV3Framework.PageBaseWithMixed<TPage>;

  export type PageMixedCreator<TPage extends PageBaseWithMixed<TPage>> = CktlV3Framework.PageMixedCreator<TPage>;

  export type PageLifeCycleParamQuery = CktlV3Framework.PageLifeCycleParamQuery;
  export type PageEvent = CktlV3Framework.PageEvent;

  export type ComponentParams = CktlV3Framework.ComponentParams;

  export let g_app: CktlV3Framework.IAppParams;

  export type AppLifeCycleParamOptions = CktlV3Framework.AppLifeCycleParamOptions;
  export type IAppBaseLifeCycleOptions = CktlV3Framework.IAppBaseLifeCycleOptions;

  export function getApp() :CktlV3Framework.IAppParams {
    return {};
  }

  export  function ASSERT(flag:boolean|any, ...args: any) :void {
    console.log(flag + "AAA")
  }

}