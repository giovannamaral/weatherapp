function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
    <div class="row">
    <div class="col-6">
      <div class="row week-forecast">
        <div class="col-6"><strong>${formatDay(forecastDay.dt)}</strong></div>
          <div class="col-6">
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="45"
              id="icon">
            </img>
          </div>
        </div>
      </div>
        <div class="col-6">
          <strong> 
            <span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>| 
            <span class="max-temp"> ${Math.round(forecastDay.temp.max)}°</span> 
          </strong>
        </div>
    </div>
  `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "32130c3b8a0437384dedf304822df8d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperatureElement = document.querySelector(".current-temperature");
  let cityElement = document.querySelector(".city");
  let descriptionElement = document.querySelector(".forecast");
  let maxTempElement = document.querySelector(".max-temp");
  let minTempElement = document.querySelector(".min-temp");
  let humidityElement = document.querySelector(".humidity");
  let feelsLikeElement = document.querySelector(".feels-like");
  let windElement = document.querySelector(".wind-speed");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  humidityElement.innerHTML = response.data.main.humidity;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "32130c3b8a0437384dedf304822df8d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleInputEmail1");
  search(city.value);
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDay = document.querySelector("#day");
currentDay.innerHTML = `${day} ${hours}:${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Rio de Janeiro");
