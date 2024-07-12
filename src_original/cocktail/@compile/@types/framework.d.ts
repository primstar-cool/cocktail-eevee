
import CktlV3Event from "./event";

declare namespace CktlV3 {
  // type SimpleObject = Record<string, number|string|boolean|null|undefined>
  // type SimpleObjectTree = Record<string, number|string|boolean|null|undefined|SimpleObject>

  // <T extends IAnyObject>(options: Options<T>): void
  export interface IAppDefine {
    // globalData?: any,
    onShow?: IAppBaseLifeCycleOptions;
    onLaunch?: IAppBaseLifeCycleOptions;
    onHide?: IAppBaseLifeCycleVoid;
    onError?: IAppBaseLifeCycleAny;
    onPageNotFound?: IAppBaseLifeCycleQuery;
  }

  interface IAppBase extends IAppDefine {

    $regNextPageRoute: (pageName: string) => void;
    __service_block__: Record<string, number>;

    ec: CktlV3Event.IEventCenter;
    onShow: IAppBaseLifeCycleOptions;
    onLaunch: IAppBaseLifeCycleOptions;
    onPageNotFound: IAppBaseLifeCycleQuery;
    onHide: IAppBaseLifeCycleVoid;
    onError: IAppBaseLifeCycleAny;
  }



  // interface AppParams extends AppParamsDefault {}

  type AppLifeCycleParamAny = Record<string, number|string>;
  type AppLifeCycleParamQuery = Record<string, string>;
  interface AppLifeCycleParamOptions {
    query: AppLifeCycleParamQuery;
    mode?: string, path: string;
    scene?:string;
    referrerInfo?: object
  }


  type IAppBaseLifeCycleAny = (this: IAppBase, err: AppLifeCycleParamAny) => void;
  type IAppBaseLifeCycleVoid = (this: IAppBase) => void;
  type IAppBaseLifeCycleQuery = (this: IAppBase, options: AppLifeCycleParamQuery) => void;
  type IAppBaseLifeCycleOptions = (this: IAppBase, options: AppLifeCycleParamOptions) => void;


  type IAppCreator = <T extends IAppDefine>(appParams: T) => void|(IAppBase & T);

  function getApp() :IAppBase;

}

declare namespace CktlV3 {
  interface IPageDefine {
    pageName: string;
    data?: any,
    onLoad?: IPageBaseLifeCycleQuery;
    onShow?: IPageBaseLifeCycleVoid;
    onReady?: IPageBaseLifeCycleVoid;
    onHide?: IPageBaseLifeCycleVoid;
    onUnload?: IPageBaseLifeCycleVoid;
  }

  interface IPageBase extends IPageDefine {
    data: any;
    route: string;
    setData: (newData: object, renderCallback?: () => void) => void;

    onLoad: IPageBaseLifeCycleQuery;
    onReady: IPageBaseLifeCycleVoid;
    onHide: IPageBaseLifeCycleVoid;
    onUnload: IPageBaseLifeCycleVoid;
    setTitle: (title: string) => void;

  }

  interface IDispose {
    dispose: () => void;
  }
  interface IDisposePage {
    dispose: (pageBase: IPageBase) => void;
  }


  type PageLifeCycleParamAny = object;
  type PageLifeCycleParamQuery = {query: Record<string, string>};

  type IPageBaseLifeCycleVoid = (this: IPageBase) => void;
  type IPageBaseLifeCycleQuery = (this: IPageBase, options: PageLifeCycleParamQuery) => void;

  type IPageCreator = <T extends IPageDefine>(pageParams: IPageDefine & T) => void|IPageBase;

  interface PageEventTarget {
    id?: string,
    dataset: Record<string, number|string|object|boolean|object>
  }

  interface PageEvent {
    type: string,
    target: PageEventTarget,
    currentTarget: PageEventTarget,
  }

  type PageEventMethod = ((e?: CktlV3.PageEvent) => void)|(() => void);
}

declare namespace CktlV3 {

  type ComponentBase = {
    data: object,
  };

  interface ComponentParamsOption {
    multipleSlots?: boolean // 在组件定义时的选项中启用多slot支持
  }

  interface ComponentParamsLifetimes {
    created?: (this: ComponentBase) => void;
    attached?: (this: ComponentBase) => void;
    detached?: (this: ComponentBase) => void;
    ready?: (this: ComponentBase) => void;
  }
  interface ComponentParamsPageLifetimes {
    show: (this: ComponentBase) => void;
    hide: (this: ComponentBase) => void;
    // resize: (this: ComponentBase, size: any) => void;
  }

  interface ComponentParams {
    /**
     * 组件的属性列表
     */
    options?: ComponentParamsOption;
    data?: any;
    properties?: any;
    lifetimes?: ComponentParamsLifetimes,
    pageLifetimes?: ComponentParamsPageLifetimes,
    methods?: Record<string, (this: ComponentBase, ...args: object[])=>void>
  }

  type IComponentRegister = (componentParams: ComponentParams) => void|ComponentBase
  type IComponentRegisterWithName = (componentName: string, componentParams: ComponentParams) => void|ComponentBase


}
declare namespace CktlV3 {

  interface IPageBaseWithMixed extends IPageDefine {
    $pageMixedInfo?: PageMixedInfo;
  }

  interface PageMixedInfo {
    $specMixedInstanceArray?: Array<IPageMixed>;
    $mixedInstanceArray?: Array<IPageMixed>;
    $debugRawFunctionMap?: String[];
    $unloadChecker?: IDispose;
  }

  type IComponentCreator = (componentParams: ComponentParams) => void|ComponentBase;

  interface PageMixedFunction {
    name: string;
    func: (e?: PageEvent) => void;
  }

  interface IPageMixed {
    getPrivateData?: (page: IPageBaseWithMixed) => object;
    getPrivateFunction?:(page: IPageBaseWithMixed & IPageBase) => Record<string, undefined|PageEventMethod>;
    onPageInit?: (page: IPageBaseWithMixed & IPageBase, options?: PageLifeCycleParamQuery) => void;
    dispose?: (page: IPageBaseWithMixed) => void;
  }

  type PageMixedClass = new() => IPageMixed;
  type PageMixedCreator = () => IPageMixed;



}

export = CktlV3;