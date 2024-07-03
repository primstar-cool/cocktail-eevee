import CktlV3 from "../../../../cocktail/@union/core/cktlv3"

export = class BottomText<TPage extends CktlV3.IPageBase<TPage>> implements CktlV3.IPageMixed<TPage> {
  getPrivateData(_page: TPage): {text: string} {
    return {text: "Hello Cocktail"}
  }

  getPrivateFunction(page: TPage) : Record<"onTapText"|"test", undefined|((e?: CktlV3.PageEvent) => void)> {
    const onTapText = () => {
      console.log(page.data.text);
      // page.bindViewTap()
    }

    return {onTapText, test: undefined}
  }

  onPageInit(page: TPage, _options?: CktlV3.PageLifeCycleParamQuery): void {
    let date = new Date();
    page.setData({text: page.data.text + " " + date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate()})
  }

  dispose(_page: TPage): void {
    console.log("_page dispose");
  }
}