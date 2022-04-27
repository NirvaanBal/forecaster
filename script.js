const API_KEY = '32be7ec8fb314575c5442974e415a105';

async function weatherOf(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${API_KEY}&units=metric`
  );

  const data = await response.json();

  return data;
}

function getReport(city) {
  return weatherOf(city).then((res) => {
    return {
      temp: res.main.temp,
      weather: res.weather[0]['description'],
      location: res.name,
    };
  });
}
