const fetchingWeatherData = async (cityName, countryName, unit) => {
	const responseFlow = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=d0a335cd5de98c365b55e1468b44cf22&units=${unit}`);
	const data = await responseFlow.json();

	functionaliteBundle(data);
}

fetchingWeatherData("london", "uk", "metric");

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
}

function selectorsBundle(data, unit) {
	classSelectorAll('country', data.sys.country)
	classSelectorAll('city', data.name)
	idSelector('main', data.weather[0].main)
	idSelector('description', data.weather[0].description)
	idSelector('temperature', data.main.temp, unit)
	idSelector('feels-like', data.main.feels_like, unit)
	idSelector('temp-minimum', data.main.temp_min, unit)
	idSelector('temp-maximum', data.main.temp_max, unit)
}

addGlobalEventListenerSwitch('click', 'submit', event => {
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

function addGlobalEventListenerSwitch(type, selector, callback) {
  document.addEventListener(type, event => {
    const element = event.target.id;

    switch(element) {
      case selector:
        callback(event);
        break; 
    }
  })
}

function functionaliteBundle(data) {
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
