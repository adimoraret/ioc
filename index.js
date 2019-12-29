import IoC from './IoC';
import ThirdPartyApi from './ThirdPartyApi';
import getCurrentTemperature from './main';

IoC.log = console.log;
IoC.thirdPartyApi = new ThirdPartyApi('key', 'secret');

(async () => {
  const zipCode = '90210';
  const currentTemperature = await getCurrentTemperature(zipCode);
  console.log(`Current Temperature for ${zipCode} in Fahrenheit is ${currentTemperature.fahrenheit}`);
})();
