// logs.ts
// const util = require('../../utils/util.js')
const PageBase: CktlV3.IPageCreator = require("../../cocktail/@union/framework/page_base");

PageBase({
  pageName: "logs",
  data: {
    logs: [],
  }
})
