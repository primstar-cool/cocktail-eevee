/**
 * Gulp 流程依赖的库
 * - fse 文件删除
 * - gulp-if 判断是否满足拷贝条件
 */
const fse = require('fs-extra');
const path = require('path');
const gulp = require('gulp')
const {
  src,
  dest,
  series,
  parallel,
  watch
} = gulp;

const srcRootPath = path.join(__dirname, "../../../src_original");
const distRootPath = path.join(__dirname, "../../../src_harmony/entry/src/main/ets");

const pages = (require(`${srcRootPath}/app.json`).pages) || [];


/**
 * 柯里化清除任务
 * @param {TaskType} type 
 */
function createCleanTask() {
  return function clean(cb) {
      fse.remove(distRootPath, cb);
  }
}


function cleanUntargetPlatform() {
  // debugger
  let specialCopyFunc;
  
  if (1) {
    specialCopyFunc = require('../common/glup/glup_stream_transform.remove_untarget_platform.js').bind(null, "HARMONY")
  } else {
    const through2 = require('through2')

    specialCopyFunc = function () {
      return through2.obj(function (file, _, cb) {
        cb(null, file)
      })
    }
  }
  return specialCopyFunc();
}

function getPageConvert(pagePath) {
  // debugger
  let specialCopyFunc;
  specialCopyFunc = require('./glup/glup_stream_transform.convert_harmony.js').bind(null, pagePath, srcRootPath)
  
  return specialCopyFunc();
}

let commonFiles = [];
readDir(`${srcRootPath}/cocktail/@union`, commonFiles);
let platformFiles = [];
readDir(`${srcRootPath}/cocktail/@union`, platformFiles);


// debugger
// 合集文件拷贝
function unionCopyTask() {
  let ignoreFiles = [];

  ignoreFiles = ignoreFiles.concat(
    commonFiles.map(v => "!" + v.replace("cocktail/@common","cocktail/@union" ))
  );

  ignoreFiles = ignoreFiles.concat(
    platformFiles.map(v => "!" + v.replace("cocktail/platform_harmony","cocktail/@union" ))
  );

  return src([`${srcRootPath}/cocktail/@union/**/*`].concat(ignoreFiles)).pipe(dest(distRootPath + "/cocktail/@union"));
}

function compileCopyTask() {
  let ignoreFiles = [];
  ignoreFiles.push(`!${srcRootPath}/cocktail/@compile/target_compile_platform.js`);

  return src([`${srcRootPath}/cocktail/@compile/**/*`].concat(ignoreFiles)).pipe(dest(distRootPath + "/cocktail/@compile/"));
}

function commonCopyTask() {
  let ignoreFiles = [];
  ignoreFiles = ignoreFiles.concat(
    platformFiles.map(v => "!" + v.replace("cocktail/platform_harmony","cocktail/@union" ))
  );
  // debugger
  return src([`${srcRootPath}/cocktail/@common/**/*`].concat(ignoreFiles)).pipe(cleanUntargetPlatform()).pipe(dest(distRootPath + "/cocktail/@union/"));

}

function platfromCopyTask() {
  // debugger
  return src([`${srcRootPath}/cocktail/platform_harmony/**/*`]).pipe(dest(distRootPath + "/cocktail/@union/"));

}

/**
 * 柯里化拷贝任务
 * @param {TaskType} taskType 
 */
function createCopyTask() {
  
  // return compileCopyTask();
  return parallel.apply(null, [
      createCocktailTask(),
      compileCopyTask,
      pageConvertTask("pages/index/index"),
    ]

  )
  // series.apply(null, 
  //     [
  //       unionCopyTask,
  //       compileCopyTask,
  //       commonCopyTask,
  //       platfromCopyTask,
  //       pageConvertTask("pages/index/index"),
  //     ]
  // );
}

function createCocktailTask() {
  return series.apply(null, 
    [
      unionCopyTask,
      commonCopyTask,
      platfromCopyTask,
    ]
  )
}


function pageConvertTask (pagePath) {
  return function () {
    
    return src([`${srcRootPath}/${pagePath}.ts`]).pipe(cleanUntargetPlatform()).pipe(getPageConvert(pagePath)).pipe(dest(distRootPath + "/cocktail/@union"));
  
  }
}


/**
 * 创建监听任务
 * @param {TaskType} taskType 
 */
function createWatchTask() {
  return function watchTask() {
    if (0) {
  
    } else {
      watch([`${OriginPath}/**/*`], { events: ['add', 'change', 'unlink', 'unlinkDir'] }, series(createCleanTask(), createCopyTask()))
    }
  }
}

function readDir(filepath, fileArr, findSubDirDepth = Infinity) {
  let ret = fse.readdirSync(filepath)
  ret.forEach((fileName) => {

      let mapedMap = path.resolve(filepath);
      // if (!folderDict[mapedMap]) folderDict[mapedMap] = 1
      // else folderDict[mapedMap]++;

      let curPath = filepath + '/' + fileName
      const stats = fse.statSync(curPath)
      if (stats.isFile()) {
          fileArr.push(curPath)
      } else if (stats.isDirectory() && findSubDirDepth) {
          readDir(curPath, fileArr, findSubDirDepth--)
      }
  });
}

/**
 * Clean Tasks
 */
exports.clean = createCleanTask()

/**
 * Copy Tasks
 */

exports.copy = createCopyTask()

/**
 * Watch Tasks
 */
exports.watch = createWatchTask()

exports.default = exports.copy

