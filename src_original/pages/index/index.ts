import { loadMixed, unloadMixed } from "../../cocktail/@union/utils/page_mixed";
import CktlV3 from "../../cocktail/@union/core/cktlv3"

// 获取应用实例
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
// var PageBase: CktlV3.IPageCreator = require("../../cocktail/@union/framework/page_base");
import PageBase from "../../cocktail/@union/framework/page_base";

PageBase({
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
        require("./mixed/bottom_text/bottom_text"),
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
    wx.redirectTo({
      url: '../logs/logs',
    })
    return {B: 2}
  }
})
