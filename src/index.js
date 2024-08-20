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
        .then((data) => populateData(data))
        .catch((err) => {
            console.log(err)
            document.querySelector('source').setAttribute('src', '')
            document.querySelector('video').load()
            document.querySelector('.temperature').textContent = ``
            document.querySelector('.location').textContent = ''
            document.querySelector('.conditions').textContent = ''
            document.querySelector('.description').textContent = ''
            document.querySelector('.error').textContent = ''
            document.querySelector('.error').textContent = 'Please enter a valid location'
        })
}

function populateData(data) {
    const temperature = data.currentConditions.temp
    const location = data.resolvedAddress
    const conditions = data.currentConditions.conditions
    const description = data.description

    document.querySelector('.temperature').textContent = `${temperature}°C`
    document.querySelector('.location').textContent = location
    document.querySelector('.conditions').textContent = conditions
    document.querySelector('.description').textContent = description
    document.querySelector('.error').textContent = ''
    searchVideo(`${conditions} weather view of the sky of ${location}`)
}

async function getVideo(query) {
    const response = await fetch(
        `https://api.pexels.com/videos/search?query=${query}&orientation=landscape&size=large`,
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
    const result = json.videos[randomNumber].video_files[1].link
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