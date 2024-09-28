const convertToCelsius = function(fahrenheit) {
  let newFahrenheit = (fahrenheit - 32) * 5/9
  return parseFloat(newFahrenheit.toFixed(1))
};

const convertToFahrenheit = function(celsius) {
  let newCelsius = (celsius* 9/5) + 32
  return parseFloat(newCelsius.toFixed(1))
};

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
