const { IS_BROWSER, IS_TTMA , IS_WXMP, IS_SWAN, IS_ALIMP, IS_KSMP, IS_NODE} = require('../../@complie/target_compile_platform.js');

// let platformModule :CktlV3.IAppCreator;

IS_WXMP && (module.exports = require('../../platform_mp/framework/app_base'));
// IS_KSMP && (module.exports = require('../../platform_mp/framework/app_base'));
// IS_TTMA && (module.exports = require('../../platform_mp/framework/app_base'));
// IS_SWAN && (module.exports = require('../../platform_mp/framework/app_base')); // 和wx一致
// IS_ALIMP && (module.exports = require('../../platform_mp/framework/app_base'));
// IS_BROWSER && (module.exports = require('../../platform_h5/framework/app_base'));

// IS_NODE && (module.exports = require('../../framework_node/class_define/app_base'));

/*DEBUG_START*/
if (typeof module.exports !== 'function') throw new Error( "ERROE GET APP_BASE FUNC")
/*DEBUG_END*/

// export default platformModule;
