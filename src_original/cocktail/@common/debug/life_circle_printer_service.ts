/**
 * @since 20180328 16:12
 */

function setApp(app: CktlV3.AppBase):void {
  const FID = require('../../@complie/@enum/system_event');

  Object.keys(FID).forEach((key) => {
    if (Math.floor(FID[key] / 1000) === 10
    || Math.floor(FID[key] / 1000) === 20
    ) {
      app.ec.register(FID[key], handleLifeCircleChange(key));
    }
  });

  function handleLifeCircleChange(key: CktlV3.EventID): CktlV3.EventCallback {
    return function(_eventId: CktlV3.EventID, eventData = {pageName:undefined}) {
      const pageName = eventData.pageName ? `Page: ${eventData.pageName}` : 'APP';
      console.log(`life circle %c ${pageName} %c ${key} `, 'background-color: rgba(0, 255, 255, 0.3)', 'background-color: rgba(0, 255, 0, 0.3)');
    }
  }
}

export = { setApp };
