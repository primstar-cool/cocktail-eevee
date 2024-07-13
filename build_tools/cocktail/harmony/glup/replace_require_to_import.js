const path = require('path');
const fs = require('fs');

function isNameChar(char) {
    var charCode = char.charCodeAt(0);

    return char === '_'    
        // || (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0))
        // || (charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0))
        // || (charCode >= '0'.charCodeAt(0) && charCode <= '9'.charCodeAt(0))

        || (charCode >= 97 && charCode <= 122)
        || (charCode >= 65 && charCode <= 90)
        || (charCode >= 48 && charCode <= 57);
    ;
}

function isSpaceChar(char) {
    return char === " " || char ==='\n' || char === '\t' || char === '\r' || !char.trim().length;
}

function replaceRequire(content, absolutePath) {

    let replaceInfo = {};

    // debugger
    if (!absolutePath.endsWith(".ts"))
        absolutePath += ".ts";


    if (!content) {
        try {
            content = fs.readFileSync(absolutePath, 'utf8');                
        } catch (e) {
            debugger;
            content = `throw new Error('load "${absolutePath}" error')`;
        }
    }
    
    if (content.indexOf("[function(require,module,exports)") !== -1) {
        console.log(`"${path.relative(workspacePath, absolutePath)}" is already a packed module. skip analysis`);
    } else {

        // 只处理非注释  非string 内的require
        // 斜引号内的变量懒得解析。所以不能写 `abc ${require("a.js")()}` 需要var tmp =   require("a.js")()； `abc ${tmp}`
        // require里可以有个注释有string但是不能有 ) require("abc"/*)*/) require("abc)") 是不允许的 

        var breakout = null;
        for (var i = 0; i < content.length; i++) {
            var char = content.charAt(i);
            if (!breakout) {
                if (char === '/') {
                if (content.charAt(i + 1) === '/') { // 单行注释
                    i++;
                    breakout = '\n';
                    continue;
                } else if (content.charAt(i + 1) === '*') { // 多行注释
                    i++;
                    breakout = '*/';
                    continue;
                }
                } else if (char === "'") { // 单引号string
                    breakout = "'";
                    continue;
                } else if (char === '"') { // 双引号string
                    breakout = '"';
                    continue;
                } else if (char === '`') { // 斜引号string
                    breakout = '`';
                    continue;
                }
            }
        
            if (breakout) {
                if (breakout === "'" || breakout === '"' || breakout === '`') {
                // in a string
                if (char === '\\') {
                    i++;
                    continue;
                }
                }
                if (char === breakout) {
                    breakout = null;
                    continue;
                } 
                else if (char === '*' && breakout == '*/') {
                    if (content.charAt(i + 1) === '/') {
                        i++;
                        breakout = null;
                        continue;
                    }
                }
                continue;
            }
        
            if (char === 'r' 
                && content.substr(i, 7) === 'require' 
                && (i === 0 || !isNameChar(content.charAt(i-1))) 
            ) {
                // debugger
                var requireContent = content.substr(i + 7).trim();
                
                if (requireContent.charAt(0) === '(') {
                    var requireContentBefore = content.substr(0, i);
                    // TODO require里面不能有 注释涉及 ）了 不然太恶心了，懒得处理
                    var rightPos = requireContent.indexOf(')');

                    let pathWithQ = requireContent.substring(1, rightPos);
                    try {
                        var moduleName = eval(pathWithQ);
                    } catch (e) {
                        debugger
                        console.warn("unknown path:" + pathWithQ);
                        i += 6;
                        continue;
                    }

                    var isNodeModules = false;
                    if (!moduleName.startsWith(".") && fs.existsSync((pathNameString = path.resolve(__dirname, "../../../../node_modules", moduleName)))) {
                        //node module
                        isNodeModules = true;
                    } else {
                        var pathNameString = path.dirname(absolutePath) + '/' + moduleName;
                    }
                    // debugger;

                    pathNameString = path.resolve(pathNameString).replace(/\\/g, "/");

                   
                    
                    let pathRelName = "$" + path.relative(path.dirname(absolutePath), pathNameString).replace(/\//g, "$").replace(/\./g, "_");

                     

                        
                    var destString = `__reqToImpt_${pathRelName}`;

                    if (!pathNameString.endsWith(".ts"))
                        pathNameString += ".ts";
                    replaceInfo[pathNameString] = {objName: destString, requirePath: moduleName};


                    var requireContentAfter = requireContent.substr(rightPos + 1);

                    content = requireContentBefore + destString + requireContentAfter;
                    i += destString.length - 1;// requireContentBefore.length + destString.length - 1; //-1是因为马上要++
                } else {
                    i += 6;
                }

            }                
        }
    }

    return {replaceInfo, content}
}

module.exports = {
    replaceRequire,
}