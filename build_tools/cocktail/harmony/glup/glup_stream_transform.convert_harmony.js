const through2 = require('through2')
const fs = require("fs");

module.exports = function convert(pagePath, srcRootPath) {
    // console.log("convert " + targetPlatform);
    return through2.obj(function (file, _, cb) {
        if (file.isBuffer()) {
            if(file.extname === '.js' || file.extname === '.ts') {
                debugger
                let source = file.contents.toString();
                            

                
                const eeveeResult = require("../wxmp_to_standard.js")(pagePath, srcRootPath, _readFileFunc);

                file.contents = Buffer.from(JSON.stringify(eeveeResult), 'utf8');
                file.extname = '.eevee.json';

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