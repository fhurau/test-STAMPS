const axios = require('axios');

const lat = -6.2088;
const lon = 106.8456;
const apiKey = "691d5791fa77a14ea39001e91d8d1bbe";

const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;


axios.get(url)
.then(response => {

const forecastList = response.data.list;

const uniqueDates = new Set();
let count = 0;
console.log("Weather Forecast:");

forecastList.forEach(forecast => {
  const date = new Date(forecast.dt * 1000).toLocaleDateString('en', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const temperatureKelvin = forecast.main.temp;
  const temperatureCelsius = Math.round(temperatureKelvin - 273.15); 
  if (!uniqueDates.has(date)) {
    console.log(`${date}: ${temperatureCelsius}°C`);
    uniqueDates.add(date);
    count++;
    if (count === 5) {
      return;
    }
  }
});
})
.catch(error => {
    console.log("Error:", error);
});
