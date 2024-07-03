/*DEBUG_START*/
import EventTriggerHolder from "../../@common/event/event_trigger_holder";
import {SystemEvent as FID} from '../../@compile/@enum/system_event'
/*DEBUG_END*/

import CktlV3 from "../core/cktlv3"

// function assign(target: Record<string, Object>, …source: Object[]): Record<string, Object> {
//   for (let s of source) {
//       for (let k of Object.keys(s)) {
//           target[k] = Reflect.get(s, k)
//       }
//   }
//   return target
// }

export function loadMixed<TPage extends CktlV3.IPageBaseWithMixed<TPage>>(mixedClassArray: Array<CktlV3.PageMixedCreator<TPage>>, page: TPage, options: CktlV3.PageLifeCycleParamQuery) {
  // console.ASSERT(page instanceof Page, 'page is not an instanceof Page');

  if (!mixedClassArray || !mixedClassArray.length) return;

  const mixedInstanceArray: CktlV3.IPageMixed<TPage>[] = mixedClassArray.map(
    (clzCreator: CktlV3.PageMixedCreator<TPage>) =>
    {
        return clzCreator();
    });


  CktlV3.ASSERT(!page.$pageMixedInfo);

  page.$pageMixedInfo = {

  }


  // const pageMixed: CktlV3.PageBase & { $specMixedInstanceArray?: Array<CktlV3.IPageMixed<TPage>>, $mixedInstanceArray?: Array<CktlV3.IPageMixed<TPage>>, $debugRawFunctionMap?: String[], $unloadChecker?: any } = page;

  if (page.$pageMixedInfo.$specMixedInstanceArray) {
    page.$pageMixedInfo.$mixedInstanceArray = page.$pageMixedInfo.$specMixedInstanceArray.concat(mixedInstanceArray);
    page.$pageMixedInfo.$specMixedInstanceArray = undefined;// trick
  } else {
    page.$pageMixedInfo.$mixedInstanceArray = mixedInstanceArray;
  }

  /*DEBUG_START*/
  page.$pageMixedInfo.$mixedInstanceArray.forEach((ins: CktlV3.IPageMixed<TPage>) => {

    var insProto = (ins as any).__proto__;
    var funcProperty = Object.getOwnPropertyNames(insProto);
    for (let i = 0; i < funcProperty.length; i++) {
      var key = funcProperty[i];
      if (typeof (ins as any)[key] === 'function') {
        if (!~['getPrivateData', 'getPrivateFunction', 'onPageInit', 'dispose', 'constructor'].indexOf(key)) {
          console.error('spell error? unknown mixed proto method: ' + key);
        }

      }
    }
  });
  /*DEBUG_END*/

  let privateDataCache: any|undefined = {};
  page.$pageMixedInfo.$mixedInstanceArray.forEach((ins: CktlV3.IPageMixed<TPage>): void => {
    if (ins.getPrivateData) {
      let privateData = ins.getPrivateData(page);

      /*DEBUG_START*/
      for (let key in privateData) {
        CktlV3.ASSERT(key.indexOf('$') !== 0 && key.indexOf('_') !== 0, 'Data key should not starts with _ or $');
        CktlV3.ASSERT(!page.data || page.data[key] === undefined && privateDataCache![key] === undefined, 'conflict mixed private field ' + key);
      }
      /*DEBUG_END*/
      Object.assign(privateDataCache!, privateData);
    }
  });
  page.setData(privateDataCache);
  privateDataCache = undefined;

  /*DEBUG_START*/
  page.$pageMixedInfo.$debugRawFunctionMap = [];
  for (let key in page) {
    if (typeof (page as any)[key] === 'function') {
      page.$pageMixedInfo.$debugRawFunctionMap.push(key);
    }
  }
  /*DEBUG_END*/

  page.$pageMixedInfo.$mixedInstanceArray.forEach((ins: CktlV3.IPageMixed<TPage>): void => {
    if (ins.getPrivateFunction) {

      /*DEBUG_START*/
      let functionMap: Record<string, Object> = {};
      for (let key in page) {
        if (typeof (page as any)[key] === 'function') {
          functionMap[key] = (page as any)[key];
        }
      }
      /*DEBUG_END*/



      let funcs: Record<string, (e?: CktlV3.PageEvent) => void> = ins.getPrivateFunction(page);

      for (let key in funcs) {
        CktlV3.ASSERT(funcs[key] && !functionMap[key], 'conflict function ' + key);
        functionMap[key] = funcs[key];
        (page as any)[key] = funcs[key];
      }

      /*DEBUG_START*/
      for (let key in functionMap) {
        if (key !== 'setData') {
          // 开启性能面板时，setData 会导致报错
          CktlV3.ASSERT(functionMap[key] === (page as any)[key], 'conflict function ' + key);
        }
      }
      /*DEBUG_END*/
    }
  });

  page.$pageMixedInfo.$mixedInstanceArray.forEach(
    (ins: CktlV3.IPageMixed<TPage>): void => {
      if (ins.onPageInit) {
        ins.onPageInit(page, options);
      }
    }
  );

  /*DEBUG_START*/
  // page.$pageMixedInfo.$unloadChecker = new EventTriggerHolder(FID.ON_PAGE_UNLOADED, (
  //   _eventName: any, eventData : any) => {
  //   if (eventData.page === page) {
  //     CktlV3.ASSERT(false, "forget use【unloadMixed】in page unload!!!")
  //   }
  // })
  /*DEBUG_END*/

};

export function unloadMixed<TPage extends CktlV3.IPageBaseWithMixed<TPage>>(page: TPage) {

  // debugger
  // console.ASSERT(page instanceof Page, 'page is not an instanceof Page');

  if (!page.$pageMixedInfo || !page.$pageMixedInfo.$mixedInstanceArray || !page.$pageMixedInfo.$mixedInstanceArray.length) {
    return;
  }

  page.$pageMixedInfo.$mixedInstanceArray.forEach((ins: CktlV3.IPageMixed<TPage>): void => {
    if (ins && ins.dispose) {
      ins.dispose(page);
    }
  });
  page.$pageMixedInfo.$mixedInstanceArray = undefined;

  /*DEBUG_START*/
  for (let key in page) {
    if (typeof (page as any)[key] === 'function') {
      CktlV3.ASSERT(~page.$pageMixedInfo.$debugRawFunctionMap!.indexOf(key), 'error remove function 【' + key + "】");
    }
  }
  page.$pageMixedInfo.$debugRawFunctionMap = undefined;

  if (page.$pageMixedInfo.$unloadChecker) {
    page.$pageMixedInfo.$unloadChecker.dispose();
    page.$pageMixedInfo.$unloadChecker = undefined;
  }
  /*DEBUG_END*/

  page.$pageMixedInfo = undefined;
};


export function forEachMixed<TPage extends CktlV3.IPageBaseWithMixed<TPage>>(page: TPage, callback: () => void) {

  if (page && page.$pageMixedInfo?.$mixedInstanceArray && callback) {
    page.$pageMixedInfo.$mixedInstanceArray.forEach(callback);
  }

}