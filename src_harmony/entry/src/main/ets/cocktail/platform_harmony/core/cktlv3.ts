import EventCenter from '../../@common/event/event_center';
import { IEventCenter } from '../../@compile/@types/event';
import CktlV3Framework from "../../@compile/@types/framework"
import CktlV3App from "../../platform_harmony/framework/app_base"

/*DEBUG_START*/
import consoleExt from "../debug/console_extends"
/*DEBUG_END*/


export namespace CktlV3 {

  export type IAppBase = CktlV3Framework.IAppBase;
  export type IAppParams = CktlV3Framework.IAppParams;
  export type AppLifeCycleParamQuery = CktlV3Framework.AppLifeCycleParamQuery;
  export type AppLifeCycleParamAny = CktlV3Framework.AppLifeCycleParamQuery;

  export type IPageParams<TPP extends IPageParams<TPP>> = CktlV3Framework.IPageParams<TPP>;
  export type IPageMixed<TPage extends IPageParams<TPage>> = CktlV3Framework.IPageMixed<TPage>;

  export type IPageBase<TPB extends IPageParams<TPB>> = CktlV3Framework.IPageBase<TPB>;
  export type PageBaseWithMixed<TPage extends PageBaseWithMixed<TPage>> = CktlV3Framework.PageBaseWithMixed<TPage>;

  export type PageMixedCreator<TPage extends PageBaseWithMixed<TPage>> = CktlV3Framework.PageMixedCreator<TPage>;

  export type PageLifeCycleParamQuery = CktlV3Framework.PageLifeCycleParamQuery;
  export type PageEvent = CktlV3Framework.PageEvent;

  export type ComponentParams = CktlV3Framework.ComponentParams;

  let $app: CktlV3Framework.IAppBase;

  export type AppLifeCycleParamOptions = CktlV3Framework.AppLifeCycleParamOptions;
  export type IAppBaseLifeCycleOptions = CktlV3Framework.IAppBaseLifeCycleOptions;

  export function getApp() :CktlV3Framework.IAppBase {
    return $app;
  }

  export function $setApp(a_app: CktlV3Framework.IAppBase): void{
    console.ASSERT(!$app, 'error app set')
    $app = a_app;
  }

  export function ASSERT(flag:boolean|any, ...args: any) :void {
    console.log(flag + "AAA")
  }

  /*DEBUG_START*/
  export const console = consoleExt;
  /*DEBUG_END*/
}

export default CktlV3;