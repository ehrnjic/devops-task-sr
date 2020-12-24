'use strict';

const express = require('express');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Node Js Microservice App');
});

app.get('/users', (req, res) => {
  res.send([{
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 30
  }]);
});

var port = process.env.PORT||PORT;
app.listen(port);
console.log(`Running on http://${HOST}:${PORT}`);