export default class ThirdPartyApi {
  constructor(key, secret) {
    this.key = key;
    this.secret = secret;
  }

  getCurrentTemperature() {
    return new Promise((resolve, reject) => {
      if (!this.key || !this.secret) {
        reject(new Error('Invalid key or secret'));
      } else {
        const sampleTemperature = {
          now: { celsius: 30, fahrenheit: 86 },
          tomorrow: { celsius: 35, fahrenheit: 95 },
        };
        resolve(sampleTemperature);
      }
    });
  }
}
