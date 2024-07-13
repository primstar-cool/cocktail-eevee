import { loadMixed, unloadMixed } from "../../cocktail/@union/utils/page_mixed";
import CktlV3 from "../../cocktail/@union/core/cktlv3"
/*nst {0/*WXMP} = REQ_INL("../../cocktail/@compile/target_compile_platform.js*/;


// 获取应用实例
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
// var PageBase: CktlV3.IPageCreator = require("../../cocktail/@union/framework/page_base");
import PageBase from "../../cocktail/@union/framework/page_base";

import { CPageBase } from "../../cocktail/@union/framework/page_base";
import { GenInterface_index_pageData, IPageBase_index } from './Interface_index';
import app from "../app";
app;
import * as __reqToImpt_$mixed$bottom_text$bottom_text from "./mixed/bottom_text/bottom_text"

let PageBaseCreator_index: (options: CktlV3.PageLifeCycleParamQuery, harmonySeyKeyValueFunc: CktlV3.HarmonySeyKeyValueFunc) => CktlV3.IPageBase & IPageBase_index;
class PageBase_index extends CPageBase implements IPageBase_index {

  data: GenInterface_index_pageData;
  protected readonly pageDefine: IPageBase_index;

  // constructor(pageDefine: IPageBase_index, route: string, options: CktlV3.PageLifeCycleParamQuery) {
  //   super(pageDefine, route, options);
  // }

  bindViewTap(a: number, b: string): unknown {
    return this.pageDefine.bindViewTap.call(this, a, b);
  }
  onTapText(e?: CktlV3.PageEvent): void {
    if (this.pageDefine.onTapText)
      return this.pageDefine.onTapText.call(this, e);
  }
  test(e?: CktlV3.PageEvent): void {
    if (this.pageDefine.test)
      return this.pageDefine.test.call(this, e);
  }

}

export function getPageContent(optionsHarmony: Object, harmonySeyKeyValueFunc: CktlV3.HarmonySeyKeyValueFunc): CktlV3.IPageBase & IPageBase_index {
    let options = {query:{}};
    return PageBaseCreator_index(options, harmonySeyKeyValueFunc);
}


PageBaseCreator_index =
PageBase<IPageBase_index>(
  PageBase_index, "pages/index/index", {
  pageName: "abc",
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
      complex: {
        z: 2,
        a: {b: 1},
        c: "2"
      },
    },
    sharePageData: 2,
  } as {
    userInfo: {
      avatarUrl: string,
      nickName: string,
      complex: {
        z: number,
        aaaa?: {b: number},
        c: string
      }
    }, sharePageData: number
  },


  onLoad(options: CktlV3.PageLifeCycleParamQuery) {
    loadMixed(
      [
        __reqToImpt_$mixed$bottom_text$bottom_text,
      ],
      this,
      options
    )
  },
  onUnload() {
    unloadMixed(this);
  },
  // 事件处理函数
  bindViewTap(a: number, b: string) {
    /*MP*/;//0 wx.redirectTo({url: '../logs/logs',})

    return {B: 2}
  }
})