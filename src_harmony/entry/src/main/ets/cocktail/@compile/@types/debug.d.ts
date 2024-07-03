


declare namespace WechatMiniprogram {
  interface Console {
    /** [console.debug()](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/console.debug.html)
     *
     * 在插件中使用：不支持
     *
     * 向调试面板中打印 debug 日志 */
    ASSERT(
      flag: any,
        /** 日志内容，可以有任意多个。 */
      ...args: any[]
    ): void
  }
}