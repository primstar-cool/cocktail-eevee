class HttpRequestTask {
  constructor(a_protocol, a_extra) {
    this.protocol = a_protocol;
    this.taskInfo = null;
    this.priority = 2;
    this.response = null;
    if (a_protocol.priority !== undefined) this.priority = a_protocol.priority;

    if (a_extra) {
      (typeof a_extra.callback === 'function') && (this.callback = a_extra.callback);
      (a_extra.priority !== undefined) && (this.priority = a_extra.priority);
      (a_extra.retryMax !== undefined) && (this.retryMax = a_extra.retryMax);
      (a_extra.retryDelay !== undefined) && (this.retryDelay = a_extra.retryDelay);
      (a_extra.skipPreload !== undefined) && (this.skipPreload = a_extra.skipPreload);
      (a_extra.preloadCacheTime !== undefined) && (this.preloadCacheTime = a_extra.preloadCacheTime);
      
      (a_extra.domain !== undefined) && (this.domain = a_extra.domain);
      
      a_extra.data && (this.data = a_extra.data);
      a_extra.header && (this.header = a_extra.header);
    }

    //优先级,默认2,协议固有的覆盖默认,extra带的覆盖协议的
  }

  dispose() {
    this.url = null;
    this.callback = null;
    this.protocol = null;
    this.response = null;
  }
}

export = HttpRequestTask;