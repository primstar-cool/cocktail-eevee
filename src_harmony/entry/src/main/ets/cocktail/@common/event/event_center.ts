/**
 * @file event_center.js
 * @author lanbei
 * a frame for event notify
 */
import CktlV3Event from "../../@compile/@types/event"
import CktlV3 from "../../platform_harmony/core/cktlv3"
const console = CktlV3.console; // add by cocktail convertor


export default class EventCenter implements CktlV3Event.IEventCenter {

    public constructor(private readonly uuid: string) {
    }
    
    private m_dict: Record<string|number, Array<CktlV3Event.CallbackVO>> | null = {};

    public notify(evtId: CktlV3Event.EventID, data: any = undefined, sender: any = undefined): void {
        if (!evtId || !this.m_dict) {
            console.ASSERT(false, "evtId error:" + evtId);
            return;
        }
        const callBackFuncArray: Array<CktlV3Event.CallbackVO> = this.m_dict[evtId];

        if (callBackFuncArray) {
            for (var i = 0; i < callBackFuncArray.length; ) {
                const callBackVO: CktlV3Event.CallbackVO = callBackFuncArray[i];
                if (callBackVO) {
                    callBackVO.func(evtId as never, data, sender, callBackVO.refer);
                    if (callBackVO === callBackFuncArray[i]) {
                        i++;
                    }
                }
            }
        }
    }

    
    public register(evtId: CktlV3Event.EventID, callBackFunc: CktlV3Event.EventCallback, refer: any = undefined): void {
        /*DEBUG_START*/
        // var stack = new Error().stack.substring(6).trim();

        // var lines = stack.split('\n');
        // for (var i = 0; i < lines.length; i++) {
        //     var ln = lines[i];
        //     if (ln.indexOf('AppEnvironment.register') !== -1) {
        //     ln = lines[i + 1].trim();
        //     break;
        //     } else {
        //     ln = null;
        //     }
        // }
        // if (ln) {
        //     var lnData = ln.split(' ');
        //     if(lnData.length === 4) {
        //     lnData = [lnData[0], lnData[1]+lnData[2], lnData[3]]
        //     }

        //     var _debugSourceData = {
        //     fromFn: lnData[1],
        //     stack: stack,

        //     };
        //     var referCpdeLine = lnData[2] ? lnData[2].trim() : lnData[1].trim();
        //     referCpdeLine = referCpdeLine.substring(1, referCpdeLine.length - 1);
        //     var dotJs = referCpdeLine.lastIndexOf('.js');
        //     if (dotJs !== -1) {
        //     _debugSourceData.codeFilePath = referCpdeLine.substring(0, dotJs + 3);
        //     var rowColData = referCpdeLine.substring(dotJs + 4).split(':');
        //     _debugSourceData.codeLine = parseInt(rowColData[0]);
        //     _debugSourceData.codeCol = parseInt(rowColData[1]);
        //     _debugSourceData.codeRefer = null;
        //     _debugSourceData.regFn = null;
        //     } else {
        //     _debugSourceData.codeFilePath = '(' + referCpdeLine + ')';
        //     _debugSourceData.codeRefer = 'UNKNOWN';
        //     }
        // }
        // /*DEBUG_END*/

        if (!evtId || !this.m_dict) {
            console.ASSERT(false, "evtId error:" + evtId);
            return;
        }

        if (!this.m_dict[evtId]) {
            this.m_dict[evtId] = [];
        }

        this.m_dict[evtId].push({ func: callBackFunc, refer: refer });
    }

    
    public unregister(evtId: CktlV3Event.EventID, callBackFunc: CktlV3Event.EventCallback, refer: any = undefined) {
        if (!evtId || !this.m_dict) {
            console.ASSERT(false, "evtId error:" + evtId);
            return;
        }

        const callBackFuncArray: Array<CktlV3Event.CallbackVO> = this.m_dict[evtId];

        if (callBackFuncArray) {
            var len = callBackFuncArray.length;
            for (var i = 0; i < len; i++) {
                const callBackVO: CktlV3Event.CallbackVO = callBackFuncArray[i];

                if (callBackVO.func === callBackFunc && callBackVO.refer === refer) {
                    callBackFuncArray.splice(i, 1);
                    if (callBackFuncArray.length === 0) {
                        delete this.m_dict[evtId];
                    }
                    return;
                }
            }
        }

        console.ASSERT(false, "unregister error at eventId:" + evtId);
    }

    dispose() {
        this.m_dict = null;
    }

    /*DEBUG_START*/
    // printCallbackInfo(evtId, isDetail) {
    //   const FID = require('../../framework/ENUM/system_event.js');
    //   if (typeof evtId === 'string' && FID[evtId]) {
    //     evtId = FID[evtId];
    //   }
    //   if (!isNaN(evtId)) {
    //     var eventName = '[' + evtId + ('(FID.' + FID.debugIdToString(evtId)) + ')]' ;
    //   } else {
    //     eventName = '[' + evtId + ']';
    //   }

