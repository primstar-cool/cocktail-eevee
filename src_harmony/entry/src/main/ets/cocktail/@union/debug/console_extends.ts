let consoleOriginal = console;
let consoleExt = {
  ASSERT: (flag:boolean|any, ...args: any) :void => {
    consoleOriginal.log("BBB")
    consoleOriginal.log.call(consoleOriginal,flag + "AAA")
  },
  log: (...args) => {
    consoleOriginal.log.apply(consoleOriginal, args)
  },
  warn: (...args) => {
    consoleOriginal.warn.apply(consoleOriginal, args)
  },
  error: (...args) => {
    consoleOriginal.error.apply(consoleOriginal, args)
  },
  info: (...args) => {
    consoleOriginal.info.apply(consoleOriginal, args)
  },

  ERROR: function (...args) {

    consoleOriginal.error.call(consoleOriginal, '****************ERROR****************');
    consoleOriginal.error.apply(consoleOriginal, args);
    consoleOriginal.error.call(consoleOriginal, '*************************************');
  },
  WARN: function (...args) {
    consoleOriginal.warn.call(consoleOriginal, '*****************WARN****************');
    consoleOriginal.warn.apply(consoleOriginal, args);
    consoleOriginal.warn.call(consoleOriginal, '*************************************');
  },
  LOG: function (...args) {
    consoleOriginal.log.apply(console, args);
  },
}

for (let key in consoleOriginal) {
  if (!consoleExt[key])
    consoleExt[key] = (...args)=> {
    consoleOriginal[key].call(consoleOriginal, args)
  }
}

export default consoleExt;