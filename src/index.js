import './style.css'

async function getWeather(location) {
    const weatherData = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=6GGY5DHYK4ZV5PE82LWWSRBFL&unitGroup=metric`
    )
    const dataJson = await weatherData.json()
    return dataJson
}

function searchWeather(value) {
    getWeather(value)
        .then((data) => jsonProcessor(data))
        .catch((err) => console.log(err))
}

function jsonProcessor(data) {
    const temperature = data.currentConditions.temp
    const location = data.resolvedAddress
    const conditions = data.currentConditions.conditions
    const description = data.description

    document.querySelector('.temperature').textContent = `${temperature}°C`
    document.querySelector('.location').textContent = location
    document.querySelector('.conditions').textContent = conditions
    document.querySelector('.description').textContent = description
    searchVideo(`${conditions} weather`)
}

async function getVideo(query) {
    const response = await fetch(
        `https://api.pexels.com/videos/search?query=${query}`,
        {
            headers: {
                Authorization:
                    'iK34t5lfhLCNOFMpX8HhBQKUYNE5yWhhV3RtkPO7k7UywZm1B73yUxRN',
            },
        }
    )
    const json = await response.json()
    console.log(json.videos)
    const randomNumber = Math.floor(Math.random() * 10)
    const result = json.videos[randomNumber].video_files[0].link
    console.log(json.videos[randomNumber].video_files)
    return result
}

function searchVideo(query) {
    getVideo(query)
        .then((response) => {
            const source = document.querySelector('source')
            source.setAttribute('src', response)
            document.querySelector('video').load()
        })
        .catch((err) => console.log(err))
}

document.querySelector('button').addEventListener('click', () => {
    const value = document.querySelector('input').value
    searchWeather(value)
})

searchWeather('new york')