import { GenInterface_index_userInfo, PageBase_index } from './interface';
import { getPageContent } from './PageBase_index';

// require("./pageIndex/index");
// const pageFrame = globalThis.recentPageFrame;

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


@Entry
@Component
struct Index {

  private pageContent: PageBase_index = getPageContent();

  @State message: string = 'Hello World';
  @State userInfo: GenInterface_index_userInfo =  {
    avatarUrl: defaultAvatarUrl,
    nickName: '',
    complex: {
      z: 2,
      a: {b: 2221},
      c: "2"
    }
  }; /* define in page.data*/
  @State sharePageData: number = 2;//this.pageContent.data.sharePageData;
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

    // RelativeContainer() {
    //   Text(this.message + pageFrame.vvv)
    //     .id('HelloWorld')
    //     .fontSize(50 )
    //     .fontWeight(FontWeight.Bold)
    //     .alignRules({
    //       center: { anchor: '__container__', align: VerticalAlign.Center },
    //       middle: { anchor: '__container__', align: HorizontalAlign.Center }
    //     })
    // }
    // .height('100%')
    // .width('100%')
  }

}

