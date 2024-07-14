# what's this project / 这是一个什么项目
this a demo which can develop wx mini programs and HarmonyOS arkui simultaneously.

这是一个同构开发微信小程序和鸿蒙的演示demo。

# what's ths relationship between eevee and cocktail / 库eevee 和 cocktail是什么关系
lib eevee focus on convert ui-node and style from multi platform to multi platform.
cocktail is a framework develop on wx mini program platform, and convert to arkts and h5. the ui part(wxml/less) conversion is implemented by the lib-eevee, and the logic part (js/ts) conversion is implemented by cocktail.

库eevee作用是UI节点和样式端到端的转换。而cocktail是一个微信小程序平台的开发框架，并且能转换为arkts与h5，ui部分(wxml/less)使用eevee转换，逻辑部分(js/ts)的转换则使用cocktail自己的代码。

# why using both import and require / 为什么代码同时使用和import require
when wxmp lanuched, all page will be registered, so if we import a module on the top of page code, they will cost a lot time on I/O reading and js parsing. so if a module will not used in page start, we will using require.

当微信小程序启动，所有页面会被注册，如果模块在页面上端被import，它们将花费不少时间在I/O读取和js解析上。所以一个模块若不是启动就需要，我们会在使用的地方做require。


# what's page_mixed / 什么是PageMixed
我们为了划分页面模块，往往使用组件分割页面。
早期启动时，微信会把所有页面的组件做一次注册和加载，这导致启动很慢。
早期组件不能调试里面的data数据。
有时候我们只需要分割模块，不需要独立的生命周期和数据域。

PageMixed是一种更轻的概念，他和page数据同域，且没有自己的生命周期，他的作用仅仅是切割页面模块。
为了演示这个私有概念的代码的转换逻辑，特地在工具链完成了这个转换。

# how to start
git submodule update --remote
npm i
node ./build_tools/watch_harmony