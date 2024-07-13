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

        if (fs.existsSync(checkWxmlFileName)) {

            const eeveeResult = require("../cocktail/harmony/wxmp_to_standard.js")(pagePath, srcRootPath, _readFileFunc);

            if (saveTmpFile) {
                eeveeResultString = JSON.stringify(eeveeResult, null, 2);
                if (!fs.existsSync(path.join(srcRootPath, "../tmp/"))) {
                    fs.mkdirSync(path.join(srcRootPath, "../tmp/"));
                }
                fs.writeFileSync(path.join(srcRootPath, "../tmp/" + pageName + '.json'), eeveeResultString, 'utf8');
            }

            
            const standardToDestTool = require("../eevee/eevee/_from_standard/to_arkts/standard_to_arkts.js");
            destFileDict = standardToDestTool(eeveeResult, {
                env: "HARMONY",
                mainClassName: pageName,
                tagMappingFn: _getComponentMappingFn()
            });

            if (saveTmpFile) {
                for (let key in destFileDict) {
                    fs.writeFileSync(path.join(srcRootPath, "../tmp/" + key), destFileDict[key], 'utf8');
                }
            }

        }
    }
);

var componentConfig;
function _getComponentMappingFn() {
    if (!componentConfig) {
        require("./common/generate_component_config.js");
        componentConfig = require("../config/component_config.json")
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


function _readFileFunc(filename) {

    if (fs.existsSync(filename))
        return fs.readFileSync(filename, "utf8");

    //thisRes.addDependency(filename); when using webpack, u will addDependency

    throw new Error("miss file: " + filename);
}


// debugger