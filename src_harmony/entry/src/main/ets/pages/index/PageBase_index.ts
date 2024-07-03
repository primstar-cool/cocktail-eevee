import CktlV3 from '../../cocktail/@union/core/cktlv3';
import PageBase from "../../cocktail/@union/framework/page_base";
import app from "../app"
app.$regNextPageRoute('pages/index/index');

import { loadMixed, unloadMixed } from '../../cocktail/@union/utils/page_mixed';


import { GenInterface_index_pageData, PageBase_index } from './interface';
let PageBaseCreator_index: (app?: CktlV3.IAppParams) => PageBase_index;

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


if (!PageBaseCreator_index) PageBaseCreator_index =
PageBase<PageBase_index>({
  pageName: "abc",
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
      complex: {
        z: 2,
        c: "2"
      },
    },
    sharePageData: 4,
  } as GenInterface_index_pageData,


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