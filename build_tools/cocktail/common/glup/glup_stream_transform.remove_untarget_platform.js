const removeUntagetPlatform = require("../processor/processor_js_string/remove_untarget_platform_func.js");
const addSpecConsoleExtApp = require("../processor/processor_js_string/add_spec_console_ext_app.js");


const through2 = require('through2')
const fs = require("fs");

module.exports = function convert(targetPlatform) {
    // console.log("convert " + targetPlatform);
    return through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
            // console.log(file.path)
            if(file.extname === '.js' || file.extname === '.ts') {
                let source = file.contents.toString();
                let result = removeUntagetPlatform(source, file.path, targetPlatform);
                if (targetPlatform === "HARMONY") {
                    result = addSpecConsoleExtApp(result, file.path)
                }

                file.contents = Buffer.from(result, 'utf8');
            }
        }
        cb(null, file)
    })

}