// Constants
const API_KEY = "aa584299bfccc3d3e001292169a589c4";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements
const wrapper = document.querySelector(".wrapper");
const inputPart = document.querySelector(".input-part");
const infoTxt = inputPart.querySelector(".info-txt");
const inputField = inputPart.querySelector("input");
const locationBtn = inputPart.querySelector("button");
const weatherPart = wrapper.querySelector(".weather-part");
const wIcon = weatherPart.querySelector("img");
const arrowBack = wrapper.querySelector("header i");

// Event Listeners
inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && inputField.value.trim() !== "") {
    fetchWeatherData(inputField.value.trim());
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      onLocationSuccess,
      onLocationError
    );
  } else {
    showAlert("Your browser does not support geolocation.");
  }
});

arrowBack.addEventListener("click", () => {
  clearWeatherData();
});

// Functions
function fetchWeatherData(query) {
  const apiUrl = `${API_BASE_URL}?q=${query}&units=metric&appid=${API_KEY}`;

  showInfo("Getting weather details...");

  fetch(apiUrl)
    .then(handleResponse)
    .then(displayWeatherData)
    .catch(handleError);
}

function onLocationSuccess(position) {
  const { latitude, longitude } = position.coords;
  const apiUrl = `${API_BASE_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

  fetchWeatherDataByCoords(apiUrl);
}

function fetchWeatherDataByCoords(apiUrl) {
  showInfo("Getting weather details...");

  fetch(apiUrl)
    .then(handleResponse)
    .then(displayWeatherData)
    .catch(handleError);
}

function onLocationError(error) {
  showError(error.message);
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Weather data request failed: ${response.status}`);
  }
  return response.json();
}

function displayWeatherData(data) {
  const { name, sys, weather, main } = data;
  const { description, id } = weather[0];
  const { temp, feels_like, humidity } = main;
  const { country } = sys;

  setWeatherIcon(id);
  updateWeatherInfo(name, country, description, temp, feels_like, humidity);
}

function setWeatherIcon(weatherId) {
  let iconSrc = "";

  if (weatherId === 800) {
    iconSrc = "icons/clear.svg";
  } else if (weatherId >= 200 && weatherId <= 232) {
    iconSrc = "icons/storm.svg";
  } else if (weatherId >= 600 && weatherId <= 622) {
    iconSrc = "icons/snow.svg";
  } else if (weatherId >= 701 && weatherId <= 781) {
    iconSrc = "icons/haze.svg";
  } else if (weatherId >= 801 && weatherId <= 804) {
    iconSrc = "icons/cloud.svg";
  } else if (
    (weatherId >= 500 && weatherId <= 531) ||
    (weatherId >= 300 && weatherId <= 321)
  ) {
    iconSrc = "icons/rain.svg";
  }

  wIcon.src = iconSrc;
}

function updateWeatherInfo(
  city,
  country,
  description,
  temp,
  feelsLike,
  humidity
) {
  weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
  weatherPart.querySelector(".weather").innerText = description;
  weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
  weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feelsLike);
  weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;

  clearInfo();
  wrapper.classList.add("active");
}

function showAlert(message) {
  infoTxt.innerText = message;
  infoTxt.classList.add("error");
}

function showInfo(message) {
  infoTxt.innerText = message;
  infoTxt.classList.add("pending");
}

function showError(message) {
  showAlert(message);
}

function clearInfo() {
  infoTxt.innerText = "";
  infoTxt.classList.remove("pending", "error");
}

function clearWeatherData() {
  wrapper.classList.remove("active");
  inputField.value = "";
  clearInfo();
}

// Initial state
clearWeatherData();
