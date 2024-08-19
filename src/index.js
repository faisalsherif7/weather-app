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

async function searchVideo(query) {
    const response = await fetch(`https://api.pexels.com/videos/search?query=${query}`, {
        headers: {
            "Authorization": "iK34t5lfhLCNOFMpX8HhBQKUYNE5yWhhV3RtkPO7k7UywZm1B73yUxRN",
        }
    })
    const json = await response.json()
    return json.videos[0].video_files[0].link
}

searchVideo("cloudy weather").then((response) => {
    console.log(response)
})