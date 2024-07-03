
import CktlV3Framework from "../../@compile/@types/framework"
import CktlV3Event from "../../@compile/@types/event"
import {SystemEvent as FID} from '../../@compile/@enum/system_event'
import EventCenter from '../../@union/event/event_center';
import CktlV3 from "../core/cktlv3"

export class CAppBase implements CktlV3Framework.IAppBase {
  readonly __service_block__: Record<string, number>;
  public ec: CktlV3Event.IEventCenter;
  public onShow: CktlV3Framework.IAppBaseLifeCycleOptions;
  public onLaunch: CktlV3Framework.IAppBaseLifeCycleOptions;
  public onPageNotFound: CktlV3Framework.IAppBaseLifeCycleQuery;
  public onHide: CktlV3Framework.IAppBaseLifeCycleVoid;
  public onError: CktlV3Framework.IAppBaseLifeCycleAny;

  public $regNextPageRoute(pageRoute: string): void {
    console.log("reg next page route: " + pageRoute);
  }
  // private readonly appParams: CktlV3Framework.IAppParams;

  constructor(protected readonly appParams: CktlV3Framework.IAppParams) {
    this.__service_block__ = {};
    this.ec = new EventCenter('APP_EVENT_CENTER');

    this.onShow = (options: CktlV3Framework.AppLifeCycleParamOptions) => {
      this.ec.notify(FID.ON_APP_SHOW, { options });
      if (this.appParams.onShow) this.appParams.onShow.call(this, options);
    }

    this.onLaunch = (options: CktlV3Framework.AppLifeCycleParamOptions) => {
      if (this.appParams.onLaunch) this.appParams.onLaunch.call(this, options);
      this.ec.notify(FID.ON_APP_LAUNCH, { options });
    }
    this.onHide = () => {
      this.ec.notify(FID.ON_APP_HIDE);
      if (this.appParams.onHide) this.appParams.onHide.call(this);
    }
    this.onError = (error: CktlV3Framework.AppLifeCycleParamAny) => {
      this.ec.notify(FID.ON_APP_ERROR, { error: error });
      if (this.appParams.onError) this.appParams.onError.call(this);
    }
    this.onPageNotFound = (options: CktlV3Framework.AppLifeCycleParamQuery) => {
      this.ec.notify(FID.ON_PAGE_NOT_FOUND, { options });
      if (this.appParams.onPageNotFound) this.appParams.onPageNotFound.call(this, options);
    }
  }
}


type AppBaseCreator<TAP extends CktlV3Framework.IAppParams> = (param: TAP) => CktlV3Framework.IAppBase;

export default function createMPApp<TAP extends CktlV3Framework.IAppParams>(appCreator: AppBaseCreator<TAP> , appParam: TAP) {

  /*DEBUG_START*/
  // require('../../@union/debug/console_extends.js');
  /*DEBUG_END*/

  let app: CktlV3Framework.IAppBase = appCreator(appParam);
  CktlV3.$setApp(app);

  app.onLaunch({
    query: {},
    path: '',
  });

};
