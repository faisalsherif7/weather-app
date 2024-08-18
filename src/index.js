import './style.css';

async function getWeather(location) {
    const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=6GGY5DHYK4ZV5PE82LWWSRBFL`)
    const dataJson = await weatherData.json()
    console.log(dataJson)
}

document.querySelector('button').addEventListener('click', () => {
    const value = document.querySelector('input').value
    getWeather(value)
})