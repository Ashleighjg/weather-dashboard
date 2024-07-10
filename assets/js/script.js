const userFormEl = document.querySelector("#user-form");
const cityButtonsEl = document.querySelector("#city-buttons");
const cityInputEl = document.querySelector("#cityname");
const stateInputEl = document.querySelector("#statename");
const currentContainerEl = document.querySelector("#current-container");
const currentHeaderEl = document.querySelector("#current-header");
const cityNameEl = document.querySelector("#city-name");
//const currentTempEl = document.querySelector('#current-temp');
//const currentHumidityEl = document.querySelector('#current-humidity');
//const currentWindEl = document.querySelector('#current-wind');
const futureContainerEl = document.querySelector("#future-container");
const searchTerm = document.querySelector("#city-search-term");


const rendercitiesfromStorage = function () {
  const storedCities = JSON.parse(localStorage.getItem("cities"));
  let cities;
  // If there are no cities in localStorage, initialize an empty array
  if (storedCities) {
    cities = storedCities;
  } else {
    cities = [];
  }
  //return cities;

  const savedSearchBtn = document.createElement("button");
  savedSearchBtn.innerHTML = cityname;
  savedSearchBtn.setAttribute("class", "btn");
  savedSearchBtn.setAttribute("class", "btn-outline-dark");
  savedSearchBtn.setAttribute("data-weather", cityname);
  cityButtonsEl.appendChild(savedSearchBtn);

  return cities;
};

const getLonLat = function (cityName, stateName) {
  //const cityName = cityInputEl.value.trim();
  //const stateName = stateInputEl.value.trim();

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},US&appid=8ddc1d4b97e0f258d62f7e1d5eccd92f&units=imperial`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      return response.json().then(function (data) {
        // console.log(data.main.temp, data.main.humidity, data.wind.speed);
        // console.log(data.coord);
        displayCurrentWeather(data);
        getFutureWeather(data);
      });
    }
  });

  /* fetch(apiUrl).then(function(res){
          return res.json()
        }).then(function(data){
          //console.log(data)
          displayCurrentWeather(data);
          getFutureWeather();
        }).catch(function(err){
          console.error(err)
        })
          */
};

const formSubmitHandler = function (event) {
  event.preventDefault();

  const cityName = cityInputEl.value.trim();
  const stateName = stateInputEl.value.trim();

  //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},US&limit=6&appid=8ddc1d4b97e0f258d62f7e1d5eccd92f&units=imperial`;

  if (cityName && stateName) {
    getLonLat(cityName, stateName);
  } else {
    alert("Please enter a City name");
  }

  // ? Create a city object with the data from the form plus response lat and lon data
  const newCity = {
    cityname: cityName,
    statename: stateName,
  };

  // ? Pull the city data from localStorage and push the new city to the array
  const cities = rendercitiesfromStorage();
  cities.push(newCity);

  saveCityData(cities);
  //displayWeather();

  currentContainerEl.textContent = "";
  futureContainerEl.textContent = "";
  cityInputEl.value = "";
  stateInputEl.value = "";
};

/*
  const cityClickHandler = function (event) {
    const cityWeather = event.target.getAttribute('data-weather');
  
    if (cityWeather) {
      getWeather(cityWeather);
  
      currentContainerEl.textContent = '';
      futureContainerEl.textContent = '';
    }
  };
*/
const saveCityData = function (cities) {
  localStorage.setItem("cities", JSON.stringify(cities));
 /* 
  const savedSearchBtn = document.createElement("button");
  savedSearchBtn.innerHTML = cityname;
  savedSearchBtn.setAttribute("class", "btn");
  savedSearchBtn.setAttribute("class", "btn-outline-dark");
  savedSearchBtn.setAttribute("data-weather", cityname);
  cityButtonsEl.appendChild(savedSearchBtn);
  */
};

