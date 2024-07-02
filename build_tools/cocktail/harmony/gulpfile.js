/**
 * Gulp 流程依赖的库
 * - fse 文件删除
 * - gulp-if 判断是否满足拷贝条件
 */
const fse = require('fs-extra');
const path = require('path');

const {
  src,
  dest,
  series,
  watch
} = require('gulp')
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


function getSpecialCopy() {
  // debugger
  let specialCopyFunc;
  
  if (1) {
    specialCopyFunc = require('../glup/glup_stream_transform.remove_untarget_platform.js').bind(null, "HARMONY")
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

let commonFiles = [];
readDir(`${srcRootPath}/cocktail/@union`, commonFiles);
let platformFiles = [];
readDir(`${srcRootPath}/cocktail/@union`, platformFiles);
commonFiles = commonFiles.map(v => path.relative(srcRootPath + "/../", v));
platformFiles = platformFiles.map(v => path.relative(srcRootPath + "/../", v));

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

  // debugger
  // let ignoreFiles = Object.values(TaskType).reduce((last, loopTaskType) => {
  //   // 过滤 framework
  //   last = last.concat([`!${OriginPath}/framework/*_tolerant`, `!${OriginPath}/framework/*_tolerant/**/*`, `!${OriginPath}/${FrameMapping[loopTaskType]}`, `!${OriginPath}/${FrameMapping[loopTaskType]}/**/*`])
  //   // 不过滤当前环境
  //   if (taskType === loopTaskType) {
  //     return last
  //   }
  //   // 过滤指定目录
  //   const avoidCopyFiles = SpecialFileMapping[loopTaskType] || []
  //   const filterCopyFiles = avoidCopyFiles.filter(specCopyPath => (SpecialFileMapping[taskType].indexOf(specCopyPath) === -1))
  //   return last.concat(filterCopyFiles.map(filePath => '!' + filePath))
  // }, [])


  // ignoreFiles.push('!src_original/project.private.config.json');
  // ignoreFiles.push('!src_original/sitemap.json');


  // let specialCopyFunc = getSpecialCopy(taskType)
  // return src([`${srcRootPath}/**/*`].concat(ignoreFiles)).pipe(specialCopyFunc()).pipe(getSpecialConfigCopy(taskType)).pipe(dest(distRootPath))
  // debugger
  return src([`${srcRootPath}/cocktail/@union/**/*`].concat(ignoreFiles)).pipe(dest(distRootPath + "/cocktail/@union"));
}

function compileCopyTask() {
  let ignoreFiles = [];
  ignoreFiles.push('!src_original/cocktail/@compile/target_compile_platform.js');

  return src([`${srcRootPath}/cocktail/@compile/**/*`].concat(ignoreFiles)).pipe(dest(distRootPath + "/cocktail/@compile/"));
}

function commonCopyTask() {

  // debugger
  return src([`${srcRootPath}/cocktail/@common/**/*`]).pipe(getSpecialCopy()).pipe(dest(distRootPath + "/cocktail/@union/"));

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
  return series.apply(null, 
      [
        unionCopyTask,
        compileCopyTask,
        commonCopyTask,
        platfromCopyTask,
      ]
  );
}

/**
 * 创建监听任务
 * @param {TaskType} taskType 
 */
function createWatchTask(taskType) {
  return function watchTask() {
    if (0) {
  
    } else {
      watch([`${OriginPath}/**/*`], { events: ['add', 'change', 'unlink', 'unlinkDir'] }, series(createCleanTask(taskType), createCopyTask(taskType)))
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

