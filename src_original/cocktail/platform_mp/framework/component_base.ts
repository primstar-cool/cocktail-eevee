/**
 * @since 20180620 09:58
 */
import CktlV3 from "../../@compile/@types/framework"

module.exports = (componentParams: CktlV3.ComponentParams): void|CktlV3.ComponentBase => {
  Component(componentParams as any);
};
