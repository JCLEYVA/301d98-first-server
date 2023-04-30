// 'use strict';

// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');

// let weatherData = require('./data/weather.json');
// =
// const app = express();
// app.use(cors());
// const PORT = process.env.PORT || 3002;
// app.listen(PORT, () => console.log(`Yay we are up on port ${PORT}`));
// // **** ENDPOINTS ****
// // *** 1st arg - endpoint url as a string
// // *** 2nd arg - callback which will execute when that endpoint is hit
// //              ** 2 parameters, request, response
// app.get('/', (request, response) => {
//   response.status(200).send('Welcome to my server!');
// });
// app.get('/hello', (request, response) => {
//   let firstName = request.query.userFirstName;
//   let lastName = request.query.userLastName;
//   console.log(request.query);
//   response.status(200).send(`Hello ${firstName} ${lastName}, welcome to my server!`);
// });
// app.get('/pet', (request, response, next) => {
//   try {
//     let queriedSpecies = request.query.species;
//     let foundPet = petData.find(pet => pet.species === queriedSpecies);
//     let dataToSend = new Pet(foundPet);
//     response.status(200).send(dataToSend);
//   } catch (error) {
//     next(error);
//   }
// });
// // *** CLASS TO GROOM BULKY DATA ***
// class Pet {
//   constructor(petObj) {
//     this.name = petObj.name;
//     this.breed = petObj.breed;
//   }
// }
// // *** HELPFUL START FOR YOUR LAB ***
// class Forecast {
//   constructor(data) {
//     this.date = data.valid_date;
//     this.description = data.weather.description;
//   }
// }
// app.get('/weather', (request, response, next) => {
//   try {
//     let lat = request.query.lat;
//     let lon = request.query.lon;
//     let searchQuery = request.query.searchQuery;
//     let weather = weatherData.find(city => city.city_name === searchQuery)
//     let result = weather.data.map(day => new Forecast(day))
//     response.status(200).send(result)
//     // if (lat && lon) {
//     //   result = weather.searchByLocation(lat, lon);
//     // } else if (searchQuery) {
//     //   result = weather.searchByQuery(searchQuery);
//     // } else {
//     //   throw new Error('Please provide either lat and lon or a search query.');
//     // }
//     // if (!result) {
//     //   throw new Error('Weather data not found.');
//     // }
//     // response.json(result);
//   } catch (error) {
//     console.log(error.message);
//     next(error.message);
//   }
// });

// // Lab 8
// // *** CATCH ALL ENDPOINT SHOULD BE THE LAST DEFINED ***
// app.get('*', (request, response) => {
//   response.status(404).send('This page does not exist');
// });
// // **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
// app.use((error, request, response, next) => {
//   console.log(error.message);
//   response.status(500).send(error.message);
// });

'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./modules/weather.js');
const movies = require('./modules/movie.js');


const app = express();
app.use(cors());

app.get('/forecast', weatherHandler);
app.get('/movie', movieHandler);
app.get('/weather', currWeatherHandler);


//FORECAST
function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather.getFWeather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong with Weather API!');
    });
}

function currWeatherHandler(request, response) {
  const { lat, lon } = request.query;

  weather.getCurrWeather(lat,lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong with Weather API!');
    });
}

function movieHandler(request, response) {
  movies(request.query.city)
    .then(res => response.send(res))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong with Movie API!');
    });
}


app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));



