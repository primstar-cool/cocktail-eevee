import {SystemEvent} from "../@enum/system_event";


declare namespace CktlV3 {
  
  type EventID = string|number|SystemEvent;

  type SystemEventCallback = (evtId: SystemEvent, data: any, sender: any, refer: any) => void;
  type SystemEventCallback_0 = (evtId: SystemEvent, data: any, sender: any) => void;
  type SystemEventCallback_1 = (evtId: SystemEvent, data: any) => void;
  type SystemEventCallback_2 = (evtId: SystemEvent) => void;
  type EventCallback_3 = () => void;

  type CustomEventCallback = (evtId: string, data: any, sender: any, refer: any) => void;
  type CustomEventCallback_0 = (evtId: string, data: any, sender: any) => void;
  type CustomEventCallback_1 = (evtId: string, data: any) => void;
  type CustomEventCallback_2 = (evtId: string) => void;

  type EventCallback =
      | SystemEventCallback
      | SystemEventCallback_0
      | SystemEventCallback_1
      | SystemEventCallback_2
      | CustomEventCallback
      | CustomEventCallback_1
      | CustomEventCallback_2
      | EventCallback_3;
  type CallbackVO = {
      func: EventCallback;
      refer?: any;
  };


  export interface IEventCenter {
    notify(evtId: EventID, data?: any, sender?: any): void;
    register(evtId: EventID, callBackFunc: EventCallback, refer?: any): void ;
    unregister(evtId: EventID, callBackFunc: EventCallback, refer?: any): void;
  }

}
