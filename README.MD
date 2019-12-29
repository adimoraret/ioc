# Custom IoC implementation in JavaScript #

This is a custom IoC implementation in JavaScript. Purpose of this is to apply Dependency Inversion principle and avoid using mock utilities.

# Case study #
Consider the following function:
```javascript
async function getCurrentTemperature(zipCode){
    var thirdPartyApi = new ThirdPartyApi('some-api-key', 'some-api-secret');
    const temperature = await thirdPartyApi.getCurrentTemperature(zipCode);
    console.log(`Result: ${JSON.stringyfy(temperature)}`);
    return temperature.now;
}
```
This function has 2 concrete dependencies:
1. a ThirdPartyApi component
1. a logging component (console)

The problem with this is that function like this can't be unit tested. Attempting to write a unit test for this would result in an integration test.

# Rewriting the function in order to be testable from an unit test

Production code
```javascript
//-- IoC.js file
let thirdPartyApi = null;
let log = null;

class IoC {
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

//-- start-up file
IoC.log = console.log;
IoC.thirdPartyApi = new ThirdPartyApi('key', 'secret');

//-- business rules file
function getCurrentTemperature(zipCode) {
  const temperature = await IoC.thirdPartyApi.getCurrentTemperature(zipCode);
  IoC.log(`Result: ${JSON.stringify(temperature)}`);
  return temperature.now;
}
```

Unit tests:
```javascript
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
```
