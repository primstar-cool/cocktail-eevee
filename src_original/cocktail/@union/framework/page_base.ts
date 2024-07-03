const { IS_BROWSER, IS_TTMA , IS_WXMP, IS_SWAN, IS_ALIMP, IS_KSMP, IS_NODE, IS_HARMONY} = require('../../@compile/target_compile_platform.js');
import CktlV3 from "../../@compile/@types/framework"

let platformModule :CktlV3.IPageCreator;
IS_WXMP && (platformModule = require('../../platform_mp/framework/page_base'));
IS_TTMA && (platformModule = require('../../platform_mp/framework/page_base'));
IS_KSMP && (platformModule = require('../../platform_mp/framework/page_base'));
IS_SWAN && (platformModule = require('../../platform_mp/framework/page_base'));
IS_ALIMP && (platformModule = require('../../platform_mp/framework/page_base'));

// IS_BROWSER && (module.exports = require('../../platform_h5/framework/page_base'));
// IS_NODE && (module.exports = require('../../platform_node/framework/page_base'));

IS_HARMONY && (platformModule = require('../../platform_harmony/framework/page_base'));

/*DEBUG_START*/
if (typeof platformModule! !== 'function') throw new Error( "ERROE GET PAGE_BASE FUNC")
/*DEBUG_END*/

export = platformModule;
