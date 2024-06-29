/// <reference path="./type.d.ts" />

// require("./pageIndex/index");
// const pageFrame = globalThis.recentPageFrame;

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

interface GenInterface_index_userInfo_complex_a {
  b: number;
}

interface GenInterface_index_userInfo_complex {
  z: number;
  a: GenInterface_index_userInfo_complex_a;
  c: string;
}

interface GenInterface_index_userInfo {
  avatarUrl: string;
  nickName: string;
  complex: GenInterface_index_userInfo_complex;
}

@Entry
@Component
struct Index {
  @State message: string = 'Hello World';
  @State userInfo: GenInterface_index_userInfo =  {
    avatarUrl: defaultAvatarUrl,
    nickName: '',
    complex: {
      z: 2,
      a: {b: 1},
      c: "2"
    }
  }; /* define in page.data*/
  @State sharePageData: number =  2;
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
        Text(((this.sharePageData * 2) + "text") /*index-s7*/)
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

