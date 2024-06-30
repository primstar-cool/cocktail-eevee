/*DEBUG_START*/
//@ts-nocheck
const { IS_BROWSER, IS_TTMA , IS_WXMP, IS_SWAN, IS_ALIMP, IS_KSMP, IS_NODE} = require('../../@compile/target_compile_platform');

let g;
IS_WXMP && (g = wx);
IS_SWAN && (g = swan);
IS_TTMA && (g = tt);
IS_KSMP && (g = ks);

console.ASSERT = function (flag) {
  if (!flag) {
    var args = Array.prototype.slice.call(arguments, 1);
    console.error.apply(console, args);
    console.error(new Error().stack);
    debugger;
    g && g.showModal({
      content: ('ASSERT:' + args),
      showCancel: false,
    });
  }
}

var consoleLogFunction = console.log;
var consoleWarnFunction = console.warn;
var consoleErrorFunction = console.error;

console.ERROR = function (...args) {

  consoleErrorFunction.call(console, '****************ERROR****************');
  consoleErrorFunction.apply(console, args);
  consoleErrorFunction.call(console, '*************************************');

};

console.WARN = function (...args) {
  consoleWarnFunction.call(console, '*****************WARN****************');
  consoleWarnFunction.apply(console, args);
  consoleWarnFunction.call(console, '*************************************');
};


console.LOG = function (...args) {
  consoleLogFunction.apply(console, args);
};
/*DEBUG_END*/

export = console;