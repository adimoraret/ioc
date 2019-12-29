let thirdPartyApi = null;
let log = null;

export default class IoC {
  static set thirdPartyApi(value) {
    thirdPartyApi = value;
  }

  static get thirdPartyApi() {
    return thirdPartyApi;
  }

  static set log(value) {
    log = value;
  }

  static get log() {
    return log;
  }
}
