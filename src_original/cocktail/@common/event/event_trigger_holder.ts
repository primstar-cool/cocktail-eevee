// debugger
const EventCenter = require("./event_center")
export = class EventTriggerHolder {
  protected m_callback?: any;
  protected m_referWrap?: { refer: any; self: EventTriggerHolder };
  protected m_eventType?: CktlV3.EventID;
  protected m_eventCenter?: CktlV3.IEventCenter;

  constructor(evtId: CktlV3.EventID, callBackFunc: CktlV3.EventCallback, refer?: any, eventCenter?: CktlV3.IEventCenter
    ) {
    if (!callBackFunc) return;

    this.m_callback = callBackFunc;
    this.m_referWrap = { refer, self: this };
    this.m_eventType = evtId;

    this.m_eventCenter = eventCenter || getApp().ec;

    this.m_eventCenter!.register(this.m_eventType, this._callbackWrap, this.m_referWrap);
  }

  protected _callbackWrap(evtId: CktlV3.EventID, data: any, sender: any, refer: { refer: any; self: EventTriggerHolder }) {
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
