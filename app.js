const API_KEY = '79d69622fa02417c8a8160044232011';

const city = document.getElementById('location');
const current = document.getElementById('current');

city.addEventListener('keyup', async (event) => {
    if (event.key == 'Enter') {
        let data = await getCurrentWeatherData(event.target.value);
        console.log(data);
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

async function processCurrentWeatherData() {
    let data = await getCurrentWeatherData('Sofia');

    return {
        condition: data.current.condition.text,
        location: data.location.name,
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

let data = processCurrentWeatherData();
console.log(data);