const displayCurrentWeather = function (data) {
  console.log(data);
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const now = dayjs();
  const cityName = data.name;
  
console.log(data.weather.main);
  const currentCard = document.createElement("div");
  const city = document.createElement("h1");
  const cardHeader = document.createElement("h3");
  const cardBody = document.createElement("div");
  const currentTemp = document.createElement("p");
  const currentHumidity = document.createElement("p");
  const currentWind = document.createElement("p");
  const cardIcon = document.createElement("p");
  city.innerHTML = data.name;
  cardHeader.innerHTML = now;
  currentTemp.innerHTML = `Temp : ${data.main.temp} `;
  currentHumidity.innerHTML = `Humidity : ${data.main.humidity}`;
  currentWind.innerHTML = `Wind Speed : ${data.wind.speed}`;
  cardIcon.innerHTML = `Weather : ${data.weather[0].main}`;
  currentCard.setAttribute("class", "card");
  city.setAttribute("class", "city-subtitle");
  cardHeader.setAttribute("class", "card-header");
  cardBody.setAttribute("class", "card-body");
  currentTemp.setAttribute("class", "card-text");
  currentHumidity.setAttribute("class", "card-text");
  currentWind.setAttribute("class", "card-text");
  cardIcon.setAttribute("class", "card-icon");
  currentCard.appendChild(city);
  currentCard.appendChild(cardHeader);
  currentCard.appendChild(cardBody);
  cardBody.appendChild(currentTemp);
  cardBody.appendChild(currentHumidity);
  cardBody.appendChild(currentWind);
  cardBody.appendChild(cardIcon);
  currentContainerEl.appendChild(currentCard);


};

const getFutureWeather = function (data) {
  const lat = data.coord.lat;
  const lon = data.coord.lon;

  const queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8ddc1d4b97e0f258d62f7e1d5eccd92f&units=imperial`;

  return fetch(queryUrl).then(function (response) {
    if (response.ok) {
      return response.json().then(function (data) {
        console.log(data);
        displayFutureWeather(data);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  });


};

const displayFutureWeather = function (data) {
  //console.log(data)

  // console.log(data.list[4]);
  //console.log(data.list[12]);
  //console.log(data.list[20]);
  //console.log(data.list[28]);
  //console.log(data.list[36]);

  //let dayArray = [data.list[4], data.list[12], data.list[20], data.list[28], data.list[36]]

  const day1 = data.list[5];
  const day2 = data.list[13];
  const day3 = data.list[21];
  const day4 = data.list[29];
  const day5 = data.list[37];

  let dayArray = [day1, day2, day3, day4, day5];
  const parenttodiv = document.createElement('div');
  for (let i = 0; i < dayArray.length; i++) {
    console.log(dayArray[i]);
    const day = dayArray[i];

    //  dayArray.forEach(day => {
    const temp = day.main.temp;
    const humidity = day.main.humidity;
    const windSpeed = day.wind.speed;
    const now = dayjs();

    const futureCard = document.createElement("div");
    const cardHeader = document.createElement("h4");
    const cardBody = document.createElement("div");
    const currentTemp = document.createElement("p");
    const currentHumidity = document.createElement("p");
    const currentWind = document.createElement("p");
    const cardIcon = document.createElement("p");

    cardHeader.innerHTML = dayArray[i].dt_txt;
    currentTemp.innerHTML = `Temp : ${dayArray[i].main.temp} `;
    currentHumidity.innerHTML = `Humidity : ${dayArray[i].main.humidity}`;
    currentWind.innerHTML = `Wind Speed : ${dayArray[i].wind.speed}`;
    cardIcon.innerHTML = `Weather : ${dayArray[i].weather[0].main}`;

    futureCard.setAttribute("class", "card");
    cardHeader.setAttribute("class", "card-header");
    cardBody.setAttribute("class", "card-body");
    currentTemp.setAttribute("class", "card-text");
    currentHumidity.setAttribute("class", "card-text");
    currentWind.setAttribute("class", "card-text");
    cardIcon.setAttribute("class", "card-icon");
    //Append the weather card data to the card body.
    //Append the card header and card body to the card.
    futureCard.appendChild(cardHeader);
    futureCard.appendChild(cardBody);
    cardBody.appendChild(currentTemp);
    cardBody.appendChild(currentHumidity);
    cardBody.appendChild(currentWind);
    cardBody.appendChild(cardIcon);
    parenttodiv.appendChild(futureCard);
    //console.log(futureCard);
    //console.log(cardBody);
    // futureContainerEl.appendChild(futureCard);

    // ? Return the card so it can be appended
    //return futureContainerEl;

    //});

    
  }
  console.log(parenttodiv);
  futureContainerEl.appendChild(parenttodiv);
};

userFormEl.addEventListener("submit", formSubmitHandler);
//cityButtonsEl.addEventListener('click', cityClickHandler);
