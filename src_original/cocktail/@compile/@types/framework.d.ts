/// <reference path="./event.d.ts" />

declare namespace CktlV3 {
  // type SimpleObject = Record<string, number|string|boolean|null|undefined>
  // type SimpleObjectTree = Record<string, number|string|boolean|null|undefined|SimpleObject>


  // <T extends IAnyObject>(options: Options<T>): void
  interface IAppParams {
    // globalData?: any, 
    onShow?: IAppBaseLifeCycleOptions;
    onLaunch?: IAppBaseLifeCycleOptions;
    onHide?: IAppBaseLifeCycleVoid;
    onError?: IAppBaseLifeCycleAny;
    onPageNotFound?: IAppBaseLifeCycleQuery;
  }

  interface IAppBase extends IAppParams{

    __service_block__: Record<string, number>;
    ec: IEventCenter;
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

  
  type IAppCreator = <T extends IAppParams>(appParams: T) => void|(IAppBase & T);
}

declare namespace CktlV3 {
  interface IPageParams<TPP extends IPageParams<TPP>> {
    pageName: string;
    data?: any,
    onLoad?: IPageBaseLifeCycleQuery<TPP>;
    onShow?: IPageBaseLifeCycleVoid<TPP>;
    onReady?: IPageBaseLifeCycleVoid<TPP>;
    onHide?: IPageBaseLifeCycleVoid<TPP>;
    onUnload?: IPageBaseLifeCycleVoid<TPP>;
  }

  interface IPageBase<TPB extends IPageParams<TPB>> extends IPageParams<TPB> {
    data: any;
    route: string;
    setData: (newData: object, renderCallback?: () => void) => void;

    onLoad: IPageBaseLifeCycleQuery<TPB>;
    onShow: IPageBaseLifeCycleVoid<TPB>;
    onReady: IPageBaseLifeCycleVoid<TPB>;
    onHide: IPageBaseLifeCycleVoid<TPB>;
    onUnload: IPageBaseLifeCycleVoid<TPB>;
    setTitle: (title: string) => void;
    
  }

  interface IDispose {
    dispose: () => void;
  }
  interface IDisposePage<TPB extends IPageBase<TPB>> {
    dispose: (pageBase: IPageBase<TPB>) => void;
  }

  
  type PageLifeCycleParamAny = object;
  type PageLifeCycleParamQuery = {query: {[""]?:string}};

  type IPageBaseLifeCycleVoid<TPB extends IPageParams<TPB>> = <TPB extends IPageParams<TPB>>(this: IPageBase<TPB>) => void;
  type IPageBaseLifeCycleQuery<TPB extends IPageParams<TPB>> = <TPB extends IPageParams<TPB>>(this: IPageBase<TPB>, options: PageLifeCycleParamQuery) => void;
  
  // type IPageCreator = (pageParams: IPageParams) => void|PageBase;
  type IPageCreator = <TPP extends IPageParams<TPP>>(appParams: TPP) => void|TPP;

  type PageEvent = {
    target: object,
    currentTarget: object,
  }
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

}
declare namespace CktlV3 {

  interface PageBaseWithMixed<TPage extends PageBaseWithMixed<TPage>> extends IPageParams<TPage> {
    $pageMixedInfo?: PageMixedInfo<TPage>;

    data: any;
    route: string;
    setData: (newData: object, renderCallback?: () => void) => void;
  }

  interface PageMixedInfo<TPage extends IPageParams<TPage>> {
    $specMixedInstanceArray?: Array<IPageMixed<TPage>>;
    $mixedInstanceArray?: Array<IPageMixed<TPage>>;
    $debugRawFunctionMap?: String[];
    $unloadChecker?: IDispose;
  }

  type IComponentCreator = (componentParams: ComponentParams) => void|ComponentBase;

  interface PageMixedFunction {
    name: string;
    func: (e?: PageEvent) => void;
  }

  interface IPageMixed<TPage extends IPageParams<TPage>> {
    getPrivateData?: (page: TPage) => object;
    getPrivateFunction?:(page: TPage) => Record<string, (e?: PageEvent) => void>;
    onPageInit?: (page: TPage, options?: PageLifeCycleParamQuery) => void;
    dispose?: (page: TPage) => void;
  }

  type PageMixedClass<T extends PageBaseWithMixed<T>> = new() => IPageMixed<T>;
  type PageMixedCreator<T extends PageBaseWithMixed<T>> = () => IPageMixed<T>;

  
}
