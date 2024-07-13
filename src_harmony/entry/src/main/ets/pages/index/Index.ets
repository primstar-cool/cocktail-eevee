
import { IPageBase_index, GenInterface_index_pageData_userInfo } from './Interface_index';
import { getPageContent } from './PageContent_index';
import router from '@ohos.router';

@Entry
@Component
struct Index {

  private pageContent: IPageBase_index = getPageContent(router.getParams(), this.setKeyValue);

  @State userInfo: GenInterface_index_pageData_userInfo = this.pageContent.data.userInfo; /*define in page.data*/
  @State sharePageData: number = this.pageContent.data.sharePageData; /*define in page.data*/
  @State text: string = this.pageContent.data.text!; /*define mixed bottom_text*/
  
  build() {
    Column() {
      /*<!--index.wxml-->*/
      Column(/*index-container-c-container*/) {
        Text((("<!--avatar userInfo=\"" + this.userInfo) + "\"/-->") /*index-container-c-container::auto-text-0*/)
        /*<!--expand include from mixed/bottom_text/bottom_text.wxml-->*/
        Row(/*index-s4-c-user-motto*/) {
          Text(this.text /*index-s5*/).textAlign(TextAlign.Center).fontColor(0x0000FF)
        }.margin({"top": 0})
        .alignItems(VerticalAlign.Top)
        Text(((this.sharePageData * 2) + "text") /*index-s7*/)
      }
      .id("index-container")
      .height("100%")
    }
    
  }  

  setKeyValue(key: string, value: GenInterface_index_pageData_userInfo|number|string) {
    if (key === "userInfo") this.userInfo = value as GenInterface_index_pageData_userInfo;
    else if (key === "sharePageData") this.sharePageData = value as number;
    else if (key === "text") this.text = value as string;
  }
}