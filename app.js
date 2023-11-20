const API_KEY = '79d69622fa02417c8a8160044232011';

async function getCurrentWeather() {
    const location = 'Burgas';
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
}

getCurrentWeather();