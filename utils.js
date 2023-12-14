function formatDate(string) {
    let parsed = Date.parse(string);
    let date = new Date(parsed);
    
    return date.toLocaleDateString('en-uk', { weekday: 'long', day: 'numeric', month: 'short', year: '2-digit'});
}

function getWeekday(string) {
    return string.split(', ')[0];
}

export { formatDate, getWeekday };