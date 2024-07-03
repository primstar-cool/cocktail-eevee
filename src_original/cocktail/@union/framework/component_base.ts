const { IS_BROWSER, IS_TTMA , IS_WXMP, IS_SWAN, IS_ALIMP, IS_KSMP, IS_NODE, IS_HARMONY} = require('../../@compile/target_compile_platform.js');
import CktlV3 from "../../@compile/@types/framework"

let platformModule :CktlV3.IComponentRegisterWithName|CktlV3.IComponentRegister;

IS_WXMP && (platformModule = require('../../platform_mp/framework/component_base'));
IS_TTMA && (platformModule = require('../../platform_mp/framework/component_base'));
IS_KSMP && (platformModule = require('../../platform_mp/framework/component_base'));
IS_SWAN && (platformModule = require('../../platform_mp/framework/component_base'));
IS_ALIMP && (platformModule = require('../../platform_mp/framework/component_base'));

// IS_BROWSER && (platformModule = require('../../platform_h5/framework/component_base'));
// IS_NODE && (platformModule = require('../../platform_node/framework/component_base'));

IS_HARMONY && (platformModule = require('../../platform_harmony/framework/component_base'));

/*DEBUG_START*/
if (typeof platformModule! !== 'function') throw new Error( "ERROE GET COMPONENT_BASE FUNC")
/*DEBUG_END*/

export = platformModule;
