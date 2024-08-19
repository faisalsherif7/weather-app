import './style.css';

async function getWeather(location) {
    const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=6GGY5DHYK4ZV5PE82LWWSRBFL&unitGroup=metric`)
    const dataJson = await weatherData.json()
    return dataJson
}

function jsonProcessor(data) {
    console.log(data)
    document.querySelector('.temperature').textContent = `${data.currentConditions.temp}°C`
    document.querySelector('.location').textContent = data.resolvedAddress
    document.querySelector('.conditions').textContent = data.currentConditions.conditions
    document.querySelector('.description').textContent = data.description
}


document.querySelector('button').addEventListener('click', () => {
    const value = document.querySelector('input').value
    getWeather(value)
    .then((data) => jsonProcessor(data))
    .catch((err) => console.log(err))
})