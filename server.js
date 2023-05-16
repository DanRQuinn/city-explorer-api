'use strict';

console.log('our first server');

const express = require('express')

//  REQUIRE

require('dotenv').config();
// let data = bring in json data

const app = express();
//  PORT

const PORT = process.env.PORT || 3002;

// ROUTES

app.get('/', (request, response) => {
  response.send('hello');
})

app.get('/sayHello', (request,response) => {
  console.log(request.query.firstName);   
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.send(`hi ${firstName} ${lastName}`);
})

app.get('/weather', (request, response) = {
  // request url 
  let userSearching = request.query.____1
  let dataFromJson = data.find(___ => ___.___1 === userSearching);
  let dataToSend = new Pet(dataFromJson)
  response.send(dataToSend);
});

app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
})

//  CLASSES

class Pet {
  constructor(___Object){
    this.name = __object.name
    
  }
} 
// LISTEN 

app.listen(PORT, () => console.log(`listening on ${PORT}`));
