const { IS_BROWSER, IS_TTMA , IS_WXMP, IS_SWAN, IS_ALIMP, IS_KSMP, IS_NODE} = require('../../@complie/target_compile_platform.js');
// let platformModule :CktlV3.IPageCreator;
IS_WXMP && (module.exports = require('../../platform_mp/framework/page_base'));
// IS_TTMA && (module.exports = require('../../framework_wxmp/class_define/page_base.js'));
// IS_KSMP && (module.exports = require('../../framework_ksmp/class_define/page_base.js'));

// IS_SWAN && (module.exports = require('../../framework_swan/class_define/page_base.js'));
// IS_ALIMP && (module.exports = require('../../framework_alimp/class_define/page_base.js'));
// IS_BROWSER && (module.exports = require('../../framework_h5/class_define/page_base.js'));
// IS_HAP && (module.exports = require('../../framework_hap/class_define/page_base.js'));
// IS_CANVAS && (module.exports = require('../../framework_canvas/class_define/page_base.js'));
// IS_NODE && (module.exports = require('../../framework_node/class_define/page_base.js'));

/*DEBUG_START*/
if (typeof module.exports !== 'function') throw new Error( "ERROE GET PAGE_BASE FUNC")
/*DEBUG_END*/
