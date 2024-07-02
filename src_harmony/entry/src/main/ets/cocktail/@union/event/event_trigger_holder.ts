// debugger
// import EventCenter from "./event_center"
import CktlV3Event from "../../@compile/@types/event"
import CktlV3Framework from "../../@compile/@types/framework"


export default class EventTriggerHolder implements CktlV3Framework.IDispose {
  protected m_callback?: any;
  protected m_referWrap?: { refer: any; self: EventTriggerHolder };
  protected m_eventType?: CktlV3Event.EventID;
  protected m_eventCenter?: CktlV3Event.IEventCenter;

  constructor(evtId: CktlV3Event.EventID, callBackFunc: CktlV3Event.EventCallback, refer?: any, eventCenter?: CktlV3Event.IEventCenter
    ) {
    if (!callBackFunc) return;

    this.m_callback = callBackFunc;
    this.m_referWrap = { refer, self: this };
    this.m_eventType = evtId;

    this.m_eventCenter = eventCenter || CktlV3Framework.getApp().ec;

    this.m_eventCenter!.register(this.m_eventType, this._callbackWrap, this.m_referWrap);
  }

  protected _callbackWrap(evtId: CktlV3Event.EventID, data: any, sender: any, refer: CktlV3Event.EventTriggerHolderRefer) {
    let self: EventTriggerHolder = refer.self;
    if (self.m_callback && self.m_referWrap) {
      self.m_callback(evtId, data, sender, refer.refer);
    }
  }

  dispose() {
    if (this.m_callback && this.m_referWrap && this.m_eventCenter) {
      this.m_eventCenter.unregister(this.m_eventType!, this._callbackWrap, this.m_referWrap);
      this.m_callback = undefined;
      this.m_referWrap = undefined;
      this.m_eventType = undefined;
      this.m_eventCenter = undefined;
    }
  }
}
