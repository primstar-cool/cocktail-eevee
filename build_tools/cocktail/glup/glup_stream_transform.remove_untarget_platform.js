const removeUntagetPlatform = require("../common/processor/processor_js_string/remove_untarget_platform_func.js");
const addSpecConsoleExt = require("../common/processor/processor_js_string/add_spec_console_ext.js");


const through2 = require('through2')
const fs = require("fs");

module.exports = function convert(targetPlatform) {
    // console.log("convert " + targetPlatform);
    return through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
            if(file.extname === '.js' || file.extname === '.ts') {
                let source = file.contents.toString();
                let result = removeUntagetPlatform(source, file.path, targetPlatform);
                if (targetPlatform === "HARMONY") {
                    result = addSpecConsoleExt(result, file.path)
                }

                file.contents = Buffer.from(result, 'utf8');
            }
        }
        cb(null, file)
    })

}