const API_KEY = '79d69622fa02417c8a8160044232011';

const city = document.getElementById('location');
const current = document.querySelector('.current');
const details = document.querySelector('.details');

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

city.addEventListener('keyup', async (event) => {
    if (event.key == 'Enter') {
        let data = await getCurrentWeatherData(event.target.value);
        let processedData = await processCurrentWeatherData(data);
        displayData(processedData);
        city.value = '';
    }
});

async function getCurrentWeatherData(location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    return data;
}

async function getForecastData(location) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    return data;
}

async function processCurrentWeatherData(data) {
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

async function displayData(data) {
    currentLocation.textContent = data.location;
    currentDate.textContent = formatDate(data.localdate);
    currentTime.textContent = data.localtime;
    currentCondition.textContent = data.condition;
    currentTemp.textContent = `${data.temp_c} °C`;

    detailsFeel.textContent = `${Math.round(data.feelslike_c)} °C`;
    detailsHumidity.textContent = `${Math.round(data.humidity)} %`;
    detailsPrecip.textContent = `${Math.round(data.precip)} %`;
    detailsWind.textContent = `${Math.round(data.wind_kph)} km/h`;
}






async function onLoad() {
    let data = await getCurrentWeatherData('London');
    let processed = await processCurrentWeatherData(data);
    displayData(processed);
}

onLoad();





function formatDate(string) {
    let parsed = Date.parse(string);
    let date = new Date(parsed);
    
    return date.toLocaleDateString('en-uk', { weekday: 'long', day: 'numeric', month: 'short', year: '2-digit'});
}