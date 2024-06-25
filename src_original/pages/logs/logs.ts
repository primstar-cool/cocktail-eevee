// logs.ts
// const util = require('../../utils/util.js')

var PageBase: CktlV3.IPageCreator = require("../../cocktail/@union/framework/page_base");

PageBase({
  pageName: "logs",
  data: {
    logs: [],
  },
  onLoad() {
    setTimeout(
      ()=> {
        wx.navigateTo({url: "/pages/index/index"})
      }, 2000
    )
  }
})
