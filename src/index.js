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

function showTemperature(response) {
  document.querySelector(".current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".forecast").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleInputEmail1").value;

  let apiKey = "32130c3b8a0437384dedf304822df8d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#currentButton");
button.addEventListener("click", getCurrentPosition);