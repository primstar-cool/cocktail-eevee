const fs = require("fs");
const path = require("path");

const srcRootPath = path.join(__dirname, "../../src_original");


const saveTmpFile = true;

// debugger
const pagePaths = require(srcRootPath + "/app.json").pages;

pagePaths.forEach(

    pagePath => {
        
        let pageName = pagePath.split("/")[2];

        let checkWxmlFileName = path.join(srcRootPath, pagePath + '.wxml');
        let checkWxssFileName = path.join(srcRootPath, pagePath + '.wxss');
        let checkLessFileName = path.join(srcRootPath, pagePath + '.less');

        if (fs.existsSync(checkWxmlFileName)) {
            const wxmlToStandardTool = require("../eevee/eevee/_to_standard/from_wxml/wxml_to_standard.js");
            const eeveeWxmlResult = wxmlToStandardTool(
                _readFileFunc(checkWxmlFileName), checkWxmlFileName, srcRootPath, _readFileFunc
            );
            // debugger

            const eeveeResult = {
                sourceType: 'wxmp',
                childNodes: [Object.assign({}, eeveeWxmlResult, { tagName: 'template' })],
            }

            if (fs.existsSync(checkWxssFileName)) {
                // const eeveeWxssResult = 
                const wxssParser = require("../eevee/eevee/parser/parse_wxss.js");
                let result = wxssParser(_readFileFunc(checkWxssFileName), checkWxssFileName, srcRootPath, _readFileFunc, true);
                eeveeResult.childNodes = eeveeResult.childNodes.concat(result)
            } else if (fs.existsSync(checkLessFileName)) {
                // const eeveeWxssResult = 
                const lessParser = require("../eevee/eevee/parser/parse_less.js");
                let result = lessParser(_readFileFunc(checkLessFileName), checkLessFileName, srcRootPath, _readFileFunc, true);
                eeveeResult.childNodes = eeveeResult.childNodes.concat(result)
            }


            if (saveTmpFile) {
                eeveeResultString = JSON.stringify(eeveeResult, null, 2);
                if (!fs.existsSync(path.join(srcRootPath, "../tmp/"))) {
                    fs.mkdirSync(path.join(srcRootPath, "../tmp/"));
                }
    
                fs.writeFileSync(path.join(srcRootPath, "../tmp/" + pageName + '.json'), eeveeResultString, 'utf8');
            }
            

        }
    }
)

function _readFileFunc(filename) {

    if (fs.existsSync(filename))
        return fs.readFileSync(filename, "utf8");

    //thisRes.addDependency(filename); when using webpack, u will addDependency

    throw new Error("miss file: " + filename);
}


// debugger