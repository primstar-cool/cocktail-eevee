// debugger
import EventTriggerHolder from "./event_trigger_holder"
import CktlV3Event from "../../@compile/@types/event"

export default class EventTriggerOnce extends EventTriggerHolder {

  protected _callbackWrap(evtId: CktlV3Event.EventID, data: any, sender: any, refer: CktlV3Event.EventTriggerHolderRefer) {
    let self: EventTriggerOnce = refer.self as EventTriggerOnce;
    if (self.m_callback && self.m_referWrap) {
      self.m_callback(evtId, data, sender, refer.refer);
      self.dispose();
    }
  }
}
