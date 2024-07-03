// debugger
import EventTriggerHolder from "./event_trigger_holder"
import CktlV3 from "../../@union/core/cktlv3"

export default class EventTriggerOnce extends EventTriggerHolder {

  protected _callbackWrap(evtId: CktlV3.EventID, data: any, sender: any, refer: CktlV3.EventTriggerHolderRefer) {
    let self: EventTriggerOnce = refer.self as EventTriggerOnce;
    if (self.m_callback && self.m_referWrap) {
      self.m_callback(evtId, data, sender, refer.refer);
      self.dispose();
    }
  }
}
