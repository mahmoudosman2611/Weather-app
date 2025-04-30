"use strict";
// &Api link >>>>>https://api.weatherapi.com/v1/forecast.json?key=3255cbd5ff77446b8f802009252504&q=cairo&days=3
// * HTML elements
const searchInput = document.querySelector("#searchInput");

//!  >>>>>>>>>>>>>>>>>>>>>today HTML elements<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const dayName = document.querySelector("#dayName");
const dayNumber = document.querySelector("#dayNumber");
const todayMonthOfCity = document.querySelector("#todayMonthOfCity");
const todayLocation = document.querySelector("#todayLocation");
const todayTemp = document.querySelector("#todayTemp");
const todayConditionImg = document.querySelector("#todayConditionImg");
const todayWeatherDescription = document.querySelector(
  "#todayWeatherDescription"
);
const todayHumidity = document.querySelector("#todayHumidity");
const todayWind = document.querySelector("#todayWind");
const todayWindDirection = document.querySelector("#todayWindDirection");
//! <<<<<<<<<<<<<<<<<<<<<<<<<<<<today HTML elements<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//? >>>>>>>>>>>>>>>>>>>>>tomorrow HTML elements<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const tomorrowName = document.querySelector("#tomorrowName");

const nextConditionImg = document.querySelector("#nextConditionImg");
const nextMaxTemp = document.querySelector("#nextMaxTemp");
const nextMinTemp = document.querySelector("#nextMinTemp");
const nextConditionText = document.querySelector("#nextConditionText");
//? <<<<<<<<<<<<<<<<<<<<<<<<<<<<tomorrow HTML elements<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//*  >>>>>>>>>>>>>>>>>>>>>after tomorrow HTML elements<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const afterTomorrowName = document.querySelector("#afterTomorrowName");
const afterNextConditionImg = document.querySelector("#afterNextConditionImg");
const afterNextMaxTemp = document.querySelector("#afterNextMaxTemp");
const afterNextMinTemp = document.querySelector("#afterNextMinTemp");
const afterNextConditionText = document.querySelector(
  "#afterNextConditionText"
);
//*  >>>>>>>>>>>>>>>>>>>>>after tomorrow HTML elements<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// ^app variables
let weatherData;

// &Functions

async function startApp(city) {
  weatherData = await getData(city);
  if (!weatherData.error) {
    todayWeather();
    tomorrowWeather();
    afterTomorrowWeather();
  }
}

async function getData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=3255cbd5ff77446b8f802009252504&q=${city}&days=3`
  );
  const data = await response.json();
  return data;
}

function todayWeather() {
  const todayDate = new Date(weatherData.location.localtime);

  dayName.innerHTML = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  dayNumber.innerHTML = todayDate.getDate();
  todayMonthOfCity.innerHTML = todayDate.toLocaleDateString("en-US", {
    month: "long",
  });
  todayLocation.innerHTML = weatherData.location.name;
  todayTemp.innerHTML = weatherData.current.temp_c;
  todayConditionImg.setAttribute(
    `src`,
    `http:` + weatherData.current.condition.icon
  );
  todayWeatherDescription.innerHTML = weatherData.current.condition.text;
  todayHumidity.innerHTML = weatherData.current.humidity + `%`;
  todayWind.innerHTML = weatherData.current.wind_mph + `km/h`;
  todayWindDirection.innerHTML = weatherData.current.wind_dir;
}

function tomorrowWeather() {
  const nextDayDate = new Date(weatherData.forecast.forecastday[1].date);
  tomorrowName.innerHTML = nextDayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  nextConditionImg.setAttribute(
    `src`,
    `http:` + weatherData.forecast.forecastday[1].day.condition.icon
  );
  nextMaxTemp.innerHTML = weatherData.forecast.forecastday[1].day.maxtemp_c;
  nextMinTemp.innerHTML = weatherData.forecast.forecastday[1].day.mintemp_c;
  nextConditionText.innerHTML =
    weatherData.forecast.forecastday[1].day.condition.text;
}
function afterTomorrowWeather() {
  const afterNextDayDate = new Date(weatherData.forecast.forecastday[2].date);
  afterTomorrowName.innerHTML = afterNextDayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  afterNextConditionImg.setAttribute(
    `src`,
    `http:` + weatherData.forecast.forecastday[2].day.condition.icon
  );
  afterNextMaxTemp.innerHTML =
    weatherData.forecast.forecastday[2].day.maxtemp_c;
  afterNextMinTemp.innerHTML =
    weatherData.forecast.forecastday[2].day.mintemp_c;
  afterNextConditionText.innerHTML =
    weatherData.forecast.forecastday[2].day.condition.text;
}

navigator.geolocation.getCurrentPosition(
  function (location) {
    const liveLocation =
      location.coords.latitude + `,` + location.coords.longitude;
    startApp(liveLocation);
  },
  function (error) {
    console.warn("Could not access location, defaulting to Cairo");
    startApp("Cairo");
  }
);

// ?Events
searchInput.addEventListener("input", function () {
  if (searchInput.value.length >= 3) startApp(searchInput.value);
});
