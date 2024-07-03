import CktlV3Framework from "../../@compile/@types/framework"
import CktlV3Event from "../../@compile/@types/event"

export namespace CktlV3 {

  export type IAppBase = CktlV3Framework.IAppBase;
  export type IAppParams = CktlV3Framework.IAppParams;
  export type AppLifeCycleParamQuery = CktlV3Framework.AppLifeCycleParamQuery;
  export type AppLifeCycleParamAny = CktlV3Framework.AppLifeCycleParamQuery;

  export type IPageParams<TPP extends IPageParams<TPP>> = CktlV3Framework.IPageParams<TPP>;
  export type IPageMixed<TPage extends IPageBase<TPage>> = CktlV3Framework.IPageMixed<TPage>;

  export type IPageBase<TPB extends IPageParams<TPB>> = CktlV3Framework.IPageBase<TPB>;
  export type IPageBaseWithMixed<TPage extends IPageBaseWithMixed<TPage>> = CktlV3Framework.IPageBaseWithMixed<TPage>;

  export type PageMixedCreator<TPage extends IPageBaseWithMixed<TPage>> = CktlV3Framework.PageMixedCreator<TPage>;

  export type PageLifeCycleParamQuery = CktlV3Framework.PageLifeCycleParamQuery;
  export type PageEvent = CktlV3Framework.PageEvent;
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
  
}

export default CktlV3;