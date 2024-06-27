declare namespace CktlV3 {

  type AppBase = {
    globalData?: any, 
    __service_block__: any,
    ec: IEventCenter,
    onShow: IAppBaseLifeCycleQuery,
    onLaunch: IAppBaseLifeCycleOptions,
    onPageNotFound: IAppBaseLifeCycleQuery,
    onHide: IAppBaseLifeCycleVoid,
    onError: IAppBaseLifeCycleAny,
  }

  type AppParams = {
    globalData?: any, 
    onShow?: IAppParamLifeCycleQuery|IAppBaseLifeCycleQuery,
    onLaunch?: IAppBaseLifeCycleOptions,
    onPageNotFound?: IAppParamLifeCycleQuery|IAppBaseLifeCycleQuery,

    onHide?: IAppParamLifeCycleVoid|IAppBaseLifeCycleVoid,
    onError?: IAppParamLifeCycleAny|IAppBaseLifeCycleAny,
  };

  type AppLifeCycleParamAny = {[key:string]: any};
  type AppLifeCycleParamQuery = {query: {[""]?:any, [key:string]: any}, [key:string]: any};
  type AppLifeCycleParamOptions = {query: AppLifeCycleParamQuery, mode: string, path: string, scene?:string, referrerInfo?: {}};

  type IAppParamLifeCycleVoid = () => void;
  type IAppParamLifeCycleAny = (options: AppLifeCycleParamAny) => void;
  type IAppParamLifeCycleQuery = (options: AppLifeCycleParamQuery) => void;
  // type IAppParamLifeCycleOptions = (options: AppLifeCycleParamQuery) => void;

  type IAppBaseLifeCycleVoid = (this: AppBase) => void;
  type IAppBaseLifeCycleAny = (this: AppBase, options: AppLifeCycleParamAny) => void;
  type IAppBaseLifeCycleQuery = (this: AppBase, options: AppLifeCycleParamQuery) => void;
  type IAppBaseLifeCycleOptions = (this: AppBase, options: AppLifeCycleParamOptions) => void;

  type IAppCreator = (appParams: AppParams) => void|AppBase;

  interface PageBaseDefault {
    pageName: string,
    data: {[key:string]: any},
    route: string,
    onLoad: IPageBaseLifeCycleQuery,
    onShow: IPageBaseLifeCycleVoid,
    onReady: IPageBaseLifeCycleVoid,
    onHide: IPageBaseLifeCycleQuery,
    onUnload: IPageBaseLifeCycleQuery,
    setTtile: (title: string) => void,
    setData: (newData: {[key:string]: any}, renderCallback?: () => void) => void,
  }

  type PageBaseFunction = (this: PageBase, ...args: any[]) => any;
  interface PageBaseOther {
    [key: string]: PageBaseFunction|undefined|null
  }
  interface PageParamsOther {
    [key: string]: PageBaseFunction|string|undefined|null|{[key:string]: any}
  }
  
  type PageBase = PageBaseDefault & PageBaseOther;

  type PageParams = {
    pageName: string,
    data?: {[key:string]: any},
    onLoad?: IPageBaseLifeCycleQuery,
    onShow?: IPageBaseLifeCycleVoid,
    onReady?: IPageBaseLifeCycleVoid,
    onHide?: IPageBaseLifeCycleVoid,
    onUnload?: IPageBaseLifeCycleVoid,
  } & PageParamsOther;

  type PageLifeCycleParamAny = {[key:string]: any};
  type PageLifeCycleParamQuery = {query: {[""]?:any}};
  
  // type IPageParamLifeCycleVoid = () => void;
  // type IPageParamLifeCycleQuery = (options: PageLifeCycleParamQuery) => void;
  // // type IAppParamLifeCycleOptions = (options: AppLifeCycleParamQuery) => void;

  type IPageBaseLifeCycleVoid = (this: PageBase) => void;
  type IPageBaseLifeCycleQuery = (this: PageBase, options: PageLifeCycleParamQuery) => void;
  
  type IPageCreator = (pageParams: PageParams) => void|PageBase;

  type ComponentParams = {
    options?: {
      multipleSlots?: boolean // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    data?: {[key:string]: {type: any,value?: any}|Boolean|String|Number},
    properties?: {[key:string]: {type: any,value?: any}|Boolean|String|Number},
    lifetimes?: {
      created?: (this: ComponentBase) => void,
      attached?: (this: ComponentBase) => void,
      deattached?: (this: ComponentBase) => void,
      ready?: (this: ComponentBase) => void,
    },
    pageLifetimes?: {
      show: (this: ComponentBase) => void,
      hide: (this: ComponentBase) => void,
      resize: (this: ComponentBase, size: any) => void,
    }
    methods?: {[key:string]: (this: ComponentBase, ...args: any[])=>any}
    
  };

  type ComponentBase = {
    data: {[key:string]: any},
    //@ts-ignore 1336
  } & {[key: Exclude<string & keyof any, "data"|"properties">]: (this: ComponentBase, ...args: any[]) => any};
  
  type IComponentCreator = (componentParams: ComponentParams) => void|ComponentBase;

  interface IPageMixed {
    getPrivateData?: (page: PageBase) => object,
    injectPrivateFunction?: (page: PageBase & PageBaseOther) => void,
    onPageInit?: (page: PageBase, options?: CktlV3.PageLifeCycleParamQuery) => void,
    dispose?: (page: PageBase) => void,
  }

  type PageMixedClass = new() => IPageMixed;

  
}
