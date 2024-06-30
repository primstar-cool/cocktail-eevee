import CktlV3 from '../../cocktail/platform_harmony/core/cktlv3';
import PageBase from "../../cocktail/platform_harmony/framework/page_base";
import { PageBase_index } from './interface';
// import { loadMixed, unloadMixed } from '../../cocktail/platform_harmony/utils/page_mixed';

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

import app from "../app"

if (app) {
  console.log("App")
}

let PageBaseCreator_index: (app?: CktlV3.IAppParams) => PageBase_index;

if (!PageBaseCreator_index) PageBaseCreator_index =
PageBase<PageBase_index>({
  pageName: "abc",
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
      complex: {
        z: 2,
        a: { b: 1234 },
        c: "2"
      },
    },
    sharePageData: 2,
  } as {
    userInfo: {
      avatarUrl: string;
      nickName: string;
      complex: {
        z: number;
        a?: { b: number; };
        c: string;
      };
    };
    sharePageData: number;
  },


  onLoad(options: CktlV3.PageLifeCycleParamQuery) {
    // loadMixed(
    //   [
    //     // require("./mixed/bottom_text/bottom_text"),
    //   ],
    //   this,
    //   options
    // );
  },
  onUnload() {
    // unloadMixed(this);
  },
  // 事件处理函数
  bindViewTap() {
    console.log("bindViewTap")
  }
});

export function getPageContent(): PageBase_index {
  return PageBaseCreator_index();
}