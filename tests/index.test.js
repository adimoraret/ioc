import { describe, it } from 'mocha';
import { expect } from 'chai';
import IoC from '../IoC';
import getCurrentTemperature from '../main';

describe('get current temperature unit tests', () => {
  it('should return temperature', async () => {
    const fahrenheit = 86;
    const celsius = 30;
    IoC.log = () => { };
    IoC.thirdPartyApi = { getCurrentTemperature: () => ({ now: { fahrenheit, celsius } }) };

    const temperature = await getCurrentTemperature('90210');

    expect(temperature.fahrenheit).to.equal(fahrenheit);
    expect(temperature.celsius).to.equal(celsius);
  });

  it('should log when returning temperature', async () => {
    const fahrenheit = 86;
    const celsius = 30;
    let isLogCalled = false;
    IoC.log = () => { isLogCalled = true; };
    IoC.thirdPartyApi = { getCurrentTemperature: () => ({ now: { fahrenheit, celsius } }) };

    await getCurrentTemperature('90210');
    expect(isLogCalled).to.equal(true);
  });
});
