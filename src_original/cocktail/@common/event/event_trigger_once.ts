// debugger
module.exports = class EventTriggerOnce extends require("./event_trigger_holder") {

  protected _callbackWrap(evtId: CktlV3.EventID, data: any, sender: any, refer: { refer: any; self: EventTriggerOnce }) {
    let self: EventTriggerOnce = refer.self;
    if (self.m_callback && self.m_referWrap) {
      self.m_callback(evtId, data, sender, refer.refer);
      self.dispose();
    }
  }
}
