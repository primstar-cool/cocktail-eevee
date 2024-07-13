const through2 = require('through2')
const fs = require("fs");

module.exports = function convert(pagePath, srcRootPath) {
    // console.log("convert " + targetPlatform);

    let stateSegEts = {};

    return through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
            if(file.extname === '.js' || file.extname === '.ts') {
                
                // debugger
                let source = file.contents.toString();
                            
                const eeveeResult = {
                    sourceType: 'wxmp',
                    childNodes: [],
                }
                const mptsParser = require("../../parser/parse_mp_ts.js");
                let result = mptsParser(source, file.path, true);
                let tsAstNode = result.tsAstNode;
                delete result.tsAstNode;
                // tsAstNode;


                eeveeResult.childNodes = eeveeResult.childNodes.concat(result);

                const standardToDestTool = require("../../../eevee/eevee/_from_standard/to_arkts/standard_to_arkts.js");
                const pageName = pagePath.split("/")[2];

                let destFileDict = standardToDestTool(eeveeResult, {
                    env: "HARMONY",
                    mainClassName: pageName,
                    tagMappingFn: _getComponentMappingFn()
                });

                // debugger
                // const eeveeResult1 = require("../wxmp_to_standard.js")(pagePath, srcRootPath, _readFileFunc);

                const interfaceFile = file.clone({ contents: false }); // 克隆原始文件但不包括内容  
                interfaceFile.basename = `Interface_${pageName}.ts`;  
                interfaceFile.contents = Buffer.from(
                    `import CktlV3 from "../../cocktail/@union/core/cktlv3"\n` +
                    
                    (destFileDict[`${pageName}.interface.seg.ts`] || `interface GenInterface_${pageName}_pageData {}`).replace(new RegExp("interface GenInterface_" + pageName + "_pageData", "g"), (r)=>`export ` + r)
                    
                    + `export interface IPageBase_${pageName} extends CktlV3.IPageBaseWithMixed, GenInterface_${pageName}_pageMethods {
  data: GenInterface_${pageName}_pageData;
}`
                    , 'utf8');
              
                this.push(interfaceFile);

                stateSegEts.state = destFileDict[`${pageName}.state.seg.ets`];

                // debugger
                let {replaceInfo, content} = require("./replace_require_to_import.js").replaceRequire(source, file.path);  
                source =  content;

                // debugger
                source = getWrappedPageContent(source, tsAstNode, eeveeResult, pageName, pagePath, replaceInfo);

                // debugger

                file.basename = `PageContent_${pageName}.ts`;  
                file.contents = Buffer.from(source)

                // debugger

                
            } else if(file.extname === '.wxml') {
                // console.log(stateSegEts);
                let source = file.contents.toString();

                const wxmlToStandardTool = require("../../../eevee/eevee/_to_standard/from_wxml/wxml_to_standard.js");
                const eeveeWxmlResult = wxmlToStandardTool(
                    source, file.path, srcRootPath, _readFileFunc
                );
                // debugger
            
                const eeveeResult = {
                    sourceType: 'wxmp',
                    childNodes: [Object.assign({}, eeveeWxmlResult, { tagName: 'template' })],
                }
            
                let checkWxssFileName = file.path.replace(".wxml", '.wxss');
                let checkLessFileName = file.path.replace(".wxml", '.less');
    
            
                if (fs.existsSync(checkWxssFileName)) {
                    // const eeveeWxssResult = 
                    const wxssParser = require("../../../eevee/eevee/parser/parse_wxss.js");
                    let result = wxssParser(_readFileFunc(checkWxssFileName), checkWxssFileName, srcRootPath, _readFileFunc, true);
                    eeveeResult.childNodes = eeveeResult.childNodes.concat(result)
                } else if (fs.existsSync(checkLessFileName)) {
                    // const eeveeWxssResult = 
                    const lessParser = require("../../../eevee/eevee/parser/parse_less.js");
                    let result = lessParser(_readFileFunc(checkLessFileName), checkLessFileName, srcRootPath, _readFileFunc, true);
                    eeveeResult.childNodes = eeveeResult.childNodes.concat(result)
                }


                const standardToDestTool = require("../../../eevee/eevee/_from_standard/to_arkts/standard_to_arkts.js");

                const pageName = pagePath.split("/")[2];

                let destFileDict = standardToDestTool(eeveeResult, {
                    env: "HARMONY",
                    mainClassName: pageName,
                    tagMappingFn: _getComponentMappingFn()
                });
                // debugger

                let wrappedContent = getWrapperPageStruct(stateSegEts.state, destFileDict[`${pageName}.build.seg.ets`], pageName)  

                file.basename = `${pageName[0].toUpperCase()}${pageName.substr(1)}.ets`;  
                file.contents = Buffer.from(wrappedContent);


                function _readFileFunc(filename) {

                    if (filename === file.path)
                        return source;
                    else if (fs.existsSync(filename))
                        return fs.readFileSync(filename, "utf8");
                                
                    throw new Error("miss file: " + filename);
                }

            }

        }
        cb(null, file)
    })

}

