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

  type IAppCreator = (appParam: AppParams) => void|AppBase;



  type PageBase = {
    pageName: string,
    data: object,
    route: string,
    onLoad: IPageBaseLifeCycleQuery,
    onShow: IPageBaseLifeCycleVoid,
    onReady: IPageBaseLifeCycleVoid,
    onHide: IPageBaseLifeCycleQuery,
    onUnload: IPageBaseLifeCycleQuery,
    setTtile: (title: string)=>void,
  } & {[key: string]: (this: PageBase, ...args: any[]) => any};

  type PageParams = {
    pageName: string,
    data?: {[key:string]: any},
    onLoad?: IPageParamLifeCycleQuery|IPageParamLifeCycleQuery,
    onShow?: IPageParamLifeCycleVoid|IPageBaseLifeCycleVoid,
    onReady?: IPageParamLifeCycleVoid|IPageBaseLifeCycleVoid,
    onHide?: IPageParamLifeCycleVoid|IPageBaseLifeCycleVoid,
    onUnload?: IPageParamLifeCycleVoid|IPageBaseLifeCycleVoid,
  } & {[key: string]: (this: PageBase, ...args: any[]) => any};

  type PageLifeCycleParamAny = {[key:string]: any};
  type PageLifeCycleParamQuery = {query: {[""]?:any}};
  
  type IPageParamLifeCycleVoid = () => void;
  type IPageParamLifeCycleQuery = (options: PageLifeCycleParamQuery) => void;
  // type IAppParamLifeCycleOptions = (options: AppLifeCycleParamQuery) => void;

  type IPageBaseLifeCycleVoid = (this: PageBase) => void;
  type IPageBaseLifeCycleQuery = (this: PageBase, options: PageLifeCycleParamQuery) => void;
  
  type IPageCreator = (appParam: PageParams) => void|PageBase;

  type ComponentParams = any;
}
