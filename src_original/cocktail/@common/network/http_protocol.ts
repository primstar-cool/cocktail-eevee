class HttpProtocol {
  constructor(a_path, a_extra) {
    this.path = a_path;
    // assert(this.url);

    this.method = 'GET';
    this.header = null;
    this.needAccessToken = false;
    this.needConfusion = false;

    this.dataType = 'json';
    this.responseType = 'text';
    this.priority = 2;
    this.domain = '';
    this.data = {};
    this.withCredentials = false;
    this.timeout = 0;


    if (a_extra) {
      a_extra.method && (this.method = a_extra.method);
      a_extra.needAccessToken && (this.needAccessToken = a_extra.needAccessToken);
      a_extra.betterAccessToken && (this.betterAccessToken = a_extra.betterAccessToken);
      a_extra.header && (this.header = a_extra.header);
      a_extra.domain && (this.domain = a_extra.domain);
      a_extra.responseType && (this.responseType = a_extra.responseType);

      a_extra.data && (this.data = a_extra.data);
      (a_extra.withCredentials !== undefined) && (this.withCredentials = a_extra.withCredentials);
      (a_extra.priority !== undefined) && (this.priority = a_extra.priority);
      a_extra.retryMax && (this.retryMax = a_extra.retryMax);
      a_extra.retryDelay && (this.retryDelay = a_extra.retryDelay);
      (a_extra.skipPreload !== undefined) && (this.skipPreload = a_extra.skipPreload);
      (a_extra.preloadCacheTime !== undefined) && (this.preloadCacheTime = a_extra.preloadCacheTime);
      (a_extra.timeout !== undefined) && (this.timeout = a_extra.timeout);


      a_extra.needConfusion && (this.needConfusion = a_extra.needConfusion);
    }

   
    if (Object.freeze)
      Object.freeze(this);
    else if (Object.preventExtensions)
      Object.preventExtensions(this);
  }
}

export = HttpProtocol;