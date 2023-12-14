import { formatDate, getWeekday } from "./utils.js";

const API_KEY = '79d69622fa02417c8a8160044232011';

const city = document.getElementById('location');
const currentLocation = document.querySelector('.current-location');
const currentDate = document.querySelector('.current-date');
const currentTime = document.querySelector('.current-time');
const currentCondition = document.querySelector('.current-condition');
const currentTemp = document.querySelector('.current-temp');
const currentIcon = document.querySelector('.current-icon');

const detailsFeel = document.querySelector('.details-feel');
const detailsHumidity = document.querySelector('.details-humidity');
const detailsPrecip = document.querySelector('.details-precip');
const detailsWind = document.querySelector('.details-wind');

const forecastContainers = document.querySelectorAll('.forecast-day');

city.addEventListener('keyup', async (event) => {
    if (event.key == 'Enter') {
        getWeather(city.value);
        city.value = '';
    }
});

async function getWeatherData(location) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    return data;
}

async function processCurrentData(data) {
    return {
        condition: data.current.condition.text,
        location: data.location.name,
        localdate: data.location.localtime.split(' ')[0],
        localtime: data.location.localtime.split(' ')[1],
        temp_c: data.current.temp_c,
        temp_f: data.current.temp_f,
        feelslike_c: data.current.feelslike_c,
        fellslike_f: data.current.feelslike_f,
        humidity: data.current.humidity,
        is_day: data.current.is_day,
        precip: data.current.precip_mm,
        wind_kph: data.current.wind_kph,
    }
}

async function processForecastData(data) {
    const forecastArray = data.forecast.forecastday;
    const newArray = forecastArray.map(day => {
        const obj = {
            date: getWeekday(formatDate(day.date)),
            maxtemp: day.day.maxtemp_c,
            mintemp: day.day.mintemp_c,
            condition: day.day.condition.text
        };
        return obj;
    });
    return newArray;
}

async function displayCurrentData(data) {
    currentLocation.textContent = data.location;
    currentDate.textContent = formatDate(data.localdate);
    currentTime.textContent = data.localtime;
    currentCondition.textContent = data.condition;
    currentTemp.textContent = `${Math.round(data.temp_c)} °C`;

    detailsFeel.textContent = `${Math.round(data.feelslike_c)} °C`;
    detailsHumidity.textContent = `${Math.round(data.humidity)} %`;
    detailsPrecip.textContent = `${data.precip.toFixed(2)} mm`;
    detailsWind.textContent = `${Math.round(data.wind_kph)} km/h`;
}

function fillContainer(container, data) {
    container.querySelector('.day-of-week').textContent = data.date;
    container.querySelector('.max-temp').textContent = `${Math.round(data.maxtemp)} °C`;
    container.querySelector('.min-temp').textContent = `${Math.round(data.mintemp)} °C`;
}

function displayForecastData(data) {
    for (let i = 0; i < data.length; i++) {
        fillContainer(forecastContainers[i], data[i]);
    }
}


async function getWeather(location) {
    const data = await getWeatherData(location);
    const current = await processCurrentData(data);
    const forecast = await processForecastData(data);
    displayCurrentData(current);
    displayForecastData(forecast);
}

getWeather('London');