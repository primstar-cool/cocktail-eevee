export = class BottomText implements CktlV3.IPageMixed {
  getPrivateData(_page: CktlV3.PageBase): {text: string} {
    return {text: "Hello Cocktail"}
  }

  injectPrivateFunction(page: CktlV3.PageBase): void {
    page.onTapText = () => {
      console.log(page.data.text)
    }
  }

  onPageInit(page: CktlV3.PageBase, _options?: CktlV3.PageLifeCycleParamQuery): void {
    let date = new Date();
    page.setData({text: page.data.text + " " + date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate()})
  }
  dispose(page: CktlV3.PageBase): void {
    console.log("_page dispose");
    page.onTapText = undefined;
  }
}