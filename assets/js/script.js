const userFormEl = document.querySelector('#user-form');
const cityButtonsEl = document.querySelector('#city-buttons');
const cityInputEl = document.querySelector('#cityname');
const stateInputEl = document.querySelector('#statename');
const currentContainerEl = document.querySelector('#current-container');
const futureContainerEl = document.querySelector('#future-container');
const searchTerm = document.querySelector('#city-search-term');



const rendercitiesfromStorage = function () {
    let cities = JSON.parse(localStorage.getItem('cities'));

    // If there are no cities in localStorage, initialize an empty array
    if (!cities) {
        cities = [];
    }
    return cities;
    };

const getLatLon = function () {
    const cityName = cityInputEl.value.trim();
    const stateName = stateInputEl.value.trim();
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},US&limit=1&appid=8ddc1d4b97e0f258d62f7e1d5eccd92f`;
    
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data.main.temp, data.main.humidity, data.wind.speed);
            console.log(data.coord);
            return(data.coord);
          });
        }
});
};

const formSubmitHandler = function (event) {
    event.preventDefault();
  
    const cityName = cityInputEl.value.trim();
    const stateName = stateInputEl.value.trim();
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},US&limit=1&appid=8ddc1d4b97e0f258d62f7e1d5eccd92f`;

      
    if (cityName,stateName) {
      
        getLatLon();

    } else {
      alert('Please enter a City name');
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

    currentContainerEl.textContent = '';
    futureContainerEl.textContent = '';
    cityInputEl.value = '';
    stateInputEl.value = '';     
   
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
        localStorage.setItem('cities', JSON.stringify(cities));

    }; 

  

  const displayWeather = function () {
    const cityName = cityInputEl.value.trim();
    const stateName = stateInputEl.value.trim();
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8ddc1d4b97e0f258d62f7e1d5eccd92f`;

      
    if (cityName,stateName) {
      
        fetch(apiUrl).then(function (response) {
            if (response.ok) {
              response.json().then(function (data) {
                return(data);
              });
            } else {
                alert(`Error:${response.statusText}`);
              };
          });
      }; 
        //createCard();



    };




function createCard () {
    //Create a new card element and add the classes `card`, `task-card`, `draggable`, and `my-3`. Also add a `data-task-id` attribute and set it to the Task id.
    const card = $('<div>')
      .addClass('card  my-3');
    // Create a new card header element and add the classes `card-header` and `h4`. Also set the text of the card header to the project name.
    const cardHeader = $('<div>').addClass('card-header h4').text(list.dt_txt);
    // Create a new card body element and add the class `card-body`.
    const cardBody = $('<div>').addClass('card-body');
    // Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project type.
    const cardTemp = $('<p>').addClass('card-text').text(list.main.temp);
    // Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project due date.
    const cardHumidity = $('<p>').addClass('card-text').text(list.main.humidity);
    // Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project status.
    const cardWindspeed = $('<p>').addClass('card-text').text(list.wind.speed);
    // Create a new paragraph element and add the class
    const cardIcon = $('<p>').addClass('card-icon');

  
  
    //Append the weather card data to the card body.
  // Append the card header and card body to the card.
    cardBody.append(cardTemp, cardHumidity, cardWindspeed, cardIcon);
    card.append(cardHeader, cardBody);
  
    
  
    // ? Return the card so it can be appended 
    return card;
    currentContainerEl.append(card);
  };
    
 

 
  

  const displayCurrentWeather = function () {
   
    
  };

  const displayFutureWeather = function () {
   
    
  };




  
  userFormEl.addEventListener('submit', formSubmitHandler);
  //cityButtonsEl.addEventListener('click', cityClickHandler);
  