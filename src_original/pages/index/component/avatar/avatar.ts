// pages/index/component/avatar/avatar.ts
console.log("@@@@@@@@@@@")
var ComponentBase: CktlV3.IComponentCreator = require("../../../../cocktail/@union/framework/component_base");

ComponentBase({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true,
  },
  properties: {
    userInfo: {
      type: Object,
      value: {},
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    created() {
      console.log("ComponentBase created")
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})