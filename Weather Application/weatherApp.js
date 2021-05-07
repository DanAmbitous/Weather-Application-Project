const fetchingWeatherData = async (cityName, countryName, unit) => {
	const responseFlow = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=d0a335cd5de98c365b55e1468b44cf22&units=${unit}`);
	const data = await responseFlow.json();

	functionalityBundle(data);
}

const fetchingInitialData = async (latitude, longitude) => {
	const responseFlow = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d0a335cd5de98c365b55e1468b44cf22&units=metric
	`);
	const data = await responseFlow.json();

	functionalityBundle(data);
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  let coordinates = pos.coords;

  fetchingInitialData(coordinates.latitude, coordinates.longitude);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

const weatherInformation = data => {
	const temperatureUnits = document.querySelector("#temperatures").value;
	let unit;

	if (temperatureUnits === "celsius") {
		unit = "°C"

		selectorsBundle(data, unit)
	} else if (temperatureUnits === "fahrenheit") {
		unit = "°F"

		selectorsBundle(data, unit)
	} else {
		unit = "K"

		selectorsBundle(data, unit)
	}

	iconAdder(data);
}

function iconAdder(data) {
	document.querySelector("#icon").src = `animated/${data.weather[0].icon}.svg`
}

function selectorsBundle(data, unit) {
	classSelectorAll('country', data.sys.country)
	classSelectorAll('city', data.name)
	idSelector('latitude', data.coord.lat.toFixed(2))
	idSelector('longitude', data.coord.lon.toFixed(2))
	idSelector('main', data.weather[0].main)
	idSelector('description', data.weather[0].description)
	idSelector('temperature', data.main.temp, unit)
	idSelector('feels-like', data.main.feels_like, unit)
	idSelector('temp-minimum', data.main.temp_min, unit)
	idSelector('temp-maximum', data.main.temp_max, unit)
	idSelector('pressure', data.main.pressure)
	idSelector('humidity', data.main.humidity)
	idSelector('wind-speed-data', data.wind.speed)
	idSelector('wind-degree-data', data.wind.deg)
}

addClickEventListenerSwitch('click', 'submit', event => {
	let cityName = document.querySelector('#city-name').value;
	let countryName = document.querySelector('#country-name').value;
	let temperatureUnit = document.querySelector('#temperatures').value;

	let unit;

	if (temperatureUnit === "celsius") {
	  unit = "metric"
	} else if (temperatureUnit === "fahrenheit") {
		unit = "imperial"
	} else {
		unit = "kelvin"
	}

	cityName.length === 0 ? cityName = "london" : cityName = cityName
	countryName.length === 0 ? countryName = "" : countryName = countryName

  	fetchingWeatherData(cityName, countryName, unit);
})

function addClickEventListenerSwitch(type, selector, callback) {
  document.addEventListener(type, event => {
    const element = event.target.id;

    switch(element) {
      case selector:
        callback(event);
        break; 
    }
  })
}

addInputlEventListenerSwitch('input', 'temperatures', event => {
	let cityName = document.querySelector('#city-name').value;
	let countryName = document.querySelector('#country-name').value;
	let temperatureUnit = document.querySelector('#temperatures').value;

	let unit;

	if (temperatureUnit === "celsius") {
	  unit = "metric"
	} else if (temperatureUnit === "fahrenheit") {
		unit = "imperial"
	} else {
		unit = "kelvin"
	}

	cityName.length === 0 ? cityName = "london" : cityName = cityName
	countryName.length === 0 ? countryName = "" : countryName = countryName

  	fetchingWeatherData(cityName, countryName, unit);
})

function addInputlEventListenerSwitch(type, selector, callback) {
  document.addEventListener(type, event => {
    const element = event.target.id;

    switch(element) {
      case selector:
        callback(event);
        break; 
    }
  })
}

addInputlEventListenerSwitch('keyup', 'Enter', event => {
	const key = event.key;

	switch(key) {
		case "Enter":
			let cityName = document.querySelector('#city-name').value;
			let countryName = document.querySelector('#country-name').value;
			let temperatureUnit = document.querySelector('#temperatures').value;
		
			let unit;
		
			if (temperatureUnit === "celsius") {
				unit = "metric"
			} else if (temperatureUnit === "fahrenheit") {
				unit = "imperial"
			} else {
				unit = "kelvin"
			}
		
			cityName.length === 0 ? cityName = "london" : cityName = cityName
			countryName.length === 0 ? countryName = "" : countryName = countryName
		
				fetchingWeatherData(cityName, countryName, unit);
				break;
	}
})

function addInputlEventListenerSwitch(type, selector, callback) {
  document.addEventListener(type, event => {
    const key = event.key;

    switch(key) {
      case selector:
        callback(event);
        break; 
    }
  })
}

function functionalityBundle(data) {
	weatherInformation(data)
}

function idSelector(elementName, content, unit) {
	// So the Main and Description wouldn't show the units
	if (unit == undefined) {
		unit = "";
	}

	document.querySelector(`#${elementName}`).textContent = `${content}${unit}`;
}

function classSelectorAll(elementName, content) {
	const nodeList = Array.from(document.querySelectorAll(`.${elementName}`));

	nodeList.forEach(node => {
		node.textContent = content;
	})
}
