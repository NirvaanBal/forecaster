const API_KEY = '32be7ec8fb314575c5442974e415a105';
const form = document.querySelector('form');
const searchField = document.querySelector('input[type="search"]');
const content = document.querySelector('.content');
const errField = document.querySelector('.error');
let error = false;

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

searchField.addEventListener('input', (e) => {
  if (!searchField.checkValidity()) {
    errField.textContent = 'Only letters are allowed';
    error = true;
  } else {
    errField.textContent = '';
    error = false;
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (searchField.validity.valueMissing) {
    errField.textContent = 'No location is provided';
    error = true;
  }

  if (!error) {
    errField.textContent = '';
    getReport(searchField.value).then((data) => {
      console.log(data);
    });
  }
});
