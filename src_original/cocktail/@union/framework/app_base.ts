const { IS_BROWSER, IS_TTMA , IS_WXMP, IS_SWAN, IS_ALIMP, IS_KSMP, IS_NODE, IS_HARMONY} = require('../../@compile/target_compile_platform.js');
import CktlV3 from "../../@compile/@types/framework"

let platformModule :CktlV3.IAppCreator;

IS_WXMP && (platformModule = require('../../platform_mp/framework/app_base'));
IS_TTMA && (platformModule = require('../../platform_mp/framework/app_base'));
IS_KSMP && (platformModule = require('../../platform_mp/framework/app_base'));
IS_SWAN && (platformModule = require('../../platform_mp/framework/app_base'));
IS_ALIMP && (platformModule = require('../../platform_mp/framework/app_base'));

// IS_BROWSER && (platformModule = require('../../platform_h5/framework/app_base'));
// IS_NODE && (platformModule = require('../../platform_node/framework/app_base'));

// IS_BROWSER && (module.exports = require('../../platform_h5/framework/app_base'));
IS_HARMONY && (platformModule = require('../../platform_harmony/framework/app_base'));
// IS_NODE && (module.exports = require('../../framework_node/class_define/app_base'));

/*DEBUG_START*/
if (typeof platformModule! !== 'function') throw new Error( "ERROE GET APP_BASE FUNC")
/*DEBUG_END*/

export = platformModule;
