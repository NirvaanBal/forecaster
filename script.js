const form = document.querySelector('form');
const searchField = document.querySelector('input[type="search"]');
const content = document.querySelector('.content');
const errField = document.querySelector('.error');
let error = false;

async function getGIF(value) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=LapI2vbsyYOLG8Vh0AefC5RiPyDO2NFl&s=${value}`
  );

  const result = await response.json();
  return result.data.images.original.url;
}

async function weatherOf(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=32be7ec8fb314575c5442974e415a105&units=metric`
    );

    if (!response.ok) throw new Error('Invalid');

    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

function getReport(city) {
  return weatherOf(city)
    .then((res) => {
      return {
        temp: res.main.temp,
        weather: res.weather[0]['description'],
        location: res.name,
      };
    })
    .catch((error) => {
      console.log(error);
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

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (searchField.validity.valueMissing) {
    errField.textContent = 'No location is provided';
    error = true;
  }

  if (!error) {
    const data = await getReport(searchField.value);
    if (!data) {
      errField.textContent = 'Provide a valid location';
    } else {
      const weatherGIF = await getGIF(data.weather);
      content.innerHTML = `
        <div>
          <h2>${data.temp}<sup>&deg;c</sup></h2>
          <img src="${weatherGIF}" alt="${data.weather}" />
        </div>
      `;
    }
  }
});
