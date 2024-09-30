// OpenWeatherMap API key
const apiKey = '3faa8a8414a4e4d654e320f49d919b6d';

// DOM Elements
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherResult = document.getElementById('weather-result');

// Event listener for button click
getWeatherBtn.addEventListener('click', fetchWeather);

// Function to fetch weather data from OpenWeatherMap API
function fetchWeather() {
    const city = cityInput.value.trim();
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=3faa8a8414a4e4d654e320f49d919b6d`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        });
}

// Function to display weather data
function displayWeather(data) {
    const temp = data.main.temp;
    const weather = data.weather[0].description;
    const icon = data.weather[0].icon;
    const city = data.name;
    const country = data.sys.country;

    weatherResult.innerHTML = `
        <p><strong>${city}, ${country}</strong></p>
        <p>Temperature: ${temp}°C</p>
        <p>Condition: ${weather}</p>
        <img src="http://api.openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
        `;
}
