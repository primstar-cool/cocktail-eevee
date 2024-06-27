// logs.ts
// const util = require('../../utils/util.js')
import PageBase from "../../cocktail/@union/framework/page_base";

PageBase({
  pageName: "logs",
  data: {
    logs: [],
  } as {logs: string[]},
  onLoad() {
    setTimeout(
      ()=> {
        wx.navigateTo({url: "/pages/index/index"})
      }, 2000
    )
  }
})
