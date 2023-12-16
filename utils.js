function formatDate(string) {
    let parsed = Date.parse(string);
    let date = new Date(parsed);
    
    return date.toLocaleDateString('en-uk', { weekday: 'long', day: 'numeric', month: 'short', year: '2-digit'});
}

function getWeekday(string) {
    return string.split(', ')[0];
}

function getIcon(condition, isDay) {
    let fileName = 'clear-day.svg';
    if (!isDay) {
        fileName = 'clear-night.svg';
    }

    condition = condition.toLowerCase();

    if (condition.includes('cloud') || condition == 'overcast') {
        fileName = 'cloudy.svg';
    } else if (condition.includes('rain')) {
        fileName = 'rain.svg';
    } else if (condition.includes('snow')) {
        fileName = 'snow.svg';
    }

    return fileName;
}

export { formatDate, getWeekday, getIcon };