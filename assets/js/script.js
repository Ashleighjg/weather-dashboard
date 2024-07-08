const userFormEl = document.querySelector('#user-form');
const cityButtonsEl = document.querySelector('#city-buttons');
const cityInputEl = document.querySelector('#cityname');
const stateInputEl = document.querySelector('#statename');
const currentContainerEl = document.querySelector('#current-container');
const currentHeaderEl = document.querySelector('#current-header');
//const currentTempEl = document.querySelector('#current-temp');
//const currentHumidityEl = document.querySelector('#current-humidity');
//const currentWindEl = document.querySelector('#current-wind');
const futureContainerEl = document.querySelector('#future-container');
const searchTerm = document.querySelector('#city-search-term');




const rendercitiesfromStorage = function () {
    const storedCities = JSON.parse(localStorage.getItem('cities'));
    let cities;
    // If there are no cities in localStorage, initialize an empty array
    if (storedCities) {
        cities = storedCities;
    }
    else { cities=[];}
    return cities;
    };

const getLonLat = function (cityName,stateName) {
    //const cityName = cityInputEl.value.trim();
    //const stateName = stateInputEl.value.trim();
    
    

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},US&appid=8ddc1d4b97e0f258d62f7e1d5eccd92f&units=imperial`;
    
     fetch(apiUrl).then(function (response) {
        if (response.ok) {
          return response.json()
          .then(function (data) {
            console.log(data.main.temp, data.main.humidity, data.wind.speed);
            console.log(data.coord);
            displayCurrentWeather(data);
            getFutureWeather(data);
          });
        }
        });
};

const formSubmitHandler = function (event) {
    event.preventDefault();
  
    const cityName = cityInputEl.value.trim();
    const stateName = stateInputEl.value.trim();
    
    //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},US&limit=6&appid=8ddc1d4b97e0f258d62f7e1d5eccd92f&units=imperial`;

      
    if (cityName&&stateName) {
        
        getLonLat(cityName,stateName);

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

           
 const displayCurrentWeather = function (data) {
 
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const now = dayjs();
    const cityName = data.name;


    const currentCard = $('<div>').addClass('card');
    const cardHeader = $('<h3>').addClass('card-header').text(cityName, now);
        const cardBody = $('<div>').addClass('card-body');
        const currentTemp = $('<p>').addClass('card-text').text(temp);
        const currentHumidity = $('<p>').addClass('card-text').text(humidity);
        const currentWind = $('<p>').addClass('card-text').text(windSpeed);
        const cardIcon = $('<p>').addClass('card-icon');

        cardBody.append(currentTemp, currentHumidity, currentWind, cardIcon);
        currentCard.append(cardHeader,cardBody);
        currentContainerEl.append(currentCard);
    
        return currentContainerEl;
    
  };

  const getFutureWeather = function (data) {
    const lat = data.coord.lat;
    const lon = data.coord.lon;


    const queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8ddc1d4b97e0f258d62f7e1d5eccd92f&units=imperial`;
   
    return fetch(queryUrl)
    .then(function (response) {
       if (response.ok) {
       return response.json().then(function (data) {
        console.log(data);
        displayFutureWeather(data);
        
       });
    } else {
        alert(`Error:${response.statusText}`);
      };
      });

  }


  const displayFutureWeather = function (data) {


    console.log(data.list[4]);
    console.log(data.list[12]);
    console.log(data.list[20]);
    console.log(data.list[28]);
    console.log(data.list[36]);

    //let dayArray = [data.list[4], data.list[12], data.list[20], data.list[28], data.list[36]]

    const day1 = data.list[4];
    const day2 = data.list[12];
    const day3 = data.list[20];
    const day4 = data.list[28];
    const day5 = data.list[36];

    let dayArray = [day1, day2, day3, day4, day5]

    for (let i = 0; i < dayArray.length; i++) {
      console.log(dayArray[i]);
    
    };
  }
      /*const temp = dayArray[i].main.temp;
      const humidity = dayArray[i].main.humidity;
      const windSpeed = dayArray[i].wind.speed;
      const now = dayArray[i].dt_txt;
      
      
 
      //Create a new card element and add the classes `card`.
      const futureCard = $('<div>')
      .addClass('card  my-3');
      // Create a new card header element and add the classes `card-header` and `h4`. 
      const cardHeaderF = $('<div>').addClass('card-header h4').text(now);
      // Create a new card body element and add the class `card-body`.
      const cardBodyF = $('<div>').addClass('card-body');
      // Create a new paragraph element and add the class `card-text`. 
      const cardTemp = $('<p>').addClass('card-text').text(temp);
      // Create a new paragraph element and add the class `card-text`. 
      const cardHumidity = $('<p>').addClass('card-text').text(humidity);
      // Create a new paragraph element and add the class `card-text`. 
      const cardWindspeed = $('<p>').addClass('card-text').text(windSpeed);
      // Create a new paragraph element and add the class
      const cardIcon = $('<p>').addClass('card-icon');



      //Append the weather card data to the card body.
      // Append the card header and card body to the card.
      cardBodyF.append(cardTemp, cardHumidity, cardWindspeed, cardIcon);
      futureCard.append(cardHeaderF, cardBodyF);



// ? Return the card so it can be appended 
      return futureCard;
      futureContainerEl.append(futureCard);
    };
              
*/




  
  userFormEl.addEventListener('submit', formSubmitHandler);
  //cityButtonsEl.addEventListener('click', cityClickHandler);
  