import CktlV3 from '../../cocktail/@union/core/cktlv3';
import PageBase, { CPageBase } from "../../cocktail/@union/framework/page_base";
import app from "../app"
app.$regNextPageRoute('pages/index/index');

import { loadMixed, unloadMixed } from '../../cocktail/@union/utils/page_mixed';

import {BottomText} from "./mixed/bottom_text/bottom_text"

import { GenInterface_index_pageData, IPageBase_index } from './interface';
let PageBaseCreator_index: () => CktlV3.IPageBase & IPageBase_index;

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

let a: any;

class PageBase_index extends CPageBase implements IPageBase_index {

  data: GenInterface_index_pageData;
  // $pageMixedInfo: CktlV3.PageMixedInfo;
  protected readonly pageParams: IPageBase_index;


  constructor(pageParams: IPageBase_index) {

    console.log("ererer")
    // console.log(pageParams.data)

    super(pageParams);
    // this.$pageMixedInfo = {};
    // this.onLoad({query: {}});

  }
  bindViewTap() {
    this.pageParams.bindViewTap(1,"2");
  }

}

PageBaseCreator_index =
PageBase<IPageBase_index>(
  (params: IPageBase_index) => new PageBase_index(params),
  {
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

    loadMixed(
      [
        // () => new BottomText(),
      ],
      this,
      options
    );
  },
  onUnload() {
    // unloadMixed(this);
  },
  // 事件处理函数
  bindViewTap() {
    console.log("bindViewTap")
  }
});

export function getPageContent(): CktlV3.IPageBase & IPageBase_index {
  return PageBaseCreator_index();
}