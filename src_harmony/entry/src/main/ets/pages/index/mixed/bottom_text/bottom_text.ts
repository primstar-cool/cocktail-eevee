import CktlV3 from "../../../../cocktail/@union/core/cktlv3"
type BottomTextPage = CktlV3.IPageBaseWithMixed;

export class BottomText implements CktlV3.IPageMixed {
  constructor() {
    console.log("BottomText created")
  }
  
  getPrivateData(_page: BottomTextPage): {text: string} {
    return {text: "Hello Cocktail"}
  }

  getPrivateFunction(page: BottomTextPage) : Record<"onTapText"|"test", undefined|CktlV3.PageEventMethod> {
    const onTapText = () => {
      console.log(page.data.text);
      // page.bindViewTap()
    }

    return {onTapText: onTapText, test: undefined}
  }

  onPageInit(page: BottomTextPage & CktlV3.IPageBase, _options?: CktlV3.PageLifeCycleParamQuery): void {
    // let date = new Date();
    // page.setData({text: page.data.text + " " + date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate()})
  }

  dispose(_page: BottomTextPage): void {
    console.log("_page dispose");
  }
}