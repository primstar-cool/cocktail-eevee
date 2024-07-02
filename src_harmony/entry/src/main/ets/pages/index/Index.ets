import { GenInterface_index_userInfo, PageBase_index } from './interface';
import { getPageContent } from './PageBase_index';

// require("./pageIndex/index");
// const pageFrame = globalThis.recentPageFrame;

@Entry
@Component
struct Index {

  private pageContent: PageBase_index = getPageContent();

  @State userInfo: GenInterface_index_userInfo = this.pageContent.data.userInfo; /* define in page.data*/
  @State sharePageData: number = this.pageContent.data.sharePageData;
  @State text: string = "Hello World";

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
        Text(((this.sharePageData * 2) + "text" // + this.pageContent.data.userInfo.complex.a?.b
        ) /*index-s7*/)
      }
      .id("index-container")
      .height("100%")
    }
  }

}

