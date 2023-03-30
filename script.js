const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=381441f621bb36caadd1a8b5b57c89fc'
const API_UNITS = '&units=metric'
const API_LANG = '&lang=pl'

const getWeather = () => {
	const city = input.value || 'Bochnia'
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios.get(URL).then(res => {
		const temp = res.data.main.temp
		const hum = res.data.main.humidity
		const status = Object.assign({}, ...res.data.weather)
		const statusId = status.id
		weather.textContent = status.main

		if (statusId >= 200 && statusId <= 232) {
			photo.setAttribute('src', './img/thunderstorm.png')
		} else if (statusId >= 300 && statusId <= 321) {
			photo.setAttribute('src', './img/drizzle.png')
		}else if (statusId >= 500 && statusId <= 531) {
			photo.setAttribute('src', './img/rain.png')
		}else if (statusId >= 600 && statusId <= 622) {
			photo.setAttribute('src', './img/ice.png')
		}else if (statusId >= 701 && statusId <= 781) {
			photo.setAttribute('src', './img/fog.png')
		}else if (statusId == 800) {
			photo.setAttribute('src', './img/sun.png')
		}else if (statusId >= 801 && statusId <= 804) {
			photo.setAttribute('src', './img/cloud.png')
		}
        else{
			photo.setAttribute('src', './img/unknown.png')
        }

		cityName.textContent = res.data.name

		temperature.textContent = Math.floor(temp) + '℃' // °C
		humidity.textContent = hum + '%'

		// console.log(res.data.weather[0].id)
	})
}

getWeather()
button.addEventListener('click', getWeather)
