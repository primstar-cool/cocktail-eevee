/*DEBUG_START*/
const EventTriggerHolder = require("../../@union/event/event_trigger_holder");
/*DEBUG_END*/

export function loadMixed(mixedClassArray: Array<CktlV3.PageMixedClass>, page: CktlV3.PageBase, options: CktlV3.PageLifeCycleParamQuery) {
  // console.ASSERT(page instanceof Page, 'page is not an instanceof Page');

  if (!mixedClassArray || !mixedClassArray.length) return;

  const mixedInstanceArray: Array<CktlV3.IPageMixed> = mixedClassArray.map((clz: CktlV3.PageMixedClass) => new clz());


  const pageAny: CktlV3.PageBase & { $specMixedInstanceArray?: Array<CktlV3.IPageMixed>, $mixedInstanceArray?: Array<CktlV3.IPageMixed>, $debugRawFunctionMap?: String[], $unloadChecker?: any } = page;

  if (pageAny.$specMixedInstanceArray) {
    pageAny.$mixedInstanceArray = pageAny.$specMixedInstanceArray.concat(mixedInstanceArray);
    pageAny.$specMixedInstanceArray = undefined;// trick
  } else {
    pageAny.$mixedInstanceArray = mixedInstanceArray;
  }

  /*DEBUG_START*/
  pageAny.$mixedInstanceArray.forEach((ins: CktlV3.IPageMixed) => {

    var insProto = (ins as any).__proto__;
    var funcProperty = Object.getOwnPropertyNames(insProto);
    for (let i = 0; i < funcProperty.length; i++) {
      var key = funcProperty[i];
      if (typeof (ins as any)[key] === 'function') {
        if (!~['getPrivateData', 'injectPrivateFunction', 'onPageInit', 'dispose', 'constructor'].indexOf(key)) {
          console.error('spell error? unknown mixed proto method: ' + key);
        }

      }
    }
  });
  /*DEBUG_END*/

  let privateDataCache: { [key: string]: any } | undefined = {};
  pageAny.$mixedInstanceArray.forEach((ins: CktlV3.IPageMixed): void => {
    if (ins.getPrivateData) {
      let privateData = ins.getPrivateData(page);

      /*DEBUG_START*/
      for (let key in privateData) {
        console.ASSERT(key.indexOf('$') !== 0 && key.indexOf('_') !== 0, 'Data key should not starts with _ or $');
        console.ASSERT(!page.data || page.data[key] === undefined && privateDataCache![key] === undefined, 'conflict mixed private field ' + key);
      }
      /*DEBUG_END*/
      Object.assign(privateDataCache, privateData);
    }
  });
  page.setData(privateDataCache);

  privateDataCache = undefined;

  /*DEBUG_START*/
  pageAny.$debugRawFunctionMap = [];
  for (let key in page) {
    if (typeof (page as any)[key] === 'function') {
      pageAny.$debugRawFunctionMap.push(key);
    }
  }
  /*DEBUG_END*/

  pageAny.$mixedInstanceArray.forEach((ins: CktlV3.IPageMixed): void => {
    if (ins.injectPrivateFunction) {

      /*DEBUG_START*/
      let functionMap: any = {};
      for (let key in page) {
        if (typeof (page as any)[key] === 'function') {
          functionMap[key] = (page as any)[key];
        }
      }
      /*DEBUG_END*/

      ins.injectPrivateFunction(page);

      /*DEBUG_START*/
      for (let key in functionMap) {
        if (key !== 'setData') {
          // 开启性能面板时，setData 会导致报错
          console.ASSERT(functionMap[key] === (page as any)[key], 'conflict function ' + key);
        }
      }
      /*DEBUG_END*/
    }
  });

  pageAny.$mixedInstanceArray.forEach((ins: CktlV3.IPageMixed): void => {
    if (ins.onPageInit) {
      ins.onPageInit(page, options);
    }
  });

  /*DEBUG_START*/
  const FID = require('../../@complie/@enum/system_event');

  pageAny.$unloadChecker = new EventTriggerHolder(FID.ON_PAGE_UNLOADED, (
    _eventName: any, eventData : any) => {
    if (eventData.page === pageAny) {
      console.ASSERT(false, "forget use【unloadMixed】in page unload!!!")
    }
  })
  /*DEBUG_END*/

};

export function unloadMixed(page: CktlV3.PageBase) {

  // debugger
  // console.ASSERT(page instanceof Page, 'page is not an instanceof Page');
  const pageAny: CktlV3.PageBase & { $specMixedInstanceArray?: Array<CktlV3.IPageMixed>, $mixedInstanceArray?: Array<CktlV3.IPageMixed>, $debugRawFunctionMap?: String[], $unloadChecker?: any } = page;

  if (!pageAny.$mixedInstanceArray || !pageAny.$mixedInstanceArray.length) {
    return;
  }

  pageAny.$mixedInstanceArray.forEach((ins: CktlV3.IPageMixed): void => {
    if (ins && ins.dispose) {
      ins.dispose(page);
    }
  });
  pageAny.$mixedInstanceArray = undefined;

  /*DEBUG_START*/
  for (let key in page) {
    if (typeof (page as any)[key] === 'function') {
      console.ASSERT(~pageAny.$debugRawFunctionMap!.indexOf(key), 'error remove function 【' + key + "】");
    }
  }
  pageAny.$debugRawFunctionMap = undefined;

  if (pageAny.$unloadChecker) {
    pageAny.$unloadChecker.dispose();
  }
  /*DEBUG_END*/
};


export function forEachMixed(page: CktlV3.PageBase, callback: () => any) {
  const pageAny: CktlV3.PageBase & { $specMixedInstanceArray?: Array<CktlV3.IPageMixed>, $mixedInstanceArray?: Array<CktlV3.IPageMixed>, $debugRawFunctionMap?: String[] } = page;

  if (pageAny && pageAny.$mixedInstanceArray && callback) {
    pageAny.$mixedInstanceArray.forEach(callback);
  }

}