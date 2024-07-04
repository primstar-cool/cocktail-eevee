import CktlV3Framework from "../../@compile/@types/framework"
import CktlV3Event from "../../@compile/@types/event"

/*DEBUG_START*/
import consoleExt from "../debug/console_extends"
/*DEBUG_END*/

export namespace CktlV3 {

  export type IAppBase = CktlV3Framework.IAppBase;
  export type IAppParams = CktlV3Framework.IAppParams;
  export type AppLifeCycleParamQuery = CktlV3Framework.AppLifeCycleParamQuery;
  export type AppLifeCycleParamAny = CktlV3Framework.AppLifeCycleParamQuery;

  export type IPageParams = CktlV3Framework.IPageParams;
  export type IPageMixed = CktlV3Framework.IPageMixed;

  export type IPageBase = CktlV3Framework.IPageBase;
  export type IPageBaseWithMixed = CktlV3Framework.IPageBaseWithMixed;

  export type PageMixedCreator = CktlV3Framework.PageMixedCreator;
  export type PageMixedClass = CktlV3Framework.PageMixedClass;

  export type PageLifeCycleParamQuery = CktlV3Framework.PageLifeCycleParamQuery;
  export type PageEvent = CktlV3Framework.PageEvent;
  export type PageMixedInfo = CktlV3Framework.PageMixedInfo;
  export type PageEventMethod = CktlV3Framework.PageEventMethod;



  export type ComponentParams = CktlV3Framework.ComponentParams;

  export type AppLifeCycleParamOptions = CktlV3Framework.AppLifeCycleParamOptions;
  export type IAppBaseLifeCycleOptions = CktlV3Framework.IAppBaseLifeCycleOptions;

  export type IDispose = CktlV3Framework.IDispose;

  //event
  export type EventID = CktlV3Event.EventID;
  export type IEventCenter = CktlV3Event.IEventCenter;
  export type EventCallback = CktlV3Event.EventCallback;
  export type EventTriggerHolderRefer = CktlV3Event.EventTriggerHolderRefer;
  
  ///harmony add
  let $app: CktlV3Framework.IAppBase;

  export function getApp() :CktlV3Framework.IAppBase {
    return $app;
  }

  export function $setApp(a_app: CktlV3Framework.IAppBase): void{
    console.ASSERT(!$app, 'error app set')
    $app = a_app;
  }


  /*DEBUG_START*/
  export const console = consoleExt;
  /*DEBUG_END*/
}

export default CktlV3;