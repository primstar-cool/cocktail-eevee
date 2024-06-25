// index.ts

import { loadMixed, unloadMixed } from "../../cocktail/@union/utils/page_mixed";

 
// 获取应用实例
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
var PageBase: CktlV3.IPageCreator = require("../../cocktail/@union/framework/page_base");


PageBase({
  pageName: "abc",
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },


  onLoad(options) {
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
  bindViewTap() {
    wx.redirectTo({
      url: '../logs/logs',
    })
  }
})