var componentConfig;
function _getComponentMappingFn() {
    if (!componentConfig) {
        require("../../common/generate_component_config.js");
        componentConfig = require("../../../config/component_config.json")
    }


    return (tagName, node)=> {
        let componentCfgPlatform = componentConfig[tagName]?.HARMONRY;

        if (componentCfgPlatform) {
            // debugger
            if (componentCfgPlatform.mode === 'CONVERT') {
                return tagName[0].toUpperCase() + tagName.substr(1)
            }
            
        }
    }

}

function getWrappedPageContent(source, tsAstNode, eeveeResult, pageName, pagePath, replaceInfo) {

    let lastImportDeclaration = tsAstNode.children.reverse().find( v => v.type === "ImportDeclaration");

    let importStart = 0;
    if (lastImportDeclaration) {
        let iText = lastImportDeclaration.text;
        importStart = source.indexOf(iText) + iText.length;
    }

    let contextNodes =  eeveeResult.childNodes.find(v=>v.tagName === 'context');
    let memberMethods = contextNodes.childNodes.filter(v => v.tagName === 'method' );

    // debugger
    let replaceKeys = Object.keys(replaceInfo);

    return source.substr(0, importStart) + 
    `\n
import { CPageBase } from "../../cocktail/@union/framework/page_base";
import { GenInterface_${pageName}_pageData, IPageBase_${pageName} } from './Interface_${pageName}';
import app from "../app";
app;
${replaceKeys.length ? replaceKeys.map(
    v => `import * as ${replaceInfo[v].objName} from "${replaceInfo[v].requirePath}"`
).join("\n") : ""}

let PageBaseCreator_${pageName}: (options: CktlV3.PageLifeCycleParamQuery, harmonySeyKeyValueFunc: CktlV3.HarmonySeyKeyValueFunc) => CktlV3.IPageBase & IPageBase_${pageName};
class PageBase_${pageName} extends CPageBase implements IPageBase_${pageName} {

  data: GenInterface_${pageName}_pageData;
  protected readonly pageDefine: IPageBase_${pageName};

  // constructor(pageDefine: IPageBase_${pageName}, route: string, options: CktlV3.PageLifeCycleParamQuery) {
  //   super(pageDefine, route, options);
  // }

  ${memberMethods ? memberMethods.map(
  v => (v.id + v.code).replace(/\n/g, "\n  ")
  ).join("\n  ") : ''}

}

export function getPageContent(optionsHarmony: Object, harmonySeyKeyValueFunc: CktlV3.HarmonySeyKeyValueFunc): CktlV3.IPageBase & IPageBase_${pageName} {
    let options = {query:{}};
    return PageBaseCreator_${pageName}(options, harmonySeyKeyValueFunc);
}\n`
                    + source.substr(importStart).replace(/PageBase[\s]*\([\s]*/, 
`PageBaseCreator_${pageName} =
PageBase<IPageBase_${pageName}>(
  PageBase_${pageName}, ${JSON.stringify(pagePath)}, `)
}

function getWrapperPageStruct(stateContent , buildContent, pageName) {

    // debugger

    let allGen = stateContent.match(/@State[\s]+[^\:]+:[\s]+GenInterface[^\s]+/g);

    if (allGen) {
        allGen = allGen.map(v=>v.substr(v.indexOf(":") + 1).trim())
    }

    let allState = stateContent.match(/@State[\s]+[^\:]+:[\s]+[^\s]+/g);
    let allType;
    let allKey = [];
    let allTypeJoin = 'string';

    
    if (allState) {
      allKey = allState.map(v=>v.substring(v.indexOf("@State") + 6, v.indexOf(":")).trim())

      allType = allState.map(v=>v.substr(v.indexOf(":") + 1).trim())

      allTypeJoin = Array.from(new Set(allType)).join("|");
    }
    // debugger
    return `
import { IPageBase_${pageName}${allGen ? ", " + allGen.join(", ") : ''} } from './Interface_${pageName}';
import { getPageContent } from './PageContent_${pageName}';
import router from '@ohos.router';

@Entry
@Component
struct ${pageName[0].toUpperCase()}${pageName.substr(1)} {

  private pageContent: IPageBase_${pageName} = getPageContent(router.getParams(), this.setKeyValue);

  ${stateContent.replace(/\n/g, "\n  ")}
  
  build() {
    ${buildContent.replace(/\n/g, "\n    ")}
  }  

  setKeyValue(key: string, value: ${allTypeJoin}) {
${allKey.map((v,i) => 
      ((i === 0) ? '    if' : "    else if")
      + ` (key === ${JSON.stringify(allKey[i])}) this.${allKey[i]} = value as ${allType[i]};`

    ).join("\n")}
  }
}`
        
}



// function wrapH5Event(event: ClickEvent, id?: string, dataset?: Record<string, number|string|object|boolean|object>): CktlV3.PageEvent {

//     return {
//       target: {
//         id,
//         dataset,
//       },
//       currentTarget: {
//         id,
//         dataset,
//       }
//     }
//   }`      