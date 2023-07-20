const temp = document.querySelector('.temp')
let city = document.querySelector('.city')
const condition = document.querySelector('#description')
const lo = document.querySelector('.location')
const img = document.getElementById('icon')
const humidity = document.querySelector('#humidity')
const region = document.querySelector('#region')
const country = document.querySelector('#country')
const localtime = document.querySelector('#localtime')
const form = document.getElementById('form')
const div = document.querySelector('.content')


async function getWeather() {
    temp.textContent = 'loading...'
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=6639432899514dadb4d44210231907&q=${givenCity}`, {
        mode: 'cors'
      })
    jsonData = await data.json()
    console.log(jsonData)
    const cityData = new Attributes(jsonData)
    //cityData.sayData()
    transfer(cityData)
}


function Attributes(attribute) {
    this.celcius = attribute.current.temp_c
    this.farenheight = attribute.current.temp_f
    this.image = attribute.current.condition.icon.slice(2)
    this.city = attribute.location.name

    this.condition = attribute.current.condition.text
    this.feels_c = attribute.current.condition.feelslike_c
    this.feels_f = attribute.current.condition.feelslike_f
    this.humidity = attribute.current.humidity
    

    this.region = attribute.location.region
    this.country = attribute.location.country
    this.localtime = attribute.location.localtime

    
    // this.sayData = () => {
    //     console.log(this.celcius, this.farenheight, this.condition, this.humidity)
    // }   
}

function transfer(info) {
    city.textContent = info.city
    temp.textContent = info.celcius
    img.src = `https://${info.image}`

    condition.textContent = info.condition
    humidity.textContent = `Humidity: ${info.humidity}%`

    region.textContent = info.region
    country.textContent = info.country
    localtime.textContent = `Local Time: ${info.localtime}%`
    
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let userLocation = document.getElementById("location")
    givenCity = userLocation.value

    getWeather()
});