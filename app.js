const API_KEY = '79d69622fa02417c8a8160044232011';

const city = document.getElementById('location');

city.addEventListener('keyup', async (event) => {
    if (event.key == 'Enter') {
        let data = await getCurrentWeatherData(event.target.value);
        console.log(data);
    }
});

async function getCurrentWeatherData(location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

