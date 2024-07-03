
const path = require("path");
module.exports = function addSpecConsoleExtApp(
  content,
  filename,
) {
  // debugger
  if (!content) return content;

  let hasConsoleExt = content.includes("console.ASSERT")
    || content.includes("console.LOG")
    || content.includes("console.WARN")
    || content.includes("console.ERROR")
  let hasGetApp = content.includes("getApp")
  if (hasConsoleExt && !hasGetApp) 
    return content;
  

  // debugger
  if (!content.includes("/core/cktlv3")) {
    let absCktlv3Path = path.join(__dirname, '../../../../../src_original/cocktail/@union/core/cktlv3');
    // debugger
    content = `import CktlV3 from "${path.relative(path.dirname(filename), absCktlv3Path)}"; // add by cocktail convertor\n` 
    + (hasConsoleExt ? `const console = CktlV3.console; // add by cocktail convertor\n` : '')
    + (hasGetApp ? `const getApp = CktlV3.getApp; // add by cocktail convertor\n` : '')
    + content;

  } else {
    let index = content.indexOf("/core/cktlv3");
    let analysisContent = content.substring(0 ,index);
    analysisContent = analysisContent.substring(analysisContent.lastIndexOf("import"));
    analysisContent = analysisContent.substring(6).trim()
    let CktlV3Refer = analysisContent.substring(0 , analysisContent.indexOf(" ", 6)).trim();

    let enter = content.indexOf("\n", index);

    content = content.substring(0, enter) + 
    + (hasConsoleExt ? `\nconst console = ${CktlV3Refer}.console; // add by cocktail convertor\n` : '')
    + (hasGetApp ? `\nconst getApp = ${CktlV3Refer}.getApp; // add by cocktail convertor\n` : '')
    + content.substring(enter);

  }
  
  return content

  // 
// 



};
