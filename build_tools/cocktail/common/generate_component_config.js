const path = require("path");
const fs = require("fs");

var srcOriginPath = path.resolve(__dirname, "../../../src_original");

let referedPath = [srcOriginPath + '/app.json'];
let pagesPath = require(srcOriginPath + '/app.json').pages;
pagesPath.forEach(pagePath => {
   referedPath.push(srcOriginPath + '/' + pagePath + ".json");
});

let componentCfg = {};
let configPath = path.resolve(__dirname, "../../config/component_config.json");
// debugger
if (fs.existsSync(configPath)) {
   componentCfg = require(configPath);
} else {
    fs.writeFileSync(configPath, '{}', 'utf8');
}
let componentCfgOld = JSON.stringify(componentCfg, null, 2);

// debugger

let platformList = require("../../config/target_platfrom_list.json");
platform = platformList.filter(v => v!== 'IS_BROWSER' && v !== 'IS_NODE' ).map(v=>v.substr("3"));
if (platformList.includes("IS_NODE"))
    platform.unshift("NODE_VUE", "NODE_REACT");
if (platformList.includes("IS_BROWSER"))
    platform.unshift("H5_VUE", "H5_REACT");


for (let i = 0;i < referedPath.length; i++) {
   let jsonPath = referedPath[i];
   
   if (fs.existsSync(jsonPath)) {
       let usingComponents = require(jsonPath).usingComponents;

       if (usingComponents) {
           for (let key in usingComponents) {
               let cPath = usingComponents[key];
               let absPath;

               if (cPath.startsWith("/")) {
                   absPath = path.resolve(srcOriginPath + "/" + cPath);
               } else {
                   absPath = path.resolve(path.dirname(jsonPath) + "/" + cPath);
               }


               if (!absPath.endsWith(".js")) {
                   if (fs.existsSync(absPath + ".js")) {
                       absPath += ".js";
                   }
               }

               let relPath = path.relative(srcOriginPath, absPath);
       
               if (!componentCfg[key]) {
                   componentCfg[key] = {
                       "$info": {
                           readme: "mode can be CONVERT, MAPPING or DECONSTRUCT",
                           refers: [path.relative(srcOriginPath, jsonPath).replace(/\\/g, "/")],
                       }
                       
                   };
               } else {
                   let info = componentCfg[key]["$info"];

                   let jsonRelPath = path.relative(srcOriginPath, jsonPath).replace(/\\/g, "/");
                   if (!info.refers.includes(jsonRelPath))
                       info.refers.push(jsonRelPath);
               }

               let componentJsonPath = absPath + "on";
               if (!referedPath.includes(componentJsonPath) && fs.existsSync(componentJsonPath)) {
                    referedPath.push(componentJsonPath)
               }
               for (let p = 0; p < platform.length; p++) {
                   let pl = platform[p];

                   if (!componentCfg[key] || !componentCfg[key][pl]) {
                       componentCfg[key][pl] = {
                           mode: "CONVERT",
                           path: relPath.replace(/\\/g, "/")
                       }
                   }
               }
           }
       }
   }
}

let distString = JSON.stringify(componentCfg, null, 2);
if (componentCfgOld !== distString) {
   fs.writeFileSync(configPath, distString, 'utf8');
}