    //   var callBackFuncArray = this.this.m_dict[evtId];

    //   if (!callBackFuncArray || !callBackFuncArray.length) {
    //     console.log(eventName + 'has no callback');
    //     return;
    //   }

    //   var fileTempthis.m_dict = {};
    //   for (var i = 0; i < callBackFuncArray.length; i++) {
    //     var __debugSourceData = callBackFuncArray[i]._debugSourceData;
    //     if (__debugSourceData.codeFilePath && !__debugSourceData.codeRefer) {
    //       if (!fileTempthis.m_dict[__debugSourceData.codeFilePath])
    //         fileTempthis.m_dict[__debugSourceData.codeFilePath] = [];
    //       fileTempthis.m_dict[__debugSourceData.codeFilePath].push(__debugSourceData);
    //     }
    //   }

    //   if (Object.keys(fileTempthis.m_dict).length === 0) {
    //     console.log(eventName + ' showing callback info as follows...');
    //     doPrintInfo();
    //   } else {
    //     console.log(eventName + ' callback info analysing...');
    //     const httpRequest = require('../utils/http_request.js').request;

    //     for (let uKey in fileTempthis.m_dict) {
    //       httpRequest({
    //         url: uKey,
    //         data: null,
    //         header: {},
    //         method: 'GET',
    //         dataType: "text/plain",
    //         responseType: 'text',
    //         success: (res) => {

    //           // '('.charCodeAt(0) 40
    //           // ')'.charCodeAt(0) 41
    //           // ','.charCodeAt(0)  44
    //           // '\n'.charCodeAt(0) 10

    //           var dealingArr = fileTempthis.m_dict[uKey];

    //           var content = res.data + '\n';
    //           var lineCode = null;
    //           for (let i = 0; i < dealingArr.length; i++) {
    //             var _do = dealingArr[i];
    //             var startLine = _do.codeLine - 1;

    //             for (let f = 0; f < content.length; f++ ) {
    //               if (startLine === 0) {
    //                 lineCode = content.substring(f);
    //                 break;
    //               }

    //               if (content.charCodeAt(f) === 10) {
    //                 startLine--;
    //               }
    //             }

    //             if (!lineCode) {
    //               console.warn('parse callback info errro!!');
    //               checkEnd(uKey);
    //               return;
    //             }

    //             var step = 0;
    //             var deep = 0;
    //             var functionStart = 0;

    //             for (let k = _do.codeCol + 7; k < lineCode.length; k++) {
    //               var ch = lineCode.charCodeAt(k);
    //               if (ch === 40) { // (
    //                 deep++;
    //                 if (step === 0)
    //                   step = 1;

    //               }
    //               else if (ch === 44) { // ,
    //                 if (step === 1 && deep === 1) {
    //                   step = 2;
    //                   functionStart = k+1;
    //                 }
    //               }
    //               else if (ch === 41) { // )
    //                 deep--;
    //                 if (step === 2 && deep === 0) {
    //                   step = 3;
    //                   _do.regFn = lineCode.substring(functionStart, k).trim();
    //                 }
    //               }
    //               else if (ch === 10) { // )
    //                 if (step === 3) {
    //                   step = 4;
    //                   _do.codeRefer = lineCode.substring(0, k);
    //                   // console.log(_do.codeRefer)
    //                   break;
    //                 }
    //               }

    //             }

    //             // while (startLine < lines.length) {
    //             //   var codeLine += lines[startLine];
    //             // }

    //           }

    //           checkEnd(uKey);

    //         },
    //         fail: (res) => {

    //           checkEnd(uKey);
    //         },
    //       });
    //     }

    //   }

    //   function checkEnd(uKey) {
    //     delete fileTempthis.m_dict[uKey];
    //     if (Object.keys(fileTempthis.m_dict).length === 0) {
    //       doPrintInfo();
    //     }
    //   }

    //   function doPrintInfo() {

    //     console.table(callBackFuncArray.map(
    //       (v) => {
    //           var filePath = v._debugSourceData.codeFilePath;
    //           return !isDetail ? {
    //             'fnName': v._debugSourceData.regFn,
    //             'file':
    //             filePath.substring(filePath.lastIndexOf('/') + 1),
    //             'callFrom': v._debugSourceData.fromFn
    //           } : {
    //             'fnName': v._debugSourceData.regFn,
    //             'file': (filePath = filePath.substring(filePath.indexOf('://') + 3)).substring(filePath.indexOf('/')),
    //             'line': v._debugSourceData.codeLine,
    //             'context': v._debugSourceData.codeRefer.trim(),
    //             'stack': v._debugSourceData.stack,
    //           }
    //         }
    //       )
    //     );
    //   }

    // }
    /*DEBUG_END*/
}
