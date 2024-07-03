const path = require("path");
const fs = require("fs");

module.exports = function (pagePath, srcRootPath, _readFileFunc) {

    let checkWxmlFileName = path.join(srcRootPath, pagePath + '.wxml');
    let checkWxssFileName = path.join(srcRootPath, pagePath + '.wxss');
    let checkLessFileName = path.join(srcRootPath, pagePath + '.less');
    let checkTsFileName = path.join(srcRootPath, pagePath + '.ts');

    const wxmlToStandardTool = require("../../eevee/eevee/_to_standard/from_wxml/wxml_to_standard.js");
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
        const wxssParser = require("../../eevee/eevee/parser/parse_wxss.js");
        let result = wxssParser(_readFileFunc(checkWxssFileName), checkWxssFileName, srcRootPath, _readFileFunc, true);
        eeveeResult.childNodes = eeveeResult.childNodes.concat(result)
    } else if (fs.existsSync(checkLessFileName)) {
        // const eeveeWxssResult = 
        const lessParser = require("../../eevee/eevee/parser/parse_less.js");
        let result = lessParser(_readFileFunc(checkLessFileName), checkLessFileName, srcRootPath, _readFileFunc, true);
        eeveeResult.childNodes = eeveeResult.childNodes.concat(result)
    } 

    if (fs.existsSync(checkTsFileName)) {

        const mptsParser = require("../parser/parse_mp_ts.js");
        let result = mptsParser(_readFileFunc(checkTsFileName), checkTsFileName);

        eeveeResult.childNodes = eeveeResult.childNodes.concat(result)

    }

    return eeveeResult;
}