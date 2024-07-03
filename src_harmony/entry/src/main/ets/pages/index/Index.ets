import { PageBase_index, GenInterface_index_pageData_userInfo } from './interface';
import { getPageContent } from './PageBase_index';

@Entry
@Component
struct Index {

  private pageContent: PageBase_index = getPageContent();

  @State userInfo: GenInterface_index_pageData_userInfo = this.pageContent.data.userInfo; /*define in page.data*/
  @State sharePageData: number = this.pageContent.data.sharePageData; /*define in page.data*/
  @State text: string = this.pageContent.data.text || 'hello world'; /*define mixed bottom_text*/

  build() {
    Column() {
      /*<!--index.wxml-->*/
      Column(/*index-container-c-container*/) {
        // Avatar(/*index-s2*/)
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
}
