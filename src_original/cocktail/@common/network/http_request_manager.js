/**
 * 项目无关,仅框架相关的 wx专用管理器,仅做列队管理,不做token,不做回调管理,不做Promise封装等等
 */

const HTTP_REQUEST_LIMIT = 8; // threshold
const FID = require('../../framework/ENUM/system_event.js');

/*DEBUG_START*/
var g_httpRequestManagerNum = 0;
/*DEBUG_END*/

function _handleApplyHttpRequest(eventId, eventData, sender, refer) {
  if (!eventData.handled) {
    eventData.handled = 1;
    refer.request(eventData);
    eventData.handled = 0;
  }
}

/**
 * 请求队列管理器
 */
class HttpRequestManager {
  constructor(a_env) {
    this.requestId = 1;
    this.requestingCount = 0;
    this.waitingQueue = [];
    this.env = a_env;

    this.env.register(FID.APPLY_A_HTTP_REQUEST, _handleApplyHttpRequest, this);

    /*DEBUG_START*/
    g_httpRequestManagerNum++;
    console.ASSERT(g_httpRequestManagerNum === 1, 'HttpRequestManager must be singleton');
    /*DEBUG_END*/
  }



  request(apiRequestTask) {
    /*DEBUG_START*/
    if (!apiRequestTask.dispose) {
      console.warn("httpTask Should inherit of HttpRequestTask");
    }
    /*DEBUG_END*/
    if (this.requestingCount < HTTP_REQUEST_LIMIT) {
      this.requestSend(apiRequestTask);
    } else {
      this.requestWait(apiRequestTask);
    }

    return apiRequestTask;
  }

  requestWait(apiRequestTask) {

    
    const wl = this.waitingQueue.length;
    for (var i = 0; i < wl; i++) {
      var waitingProtocol = this.waitingQueue[i];
      if (waitingProtocol.priority > apiRequestTask.priority) {
        this.waitingQueue.splice(i, 0, apiRequestTask);
        return;
      }
    }
    this.waitingQueue.push(apiRequestTask);
  }

  dispose() {
    if (this.env) {
      this.env.unregister(FID.APPLY_A_HTTP_REQUEST, _handleApplyHttpRequest, this);
      this.env = null;
    }

    if (this.waitingQueue) {
      for (var i = 0; i < this.waitingQueue.length; i++) {
        if (this.waitingQueue[i]) {
          this.waitingQueue[i].dispose();
          this.waitingQueue[i] = null;
        }

      }
      this.waitingQueue = null;
    }

    /*DEBUG_START*/
    g_httpRequestManagerNum--;
    console.ASSERT(g_httpRequestManagerNum === 0, 'HttpRequestManager must be singleton');
    /*DEBUG_END*/
  }

  /**
   * 封装请求，执行队列
   */
  requestSend(apiRequestTask) {

    if (!apiRequestTask.url)
      apiRequestTask.url = (apiRequestTask.domain || apiRequestTask.protocol.domain || '') + apiRequestTask.protocol.path;
    if (apiRequestTask.protocol.data || apiRequestTask.data)
      apiRequestTask.data = Object.assign({}, apiRequestTask.protocol.data, apiRequestTask.data);
    if (apiRequestTask.protocol.header || apiRequestTask.header)
      apiRequestTask.header = Object.assign({}, apiRequestTask.protocol.header, apiRequestTask.header);

    if (apiRequestTask.retryMax === undefined && apiRequestTask.protocol.retryMax) {
      apiRequestTask.retryMax = apiRequestTask.protocol.retryMax;
    }
    if (apiRequestTask.retryDelay === undefined && apiRequestTask.protocol.retryDelay !== undefined) {
      apiRequestTask.retryDelay = apiRequestTask.protocol.retryDelay;
    }
    if (apiRequestTask.withCredentials === undefined && apiRequestTask.protocol.withCredentials !== undefined)
      apiRequestTask.withCredentials = apiRequestTask.protocol.withCredentials;
    
    if (apiRequestTask.timeout === undefined && apiRequestTask.protocol.timeout) {
      apiRequestTask.timeout = apiRequestTask.protocol.timeout;
    }

    apiRequestTask.taskInfo = apiRequestTask.taskInfo || {};
    apiRequestTask.taskInfo.requestId = this.requestId++;

    this.env.notify(FID.ON_HTTP_REQUEST_PREPARING, apiRequestTask, this); // 用来植入数据
    if (apiRequestTask.url) {
      this.env.notify(FID.ON_HTTP_REQUEST_PREPARED, apiRequestTask, this); // 阻塞 打点等等
    }

    if (apiRequestTask.url) {
      var me = this;
      me.requestingCount++;
      const httpRequest = require('../../framework/utils/http_request.js').request;
      this.env.notify(FID.ON_HTTP_REQUEST_START, apiRequestTask, this); // 统计 跟踪等等

      httpRequest({
        url: apiRequestTask.url,
        data: apiRequestTask.data || undefined,
        header: apiRequestTask.header,
        method: apiRequestTask.method || apiRequestTask.protocol.method || undefined,
        dataType: apiRequestTask.dataType || apiRequestTask.protocol.dataType || undefined,
        responseType: apiRequestTask.responseType || apiRequestTask.protocol.responseType || undefined,
        withCredentials: apiRequestTask.withCredentials,
        timeout: apiRequestTask.timeout || 0,
        success: (res) => {

          var eventData = { task: apiRequestTask, wxRawData: res, serverData: res };
          apiRequestTask.response = res;

          me.env.notify(FID.ON_HTTP_REQUEST_RESPONSE, eventData, me);// 转译 修剪等等

          me.env.notify(FID.ON_HTTP_REQUEST_RESPONSE_SUCC, eventData, me);// 转译 修剪等等

          typeof apiRequestTask.callback === 'function' && apiRequestTask.callback(eventData);

          if (apiRequestTask.dispose) {
            apiRequestTask.dispose();
          }
          
          me.requestingCount--;
          me.env.notify(FID.ON_HTTP_REQUEST_RESPONSE_COMPLETE, eventData, me);


          if (me.requestingCount < HTTP_REQUEST_LIMIT && me.waitingQueue.length) {
            me.requestSend(me.waitingQueue.shift());
          }
        },
        fail: (res) => {


          var eventData = { task: apiRequestTask, serverData: res };
          apiRequestTask.response = res;
          me.env.notify(FID.ON_HTTP_REQUEST_RESPONSE, eventData, me);// 转译 修剪等等
          me.env.notify(FID.ON_HTTP_REQUEST_RESPONSE_FAIL, eventData, me);// 转译 修剪等等 重试等等

          typeof apiRequestTask.callback === 'function' && apiRequestTask.callback(eventData);

          // console.warn('wx.request fail path %o task: %o eventData: %o sending %d queuing %d', apiRequestTask.protocol.path, apiRequestTask, eventData, me.requestingCount - 1, me.waitingQueue.length);

          apiRequestTask.dispose();
          me.requestingCount--;
          me.env.notify(FID.ON_HTTP_REQUEST_RESPONSE_COMPLETE, eventData, me);


          if (me.requestingCount < HTTP_REQUEST_LIMIT && me.waitingQueue.length) {
            me.requestSend(me.waitingQueue.shift());
          }
        },
      });

    }
  }
}

module.exports = HttpRequestManager;