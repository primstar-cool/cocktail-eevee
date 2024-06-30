/**
 * 框架统一的错误码
 * 0为正确
 * 每100为一个系列
 * 错误码>0表示常规错误,如网络错误,Token过期,优惠券领完
 * 错误码<0,表示非预期错误,由前端BUG或者黑客攻击导致,比如Token位数不匹配,未到领取时间发优惠券领取请求
 * -30000~30000为框架保留错误码
 */
const ErrorCode = {
  OK: 0,

  UNKNOWN_ERROR: -1,

  NETWORK_GENERAL_ERROR: 1000,
  NETWORK_TIMEOUT: 1001,
  NETWORK_HOST_NOT_FOUND: 1002,

  NETWORK_WS_RETRY_REACH_MAX: 1010,


  NETWORK_SERVER_REJECTION: 1400, // 服务器主动拒绝,
  NETWORK_SERVER_METHOD_NOT_ALLOWED: -1405, // POST GET写错,
  NETWORK_SERVER_INTERNAL_ERROR: 1406, // 服务器自己有问题

  PROTOCOL_GENERAL_ERROR: 5000,
  PROTOCOL_MISS_FIELD: -5001, // 客户端去包缺字段,
  PROTOCOL_LACK_IMPORTANT_INFO: -5002, // 服务器回包缺少必要信息,
  PROTOCOL_VERSION_EXPIRED: 5003, // 协议版本过低

  ACCESS_TOKEN_GENERAL_ERROR: 15000,
  ACCESS_TOKEN_REQUIRED: -15001, // 此请求必须包含ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRED: 15002, // AT过期,
  ACCESS_TOKEN_FORMAT_INVALID: -15003, // AT格式错误

  toErrorSeries(errorCode) {
    return Math.floor(Math.abs(errorCode) / 100) * 100;
  },

  isSameErrorSeries(v, series) {
    console.ASSERT(!isNaN(v) && !isNaN(series), 'error id');
    return Math.floor(Math.abs(v) / 100) === Math.floor(Math.abs(series) / 100);
  },

  /*DEBUG_START*/
  debugIdToString(id) {
    for (let ecKey in ErrorCode) {
      if (ErrorCode[ecKey] === id) {
        return ecKey;
      }
    }
    return 'APP_SPEC_ERROR';
  },
  /*DEBUG_END*/

};

module.exports = ErrorCode;