const IS_ALIMP = (typeof my !== 'undefined' || (typeof global !== 'undefined' && global.AFAppX));
const IS_SWAN = typeof swan !== 'undefined';
const IS_HAP = typeof global !== 'undefined' && ((!!global.JsBridge && !!global.BroadcastChannel) || (!!global.appDestroy));
const IS_CANVAS = (typeof window !== 'undefined' && window.IS_CANVAS) || (typeof global !== 'undefined' && global.IS_CANVAS);
const IS_BROWSER = !IS_CANVAS && !IS_HAP && !IS_ALIMP && !IS_SWAN && typeof window !== 'undefined' && typeof swan === 'undefined';
const IS_KSMP = !IS_BROWSER && typeof ks !== 'undefined';
const IS_TTMA = !IS_BROWSER && typeof tt !== 'undefined';
const IS_WXMP = !IS_BROWSER && !IS_TTMA && !IS_KSMP && typeof wx !== 'undefined';
const IS_NODE = !IS_BROWSER && !IS_HAP && !IS_SWAN && !IS_ALIMP && typeof process !== 'undefined' && !process.browser;
const IS_HARMONY = !IS_NODE && !IS_BROWSER && !IS_HAP && !IS_SWAN && !IS_ALIMP && typeof process !== 'undefined' && typeof requestAnimationFrame !== 'undefined';;

/*DEBUG_START*/
var totalEnv = 0;
IS_BROWSER && totalEnv++;
IS_TTMA && totalEnv++;
IS_WXMP && totalEnv++;
IS_SWAN && totalEnv++;
IS_ALIMP && totalEnv++;
IS_HAP && totalEnv++;
IS_NODE && totalEnv++;
IS_CANVAS && totalEnv++;
IS_KSMP && totalEnv++;
IS_HARMONY && totalEnv++;


if (totalEnv !== 1) {
  console.error(`error totalEnv: ${totalEnv}
  IS_HAP: ${IS_HAP} 
  IS_TTMA: ${IS_TTMA} 
  IS_BROWSER: ${IS_BROWSER} 
  IS_WXMP: ${IS_WXMP} 
  IS_SWAN: ${IS_SWAN} 
  IS_ALIMP: ${IS_ALIMP} 
  IS_NODE: ${IS_NODE}
  IS_CANVAS: ${IS_CANVAS}
  IS_KSMP: ${IS_KSMP}
  IS_HARMONY: ${IS_HARMONY}
  `
  );

}

console.log(`Current Target: ${IS_NODE?"IS_NODE":""}${IS_HAP?"IS_HAP":""}${IS_TTMA?"IS_TTMA":""}${IS_BROWSER?"IS_BROWSER":""}${IS_WXMP?"IS_WXMP":""}${IS_ALIMP?"IS_ALIMP":""}${IS_SWAN?"IS_SWAN":""}${IS_CANVAS?"IS_CANVAS":""}${IS_KSMP?"IS_KSMP":""}`);
/*DEBUG_END*/

module.exports = {
  IS_BROWSER,
  IS_WXMP,
  IS_TTMA,
  IS_SWAN,
  IS_ALIMP,
  IS_HAP,
  IS_NODE,
  IS_CANVAS,
  IS_KSMP,
  IS_HARMONY,
};
