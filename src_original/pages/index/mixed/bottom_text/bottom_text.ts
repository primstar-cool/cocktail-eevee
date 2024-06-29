export = class BottomText<TPage extends CktlV3.IPageBase<TPage>> implements CktlV3.IPageMixed<TPage> {
  getPrivateData(_page: TPage): {text: string} {
    return {text: "Hello Cocktail"}
  }

  getPrivateFunction(page: TPage) : Record<string, (e?: CktlV3.PageEvent) => void> {
    const onTapText = () => {
      console.log(page.data.text);
      // page.bindViewTap()
    }

    return {onTapText}
  }

  onPageInit(page: TPage, _options?: CktlV3.PageLifeCycleParamQuery): void {
    let date = new Date();
    page.setData({text: page.data.text + " " + date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate()})
  }

  dispose(_page: TPage): void {
    console.log("_page dispose");
  }
}