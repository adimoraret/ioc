import IoC from './IoC';

export default async function getCurrentTemperature(zipCode) {
  const temperature = await IoC.thirdPartyApi.getCurrentTemperature(zipCode);
  IoC.log(`Result: ${JSON.stringify(temperature)}`);
  return temperature.now;
}
