import { PageBase_logs } from './interface';
import { getPageContent } from './PageBase_logs';

@Entry
@Component
struct Logs {

  private pageContent: PageBase_logs = getPageContent();

  @State logs: string[] = this.pageContent.data.logs; /*define in page.data*/

  build() {
    Column() {
      /*<!--logs.wxml-->*/
      Column(/*logs-s2-c-scrollarea*/) {
        ForEach(this.logs,
          (log, index) => {
            Column(/*logs-s3*/) {
              Column(/*logs-s4-c-log-item*/) {
                Text(/*autoText="2"*/(((index + 1) + ". ") + log.date) /*logs-s4-c-log-item*/).textAlign(TextAlign.Center).width("100%"/*auto-text width 100%*/).height("100%"/*auto-text height 100%*/)
              }
              .margin({"top": "19.2lpx"})
              .width("100%"/*display block default*/)
            }.width("100%"/*display block default*/)
            .alignItems(HorizontalAlign.Start/*text-align undefined*/)
          },
          (log) => (log.timeStamp)
        )
      }.width("100%"/*display block default*/)
      .alignItems(HorizontalAlign.Start/*text-align undefined*/)
    }
    
  }
}
