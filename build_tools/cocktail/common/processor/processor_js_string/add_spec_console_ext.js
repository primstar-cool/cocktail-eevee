
const path = require("path");
module.exports = function addSpecConsoleExt(
  content,
  filename,
) {
  // debugger
  if (!content) return content;

  if (!content.includes("console.ASSERT")
    && !content.includes("console.LOG")
    && !content.includes("console.WARN")
    && !content.includes("console.ERROR")

  ) return content;
  

  // debugger
  if (!content.includes("/core/cktlv3")) {
    let absCktlv3Path = path.join(__dirname, '../../../../../src_original/cocktail/@union/core/cktlv3');
    // debugger
    content = `import CktlV3 from "${path.relative(path.dirname(filename), absCktlv3Path)}"; // add by cocktail convertor\n` 
    + `const console = CktlV3.console; // add by cocktail convertor\n` + content;

  } else {
    let index = content.indexOf("/core/cktlv3");
    let analysisContent = content.substring(0 ,index);
    analysisContent = analysisContent.substring(analysisContent.lastIndexOf("import"));
    analysisContent = analysisContent.substring(6).trim()
    let CktlV3Refer = analysisContent.substring(0 , analysisContent.indexOf(" ", 6)).trim();

    let enter = content.indexOf("\n", index);

    content = content.substring(0, enter) + `\nconst console = ${CktlV3Refer}.console; // add by cocktail convertor\n` + content.substring(enter);

  }
  
  return content

  // 
// 



};
