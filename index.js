const express = require("express");
const path = require('path');
const cors = require('cors');

//Initializations
const app = express();
const database = require('./database');
const Product = require('./models/products');

//Settings
app.set('AppName', 'E-commerce project API');
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use(require('./routes/api/products'), (req, res, next) => {
  console.log('Time:', Date.now());
  next();
});
app.use(require('./routes/api/categories'), (req, res, next) => {
  console.log('Time:', Date.now());
  next();
});
app.use(require('./routes/api/users'), (req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log(app.get('AppName'));
  console.log('Server running on port', app.get('port'));
  console.log(app.get('host'));
});


